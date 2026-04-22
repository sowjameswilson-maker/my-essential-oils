'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductSection({ initialOils }) 
{
  const [filter, setFilter] = useState('all');

  const filteredOils = filter === 'all' 
    ? initialOils 
    : initialOils.filter(oil => oil.type === filter);

  const categories = ['essential-oil', 'hydrosol'];

  return (
  <div className="max-w-5xl mx-auto">
    {/* Filter Buttons */}
    <div className="flex justify-center space-x-4 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition ${
            filter === cat ? 'bg-emerald-900 text-white' : 'bg-stone-200 text-stone-600'
          }`}
        >
          {cat.replace('-', ' ')}
        </button>
      ))}
    </div>

    {/* The Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filteredOils.map((oil) => (
        /* Wrap the card in a Link to make it clickable */
        <Link href={`/product/${oil._id}`} key={oil._id} className="group">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center h-full transition hover:shadow-md">
            <img src={`/${oil.image}`} className="w-40 h-40 object-contain mb-4 transition-transform group-hover:scale-105" alt={oil.name} />
            <h2 className="text-xl font-semibold text-stone-800">{oil.name}</h2>
            <p className="text-stone-500 text-sm my-3 leading-relaxed line-clamp-2">{oil.description}</p>
            <p className="text-emerald-700 font-medium mt-auto">${oil.price}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}