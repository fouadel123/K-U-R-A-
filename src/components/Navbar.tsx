import React from 'react';
import { ShoppingBag, Ruler, Flame } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-black tracking-wider text-neutral-950 uppercase whitespace-nowrap shrink-0 font-display flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            K
          </div>
          <span className="tracking-widest">KURA STREETWEAR</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a
            href="#collection"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>
          <a
            href="#drops"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Drops Trimestriels
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Atelier 450 GSM
          </a>
          <button
            onClick={onOpenSizeGuide}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer flex items-center gap-1.5"
          >
            <Ruler className="w-3.5 h-3.5 text-neutral-500" />
            <span>Guide Tailles</span>
          </button>
          <a
            href="#reviews"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Avis Clients
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex px-2.5 py-1 text-xs font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200 font-mono">
            MAD (DH)
          </span>

          <button
            onClick={onOpenCart}
            aria-label="Voir le panier"
            className="relative px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Panier</span>
            <span className="tabular-nums font-mono text-white bg-rose-800/80 px-1.5 py-0.5 text-[11px] rounded-xs">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
