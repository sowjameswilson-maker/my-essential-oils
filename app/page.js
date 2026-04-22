import clientPromise from '@/lib/mongodb';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductSection from './components/ProductSection';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("shop");
  const oils = await db.collection("products").find({}).toArray();

  // Explicitly map every field to ensure Next.js "sees" the new stock data
  const serializedOils = oils.map(oil => ({
    _id: oil._id.toString(),
    name: oil.name || "",
    price: oil.price || 0,
    description: oil.description || "",
    etsyUrl: oil.etsyUrl || "#",
    image: oil.image || "placeholder.jpg",
    type: oil.type || "essential-oil",
    stock: Number(oil.stock) || 0, // Force it to be a number
  }));


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50 py-12 px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4">Aura Apothecary</h1>
        </header>
        
        {/* Our new interactive section */}
        <ProductSection initialOils={serializedOils} />
      </main>
      <Footer />
    </>
  );
}