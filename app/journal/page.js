'use client';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const rituals = [
  {
    title: "Deep Winter Chill",
    category: "Muscle Ritual",
    difficulty: "Easy",
    ingredients: ["4 drops Wintergreen", "2 drops Peppermint", "1 drop Camphor"],
    instructions: "Mix with 1oz carrier oil. Massage into sore muscles after a long day.",
    benefit: "Natural Muscle Soothing"
  },
  {
    title: "The Grounded Forest Blend",
    category: "Diffuser Ritual",
    difficulty: "Easy",
    ingredients: ["3 drops Lavender", "2 drops Cedarwood"],
    instructions: "Fill your diffuser to the line and inhale deeply for immediate grounding.",
    benefit: "Focus & Anxiety Relief"
  }
  // Add more recipes here...
];

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // The Filter Logic: Checks if the search term is in the title OR ingredients
  const filteredRituals = rituals.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const inTitle = item.title.toLowerCase().includes(searchLower);
    const inIngredients = item.ingredients.some(ing => 
      ing.toLowerCase().includes(searchLower)
    );
    return inTitle || inIngredients;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fdfcfb] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-12">
            <span className="text-emerald-800 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Botanical Rituals</span>
            <h1 className="text-5xl font-serif text-emerald-950 mb-6">
              Recipes & Walkthroughs
            </h1>
            
            {/* NEW: Search Bar */}
            <div className="max-w-md mx-auto mt-8 relative">
              <input 
                type="text"
                placeholder="Search by oil (e.g. Wintergreen)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-white shadow-sm italic text-sm"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 top-4 text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredRituals.length > 0 ? (
              filteredRituals.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm transition-all hover:shadow-md animate-in fade-in duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-3 py-1 rounded-full">{item.category}</span>
                    <span className="text-stone-300 text-[10px] uppercase font-bold tracking-widest">{item.difficulty}</span>
                  </div>
                  <h2 className="text-2xl font-serif text-stone-800 mb-4">{item.title}</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-stone-400 text-[10px] uppercase font-bold mb-3">Ingredients</h3>
                    <ul className="space-y-2">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className={`text-sm flex items-center ${ing.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '' ? 'text-emerald-700 font-bold' : 'text-stone-600'}`}>
                          <span className="w-1 h-1 bg-stone-300 rounded-full mr-3"></span>{ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-2xl mb-6 text-sm text-stone-600 leading-relaxed italic">
                    {item.instructions}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-stone-400 italic">
                No recipes found containing "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}