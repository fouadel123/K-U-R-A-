import React from 'react';
import { Layers, Feather, Sparkles, Compass } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 bg-[#F8F9FA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-3">
            <span>Savoir-Faire & Matières Nobles</span>
            <span aria-hidden="true">·</span>
            <span>Normes Tokyo Heavyweight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 font-display [text-wrap:balance]">
            Pourquoi nos hoodies anime sont bâtis pour traverser les décennies.
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed">
            Nous refusons les textiles fins et les impressions plastifiées bon marché qui s'effritent après deux lavages. 
            Chaque pièce KURA est pensée comme une armure urbaine, combinant la robustesse du workwear japonais et la précision graphique du manga d'auteur.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <div className="p-6 bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-rose-600">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-neutral-500 font-medium">01. Matière Première</div>
            <h3 className="text-lg font-bold text-neutral-950 font-display">
              Coton Peigné 450 g/m²
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Une toile tricotée en bouclette dense sur l'envers, apportant un poids substantiel rassurant sur les épaules et une isolation thermique naturelle sans transpirer.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-neutral-500 font-medium">02. Impression Textile</div>
            <h3 className="text-lg font-bold text-neutral-950 font-display">
              Sérigraphie 6 Passes
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Nos encres pigmentaires à l'eau pénètrent au cœur des fibres de coton au lieu de simplement reposer en surface. Résultat : zéro craquelure, même après 100 cycles machine.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-rose-600">
              <Feather className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-neutral-500 font-medium">03. Architecture Coupe</div>
            <h3 className="text-lg font-bold text-neutral-950 font-display">
              Capuche Structurée 2 Panneaux
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Une capuche doublée du même grammage 450 g/m², conçue sans cordon disgracieux pour tenir droite et galbée de manière naturelle autour de la nuque.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-white border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-rose-600">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-neutral-500 font-medium">04. Finitions Haut de Gamme</div>
            <h3 className="text-lg font-bold text-neutral-950 font-display">
              Détails & Sceau Numéroté
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Bords-côtes 2x2 aux poignets, coutures renforcées en surjet triple fil et étiquette numérotée cousue main certifiant le tirage limité de chaque pièce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
