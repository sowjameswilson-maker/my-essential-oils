import clientPromise from '@/lib/mongodb';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
export const dynamic = 'force-dynamic';

export default async function BotanicalGuide() {
  // 1. Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("shop");
  
  // 2. Fetch from the NEW 'botanicals' collection
  const wildList = await db.collection("botanicals").find({}).toArray();

  return (
    <>
        <Navbar />
            <main className="min-h-screen bg-stone-50 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="text-4xl font-serif text-emerald-900 mb-4">
                            Wildcrafter’s Field Guide
                        </h1>
                        <p className="text-stone-600 max-w-2xl mx-auto italic">
                            Identifying the botanicals that power our apothecary.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {wildList.map((plant) => (
                            <div key={plant._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col md:flex-row">
                                <div className="md:w-1/2 h-64 md:h-auto bg-stone-200">
                                    {/* Pulls image path from MongoDB field 'image' */}
                                    <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <h2 className="text-2xl font-serif text-stone-800">
                                        {plant.name}
                                    </h2>
                                    <p className="text-xs italic text-emerald-700 mb-4">
                                        {plant.latin}
                                    </p>
                                    
                                    <div className="space-y-4 text-sm text-stone-600">
                                        <p>
                                            <strong>
                                                Habitat:
                                            </strong> 
                                            {plant.habitat}
                                        </p>
                                        <p>
                                            <strong>
                                                Harvest:
                                            </strong> 
                                            {plant.harvest}
                                        </p>
                                        <p>
                                            <strong>
                                                ID Markers:
                                            </strong> 
                                            {plant.idMarkers}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        <Footer />
    </>
  );
}