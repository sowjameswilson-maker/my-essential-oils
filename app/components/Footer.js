export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-12 pb-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-emerald-900 font-serif font-bold text-lg mb-4">AURA OILS</h3>
          <p className="text-stone-500 text-sm leading-relaxed">
            Hand-poured essential oils, sourced sustainably and sold exclusively through our Etsy boutique.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-4">Shop Policies</h4>
          <ul className="text-stone-500 text-sm space-y-2">
            <li><a href="#" className="hover:text-emerald-700">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-emerald-700">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-700">Etsy Shop Reviews</a></li>
          </ul>
        </div>

        {/* Newsletter/Contact */}
        <div>
          <h4 className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
          <p className="text-stone-500 text-sm mb-4">Questions about a scent? Message us on Etsy.</p>
          <div className="flex space-x-4">
            <span className="text-stone-400 text-xs text-uppercase italic">Follow @AuraOils</span>
          </div>
        </div>

      </div>
      
      <div className="max-w-5xl mx-auto border-t border-stone-200 mt-12 pt-8 text-center text-stone-400 text-xs">
        &copy; {new Date().getFullYear()} Aura Oils. All transactions processed via Etsy.
      </div>
    </footer>
  );
}