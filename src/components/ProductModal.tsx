import React, { useState } from 'react';
import { X, Check, Star, Shield, Truck, RefreshCw, Ruler, Layers, Sparkles } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!isOpen || !product) return null;

  const totalCalculated = `${product.priceMAD * quantity} DH`;
  const singlePrice = `${product.priceMAD} DH`;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white border border-neutral-200 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-neutral-900 bg-white/90 border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Media & Gallery */}
          <div className="md:col-span-6 bg-neutral-100 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-mono text-neutral-800 border border-neutral-200 shadow-xs">
                {product.color}
              </div>
            </div>

            {/* Quick feature callouts */}
            <div className="p-4 bg-white/80 border-t border-neutral-200 grid grid-cols-2 gap-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-600 shrink-0" />
                <span>450 GSM Coton Brossé</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Sérigraphie Inaltérable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Series */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-semibold tracking-wider uppercase text-[11px]">
                    {product.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-neutral-600">{product.weightGsm} GSM</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-mono text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-500 font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-bold text-neutral-950 font-display">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-500 font-medium mt-0.5 mb-4">
                {product.subtitle}
              </p>

              {/* Price & Stock */}
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-neutral-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-neutral-950 font-display tabular-nums">
                    {singlePrice}
                  </span>
                  <span className="text-xs text-neutral-500">TTC · Paiement à la livraison au Maroc</span>
                </div>
                <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  En stock ({product.stockLeft} ex.)
                </span>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-neutral-800">
                    Taille : <span className="font-mono text-rose-600 font-bold">{selectedSize}</span>
                    <span className="text-neutral-500 ml-1.5">(Coupe Oversize)</span>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-neutral-600 hover:text-neutral-950 text-xs flex items-center gap-1 cursor-pointer transition-colors underline underline-offset-2"
                  >
                    <Ruler className="w-3 h-3 text-neutral-500" />
                    <span>Guide des tailles</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 text-xs font-semibold transition-all cursor-pointer border ${
                        selectedSize === sz
                          ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-medium text-neutral-800">Quantité :</span>
                <div className="flex items-center border border-neutral-300 bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-neutral-950 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLeft, quantity + 1))}
                    className="px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <span>Ajouter au panier</span>
                      <span>·</span>
                      <span className="tabular-nums">{totalCalculated}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Micro Trust points */}
              <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-500 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Livraison 24/48h Maroc</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Échange taille garanti</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Paiement Cash à réception</span>
                </div>
              </div>
            </div>

            {/* Informational Tabs (Bottom) */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-4 text-xs mb-3 border-b border-neutral-200">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-neutral-950 border-b-2 border-rose-600 font-bold'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Description & Sérigraphie
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-neutral-950 border-b-2 border-rose-600 font-bold'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Spécificités 450 GSM
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'text-neutral-950 border-b-2 border-rose-600 font-bold'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Entretien
                </button>
              </div>

              <div className="text-xs text-neutral-700 leading-relaxed min-h-[70px]">
                {activeTab === 'details' && (
                  <div>
                    <p className="mb-2">{product.description}</p>
                    <p className="text-neutral-600">
                      <strong className="text-neutral-900">Technique d’impression :</strong> {product.printTechnique}
                    </p>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <ul className="space-y-1 list-disc list-inside text-neutral-700">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul className="space-y-1 list-disc list-inside text-neutral-700">
                    {product.careInstructions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
