import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-white text-neutral-600 text-xs border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Ethos */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#"
              className="text-lg font-bold tracking-wider text-neutral-950 uppercase font-display flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-rose-600 text-white font-black flex items-center justify-center text-xs">
                K
              </div>
              <span className="tracking-wider">KURA STREETWEAR</span>
            </a>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              Maison de streetwear spécialisée dans les hoodies lourds 450 GSM inspirés des univers manga et anime. Conçus pour la communauté streetwear au Maroc, avec livraison express et paiement à la livraison.
            </p>
            <div className="text-[11px] text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Coton 100% peigné brossé certifié Oeko-Tex</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-bold text-neutral-950 uppercase tracking-wider text-[11px]">
              Collection
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#collection" className="hover:text-neutral-950 transition-colors">
                  Tous les Hoodies
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-950 transition-colors">
                  Dark Fantasy & Shinigami
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-950 transition-colors">
                  Mecha & Cyberpunk 2099
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-950 transition-colors">
                  Samouraï Dragon
                </a>
              </li>
              <li>
                <a href="#drops" className="hover:text-rose-600 transition-colors text-rose-600 font-medium">
                  Calendrier des Drops (Tous les 3 Mois)
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & Guides */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-bold text-neutral-950 uppercase tracking-wider text-[11px]">
              Service Client Maroc
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left"
                >
                  Guide des Tailles
                </button>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-neutral-950 transition-colors">
                  Guide d'Entretien 450 GSM
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-neutral-950 transition-colors">
                  Avis Clients Vérifiés
                </a>
              </li>
              <li>
                <span className="text-neutral-500">Livraison 24h/48h Maroc</span>
              </li>
              <li>
                <span className="text-neutral-500">Paiement Cash à la livraison</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-bold text-neutral-950 uppercase tracking-wider text-[11px]">
              Rejoindre le Club Otaku Maroc
            </div>
            <p className="text-xs text-neutral-600">
              Recevez les annonces des futurs tirages limités (drops) 24h avant l'ouverture publique et profitez de -10% avec le code <strong>OTAKU10</strong>.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Merci ! Vous êtes inscrit aux prochains drops au Maroc.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <span>Rejoindre</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © 2026 KURA STREETWEAR MAROC (Casablanca · Rabat · Marrakech · Tanger · Fès · Agadir). Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span>Paiement Cash à la livraison</span>
            <span aria-hidden="true">·</span>
            <span>Carte Bancaire CMI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
