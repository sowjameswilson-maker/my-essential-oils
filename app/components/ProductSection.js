'use client'; // This allows the "Filter" buttons to work
import { useState } from 'react';

export default function ProductSection({ initialOils }) {
  const [filter, setFilter] = useState('all');

  // Filter the list based on the button clicked
  const filteredOils = filter === 'all' 
    ? initialOils 
    : initialOils.filter(oil => oil.type === filter);

  const categories = ['all', 'essential-oil', 'hydrosol'];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition ${
              filter === cat 
                ? 'bg-emerald-900 text-white' 
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredOils.map((oil) => (
          <div key={oil._id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
            <img src={`/${oil.image}`} className="w-40 h-40 object-contain mb-4" alt={oil.name} />
            <h2 className="text-xl font-semibold text-stone-800">{oil.name}</h2>
            {/* ADD THIS LINE BACK IN */}
            <p className="text-stone-500 text-sm text-center my-3 leading-relaxed">
                {oil.description}
            </p>
            <p className="text-emerald-700 font-medium mb-4">${oil.price}</p>
            <a href={oil.etsyUrl} target="_blank" className="w-full py-3 bg-[#f1641e] text-white rounded-full text-center font-bold text-sm">
              Buy on Etsy
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}