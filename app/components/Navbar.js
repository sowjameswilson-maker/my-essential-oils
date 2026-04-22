import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-stone-100 py-4 md:py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">      
        <div className="text-xl md:text-2xl font-serif font-bold text-emerald-900 tracking-tight mb-2 md:mb-0">
            AURA OILS
        </div>
        <div className="space-x-4 md:space-x-8 text-[10px] md:text-sm font-medium text-stone-600 uppercase tracking-widest">
          <Link href="/" className="hover:text-emerald-700 transition">Shop</Link>
          <Link href="/journal" className="hover:text-emerald-700 transition">Journal</Link>
          <Link href="/history" className="hover:text-emerald-700 transition">History</Link>
          <Link href="/faq" className="hover:text-emerald-700 transition">FAQ</Link>
          <Link href="/contact" className="hover:text-emerald-700 transition">Contact</Link>
          <Link href="/botanicals" className="hover:text-emerald-700 transition">Botanicals</Link>
        </div>
    </nav>
  );
}