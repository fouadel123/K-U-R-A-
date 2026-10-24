import React from 'react';
import { ArrowDownRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onDropsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDropsClick }) => {
  return (
    <section className="relative border-b border-neutral-200 bg-[#FBFBFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-4">
              <span>Saison 01 · Automne-Hiver</span>
              <span aria-hidden="true">·</span>
              <span>4 Collections Tous les 3 Mois</span>
              <span aria-hidden="true">·</span>
              <span>Dès 390 DH</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-tight font-display mb-6 [text-wrap:balance]">
              L’art du manga gravé dans un coton d’exception.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-8">
              Découvrez nos hoodies oversize haute confection en coton ultra-lourd 450 g/m². 
              4 collections exclusives révélées chaque trimestre en éditions limitées numérotées, avec livraison express et paiement à la livraison au Maroc.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Explorer les 4 Modèles Actuels</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDropsClick}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Calendrier des Drops (Tous les 3 Mois)</span>
              </button>
            </div>

            {/* Micro editorial trust statement */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>Coton 450 GSM certifié Oeko-Tex</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Livraison 24h/48h partout au Maroc</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-neutral-700" />
                <span>Paiement à la livraison (Cash on Delivery)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-neutral-100 border border-neutral-200 group shadow-lg">
              <img
                src="/src/assets/images/hero_anime_streetwear_1792873279297.jpg"
                alt="Mannequin portant le hoodie anime oversize KURA dans une ruelle de Tokyo illuminée aux néons"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span className="font-mono text-neutral-700">LOOKBOOK N°04</span>
                  <span className="text-rose-600 font-semibold">Tokyo Night Edition</span>
                </div>
                <div className="text-sm font-semibold text-neutral-900 font-display">
                  Série Cybernet Shinjuku — Coupe Boxy Drop-Shoulder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-950 font-display tabular-nums">450 g/m²</div>
            <div className="text-xs text-neutral-500 mt-1">Coton peigné French Terry ultra-lourd</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-950 font-display tabular-nums">Dès 390 DH</div>
            <div className="text-xs text-neutral-500 mt-1">Qualité haut de gamme au juste prix</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-950 font-display tabular-nums">150 à 250 pcs</div>
            <div className="text-xs text-neutral-500 mt-1">Tirages limités avec numéro gravé</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-950 font-display tabular-nums">Paiement Cash</div>
            <div className="text-xs text-neutral-500 mt-1">Règlement à la remise en main propre</div>
          </div>
        </div>
      </div>
    </section>
  );
};
