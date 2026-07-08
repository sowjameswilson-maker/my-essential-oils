
import clientPromise from '../lib/mongodb';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductSection from './components/ProductSection';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("shop");
  const oils = await db.collection("products").find({}).toArray();

  // Explicitly map every field to ensure Next.js "sees" the new stock data
  const serializedOils = oils.map(oil => ({
    _id: oil._id.toString(),
    name: oil.name || "",
    price: oil.price || 0,
    size: oil.size || "",
    description: oil.description || "",
    subtitle: oil.subtitle || "Handcrafted Batch", // ADD THIS LINE
    etsyUrl: oil.etsyUrl || "#",
    image: oil.image || "placeholder.jpg",
    type: oil.type || "essential-oil",
    stock: Number(oil.stock) || 0, // Force it to be a number
    volume: oil.volume,
    packaging: oil.packaging,
    // ADD THIS LINE - without it, the shop page sees nothing
   shelfLife: oil.shelfLife || "12-24 Months", 
  }));


  return (
    <>
      <Navbar />
      
      {/* 1. HERO SECTION: Show the Final Product */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-200 overflow-hidden">
        {/* Replace with a photo of your actual packaged bottles */}
        <img 
          src="/lifestyle/hero-packaging.jpg" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="Naturally of Course Packaging"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-emerald-900 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Wildcrafted & Hand-Poured</span>
          <h1 className="text-5xl md:text-7xl font-serif text-emerald-950 mb-8 max-w-3xl mx-auto leading-tight">
            From the Forest <br/> to Your Home
          </h1>
          <Link href="#shop" className="bg-emerald-900 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-800 transition">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* 2. THE PROCESS: Forest to Bottle */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="aspect-square bg-stone-100 rounded-full mb-6 overflow-hidden border-4 border-stone-50">
                <img src="/lifestyle/harvest.jpg" className="w-full h-full object-cover" alt="Sustainable Harvesting" />
              </div>
              <h3 className="font-serif text-xl text-emerald-900 mb-3">Sustainably Gathered</h3>
              <p className="text-sm text-stone-500 leading-relaxed">We harvest selectively in pristine environments, respecting the 15% rule.</p>
            </div>
            <div>
              <div className="aspect-square bg-stone-100 rounded-full mb-6 overflow-hidden border-4 border-stone-50">
                <img src="/lifestyle/distill.jpg" className="w-full h-full object-cover" alt="Steam Distillation" />
              </div>
              <h3 className="font-serif text-xl text-emerald-900 mb-3">Slow Distilled</h3>
              <p className="text-sm text-stone-500 leading-relaxed">Small-batch steam distillation preserves the living essence of every botanical.</p>
            </div>
            <div>
              <div className="aspect-square bg-stone-100 rounded-full mb-6 overflow-hidden border-4 border-stone-50">
                <img src="/lifestyle/packaged.jpg" className="w-full h-full object-cover" alt="Our Packaging" />
              </div>
              <h3 className="font-serif text-xl text-emerald-900 mb-3">Responsibly Packed</h3>
              <p className="text-sm text-stone-500 leading-relaxed">Arriving in eco-friendly glass and recycled paper, exactly as pictured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SHOP: Product Grid */}
      <main id="shop" className="py-24 bg-stone-50 px-6">
        <ProductSection initialOils={serializedOils} />
      </main>

      <Footer />
    </>
  );
}