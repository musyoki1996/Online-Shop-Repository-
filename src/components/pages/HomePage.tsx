import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Truck, 
  Flame, 
  Award, 
  Store
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../common/ProductCard';

export const HomePage: React.FC = () => {
  const { navigateTo, products, formatPrice, sellers } = useApp();

  // Active Flash Deals Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter real product sections
  const featuredProducts = products.filter(p => p.isFeatured && p.status === 'approved').slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller && p.status === 'approved').slice(0, 8);
  const trendingProducts = products.filter(p => p.isTrending && p.status === 'approved').slice(0, 8);
  const flashDeals = products.filter(p => (p.discountPercentage || 0) >= 12 && p.status === 'approved').slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION (Editorial, Premium, Deep Emerald & Champagne Copper) */}
      <section className="relative bg-[#083C39] text-white overflow-hidden">
        {/* Subtle architectural background motifs */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D99A68_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#104D49] filter blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#D99A68] filter blur-3xl opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#104D49]/90 border border-[#D99A68]/30 text-xs font-semibold text-[#D99A68] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shop Beyond Ordinary</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
                Everything You Need. <br />
                <span className="text-[#D99A68]">One Destination.</span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl leading-relaxed">
                Discover exceptional products across fashion, electronics, home, beauty, lifestyle, and more. Authentic curated merchandise with direct M-Pesa checkout and doorstep delivery across Kenya.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('catalogue')}
                  className="bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('shop-categories');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#104D49] hover:bg-[#155a55] text-white border border-emerald-600/40 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition-all cursor-pointer"
                >
                  Explore Categories
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-emerald-800/60 grid grid-cols-3 gap-4 text-xs text-emerald-100/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                  <span>100% Genuine Brands</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                  <span>Safaricom M-Pesa STK</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Showcase Grid */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-gradient-to-tr from-[#104D49] to-[#0e3f3b] p-3">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
                  alt="Kavora Premium Shopping Collection"
                  className="w-full h-[400px] object-cover rounded-xl"
                />

                {/* Floating Card: Featured Deal */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/40 text-[#202725] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#104D49] block">
                      Curated Merchant Spotlight
                    </span>
                    <span className="text-sm font-bold block truncate max-w-[200px]">
                      Karen Leather Artisans
                    </span>
                    <span className="text-xs text-slate-500">Handcrafted in Nairobi</span>
                  </div>
                  <button
                    onClick={() => navigateTo('catalogue', 'Leather')}
                    className="bg-[#104D49] hover:bg-[#083C39] text-white px-3.5 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    View Range
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY SECTION */}
      <section id="shop-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A68] block">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs font-semibold text-[#104D49] hover:text-[#083C39] flex items-center gap-1 hover:underline"
          >
            <span>View All 14 Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              onClick={() => navigateTo('category', category.name)}
              className="group cursor-pointer bg-white border border-[#E7EBE8] rounded-lg p-3 text-center hover:border-[#104D49] hover:shadow-md transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-slate-100 mb-2.5 relative border border-slate-100 group-hover:scale-105 transition-transform">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 group-hover:text-[#104D49] line-clamp-2 leading-tight">
                {category.name}
              </h3>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {category.itemCount.toLocaleString()} items
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXCLUSIVE FLASH DEALS BANNER & PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#104D49] to-[#083C39] rounded-xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D99A68] text-[#083C39] flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display">Exclusive Flash Deals</h3>
                <p className="text-xs text-emerald-100/80">Limited quantities at special introductory prices</p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D99A68]" />
              <span className="text-xs font-medium text-emerald-200">Ending in:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-xs">
                <span className="bg-[#083C39] px-2 py-1 rounded border border-emerald-700/60 text-white">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-[#083C39] px-2 py-1 rounded border border-emerald-700/60 text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-[#083C39] px-2 py-1 rounded border border-emerald-700/60 text-[#D99A68]">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Flash Deals Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {flashDeals.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A68] block">
              Handpicked Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalogue')}
            className="text-xs font-semibold text-[#104D49] hover:text-[#083C39] flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL SPLIT EDITORIAL BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Kenyan Artisans & Fashion */}
          <div className="relative rounded-xl overflow-hidden bg-[#104D49] text-white p-8 flex flex-col justify-between min-h-[260px] shadow-md group">
            <img 
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" 
              alt="Handcrafted Kenyan Luxury" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D99A68]">
                Authentic Craftsmanship
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Bespoke Kenyan Leather <br />& Safari Heritage
              </h3>
              <p className="text-xs text-emerald-100/80 max-w-xs leading-relaxed">
                Generational leather masters in Karen handcrafting travel duffels, belts, and accessories.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => navigateTo('category', 'Fashion & Apparel')}
                className="bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] px-5 py-2.5 rounded text-xs font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Banner 2: High-Fidelity Electronics */}
          <div className="relative rounded-xl overflow-hidden bg-[#202725] text-white p-8 flex flex-col justify-between min-h-[260px] shadow-md group">
            <img 
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" 
              alt="Certified Tech" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D99A68]">
                Official Manufacturer Warranty
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Flagship Tech, Audio <br />& Smart 4K Displays
              </h3>
              <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                Direct distribution from Apple, Samsung, Sony, and Vitron with verified service center backing.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => navigateTo('category', 'Electronics')}
                className="bg-white hover:bg-slate-100 text-[#202725] px-5 py-2.5 rounded text-xs font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>Shop Electronics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS & TRENDING TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A68] block">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Best Sellers in Kenya
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalogue')}
            className="text-xs font-semibold text-[#104D49] hover:text-[#083C39] flex items-center gap-1 hover:underline"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. VERIFIED SELLERS & LOCAL BRANDS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F8F6] border border-[#E7EBE8] rounded-xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99A68] block">
                Multi-Vendor Marketplace
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Featured Verified Merchants
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Every merchant undergoes strict KRA PIN and business verification before publishing listings.
              </p>
            </div>
            <button
              onClick={() => navigateTo('seller-register')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#104D49] hover:underline"
            >
              <Store className="w-4 h-4 text-[#D99A68]" />
              <span>Apply to Sell on Kavora →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sellers.filter(s => s.status === 'approved').map(seller => (
              <div 
                key={seller.id}
                className="bg-white p-5 rounded-lg border border-[#E7EBE8] shadow-xs flex flex-col justify-between hover:border-[#104D49] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified Merchant
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Award className="w-3.5 h-3.5 text-[#D99A68]" />
                      <span>{seller.rating} / 5.0</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{seller.storeName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{seller.town}, {seller.county} County</p>
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {seller.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total volume: {formatPrice(seller.totalSales)}</span>
                  <button
                    onClick={() => navigateTo('catalogue')}
                    className="font-semibold text-[#104D49] hover:underline"
                  >
                    View Store Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A68] block">
              Rising Popularity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Trending Right Now
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalogue')}
            className="text-xs font-semibold text-[#104D49] hover:text-[#083C39] flex items-center gap-1 hover:underline"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
