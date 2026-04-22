import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-12 pb-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-emerald-900 font-serif font-bold text-lg mb-4">AURA OILS</h3>
          <p className="text-stone-500 text-sm leading-relaxed">
            Pure, wildcrafted extracts for your home and spirit.
          </p>
        </div>

        <div>
          <h4 className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul className="text-stone-500 text-sm space-y-2">
            <li><Link href="/" className="hover:text-emerald-700">All Products</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-700">Shipping & Returns</Link></li>
            <li><a href="https://etsy.com" target="_blank" className="hover:text-emerald-700">Etsy Shop Profile</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-4">Discover</h4>
          <ul className="text-stone-500 text-sm space-y-2">
            <li><Link href="/history" className="hover:text-emerald-700">Wildcrafting Process</Link></li>
            <li><Link href="/journal" className="hover:text-emerald-700">Recipes & Rituals</Link></li>
            <li><Link href="/faq" className="hover:text-emerald-700">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-700">Contact</Link></li>

          </ul>
        </div>

      </div>
      <div className="max-w-5xl mx-auto border-t border-stone-200 mt-12 pt-8 text-center text-stone-400 text-[10px] uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Aura Oils. Hand-poured with intention.
      </div>
    </footer>
  );
}

