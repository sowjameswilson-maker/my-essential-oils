
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

  if (!oil) return 
    <div className="p-20 text-center">
      Product not found
    </div>;

  // FIX: Convert the MongoDB object to a plain JavaScript object
    const serializedOil = {
    ...oil,
    _id: oil._id.toString(),
    };

  return (
    <>
      <Navbar />
        <main className="min-h-screen bg-stone-50 py-12 md:py-20 px-6">
          <div className="max-w-4xl mx-auto">
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
              <div className="md:w-1/2 bg-stone-100 p-8 flex items-center justify-center">
                <img 
                  src={`/${oil.image}`} 
                  alt={oil.name} 
                  className="w-full h-auto object-contain max-h-[350px]" 
                />
              </div>

              {/* Price & Buy Side */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
               {/* 1. THE THREE-LINE TITLE BLOCK (Replaces the raw name header) */}
                {oil.title && Array.isArray(oil.title) ? (
                  <div className="space-y-1.5 mb-4">
                    {/* Line 1: Main Identification */}
                    <h1 className="text-3xl text-stone-900 font-serif font-bold tracking-wide">
                      {oil.title[0]}
                    </h1>
                    {/* Line 2: Purity & Sourcing Subtitle */}
                    <p className="text-xs uppercase font-bold text-emerald-800 tracking-widest pt-0.5">
                      {oil.title[1]}
                    </p>
                    {/* Line 3: Multi-purpose Utility Statement */}
                    <p className="text-sm text-stone-500 font-serif italic pt-1 leading-relaxed">
                      {oil.title[2]}
                    </p>
                  </div>
                ) : (
                  // Fallback layout if a database document doesn't have the title array yet
                  <h1 className="text-3xl font-serif text-stone-900 font-bold mb-4">
                    {oil.name}
                  </h1>
                )}

                {/* 2. THE VOLUME BLOCK (Directly below the title) */}
                {oil.volume && (
                  <div className="text-xs uppercase font-bold text-stone-400 tracking-widest mb-3">
                    Volume: {oil.volume}
                  </div>
                )}

                {/* 3. THE AMOUNT/PRICE BLOCK (Directly below the volume) */}
                <div className="text-2xl font-serif text-stone-900 font-medium mb-6 border-b border-stone-100 pb-6">
                  ${oil.price} <span className="text-xs text-stone-400 font-sans uppercase font-normal">CAD</span>
                  <span className="text-stone-400 text-sm">
                    CAD
                  </span>
                </div>
                
                {/* Inside app/product/[id]/page.tsx - Just above your Purchase Button layout */}
                {oil.title && Array.isArray(oil.title) && (
                  <div className="mb-6 space-y-1 border-b border-stone-100 pb-6">
                    {/* Line 1: Main Product Identification */}
                    <h2 className="text-xl text-stone-900 font-serif font-semibold tracking-wide">
                      {oil.title[0]}
                    </h2>
                    
                    {/* Line 2: Purity & Sourcing Subtitle */}
                    <p className="text-xs uppercase font-bold text-emerald-800 tracking-widest">
                      {oil.title[1]}
                    </p>
                    
                    {/* Line 3: Multi-purpose Utility Statement */}
                    <p className="text-sm text-stone-500 font-serif italic pt-1 leading-relaxed">
                      {oil.title[2]}
                    </p>
                  </div>
                )}
                <div className="space-y-4 mb-8">
                  {oil.stock > 0 ? (
                    <a href={oil.etsyUrl} target="_blank" className="block w-full py-4 bg-[#f1641e] text-white rounded-full font-bold text-center shadow-md">
                      Purchase on Etsy
                    </a>
                  ) : (
                    <button disabled className="w-full py-4 bg-stone-200 text-stone-400 rounded-full font-bold text-center cursor-not-allowed">
                      Out of Stock
                    </button>
                  )}
                  <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                    {oil.stock} units currently available
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