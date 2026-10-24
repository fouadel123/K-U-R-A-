import React, { useState } from 'react';
import { Calendar, Bell, Shield, Sparkles, Check, ArrowRight, Lock, Flame } from 'lucide-react';

interface SeasonalDropsSectionProps {
  onScrollToCollection: () => void;
}

export const SeasonalDropsSection: React.FC<SeasonalDropsSectionProps> = ({
  onScrollToCollection,
}) => {
  const [vipPhone, setVipPhone] = useState('');
  const [vipCity, setVipCity] = useState('Casablanca');
  const [vipSubscribed, setVipSubscribed] = useState(false);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipPhone.trim()) return;
    setVipSubscribed(true);
  };

  const SEASONS = [
    {
      seasonNumber: 'Saison 01 · Actuelle',
      title: 'Drop Automne-Hiver',
      status: 'DISPONIBLE MAINTENANT',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      period: 'Trimestre en cours',
      themes: [
        'Shinigami Kage (Faucheuse Sombre)',
        'Cyber Tokyo 2099 (Mecha Futuriste)',
        'Ryū Ronin Sand (Dragon & Samouraï)',
        'Akuma Demon Eyes (Regard Rouge)'
      ],
      isCurrent: true,
      stockNote: 'Dernières pièces en cours d’épuisement',
    },
    {
      seasonNumber: 'Saison 02 · Prochain Drop',
      title: 'Drop Printemps',
      status: 'DANS 42 JOURS',
      statusColor: 'text-rose-600 bg-rose-50 border-rose-200',
      period: 'Sortie : Mars 2027',
      themes: [
        'Bio-Armor Unit 01 (Mecha Biologique)',
        'Ghost Samurai Ronin (Ombre & Lame)',
        'Titan Shifter Colossal (Dark Fantasy)',
        'Alchemist Eclipse (Symboles Mystiques)'
      ],
      isCurrent: false,
      stockNote: '180 pièces numérotées par modèle',
    },
    {
      seasonNumber: 'Saison 03 · À Venir',
      title: 'Drop Été',
      status: 'EN DÉVELOPPEMENT',
      statusColor: 'text-neutral-600 bg-neutral-100 border-neutral-200',
      period: 'Sortie : Juin 2027',
      themes: [
        'Tokyo Neon Drifter (Street Racing)',
        'Sun Samurai Flame (Guerrier Solaire)',
        'Void Sorcerer (Jujutsu Spirituel)',
        'Vintage Manga Monochrome (1998 Archive)'
      ],
      isCurrent: false,
      stockNote: 'Tirage collector exclusif',
    },
    {
      seasonNumber: 'Saison 04 · Fin d’Année',
      title: 'Drop Hiver Nocturne',
      status: 'PLANIFIÉ',
      statusColor: 'text-neutral-600 bg-neutral-100 border-neutral-200',
      period: 'Sortie : Septembre 2027',
      themes: [
        'Demon King Reborn (Gothique Brut)',
        'Cyber Hunter Android (Techno-Techwear)',
        'Ancient Dragon Lord (Lavis Doré)',
        'Phantom Brigade (Série Sombre)'
      ],
      isCurrent: false,
      stockNote: 'Édition anniversaire numérotée',
    }
  ];

  return (
    <section id="drops" className="py-20 bg-[#F4F4F6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-3">
            <span>Concept Exclusif · Drops Trimestriels</span>
            <span aria-hidden="true">·</span>
            <span>Éditions Limitées</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display [text-wrap:balance]">
            Le Rythme KURA : 4 Nouvelles Collections Tous les 3 Mois.
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed">
            Pas de production de masse ni de réassorts infinis. Tous les 3 mois (chaque trimestre), 
            notre équipe dévoile <strong>4 nouveaux designs inédits</strong> en coton 450 GSM. 
            Une fois le tirage de la saison écoulé, les modèles entrent définitivement dans les archives pour garantir la rareté de chaque pièce portée au Maroc.
          </p>
        </div>

        {/* 4 Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {SEASONS.map((s, idx) => (
            <div
              key={idx}
              className={`p-6 bg-white border transition-all duration-300 flex flex-col justify-between ${
                s.isCurrent
                  ? 'border-rose-500 shadow-md ring-1 ring-rose-500/20'
                  : 'border-neutral-200 shadow-xs'
              }`}
            >
              <div>
                {/* Top Badge & Season info */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-neutral-500 font-semibold">{s.seasonNumber}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${s.statusColor}`}
                  >
                    {s.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-950 font-display mb-1">
                  {s.title}
                </h3>
                <div className="text-xs text-neutral-500 mb-4">{s.period}</div>

                {/* 4 Collections List */}
                <div className="space-y-2 pt-3 border-t border-neutral-100">
                  <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                    Les 4 Modèles de la capsule :
                  </div>
                  {s.themes.map((th, i) => (
                    <div key={i} className="text-xs text-neutral-700 flex items-start gap-2">
                      <span className="text-rose-600 font-bold font-mono">0{i + 1}.</span>
                      <span className="truncate">{th}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="text-[11px] text-neutral-500 mb-3">{s.stockNote}</div>
                {s.isCurrent ? (
                  <button
                    onClick={onScrollToCollection}
                    className="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Acheter la Saison Actuelle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full py-2.5 text-xs font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Drop Verrouillé</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Drop Philosophy & VIP Access Box */}
        <div className="bg-white border border-neutral-200 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Rules */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Les 3 Règles des Drops KURA</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 font-display">
                Pourquoi chaque modèle est une pièce de collection
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="font-bold text-neutral-950 mb-1">1. Aucun Réassort</div>
                  <div className="text-neutral-600">
                    Quand un modèle est épuisé, il n'est plus jamais réimprimé.
                  </div>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="font-bold text-neutral-950 mb-1">2. Tous les 3 Mois</div>
                  <div className="text-neutral-600">
                    4 nouveaux designs originaux à chaque changement de saison.
                  </div>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="font-bold text-neutral-950 mb-1">3. Pièces Numérotées</div>
                  <div className="text-neutral-600">
                    Chaque hoodie possède son certificat d'authenticité cousu.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp / SMS VIP Early Access */}
            <div className="lg:col-span-5 bg-[#F9F9FA] p-6 border border-neutral-200">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-rose-600" />
                <h4 className="text-sm font-bold text-neutral-950 font-display">
                  Alerte VIP Drop Printemps
                </h4>
              </div>
              <p className="text-xs text-neutral-600 mb-4">
                Recevez le lien d'accès secret sur WhatsApp ou SMS <strong>24h avant l'ouverture officielle</strong> pour sécuriser votre taille.
              </p>

              {vipSubscribed ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Votre numéro a été ajouté à la liste VIP pour le prochain drop !</span>
                </div>
              ) : (
                <form onSubmit={handleVipSubmit} className="space-y-3">
                  <div>
                    <input
                      type="tel"
                      required
                      value={vipPhone}
                      onChange={(e) => setVipPhone(e.target.value)}
                      placeholder="Numéro WhatsApp (ex: 06 12 34 56 78)"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={vipCity}
                      onChange={(e) => setVipCity(e.target.value)}
                      className="w-1/2 px-2.5 py-2 text-xs bg-white border border-neutral-300 text-neutral-900 focus:outline-none cursor-pointer"
                    >
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                    <button
                      type="submit"
                      className="w-1/2 py-2 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      M'inscrire au Drop
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
