import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones,
  ArrowRight,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to Kavora Exclusive Updates!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#083C39] text-[#F7F8F6] pt-14 pb-8 border-t border-[#104D49]">
      {/* 1. Value Proposition Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-emerald-900/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#104D49] flex items-center justify-center flex-shrink-0 text-[#D99A68]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Fast Reliable Delivery</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Same-day in Nairobi & express delivery to all 47 Kenyan counties.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#104D49] flex items-center justify-center flex-shrink-0 text-[#D99A68]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Genuine Authenticity</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Strict seller verification and direct manufacturer guarantees.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#104D49] flex items-center justify-center flex-shrink-0 text-[#D99A68]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Free Returns</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Hassle-free replacement or full refund to your M-Pesa account.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#104D49] flex items-center justify-center flex-shrink-0 text-[#D99A68]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Dedicated Support</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Local multilingual customer care via phone, email, and live ticket.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4">
            <BrandLogo size="lg" theme="dark" onClick={() => navigateTo('home')} />
            <p className="text-xs text-emerald-100/80 mt-4 leading-relaxed max-w-sm">
              Kavora is Kenya's premier curated marketplace connecting quality-conscious customers with verified merchants, artisan creators, and leading international brands.
            </p>

            <div className="mt-6 space-y-2 text-xs text-emerald-100/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                <span>Westlands Commercial Boulevard, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                <span>+254 700 112 233 / +254 733 445 566</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D99A68] flex-shrink-0" />
                <span>customercare@kavora.africa</span>
              </div>
            </div>
          </div>

          {/* About Kavora (Col 5-6) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D99A68] mb-4">
              About Kavora
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Careers & Culture
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service (Col 7-8) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D99A68] mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-white transition-colors">
                  Help Centre
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns-policy')} className="hover:text-white transition-colors">
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Sell With Kavora (Col 9-10) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D99A68] mb-4">
              Sell With Kavora
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigateTo('seller-register')} className="hover:text-white transition-colors font-medium text-[#D99A68]">
                  Become a Seller
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('seller-register')} className="hover:text-white transition-colors">
                  Seller Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-white transition-colors">
                  Merchant Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('seller-dashboard')} className="hover:text-white transition-colors">
                  Seller Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (Col 11-12) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D99A68] mb-4">
              Stay Informed
            </h4>
            <p className="text-xs text-emerald-100/80 mb-3 leading-relaxed">
              Subscribe to receive curated releases, flash deals, and merchant spotlights.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-300 bg-[#104D49] p-2.5 rounded">
                <Check className="w-4 h-4 text-[#D99A68]" />
                <span>Subscribed to Kavora VIP.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full bg-[#104D49] border border-emerald-700/50 rounded px-3 py-2 text-xs text-white placeholder:text-emerald-300/50 focus:outline-hidden focus:border-[#D99A68]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] font-bold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Payment Methods & Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-900/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/70">
          
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#D99A68] mr-1">Accepted Payments:</span>
            {/* Safaricom M-Pesa badge */}
            <span className="px-2 py-1 rounded bg-[#104D49] text-emerald-200 text-[11px] font-bold border border-emerald-600/40">
              Safaricom M-PESA
            </span>
            <span className="px-2 py-1 rounded bg-[#104D49] text-emerald-200 text-[11px] font-semibold border border-emerald-600/40">
              Visa
            </span>
            <span className="px-2 py-1 rounded bg-[#104D49] text-emerald-200 text-[11px] font-semibold border border-emerald-600/40">
              Mastercard
            </span>
            <span className="px-2 py-1 rounded bg-[#104D49] text-emerald-200 text-[11px] font-semibold border border-emerald-600/40">
              Airtel Money
            </span>
            <span className="px-2 py-1 rounded bg-[#104D49] text-emerald-200 text-[11px] font-semibold border border-emerald-600/40">
              Direct Bank Wire
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-6 text-center text-[11px] text-emerald-200/50">
          © {new Date().getFullYear()} Kavora Marketplace Limited. All Rights Reserved. Headquarters: Nairobi, Kenya. Slogan: "Shop Beyond Ordinary."
        </div>
      </div>
    </footer>
  );
};
