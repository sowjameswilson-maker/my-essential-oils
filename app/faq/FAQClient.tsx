'use client';

import { useState } from 'react';
import { FAQItem } from './page'; // Import the interface we made above

interface Props {
  initialFaqs: FAQItem[];
}

export default function FAQClient({ initialFaqs }: Props) {
  const [query, setQuery] = useState('');

  const filteredFaqs = initialFaqs.filter((item) => {
    const searchLower = query.toLowerCase();
    const inQuestion = item.question.toLowerCase().includes(searchLower);
    
    const inAnswer = item.answerContent.some(block => {
      if (Array.isArray(block.value)) {
        return block.value.some(b => b.toLowerCase().includes(searchLower));
      }
      return block.value.toLowerCase().includes(searchLower);
    });
    
    return inQuestion || inAnswer;
  });

  return (
    <main className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif text-emerald-900 mb-6">FAQ Search</h1>
          <div className="relative max-w-md mx-auto">
            <input 
              type="text"
              placeholder="Search topics..."
              className="w-full px-6 py-4 rounded-full border border-stone-200 shadow-sm focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm text-stone-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="space-y-8">
          {filteredFaqs.map((item) => (
            <div key={item._id} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="font-bold text-stone-800 mb-4 font-serif text-xl">Q: {item.question}</h3>
              <div className="text-stone-600 text-sm leading-relaxed space-y-4">
                {item.answerContent.map((block, i) => (
                  <div key={i}>
                    {block.type === 'text' && <p>{block.value as string}</p>}
                    {block.type === 'headline' && <h4 className="font-bold text-stone-800 mt-4">{block.value as string}</h4>}
                    {block.type === 'bullets' && (
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        {(block.value as string[]).map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}