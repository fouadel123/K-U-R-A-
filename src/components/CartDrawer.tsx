import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => boolean;
  discountRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
  onApplyPromoCode,
  discountRate,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotalMAD = items.reduce(
    (acc, it) => acc + it.product.priceMAD * it.quantity,
    0
  );
  const discountAmountMAD = Math.round(rawSubtotalMAD * discountRate);
  const subtotalAfterDiscountMAD = rawSubtotalMAD - discountAmountMAD;

  // Free shipping threshold at 500 DH
  const freeShippingThresholdMAD = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdMAD - subtotalAfterDiscountMAD);
  const shippingMAD = items.length === 0 ? 0 : remainingForFreeShipping === 0 ? 0 : 35;
  const totalMAD = subtotalAfterDiscountMAD + shippingMAD;

  const formatPrice = (mad: number) => `${mad} DH`;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyPromoCode(couponInput.trim());
    if (ok) {
      setCouponSuccess('Code OTAKU10 appliqué (-10%)');
      setCouponError('');
    } else {
      setCouponError('Code promo non valide. Essayez "OTAKU10"');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-bold text-neutral-950 font-display">
                Votre Panier KURA
              </h2>
              <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                {items.reduce((s, it) => s + it.quantity, 0)} pièces
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs">
              {remainingForFreeShipping > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-neutral-700 mb-1.5">
                    <span>
                      Plus que <strong className="text-neutral-950">{formatPrice(remainingForFreeShipping)}</strong> pour la livraison offerte
                    </span>
                    <span className="font-mono text-neutral-500">500 DH</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-600 h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotalAfterDiscountMAD / freeShippingThresholdMAD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-emerald-700 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Livraison Amana Express gratuite sur tout le Maroc !</span>
                </div>
              )}
            </div>
          )}

          {/* Itemized List Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-display mb-1">
                  Votre panier est actuellement vide
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Explorez nos 4 modèles exclusifs de la collection actuelle en tirage limité.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer shadow-xs"
                >
                  Découvrir la Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3 bg-neutral-50 border border-neutral-200 flex gap-3.5 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-neutral-900 font-display truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 mt-0.5 space-y-0.5">
                      <div>
                        Taille : <span className="font-mono text-neutral-950 font-bold">{item.size}</span>
                        <span className="text-neutral-400 ml-1.5">(Coupe Boxy)</span>
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {item.product.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-neutral-950 font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-bold text-neutral-950 font-mono tabular-nums">
                        {formatPrice(item.product.priceMAD * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Code promo (ex: OTAKU10)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 transition-colors cursor-pointer"
                >
                  Appliquer
                </button>
              </form>
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-mono text-neutral-900 tabular-nums">
                    {formatPrice(rawSubtotalMAD)}
                  </span>
                </div>
                {discountRate > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-medium">
                    <span>Remise Otaku Club (-{(discountRate * 100).toFixed(0)}%)</span>
                    <span className="font-mono tabular-nums">
                      -{formatPrice(discountAmountMAD)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Livraison Amana Express</span>
                  <span className="font-mono text-neutral-900 tabular-nums">
                    {shippingMAD === 0 ? 'Gratuite' : formatPrice(shippingMAD)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total à payer TTC</span>
                  <span className="font-mono font-extrabold text-base text-rose-600 tabular-nums">
                    {formatPrice(totalMAD)}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
                <span className="text-emerald-700 font-medium">Paiement Cash à la livraison (COD)</span>
                <span aria-hidden="true">·</span>
                <span>Carte CMI acceptée</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
