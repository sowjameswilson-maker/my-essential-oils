'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductSection({ initialOils }) {
  // 1. Change default from 'all' to your first category
  const [filter, setFilter] = useState('essential-oil');

  // 2. Remove 'all' from this list
  const categories = ['essential-oil', 'hydrosol'];

  const filteredOils = initialOils.filter(oil => oil.type === filter);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Category Tabs */}
      <div className="flex justify-center space-x-6 mb-12 border-b border-stone-100 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all pb-2 ${
              filter === cat 
                ? 'text-emerald-900 border-b-2 border-emerald-900' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {cat.replace('-', ' ')}s
          </button>
        ))}
      </div>

      {/* Grid - Now only shows the selected category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredOils.map((oil) => (
          <Link href={`/product/${oil._id}`} key={oil._id} className="group">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center h-full transition hover:shadow-md">
              <img src={`/${oil.image}`} className="w-40 h-40 object-contain mb-4 group-hover:scale-105 transition" alt={oil.name} />
              <h2 className="text-xl font-serif text-stone-800">{oil.name}</h2>
              <p className="text-emerald-700 font-medium mt-auto">${oil.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}