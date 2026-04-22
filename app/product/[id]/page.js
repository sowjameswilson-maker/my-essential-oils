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
                <span className="text-emerald-700 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                  {oil.type}
                </span>
                <h1 className="text-3xl md:text-4xl font-serif text-emerald-900 mb-2">
                  {oil.name}
                </h1>
                
                <p className="text-xl font-medium text-stone-800 mb-6">
                  ${oil.price}
                </p>
                
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