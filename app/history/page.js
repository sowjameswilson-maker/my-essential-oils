import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function HistoryPage() {
  return (
    <>
      <Navbar />
        <main className="min-h-screen bg-[#fdfcfb] py-20 px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <header className="text-center mb-24">
              <span className="text-emerald-800 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                The Art of the Wild
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-emerald-950 mb-8">
                Rooted in Tradition
              </h1>
              <div className="w-24 h-px bg-stone-300 mx-auto">
              </div>
            </header>

            {/* The Life of Wildcrafting */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
              <div>
                <h2 className="text-2xl font-serif text-emerald-900 mb-6">
                  What is Wildcrafting?
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Unlike organic farming, which relies on intentional cultivation, 
                    <strong>
                        wildcrafting
                    </strong> 
                  is the ancient practice of harvesting plants directly from their natural, pristine habitats.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  We don't use tractors or rows. We move with the seasons, gathering botanicals that have never seen chemical intervention or synthetic pesticides.
                </p>
              </div>
              <div className="bg-stone-200 aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <img src="/wildcrafting-1.jpg" alt="Gathering in the wild" className="w-full h-full object-cover" />
              </div>
            </section>

            {/* The Ethical Code */}
            <section className="bg-emerald-950 text-stone-100 p-12 md:p-20 rounded-[3rem] mb-32">
              <h2 className="text-3xl font-serif mb-12 text-center">
                Our Ethical Harvest
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                  <span className="text-3xl mb-4 block">
                    15%
                  </span>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 mb-2">
                    The Limit
                  </p>
                  <p className="text-sm text-stone-300">
                    We never harvest more than 15% of a species in a single area to ensure natural proliferation.
                  </p>
                </div>
                <div>
                  <span className="text-3xl mb-4 block">
                    Purity
                  </span>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 mb-2">
                    Chemical-Free
                  </p>
                  <p className="text-sm text-stone-300">
                    We only collect from "pristine" environments far from human contamination.
                  </p>
                </div>
                <div>
                  <span className="text-3xl mb-4 block">
                    Balance
                  </span>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 mb-2">
                    Sustainability
                  </p>
                  <p className="text-sm text-stone-300">
                    We harvest selectively during the proper growing phase to protect forest health.
                  </p>
                </div>
              </div>
            </section>

            {/* The Alchemy of Distillation */}
            <section className="text-center mb-24">
              <h2 className="text-3xl font-serif text-emerald-900 mb-8">
                From Forest to Flask
              </h2>
              <p className="max-w-2xl mx-auto text-stone-600 leading-relaxed italic mb-12">
                "60 roses for a single drop." The process is slow, physical, and sacred. Using an ancient art refined over centuries, we use steam to gently coax the volatile essences from the plant.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-48 bg-stone-200 rounded-2xl overflow-hidden">
                  <img src="/distill-1.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="h-48 bg-stone-200 rounded-2xl overflow-hidden">
                  <img src="/distill-2.jpg" className="w-full h-full object-cover" />
                </div>
                {/* Add more process images here */}
              </div>
            </section>
          </div>
        </main>
      <Footer />
    </>
  );
}