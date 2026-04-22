import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const faqs = [
  {
    category: "Process & History",
    questions: [
      {
        q: "What is the difference between an essential oil and a hydrosol?",
        a: "During steam distillation, two products are created: the essential oil (the oil-soluble parts of the plant) and the hydrosol (the water-soluble parts). Hydrosols are much gentler and can be applied directly to the skin."
      },
      {
        q: "How long has steam distillation been used?",
        a: "While rudimentary forms of extraction date back thousands of years to ancient Egypt, the modern steam distillation process was perfected by Persian chemist Avicenna in the 11th century."
      }
    ]
  },
  {
    category: "Safety & Benefits",
    questions: [
      {
        q: "Are your oils therapeutic grade?",
        a: "We focus on 100% purity. Every batch is GC/MS tested to ensure there are zero synthetics, fillers, or contaminants, preserving the plant's natural therapeutic benefits."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
        <Navbar />
        <main className="min-h-screen bg-stone-50 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-serif text-emerald-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-stone-600">
                        Everything you need to know about our botanical process.
                    </p>
                </header>

                <div className="space-y-12">
                    {faqs.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-800 mb-6 border-b border-emerald-100 pb-2">
                                {section.category}
                            </h2>
                            <div className="space-y-6">
                                {section.questions.map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                        <h3 className="font-bold text-stone-800 mb-2 font-serif text-lg">
                                            Q: {item.q}
                                        </h3>
                                        <p className="text-stone-600 text-sm leading-relaxed">
                                            A: {item.a}
                                        </p>
                                    </div>
                                ))}
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