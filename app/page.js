import clientPromise from '@/lib/mongodb';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductSection from './components/ProductSection';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("shop");
  const oils = await db.collection("products").find({}).toArray();

  // Convert MongoDB IDs to strings so they can be passed to the Client Component
  const serializedOils = oils.map(oil => ({
    ...oil,
    _id: oil._id.toString(),
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