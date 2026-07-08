
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductTabs from '@/app/components/ProductTabs';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { id } = await params; 
  const client = await clientPromise;
  const db = client.db("shop");
  const oil = await db.collection("products").findOne({ _id: new ObjectId(id) });

  // FIXED: Wrapped return statement in parenthesis to prevent structural compiler crashes
  if (!oil) {
    return (
      <div className="p-20 text-center bg-stone-50 min-h-screen">
        Product not found
      </div>
    );
  }

  // Converts the MongoDB object to a plain JavaScript object
  const serializedOil = {
    ...oil,
    _id: oil._id.toString(),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50 py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Back to Shop Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-stone-400 hover:text-emerald-800 transition-colors mb-8 group"
          >
            <span className="mr-2 transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              Back to Shop
            </span>
          </Link>

          {/* TOP SECTION: Image & Main Buy Logic */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex flex-col md:flex-row mb-8">
            
            {/* Image Side */}
            {/* FIXED: Changed from md:w-1/2 to md:w-[40%] to free up space */}
            <div className="md:w-[40%] bg-stone-100 p-8 flex items-center justify-center">
              <img 
                src={`/${serializedOil.image}`} 
                alt={serializedOil.name} 
                className="w-full h-auto object-contain max-h-[350px]" 
              />
            </div>

            {/* Price & Buy Side */}
            {/* FIXED: Changed from md:w-1/2 to md:w-[60%] so your title doesn't wrap awkwardly */}
            <div className="md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
              
              {/* 1. THE THREE-LINE TITLE BLOCK (Completely replaces the raw name header) */}
              {serializedOil.title && Array.isArray(serializedOil.title) && serializedOil.title.length >= 3 ? (
                <div className="space-y-1 mb-4">
                  {/* Line 1: Main Product Identification */}
                  <h1 className="t"text-2xl md:text-3xl text-stone-900 font-serif font-bold tracking-wide leading-tight md:whitespace-nowrap>
                    {serializedOil.title[0]}
                  </h1>
                  {/* Line 2: Purity & Sourcing Subtitle */}
                  <p className="text-xs uppercase font-bold text-emerald-800 tracking-widest pt-0.5">
                    {serializedOil.title[1]}
                  </p>
                  {/* Line 3: Multi-purpose Utility Statement */}
                  <p className="text-sm text-stone-500 font-serif italic pt-1 leading-relaxed">
                    {serializedOil.title[2]}
                  </p>
                </div>
              ) : (
                // Fallback layout if a database document doesn't have the title array yet
                <h1 className="text-3xl font-serif text-stone-900 font-bold mb-4">
                  {serializedOil.name}
                </h1>
              )}

              {/* 2. THE VOLUME BLOCK (Directly below the title) */}
              {serializedOil.volume && (
                <div className="text-xs uppercase font-bold text-stone-400 tracking-widest mb-2 mt-1">
                  Volume: {serializedOil.volume}
                </div>
              )}

              {/* 3. THE AMOUNT/PRICE BLOCK (Directly below the volume) */}
              <div className="text-2xl font-serif text-stone-900 font-medium mb-6 border-b border-stone-100 pb-6">
                ${serializedOil.price} <span className="text-xs text-stone-400 font-sans uppercase font-normal ml-1">CAD</span>
              </div>
              
              {/* Purchase button and availability tracker */}
              <div className="space-y-4 mb-2">
                {serializedOil.stock > 0 ? (
                  <a 
                    href={serializedOil.etsyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full py-4 bg-[#f1641e] text-white rounded-full font-bold text-center shadow-md hover:bg-[#d85215] transition-colors"
                  >
                    Purchase on Etsy
                  </a>
                ) : (
                  <button disabled className="w-full py-4 bg-stone-200 text-stone-400 rounded-full font-bold text-center cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
                <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                  {serializedOil.stock} units currently available
                </p>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: The Scientific Tabs */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100">
            <ProductTabs oil={serializedOil} />
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}