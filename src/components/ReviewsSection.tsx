import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FBFBFC] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
              <span>Retours de la Communauté</span>
              <span aria-hidden="true">·</span>
              <span>Avis 100% Vérifiés</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-950 font-display">
              Ce que disent les passionnés d'anime
            </h2>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-neutral-200 shadow-xs shrink-0">
            <div className="text-3xl font-extrabold text-neutral-950 font-display tabular-nums">
              4.95<span className="text-neutral-400 text-lg">/5</span>
            </div>
            <div className="text-xs text-neutral-700">
              <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-neutral-500">Basé sur 340+ commandes livrées</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="Acheteur vérifié" className="inline-flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-500 text-[11px]">{rev.location}</div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-500 justify-end">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="text-[11px] text-neutral-400">{rev.date}</div>
                  </div>
                </div>

                {/* Purchased product and fit feedback */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 pb-3 border-b border-neutral-100 mb-3">
                  <span className="text-rose-600 font-semibold">{rev.productName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.sizeBought}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-700">{rev.fitFeedback}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-2">
                <MessageSquare className="w-3 h-3 text-neutral-400" />
                <span>Expérience d'achat validée via Colissimo Suivi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
