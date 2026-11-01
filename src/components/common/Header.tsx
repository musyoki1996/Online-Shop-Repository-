import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  Store, 
  Sliders, 
  LogOut, 
  Package, 
  HelpCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES } from '../../data/categories';
import { ProductCategory } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    cartTotalCount, 
    cartSubtotal, 
    wishlist, 
    currentUser, 
    switchRole, 
    logout, 
    formatPrice,
    searchQuery,
    setSearchQuery,
    products
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState<string>('All');
  
  // Announcement messages
  const announcements = [
    'Welcome to Kavora · Shop Beyond Ordinary across Kenya & Africa',
    'Free Express Delivery in Nairobi on Orders above KES 5,000 with code FREESHIP',
    'Official Safaricom M-Pesa STK Push Instant Checkout Supported',
    '100% Certified Authentic Products & 7-Day Money-Back Guarantee'
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Click outside to close menus
  const userMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live search suggestions
  const searchResults = searchQuery.trim() === '' ? [] : products.filter(p => {
    const matchText = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedSearchCat === 'All' || p.category === selectedSearchCat;
    return matchText && matchCat;
  }).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigateTo('catalogue', searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E7EBE8] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#083C39] text-[#F7F8F6] text-xs font-normal border-b border-[#104D49]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Left: Hotline */}
          <div className="hidden lg:flex items-center gap-4 text-emerald-100/90">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-[#D99A68]" />
              Helpline: <strong className="font-medium text-white">+254 700 112 233</strong>
            </span>
            <span className="text-emerald-300/40">|</span>
            <span className="flex items-center gap-1 text-emerald-100/90">
              <Truck className="w-3.5 h-3.5 text-[#D99A68]" />
              Same-day delivery in Nairobi
            </span>
          </div>

          {/* Center: Rotating Announcement */}
          <div className="flex-1 text-center font-medium truncate px-2 sm:px-6 tracking-wide text-xs">
            <span className="text-[#D99A68] mr-2 font-semibold">KAVORA:</span>
            <span>{announcements[announcementIndex]}</span>
          </div>

          {/* Right: Currency & Role Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#D99A68] bg-[#104D49]/80 px-2 py-0.5 rounded-sm">
              KES (KSh)
            </span>

            {/* Quick Multi-Role Switcher Demo Widget */}
            <div className="relative" ref={roleMenuRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#104D49] hover:bg-[#165a55] text-white text-[11px] font-medium tracking-wide transition-colors border border-emerald-600/30"
                title="Switch test mode between Customer, Seller Portal, and Admin Control Panel"
              >
                <Sliders className="w-3 h-3 text-[#D99A68]" />
                <span className="capitalize">{currentUser?.role || 'Guest'} Mode</span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white text-[#202725] rounded-md shadow-xl border border-[#E7EBE8] py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch App Role
                  </div>
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-slate-800">Customer</div>
                      <div className="text-[10px] text-slate-500">Shop, cart, orders, reviews</div>
                    </div>
                    {currentUser?.role === 'customer' && <CheckCircle2 className="w-4 h-4 text-[#104D49]" />}
                  </button>
                  <button
                    onClick={() => { switchRole('seller'); setRoleDropdownOpen(false); navigateTo('seller-dashboard'); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-slate-800">Seller Merchant</div>
                      <div className="text-[10px] text-slate-500">Inventory, orders, payouts</div>
                    </div>
                    {currentUser?.role === 'seller' && <CheckCircle2 className="w-4 h-4 text-[#104D49]" />}
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); navigateTo('admin-dashboard'); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-slate-800">Administrator</div>
                      <div className="text-[10px] text-slate-500">Approvals, analytics, settings</div>
                    </div>
                    {currentUser?.role === 'admin' && <CheckCircle2 className="w-4 h-4 text-[#104D49]" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search, Account, Bag) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#104D49] hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Official Brand Logo */}
          <div className="flex-shrink-0">
            <BrandLogo 
              size="md" 
              onClick={() => navigateTo('home')} 
            />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <div className="flex w-full rounded-md border border-[#D1D8D4] bg-[#F7F8F6] focus-within:border-[#104D49] focus-within:ring-2 focus-within:ring-[#104D49]/10 transition-all overflow-hidden">
                {/* Category selector inside search */}
                <select
                  value={selectedSearchCat}
                  onChange={(e) => setSelectedSearchCat(e.target.value)}
                  className="bg-transparent text-xs text-slate-600 font-medium px-3 py-2.5 border-r border-[#E7EBE8] focus:outline-hidden cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search products, brands, electronics, genuine leather..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                />

                {/* Clear query */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-[#104D49] hover:bg-[#083C39] text-white px-5 py-2.5 flex items-center justify-center transition-colors"
                  aria-label="Search Kavora"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Live Autocomplete Suggestions Box */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-md shadow-2xl border border-[#E7EBE8] z-50 overflow-hidden">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Results for "{searchQuery}"</span>
                  <span className="text-[11px] text-slate-400">Press enter to view all</span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSearchFocused(false);
                          navigateTo('product-detail', prod.id);
                        }}
                        className="p-2.5 hover:bg-[#F7F8F6] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-10 h-10 object-cover rounded border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{prod.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="text-[#104D49] font-medium">{prod.brand}</span>
                            <span>·</span>
                            <span>{prod.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#104D49]">{formatPrice(prod.price)}</p>
                          {prod.originalPrice && (
                            <p className="text-[11px] text-slate-400 line-through">{formatPrice(prod.originalPrice)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={handleSearchSubmit}
                      className="p-2.5 text-center text-xs font-semibold text-[#104D49] hover:bg-slate-50 cursor-pointer"
                    >
                      View all results for "{searchQuery}" →
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products found matching "{searchQuery}". Try searching for iPhone, Sony, leather bag, or coffee.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Navigation Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Seller Hub CTA */}
            {currentUser?.role !== 'seller' && (
              <button
                onClick={() => navigateTo('seller-register')}
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#104D49] hover:text-[#083C39] px-3 py-1.5 rounded border border-[#104D49]/30 hover:border-[#104D49] transition-all bg-[#104D49]/5"
              >
                <Store className="w-3.5 h-3.5 text-[#D99A68]" />
                Sell on Kavora
              </button>
            )}

            {/* Support Link */}
            <button
              onClick={() => navigateTo('support')}
              className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#104D49] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help</span>
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-slate-700 hover:text-[#104D49] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D99A68] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Link */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-md hover:bg-[#F7F8F6] text-slate-700 hover:text-[#104D49] transition-colors"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#104D49]" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#104D49] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Bag</span>
                <span className="text-xs font-bold text-[#104D49]">{formatPrice(cartSubtotal)}</span>
              </div>
            </button>

            {/* Customer Account Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[#F7F8F6] text-slate-700 hover:text-[#104D49] transition-colors"
                aria-label="User Account"
              >
                <div className="w-8 h-8 rounded-full bg-[#104D49]/10 text-[#104D49] flex items-center justify-center font-bold text-xs">
                  {currentUser ? currentUser.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <div className="hidden lg:block text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    {currentUser ? 'Karibu' : 'Sign In'}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 truncate max-w-[90px] block">
                    {currentUser ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                </div>
                <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl border border-[#E7EBE8] py-2 z-50 text-xs">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-semibold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 uppercase tracking-wider">
                          {currentUser.role}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => { navigateTo('account'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Account & Profile
                      </button>
                      <button
                        onClick={() => { navigateTo('account'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Orders & Live Tracking
                      </button>
                      <button
                        onClick={() => { navigateTo('wishlist'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        Saved Wishlist
                      </button>

                      {currentUser.role === 'seller' && (
                        <button
                          onClick={() => { navigateTo('seller-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-[#104D49] font-medium border-t border-slate-100"
                        >
                          <Store className="w-4 h-4 text-[#D99A68]" />
                          Seller Merchant Portal
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => { navigateTo('admin-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-[#104D49] font-medium border-t border-slate-100"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#D99A68]" />
                          Administrator Control Panel
                        </button>
                      )}

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <button
                        onClick={() => { navigateTo('login'); setUserDropdownOpen(false); }}
                        className="w-full py-2 px-4 rounded bg-[#104D49] text-white text-xs font-semibold text-center hover:bg-[#083C39] transition-colors"
                      >
                        Sign In
                      </button>
                      <div className="mt-2 text-center text-[11px] text-slate-500">
                        New to Kavora?{' '}
                        <button
                          onClick={() => { navigateTo('register'); setUserDropdownOpen(false); }}
                          className="font-semibold text-[#104D49] hover:underline"
                        >
                          Register here
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products, brands, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#D1D8D4] rounded-md pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-[#104D49]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* 3. CATEGORIES NAVIGATION STRIP */}
      <nav className="bg-[#104D49] text-white border-t border-emerald-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none text-xs font-medium tracking-wide">
            {/* All Products button */}
            <button
              onClick={() => navigateTo('catalogue')}
              className={`flex-shrink-0 hover:text-[#D99A68] transition-colors ${currentView === 'catalogue' ? 'text-[#D99A68] font-semibold' : 'text-emerald-50'}`}
            >
              All Products
            </button>

            {/* 14 Categories */}
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => navigateTo('category', category.name)}
                className="flex-shrink-0 text-emerald-100/90 hover:text-white transition-colors hover:underline underline-offset-4"
              >
                {category.name}
              </button>
            ))}

            {/* Direct Link to Track Order */}
            <button
              onClick={() => navigateTo('tracking')}
              className="flex-shrink-0 ml-auto flex items-center gap-1 text-[#D99A68] hover:text-white transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-[#104D49] text-white flex items-center justify-between">
              <BrandLogo size="sm" theme="dark" onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User status */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              {currentUser ? (
                <div>
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                    className="flex-1 py-1.5 text-xs font-semibold bg-[#104D49] text-white rounded text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { navigateTo('register'); setMobileMenuOpen(false); }}
                    className="flex-1 py-1.5 text-xs font-semibold border border-[#104D49] text-[#104D49] rounded text-center"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b border-slate-100 flex flex-col gap-1 text-sm">
              <button 
                onClick={() => { navigateTo('catalogue'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 font-medium text-slate-800"
              >
                All Products
              </button>
              <button 
                onClick={() => { navigateTo('tracking'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 text-slate-700 flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#D99A68]" />
                Track Your Order
              </button>
              <button 
                onClick={() => { navigateTo('wishlist'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 text-slate-700 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-slate-400" />
                Wishlist ({wishlist.length})
              </button>
              <button 
                onClick={() => { navigateTo('seller-register'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded bg-amber-50 text-[#104D49] font-medium flex items-center gap-2"
              >
                <Store className="w-4 h-4 text-[#D99A68]" />
                Sell on Kavora
              </button>
            </div>

            {/* Categories */}
            <div className="p-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Shop by Category</p>
              <div className="space-y-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      navigateTo('category', category.name);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-2 text-sm text-slate-700 hover:text-[#104D49] hover:bg-slate-50 rounded flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-slate-400">({category.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer hotline */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Kavora Customer Care</p>
              <p className="mt-0.5">+254 700 112 233</p>
              <p className="text-slate-400 text-[11px] mt-1">support@kavora.africa</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
