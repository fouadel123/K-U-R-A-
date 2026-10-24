import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Printer } from 'lucide-react';
import { CartItem, ConfirmedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountRate: number;
  onOrderCompleted: (order: ConfirmedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountRate,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Casablanca');

  // Card fake form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const rawSubtotalMAD = items.reduce(
    (acc, it) => acc + it.product.priceMAD * it.quantity,
    0
  );
  const discountAmountMAD = Math.round(rawSubtotalMAD * discountRate);
  const subtotalAfterDiscountMAD = rawSubtotalMAD - discountAmountMAD;
  const shippingMAD = subtotalAfterDiscountMAD >= 500 ? 0 : 35;
  const totalMAD = subtotalAfterDiscountMAD + shippingMAD;

  const formatPrice = (mad: number) => `${mad} DH`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Veuillez saisir votre nom complet';
    if (!phone.trim()) errs.phone = 'Numéro de téléphone requis pour le livreur (ex: 06 12 34 56 78)';
    if (!address.trim()) errs.address = 'Adresse ou quartier de livraison requis';
    if (!city.trim()) errs.city = 'Ville requise';

    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        errs.card = 'Numéro de carte à 16 chiffres requis';
      }
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderNumber = `KURA-MA-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const estimated = new Date(Date.now() + 36 * 3600 * 1000).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

      const newOrder: ConfirmedOrder = {
        orderId: orderNumber,
        date: orderDate,
        items: [...items],
        subtotal: rawSubtotalMAD,
        discount: discountAmountMAD,
        shipping: shippingMAD,
        total: totalMAD,
        estimatedDelivery: estimated,
        customer: {
          fullName,
          email: email || 'client@kurashop.ma',
          phone,
          address,
          postalCode: 'Maroc',
          city,
          country: 'Maroc',
          paymentMethod,
        },
      };

      setConfirmedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsSubmitting(false);
      setStep('success');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white border border-neutral-200 shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
              K
            </div>
            <h2 className="text-lg font-bold text-neutral-950 font-display">
              {step === 'form' ? 'Finalisation de votre Commande' : 'Confirmation de Commande'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-8 bg-white">
            {/* Step 1: Delivery Address */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>1. Coordonnées de Livraison au Maroc</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Yassine El Idrissi"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                  />
                  {formErrors.fullName && (
                    <span className="text-rose-600 text-[11px] mt-1 block font-medium">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Numéro de Téléphone (Pour le livreur) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78 / 07 ..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                  />
                  {formErrors.phone && (
                    <span className="text-rose-600 text-[11px] mt-1 block font-medium">
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Ville de livraison *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-rose-600 cursor-pointer font-medium"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Fès">Fès</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Kénitra">Kénitra</option>
                    <option value="Tétouan">Tétouan</option>
                    <option value="Nador">Nador</option>
                    <option value="Autre ville">Autre ville au Maroc</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Email de confirmation (Optionnel)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-medium mb-1">
                    Adresse ou Quartier détaillé *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: Quartier Maârif, Rue Abou Bakr, Imm 14, Appt 5"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                  />
                  {formErrors.address && (
                    <span className="text-rose-600 text-[11px] mt-1 block font-medium">
                      {formErrors.address}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="pt-6 border-t border-neutral-200">
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-rose-600" />
                <span>2. Mode de Règlement</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 text-left border text-xs flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-rose-600 bg-rose-50/50 text-neutral-950 font-bold shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm">Paiement à la livraison (Cash COD)</span>
                  </div>
                  <span className="text-[11px] text-neutral-600 font-normal">
                    Payez en espèces directement au livreur lors de la réception de votre colis.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 text-left border text-xs flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-rose-600 bg-rose-50/50 text-neutral-950 font-bold shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-sm">Carte Bancaire CMI</span>
                  </div>
                  <span className="text-[11px] text-neutral-600 font-normal">
                    Paiement sécurisé en ligne Visa, Mastercard ou carte bancaire marocaine CMI.
                  </span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-700 mb-1 font-medium">Numéro de Carte Bancaire</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 ···· ···· 8921"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 font-mono placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                    />
                    {formErrors.card && (
                      <span className="text-rose-600 text-[11px] mt-1 block font-medium">
                        {formErrors.card}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-700 mb-1 font-medium">Date d'expiration</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA (ex: 12/28)"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 font-mono placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-700 mb-1 font-medium">Code CVC</label>
                      <input
                        type="text"
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 font-mono placeholder-neutral-400 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs text-neutral-800">
                  <div className="font-semibold text-emerald-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Option Cash à la livraison sélectionnée</span>
                  </div>
                  <p className="text-neutral-700">
                    Vous remettrez la somme de <strong>{formatPrice(totalMAD)}</strong> en dirhams en espèces au livreur à votre porte à {city}.
                  </p>
                </div>
              )}
            </div>

            {/* Order Review Summary */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="bg-neutral-50 p-4 border border-neutral-200 space-y-2 text-xs">
                <div className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
                  Récapitulatif de la commande ({items.length} articles)
                </div>
                {items.map((it) => (
                  <div key={it.cartId} className="flex justify-between text-neutral-700">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.product.name} (Taille {it.size})
                    </span>
                    <span className="font-mono tabular-nums font-semibold shrink-0">
                      {formatPrice(it.product.priceMAD * it.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-950">
                  <span>Total à payer</span>
                  <span className="text-rose-600 font-mono text-base tabular-nums">
                    {formatPrice(totalMAD)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Validation en cours...</span>
              ) : (
                <>
                  <span>Confirmer la commande · {formatPrice(totalMAD)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-10 space-y-8 bg-white">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 font-display">
                Choukran {confirmedOrder?.customer.fullName} !
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Votre commande a bien été enregistrée. Notre équipe vous contactera par téléphone pour confirmer l'expédition.
              </p>
              <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 inline-block">
                <span className="text-xs text-neutral-600">Numéro de suivi Colis : </span>
                <span className="text-xs font-mono font-bold text-rose-600">
                  {confirmedOrder?.orderId}
                </span>
              </div>
            </div>

            {/* Receipt Card */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <div className="font-bold text-neutral-950 font-display text-sm">KURA STREETWEAR MAROC</div>
                  <div className="text-neutral-500 text-[11px]">Reçu de commande officiel Maroc</div>
                </div>
                <div className="text-right text-[11px] text-neutral-600 font-mono">
                  <div>Date : {confirmedOrder?.date}</div>
                  <div className="text-emerald-700 font-semibold">Statut : En préparation</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 text-neutral-700">
                <div>
                  <div className="font-semibold text-neutral-950 mb-1">Destinataire & Adresse :</div>
                  <div>{confirmedOrder?.customer.fullName}</div>
                  <div>{confirmedOrder?.customer.address}</div>
                  <div>{confirmedOrder?.customer.city}, Maroc</div>
                  <div className="text-neutral-900 font-mono font-bold mt-1">
                    📞 {confirmedOrder?.customer.phone}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-neutral-950 mb-1">Délai estimé :</div>
                  <div className="text-rose-600 font-medium">{confirmedOrder?.estimatedDelivery} (24h/48h)</div>
                  <div className="mt-3 font-semibold text-neutral-950 mb-1">Mode de règlement :</div>
                  <div className="text-emerald-700 font-semibold">
                    {confirmedOrder?.customer.paymentMethod === 'cod'
                      ? 'Paiement Cash à la livraison (COD)'
                      : 'Carte Bancaire CMI'}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <div className="font-semibold text-neutral-950">Articles commandés :</div>
                {confirmedOrder?.items.map((it) => (
                  <div key={it.cartId} className="flex justify-between items-center text-neutral-700">
                    <div className="flex items-center gap-2">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-10 h-10 object-cover bg-neutral-200 border border-neutral-200"
                      />
                      <div>
                        <div className="font-medium text-neutral-900">{it.product.name}</div>
                        <div className="text-[11px] text-neutral-500">
                          Taille : {it.size} · Quantité : {it.quantity}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-semibold">
                      {formatPrice(it.product.priceMAD * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-950">
                <span>Total à régler</span>
                <span className="text-rose-600 font-mono text-base tabular-nums">
                  {confirmedOrder && formatPrice(confirmedOrder.total)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 hover:bg-neutral-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer le reçu</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer shadow-xs"
              >
                Retour à la boutique
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
