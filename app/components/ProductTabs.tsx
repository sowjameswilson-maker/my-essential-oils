'use client';
import { useState } from 'react';

export default function ProductTabs({ oil })
{
    const [activeTab, setActiveTab] = useState('details');

    const tabs = [
        { id: 'details', label: 'Overview' },
        { id: 'botanical', label: 'Botanical Info' },
        { id: 'science', label: 'Technical' }
    ];

    return (
        <div className="mt-12 border-t border-stone-100 pt-8">
            {/* Tab Buttons */}
            <div className="flex space-x-8 border-b border-stone-100 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-xs uppercase tracking-widest font-bold transition-colors ${
                        activeTab === tab.id ? 'border-b-2 border-emerald-800 text-emerald-900' : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            

            {/* Tab Content */}
            <div className="min-h-[200px] text-sm text-stone-600 leading-relaxed">
                {activeTab === 'details' && (
                    <div className="animate-in fade-in duration-500 space-y-8">
                        {/* Scent Profile & Intensity Scale */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between bg-stone-50 p-6 rounded-2xl border border-stone-100 gap-6">
                            <div className="flex-1">
                                <h3 className="text-emerald-900 font-bold uppercase text-[10px] tracking-widest mb-2">
                                    Aroma Profile
                                </h3>
                                <p className="text-lg text-stone-800 font-serif italic">
                                    "{oil.aroma || 'Clean & Natural'}"
                                </p>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-emerald-900 font-bold uppercase text-[10px] tracking-widest">
                                        Scent Intensity
                                    </h3>
                                    <span className="text-xs font-bold text-emerald-700">
                                        {oil.intensity}/5
                                    </span>
                                </div>
                                {/* The Visual Scale */}
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((step) => (
                                        <div 
                                            key={step} 
                                            className={`h-2 flex-1 rounded-full transition-colors ${
                                                step <= oil.intensity ? 'bg-emerald-600' : 'bg-stone-200'
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[9px] text-stone-400 mt-2 uppercase tracking-tighter">
                                    <span>
                                        Subtle
                                    </span>
                                    <span>
                                        Powerful
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-emerald-900 font-bold uppercase text-[10px] tracking-widest">
                                        Notes
                                    </h3>
                                    <span className="text-xs font-bold text-emerald-700">
                                        {oil.note}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div>
                            <h3 className="text-emerald-900 font-bold uppercase text-[10px] tracking-widest mb-2">
                                Description
                            </h3>
                            <p>
                                {oil.description}
                            </p>
                        </div>
                        {/* Benefits */}
                       {/* Dynamic Benefits Section - Safely isolates empty data arrays */}
{oil.benefits && (
  <div>
    <h3 className="text-emerald-950 font-serif font-bold text-base tracking-wide mb-4">
      Benefits
    </h3>
    
    <ul className="grid grid-cols-1 gap-2.5">
      {/* 1. Standard Flat Lists */}
      {Array.isArray(oil.benefits) ? (
        oil.benefits
          .filter((b) => b && String(b).trim() !== "") // Filters out any blank or ghost entries
          .map((b: string, i: number) => (
            <li key={`flat-list-item-${i}`} className="flex items-start text-stone-600 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
              {b}
            </li>
          ))
      ) : /* 2. Categorized Objects (Goldenrod & Black Spruce) */
      typeof oil.benefits === 'object' && oil.benefits !== null ? (
        Object.entries(oil.benefits).map(([category, benefitList]) => (
          <div key={category} className="contents">
            {Array.isArray(benefitList) ? (
              benefitList
                .filter((b) => b && String(b).trim() !== "")
                .map((b: string, i: number) => (
                  <li key={`${category}-${i}`} className="flex items-start text-stone-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
                    {b}
                  </li>
                ))
            ) : (
              benefitList && String(benefitList).trim() !== "" && (
                <li className="flex items-start text-stone-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
                  {String(benefitList)}
                </li>
              )
            )}
          </div>
        ))
      ) : (
        /* 3. Fallback Plain Strings */
        String(oil.benefits).trim() !== "" && (
          <li className="flex items-start text-stone-600 text-sm leading-relaxed">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
            {String(oil.benefits)}
          </li>
        )
      )}
    </ul>
  </div>
)}

                        {/* Inside app/product/[id]/page.tsx - Near your Safety or Usage section */}
                        <div className="mt-6 flex items-start space-x-3 text-stone-600">
                            <span className="text-stone-400 text-lg">
                                ⏳
                            </span>
                            <div>
                                <h3 className="text-stone-800 font-bold uppercase text-[10px] tracking-widest mb-1">
                                    Estimated Shelf Life
                                </h3>
                                <p className="text-sm leading-relaxed">
                                    {oil.shelfLife || "12-24 Months"}
                                </p>
                            </div>
                        </div>
                        {/* Inside the details section or botanical tab in app/product/[id]/page.tsx */}
                        {oil.harvestDate && (
                        <div className="mt-4 py-2 px-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500 inline-block">
                            <p className="text-[10px] uppercase font-bold text-emerald-900 tracking-widest">
                                Distillation
                            </p>
                            <p className="text-sm text-emerald-800 font-serif italic">
                            {oil.harvestDate}
                            </p>
                        </div>
                        )}

                        {/* Usage & Safety */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {oil.usage && (
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <h4 className="text-emerald-900 font-bold uppercase text-[10px] mb-1">
                                        How to Use
                                    </h4>
                                    <p className="text-xs text-emerald-800 italic">
                                        {oil.usage}
                                    </p>
                                </div>
                            )}
                            {oil.safety && (
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <h4 className="text-amber-900 font-bold uppercase text-[10px] mb-1">
                                        Safety Note
                                    </h4>
                                    <p className="text-[11px] text-amber-800">
                                        {oil.safety}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'botanical' && (
                    <div className="grid grid-cols-2 gap-y-6 animate-in fade-in duration-500">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Latin Name
                            </p>
                            <p className="italic text-stone-800 text-base">
                                {oil.botanical?.family || 'Information coming soon'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Habit
                            </p>
                            <p className="text-stone-800 text-base">
                                {oil.botanical?.leaves || 'Global'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Leaf
                            </p>
                            <p className="text-stone-800 text-base">
                                {oil.botanical?.leaves || 'Global'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Flower
                            </p>
                            <p className="text-stone-800 text-base">
                                {oil.botanical?.flowers || 'Global'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Fruit
                            </p>
                            <p className="text-stone-800 text-base">
                                {oil.botanical?.fruit || 'Global'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                                Habitat
                            </p>
                            <p className="text-stone-800 text-base">
                                {oil.botanical?.habitat || 'Global'}
                            </p>
                        </div>
                        {/* ... keep your other botanical fields here ... */}
                    </div>
                )}

            {/* ... keep your science tab here ... */}
            </div>
            {activeTab === 'science' && (
                <div className="animate-in fade-in duration-500 bg-stone-50 p-4 rounded-lg">
                    <p className="font-mono text-xs">
                        Batch Testing: GC/MS Tested Pure<br/>
                        No synthetic additives or fillers.<br/>
                        Store in a cool, dark place to maintain chemical stability.
                    </p>
                </div>
            )}
        </div>
    );
}