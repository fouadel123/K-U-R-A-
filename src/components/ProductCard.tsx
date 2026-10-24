import React, { useState } from 'react';
import { Eye, Plus, Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
}) => {
  const [selectedQuickSize, setSelectedQuickSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  const priceFormatted = `${product.priceMAD} DH`;

  return (
    <article className="group bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 p-6 text-center">
            <span className="text-sm font-semibold text-neutral-700 font-display">{product.name}</span>
            <span className="text-xs text-neutral-500 mt-1">{product.subtitle}</span>
          </div>
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4 pointer-events-none">
          <button
            onClick={() => onQuickView(product)}
            className="pointer-events-auto px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-white/95 hover:bg-white border border-neutral-200 transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-700" />
            <span>Détails & Zoom</span>
          </button>
        </div>

        {/* Stock tag */}
        {product.stockLeft < 25 && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono font-medium text-rose-600 border border-neutral-200 shadow-xs">
            Dernières pièces : {product.stockLeft}/{product.totalRun}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata Header */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <span className="text-rose-600 font-semibold">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-neutral-600">{product.weightGsm} GSM</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs tabular-nums font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-neutral-900 font-display hover:text-rose-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle in French */}
          <p className="text-xs text-neutral-500 font-medium mt-0.5 mb-2 line-clamp-1">
            {product.subtitle}
          </p>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>
        </div>

        {/* Footer: Price & Add Actions */}
        <div className="pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[11px] text-neutral-500">Prix unitaire</div>
              <div className="text-lg font-bold text-neutral-950 font-display tabular-nums">
                {priceFormatted}
              </div>
            </div>

            {showSizePicker ? (
              <div className="flex items-center gap-1 bg-neutral-100 p-1 border border-neutral-300">
                {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedQuickSize(sz);
                      onQuickAdd(product, sz);
                      setShowSizePicker(false);
                    }}
                    className={`px-2 py-1 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      selectedQuickSize === sz
                        ? 'bg-rose-600 text-white'
                        : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSizePicker(true)}
                  className="px-3 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter ({selectedQuickSize})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
