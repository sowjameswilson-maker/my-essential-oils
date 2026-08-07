'use client';

import React, { useState } from 'react';

export default function JournalClient({ initialRituals }: { initialRituals: any }) {
  // 1. Core State Tracking Variables
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Safeguard variables to clear out any old reference checks
  const filteredRituals = undefined;
  const filteredRecipes = undefined;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {/* HEADER ROW */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-stone-900 font-bold mb-2">Botanical Journal & Formulations</h1>
        <p className="text-sm text-stone-500 italic">Tested, compliant recipes for soap, candle, and cosmetic crafters.</p>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="space-y-4 mb-8">
        {/* Search Bar Input */}
        <input 
          type="text"
          placeholder="Search by ingredient (e.g. Mint, Clay, Wax)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-xl border border-stone-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
        />

        {/* Quick-Filter Category Pills Menu */}
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider pt-1">
          {['All', 'Soap', 'Candles', 'Cosmetics'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`py-2 px-4 rounded-full border transition-all duration-200 cursor-pointer ${
                categoryFilter === cat 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm' 
                  : 'bg-white text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC RECIPE MATRIX GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(() => {
          // Computes search terms and category buttons together
          const finalItems = (initialRituals || []).filter((recipe: any) => {
            const titleMatch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = recipe.category?.toLowerCase().includes(searchTerm.toLowerCase());
            const ingredientMatch = Array.isArray(recipe.ingredients) 
              ? recipe.ingredients.some((i: string) => i.toLowerCase().includes(searchTerm.toLowerCase()))
              : recipe.ingredients?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const passesTextSearch = !searchTerm || titleMatch || categoryMatch || ingredientMatch;
            
            const dbCategory = recipe.category?.trim().toLowerCase() || "";
            const filterTarget = categoryFilter.toLowerCase();
            
            let passesCategoryFilter = false;
            if (filterTarget === 'all') {
              passesCategoryFilter = true;
            } else if (filterTarget === 'candles' && (dbCategory.includes('candle') || dbCategory === 'candles')) {
              passesCategoryFilter = true;
            } else if (filterTarget === 'soap' && (dbCategory.includes('soap') || dbCategory === 'soaps')) {
              passesCategoryFilter = true;
            } else if (filterTarget === 'cosmetics' && (dbCategory.includes('cosmetic') || dbCategory.includes('skin') || dbCategory === 'cosmetics')) {
              passesCategoryFilter = true;
            } else {
              passesCategoryFilter = dbCategory === filterTarget;
            }

            return passesTextSearch && passesCategoryFilter;
          });

          if (finalItems.length === 0) {
            return (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
                <p className="text-sm text-stone-400 font-medium">No botanical formulations match your active filter selections.</p>
              </div>
            );
          }

          return finalItems.map((recipe: any) => (
            <div key={recipe._id || recipe.id} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm border-t-4 border-t-emerald-800 flex flex-col justify-between min-h-[450px]">
              <div>
                {/* Meta Headings */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-stone-100 px-2.5 py-1 rounded text-stone-600">
                    {recipe.category || "Uncategorized"}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    recipe.difficulty === 'Advanced' ? 'text-rose-700' : recipe.difficulty === 'Moderate' ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    • {recipe.difficulty || "Easy"}
                  </span>
                </div>
                
                {/* Recipe Title */}
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">{recipe.title}</h3>
                
                {/* Custom Highlight Note */}
                {recipe.benefit && (
                  <p className="text-xs text-stone-500 italic mb-4 leading-relaxed">
                    "{recipe.benefit}"
                  </p>
                )}
                
                {/* Ingredients Display */}
                {recipe.ingredients && (
                  <div className="mb-4">
                    <h4 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-2">Formulation Components:</h4>
                    <ul className="text-xs text-stone-600 space-y-1.5 pl-0.5">
                      {Array.isArray(recipe.ingredients) ? (
                        recipe.ingredients.map((ing: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-emerald-700 mr-2 shrink-0">✔</span> 
                            <span>{ing}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start">
                          <span className="text-emerald-700 mr-2 shrink-0">✔</span> 
                          <span>{String(recipe.ingredients)}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Instructions and Etsy Dynamic Checkout Button */}
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
                {recipe.instructions && (
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1.5">Batch Instructions:</h4>
                    <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/40">
                      {recipe.instructions}
                    </p>
                  </div>
                )}

                {/* Shopping Destination Outbound Link Button */}
                <a 
                  href={recipe.productUrl || "https://etsy.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full py-2.5 bg-emerald-800 text-white rounded-xl text-center text-xs font-bold shadow-sm hover:bg-emerald-900 transition-colors uppercase tracking-wider"
                >
                  {recipe.productUrl ? "Source This Raw Ingredient" : "Browse Raw Botanicals"}
                </a>
              </div>

            </div>
          ));
        })()}
      </div>

    </div>
  );
}