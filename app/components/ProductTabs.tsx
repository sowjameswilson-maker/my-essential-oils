'use client';

import React, { useState } from 'react';

export interface Oil {
  _id: string;
  name: string;
  price: number;
  benefits?: any;
  uses?: any;
  warnings?: any;
  safety?: any;
  application?: any;
  directions?: any;
  howToUse?: any;
  restrictions?: any;
  shelfLife?: string;
  harvestDate?: string;
  botanicalName?: string;
  size?: string;
  volume?: string;
  partUsed?: string;
  flashpoint?: string;
  origin?: string;
  preservation?: string;
  // Scent fields
  scentProfile?: string;
  scentNotes?: string;
  scentStrength?: number | string; // Scale e.g., 1-5 or "Medium"
}

export default function ProductTabs({ oil }: { oil: Oil }) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'uses' | 'safety' | 'technical'>('benefits');

  const cleanUses = oil.uses || oil.application || oil.directions || oil.howToUse || (oil as any).Uses;
  const cleanWarnings = oil.warnings || oil.safety || oil.restrictions || (oil as any).Warnings;

  return (
    <div className="w-full">
      {/* --- TAB NAVIGATION BUTTONS --- */}
      <div className="flex space-x-6 border-b border-stone-200 mb-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('benefits')}
          className={`pb-3 uppercase tracking-wider text-xs font-bold transition-all ${
            activeTab === 'benefits' ? 'border-b-2 border-emerald-600 text-emerald-950' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Benefits
        </button>
        {cleanUses && (
          <button
            onClick={() => setActiveTab('uses')}
            className={`pb-3 uppercase tracking-wider text-xs font-bold transition-all ${
              activeTab === 'uses' ? 'border-b-2 border-emerald-600 text-emerald-950' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Application
          </button>
        )}
        {cleanWarnings && (
          <button
            onClick={() => setActiveTab('safety')}
            className={`pb-3 uppercase tracking-wider text-xs font-bold transition-all ${
              activeTab === 'safety' ? 'border-b-2 border-red-600 text-red-950' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Safety
          </button>
        )}
        <button
          onClick={() => setActiveTab('technical')}
          className={`pb-3 uppercase tracking-wider text-xs font-bold transition-all ${
            activeTab === 'technical' ? 'border-b-2 border-stone-700 text-stone-950' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Technical Info
        </button>
      </div>

      {/* --- TAB CONTENT BLOCKS START --- */}
      <div className="min-h-[150px]">
        
        {/* 1. BENEFITS CONTENT LAYER */}
        {activeTab === 'benefits' && oil.benefits && (
          <div className="animate-fadeIn">
            <ul className="grid grid-cols-1 gap-2.5">
              {Array.isArray(oil.benefits) ? (
                oil.benefits
                  .filter(b => b && String(b).trim() !== "")
                  .map((b: string, i: number) => (
                    <li key={`flat-list-item-${i}`} className="flex items-start text-stone-600 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
                      {b}
                    </li>
                  ))
              ) : typeof oil.benefits === 'object' && oil.benefits !== null ? (
                Object.entries(oil.benefits).map(([category, benefitList]) => (
                  <div key={category} className="contents">
                    {Array.isArray(benefitList) ? (
                      benefitList
                        .filter(b => b && String(b).trim() !== "")
                        .map((b: string, i: number) => (
                          <li key={`${category}-${i}`} className="flex items-start text-stone-600 text-sm leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
                            <p>
                              <strong className="text-emerald-950 font-bold block sm:inline mr-1">
                                {category
                                  .replace(/([A-Z])/g, ' $1')
                                  .replace(/^./, str => str.toUpperCase())
                                  .trim()}:
                              </strong>
                              {b}
                            </p>
                          </li>
                        ))
                    ) : (
                      benefitList && String(benefitList).trim() !== "" && (
                        <li className="flex items-start text-stone-600 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-2 shrink-0"></span>
                          <p>
                            <strong className="text-emerald-950 font-bold block sm:inline mr-1">
                              {category
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())
                                .trim()}:
                            </strong>
                            {String(benefitList)}
                          </p>
                        </li>
                      )
                    )}
                  </div>
                ))
              ) : (
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

        {/* 2. SUGGESTED APPLICATION CONTENT LAYER */}
        {activeTab === 'uses' && cleanUses && (
          <div className="animate-fadeIn">
            <ul className="grid grid-cols-1 gap-2.5">
              {Array.isArray(cleanUses) ? (
                cleanUses
                  .filter(u => u && String(u).trim() !== "")
                  .map((u: string, i: number) => (
                    <li key={`use-item-${i}`} className="text-stone-600 text-sm leading-relaxed list-none flex items-start">
                      <span className="text-emerald-600 mr-3">✦</span>
                      {u}
                    </li>
                  ))
              ) : (
                String(cleanUses).trim() !== "" && (
                  <li className="text-stone-600 text-sm leading-relaxed list-none flex items-start">
                    <span className="text-emerald-600 mr-3">✦</span>
                    {String(cleanUses)}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* 3. SAFETY WARNINGS CONTENT LAYER */}
        {activeTab === 'safety' && cleanWarnings && (
          <div className="animate-fadeIn">
            <ul className="grid grid-cols-1 gap-2.5">
              {Array.isArray(cleanWarnings) ? (
                cleanWarnings
                  .filter(w => w && String(w).trim() !== "")
                  .map((w: string, i: number) => (
                    <li key={`warning-item-${i}`} className="text-stone-600 text-sm leading-relaxed list-none flex items-start">
                      <span className="text-amber-600 mr-3">⚠️</span>
                      {w}
                    </li>
                  ))
              ) : (
                String(cleanWarnings).trim() !== "" && (
                  <li className="text-stone-600 text-sm leading-relaxed list-none flex items-start">
                    <span className="text-amber-600 mr-3">⚠️</span>
                    {String(cleanWarnings)}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        {/* 4. MAKER TECHNICAL SPECIFICATIONS TAB */}
        {activeTab === 'technical' && (
          <div className="animate-fadeIn space-y-5">
            
            {/* Scent Analytics Card (For Soap/Candle Formulation Profiles) */}
            {(oil.scentProfile || oil.scentNotes || oil.scentStrength) && (
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 shadow-sm space-y-3">
                <h4 className="text-emerald-950 font-serif font-bold text-sm">Aromatic Formulation Profile</h4>
                
                {oil.scentProfile && (
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-semibold text-emerald-900">Aroma Profile:</span> {oil.scentProfile}
                  </p>
                )}
                
                {oil.scentNotes && (
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-semibold text-emerald-900">Perfumery Classification:</span> {oil.scentNotes}
                  </p>
                )}

                {oil.scentStrength && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-emerald-900 uppercase tracking-wider">
                      <span>Scent Throw / Intensity</span>
                      <span>Level {oil.scentStrength} / 5</span>
                    </div>
                    {/* Visual Scent Strength Bar Indicator */}
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden flex">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-full flex-1 border-r border-white last:border-0 ${
                            idx < Number(oil.scentStrength || 3) ? 'bg-emerald-600' : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Shelf Life Status Module */}
            <div className="flex items-start space-x-3 text-stone-600 bg-stone-50 border border-stone-200/50 p-3 rounded-lg">
              <span className="text-stone-400 text-base">⏳</span>
              <div>
                <h4 className="text-stone-800 font-bold uppercase text-[10px] tracking-widest mb-0.5">
                  Estimated Shelf Life
                </h4>
                <p className="text-xs text-stone-600 leading-normal">
                  {oil.shelfLife || "12-24 Months (Keep cool & dark)"}
                </p>
              </div>
            </div>

            {/* Harvest Date Badge */}
            {oil.harvestDate && (
              <div className="py-2 px-4 bg-stone-100 rounded-lg border-l-4 border-stone-500 inline-block w-full">
                <p className="text-xs font-medium text-stone-800">
                  Harvested / Distilled: <span className="font-serif italic font-semibold">{oil.harvestDate}</span>
                </p>
              </div>
            )}

            {/* Core Technical Specifications Table */}
            <div className="bg-white rounded-xl p-4 border border-stone-200/60 shadow-sm">
              <table className="w-full text-left border-collapse text-xs text-stone-700">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 px-1 font-semibold text-emerald-950 w-1/3">Botanical Name</td>
                    <td className="py-2 px-1 italic">{oil.botanicalName || "Available on request"}</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 px-1 font-semibold text-emerald-950">Packaging Size</td>
                    <td className="py-2 px-1">{oil.size || oil.volume || "Standard Bottle"}</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 px-1 font-semibold text-emerald-950">Plant Part</td>
                    <td className="py-2 px-1">{oil.partUsed || "Leaves / Needles"}</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 px-1 font-semibold text-emerald-950">Flashpoint</td>
                    <td className="py-2 px-1 bg-amber-50/40 text-amber-900 font-medium rounded px-1">{oil.flashpoint || "Not determined"}</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 px-1 font-semibold text-emerald-950">Source Origin</td>
                    <td className="py-2 px-1">{oil.origin || "Wild-harvested"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-1 font-semibold text-emerald-950">Preservation</td>
                    <td className="py-2 px-1 text-stone-500 leading-relaxed">{oil.preservation || "100% Pure Botanical"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}