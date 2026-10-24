import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SeasonalDropsSection } from './components/SeasonalDropsSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { CartItem, ConfirmedOrder } from './types';
import { Search, SlidersHorizontal, Check } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('kura_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity = 1) => {
    const existingIndex = cart.findIndex(
      (it) => it.product.id === product.id && it.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${product.id}-${size}-${Date.now()}`,
        product,
        size,
        quantity,
      };
      setCart([...cart, newItem]);
    }

    showToast(`✓ ${product.name} (${size}) ajouté au panier`);
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.cartId === cartId) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((it) => it.cartId !== cartId));
    showToast('Article retiré du panier');
  };

  const handleApplyPromoCode = (code: string) => {
    if (code.toUpperCase() === 'OTAKU10') {
      setPromoCode('OTAKU10');
      setDiscountRate(0.1);
      return true;
    }
    return false;
  };

  // Filter & Sort
  const categories = ['Tous', 'Dark Fantasy', 'Mecha & Cyber', 'Samurai & Edo', 'Vintage Akuma'];

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'Tous' || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceMAD - b.priceMAD;
    if (sortBy === 'price_desc') return b.priceMAD - a.priceMAD;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col font-sans">
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-neutral-300 text-neutral-900 px-4 py-3 shadow-xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Hero Campaign Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onDropsClick={() => {
          const el = document.getElementById('drops');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Featured Collection Section */}
      <section id="collection" className="py-20 border-b border-neutral-200 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
                <span>Saison 01 · Automne-Hiver</span>
                <span aria-hidden="true">·</span>
                <span>Tirages 450 GSM · En Dirhams (DH)</span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-950 font-display">
                Les 4 Hoodies de la Collection Actuelle
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (ex: Shinigami, Mecha...)"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Controls & Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 border border-neutral-300/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-white text-neutral-950 font-bold shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort and Count */}
            <div className="flex items-center gap-4 text-xs text-neutral-600">
              <span className="font-mono">
                {sortedProducts.length} modèle{sortedProducts.length > 1 ? 's' : ''} en stock
              </span>

              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-neutral-300 text-neutral-900 text-xs px-2.5 py-1.5 focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="featured">Tri : En vedette</option>
                  <option value="price_asc">Prix croissant (DH)</option>
                  <option value="price_desc">Prix décroissant (DH)</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="p-16 text-center bg-white border border-neutral-200 shadow-xs">
              <p className="text-sm text-neutral-600 mb-4">
                Aucun hoodie ne correspond à votre recherche "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tous');
                }}
                className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-colors cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {sortedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onQuickAdd={(p, size) => handleAddToCart(p, size, 1)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seasonal Drops Section (4 Collections Every 3 Months) */}
      <SeasonalDropsSection
        onScrollToCollection={() => {
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Atelier Craftsmanship & 450 GSM Specs */}
      <CraftsmanshipSection />

      {/* Reviews & Social Proof Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Modals & Slide-out Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setSelectedProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={() => {
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        promoCode={promoCode}
        onApplyPromoCode={handleApplyPromoCode}
        discountRate={discountRate}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountRate={discountRate}
        onOrderCompleted={(order) => {
          setCart([]);
          showToast(`Commande ${order.orderId} confirmée avec succès !`);
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
