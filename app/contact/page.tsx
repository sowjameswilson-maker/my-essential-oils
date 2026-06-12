import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-stone-600 max-w-lg mx-auto">
              Questions about a specific harvest or need help choosing a scent? We're here to help you navigate the world of wildcrafted botanicals.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Etsy Support (Primary) */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-stone-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#f1641e] text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold">E</div>
              <h2 className="text-xl font-serif text-stone-800 mb-4">
                Message us on Etsy
              </h2>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                For the fastest response regarding orders, shipping, or returns, please use the Etsy messaging system. 
              </p>
              <a 
                href="https://etsy.com" 
                target="_blank" 
                className="w-full py-4 bg-[#f1641e] text-white rounded-full font-bold hover:bg-[#d55519] transition shadow-lg"
              >
                Send Etsy Message
              </a>
            </div>

            {/* Email Support (Secondary) */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-stone-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-6 text-2xl">✉</div>
              <h2 className="text-xl font-serif text-stone-800 mb-4">
                Direct Email
              </h2>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                For wholesale inquiries, botanical collaborations, or press, feel free to reach out via email.
              </p>
              <a 
                href="mailto:hello@yourbrand.com" 
                className="text-emerald-800 font-bold border-b-2 border-emerald-100 hover:border-emerald-600 transition pb-1"
              >
                hello@yourbrand.com
              </a>
            </div>

          </div>

          <div className="mt-20 text-center text-stone-400 text-xs uppercase tracking-[0.2em]">
            Typical response time: 24-48 hours
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}