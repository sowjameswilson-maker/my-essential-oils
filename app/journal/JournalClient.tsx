'use client';

import { useState } from 'react';
import { Ritual } from './page';

interface Props {
  initialRituals: Ritual[];
}

export default function JournalClient({ initialRituals }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRituals = initialRituals.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const inTitle = item.title.toLowerCase().includes(searchLower);
    const inIngredients = item.ingredients.some(ing => 
      ing.toLowerCase().includes(searchLower)
    );
    return inTitle || inIngredients;
  });

  return (
    <main className="min-h-screen bg-[#fdfcfb] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <span className="text-emerald-800 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Botanical Rituals</span>
          <h1 className="text-5xl font-serif text-emerald-950 mb-6">Recipes & Walkthroughs</h1>
          <div className="max-w-md mx-auto mt-8 relative">
            <input 
              type="text"
              placeholder="Search by ingredient..."
              className="w-full px-6 py-4 rounded-full border border-stone-200 shadow-sm focus:ring-2 focus:ring-emerald-100 bg-white outline-none italic text-sm text-stone-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredRituals.map((item) => (
            <div key={item._id} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-6 text-left">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-3 py-1 rounded-full">{item.category}</span>
                <span className="text-stone-300 text-[10px] uppercase font-bold tracking-widest">{item.difficulty}</span>
              </div>
              <h2 className="text-2xl font-serif text-stone-800 mb-4 text-left">{item.title}</h2>
              <div className="mb-6 text-left">
                <h3 className="text-stone-400 text-[10px] uppercase font-bold mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ing, i) => (
                    <li key={i} className="text-sm text-stone-600 flex items-center">
                      <span className="w-1 h-1 bg-stone-300 rounded-full mr-3"></span>{ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 p-6 rounded-2xl mb-6 text-sm text-stone-600 italic text-left">
                {item.instructions}
              </div>
              <p className="text-xs text-emerald-800 font-medium text-left">Benefit: {item.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}