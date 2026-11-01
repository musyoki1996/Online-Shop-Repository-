import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Send, 
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

// 1. ABOUT US PAGE
export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D99A68]">Our Purpose</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-display">
          Shop Beyond Ordinary
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Kavora was founded in Nairobi, Kenya, with an uncompromising conviction: African consumers and creators deserve an e-commerce ecosystem built on trust, authentic craftsmanship, and world-class technological infrastructure.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl aspect-21/9 bg-[#104D49] relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
          alt="Kavora Nairobi Headquarters & Curated Products"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#083C39] via-transparent to-transparent flex items-end p-8">
          <p className="text-white text-lg font-display font-medium max-w-xl">
            "Connecting authentic African artisans, regional manufacturers, and global flagships to discerning customers across the continent."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-relaxed">
        <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-2">
          <h3 className="text-base font-bold text-slate-900 font-display">Authenticity First</h3>
          <p className="text-slate-600">
            We enforce strict merchant vetting with mandatory KRA PIN verification. Zero counterfeit tolerance guarantees that every device, bottle, and garment is 100% genuine.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-2">
          <h3 className="text-base font-bold text-slate-900 font-display">Financial Precision</h3>
          <p className="text-slate-600">
            Engineered natively for Safaricom M-Pesa STK Push. No clunky redirection or card friction—instant checkout with buyer escrow protection until delivery is verified.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-2">
          <h3 className="text-base font-bold text-slate-900 font-display">Pan-African Vision</h3>
          <p className="text-slate-600">
            Starting in Kenya's 47 counties and expanding across Eastern and wider Africa. We empower generational local artisans to export and thrive internationally.
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. CONTACT US PAGE
export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been received! Our Nairobi customer desk will respond within 2 hours.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 font-display">Get in Touch with Kavora</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Our customer service and merchant support teams are available Monday to Saturday, 8:00 AM – 8:00 PM EAT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 bg-[#083C39] text-white p-8 rounded-xl space-y-6 shadow-md border border-[#104D49]">
          <div>
            <span className="text-xs font-bold text-[#D99A68] uppercase tracking-wider">Corporate Headquarters</span>
            <h3 className="text-xl font-bold font-display mt-1">Nairobi, Kenya</h3>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Kavora Marketplace Limited <br />
              Westlands Commercial Boulevard, Parklands <br />
              P.O. Box 48920-00100 GPO, Nairobi, Kenya
            </p>
          </div>

          <div className="space-y-4 text-xs pt-4 border-t border-emerald-800/60">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#D99A68] flex-shrink-0" />
              <div>
                <p className="font-semibold">Direct Customer Hotline</p>
                <p className="text-emerald-200">+254 700 112 233 / +254 733 445 566</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D99A68] flex-shrink-0" />
              <div>
                <p className="font-semibold">Email Enquiries</p>
                <p className="text-emerald-200">customercare@kavora.africa</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#D99A68] flex-shrink-0" />
              <div>
                <p className="font-semibold">Operating Hours</p>
                <p className="text-emerald-200">Mon - Sat: 8:00 AM - 8:00 PM | Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#E7EBE8] shadow-xs">
          <h3 className="text-base font-bold text-slate-900 font-display mb-4">Send Us a Direct Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Kamau"
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Phone Number (M-Pesa registered)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">How can we assist you? *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Include order reference (e.g. KAV-2026-XXXX) if applicable..."
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#104D49] hover:bg-[#083C39] text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// 3. FAQS PAGE
export const FaqsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Safaricom M-Pesa STK Push payment work on Kavora?',
      a: 'When you choose M-Pesa during checkout and submit your telephone number, a secure prompt immediately triggers on your Safaricom mobile handset displaying "KAVORA MARKETPLACE Till 894102" and the exact order total. You only need to type your secret M-Pesa PIN. Our Daraja 2.0 gateway confirms the payment within seconds and generates your official receipt.'
    },
    {
      q: 'How fast is delivery across Kenya?',
      a: 'Within Nairobi and Kiambu County, standard orders arrive same-day or next-day. For Mombasa, Nakuru, Kisumu, Eldoret, and other major towns, delivery takes 1 to 3 business days via Kavora Express and our vetted logistics partners (G4S and Wells Fargo).'
    },
    {
      q: 'What is Kavora’s 7-Day Return and Refund Policy?',
      a: 'If an item arrives damaged, defective, or does not match its catalog description, you may initiate a return within 7 calendar days of receipt. Once collected by our courier and inspected at our Nairobi hub, full refunds are credited back to your original M-Pesa or bank account within 24 hours.'
    },
    {
      q: 'Are the products authentic and covered by warranty?',
      a: 'Yes, 100%. Kavora operates on a verified merchant model. Sellers must provide business registration documents and KRA PIN certificates. All electronics and appliances feature manufacturer warranties with authorized service center support in Kenya.'
    },
    {
      q: 'How can I become a verified seller on Kavora?',
      a: 'Navigate to "Become a Seller" in the menu or footer. Submit your shop name, KRA PIN, category specialization, and payout details. Our merchant onboarding team verifies applications within 24 to 48 hours.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 font-display">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Everything you need to know about shopping, M-Pesa payments, and deliveries on Kavora.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white rounded-lg border border-[#E7EBE8] overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-[#104D49] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-[#104D49]" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F7F8F6]/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. SHIPPING AND DELIVERY POLICY
export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs leading-relaxed text-slate-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Shipping & Delivery Policy</h1>
        <p className="text-slate-500 mt-1">Effective Date: October 2026 · Operations across Kenya's 47 Counties</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">1. Delivery Zones & Timelines</h3>
          <p>
            Kavora provides seamless door-to-door delivery throughout the Republic of Kenya. Deliveries are categorized into three regional tiers:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Zone 1 (Nairobi Metropolitan & Kiambu):</strong> Same-day dispatch for orders confirmed before 12:00 PM. Delivery fee from KES 250.</li>
            <li><strong>Zone 2 (Mombasa, Nakuru, Kisumu, Eldoret, Naivasha):</strong> 1 to 2 business days. Delivery fee from KES 400.</li>
            <li><strong>Zone 3 (Upcountry & Frontier Counties):</strong> 2 to 4 business days via registered courier depots (G4S and Wells Fargo). Delivery fee from KES 500.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">2. Live Parcel Tracking</h3>
          <p>
            Upon order verification, customers receive a unique Tracking ID (e.g. KAV-2026-8941) via SMS and email. Our interactive tracking page reflects live progress from warehouse dispatch to the final delivery rider's phone call.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">3. Package Inspection</h3>
          <p>
            Customers are encouraged to inspect outer seal integrity in the presence of the courier rider before signing delivery acknowledgment.
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. RETURNS AND REFUNDS POLICY
export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs leading-relaxed text-slate-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Returns & Refunds Policy</h1>
        <p className="text-slate-500 mt-1">7-Day Hassle-Free Return Guarantee</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">1. Eligibility for Returns</h3>
          <p>
            You may return any eligible product within 7 calendar days of receipt if:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The item was received in a damaged or defective condition.</li>
            <li>The item delivered differs substantially from the website specification or order invoice.</li>
            <li>The product is unopened in its original manufacturer packaging with all seals intact.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">2. Refund Timeline</h3>
          <p>
            Once our quality assurance center in Nairobi confirms the returned item, full refunds are processed via Safaricom B2C M-Pesa or bank transfer within 24 hours. No hidden restocking fees are deducted.
          </p>
        </div>
      </div>
    </div>
  );
};

// 6. PRIVACY & TERMS POLICIES
export const LegalPolicyPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs leading-relaxed text-slate-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          {type === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Service'}
        </h1>
        <p className="text-slate-500 mt-1">Compliant with Kenya Data Protection Act, 2019</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
            {type === 'privacy' ? '1. Collection of Personal Information' : '1. Acceptance of Terms'}
          </h3>
          <p>
            {type === 'privacy'
              ? 'Kavora Marketplace Limited strictly adheres to the Kenya Data Protection Act. We only collect essential identifying details (name, email, delivery address, and telephone number) necessary to process orders and initiate Safaricom M-Pesa STK transactions.'
              : 'By creating an account, browsing products, or completing purchases on Kavora, you agree to be bound by these Terms and Conditions and our Marketplace Merchant Rules.'}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
            {type === 'privacy' ? '2. Payment Security & M-Pesa Escrow' : '2. Buyer & Merchant Conduct'}
          </h3>
          <p>
            {type === 'privacy'
              ? 'Kavora never stores payment credentials or debit card PINs on our servers. All transactions utilize Safaricom Daraja 2.0 encrypted API endpoints with end-to-end cryptographic tokens.'
              : 'Merchants warrant that all catalog listings represent genuine, non-counterfeit goods with valid KRA tax documentation. Fraudulent activities lead to instant merchant suspension.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// 7. CUSTOMER SUPPORT CENTER
export const CustomerSupportPage: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 font-display">Kavora Customer Support Center</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Fast resolution for orders, deliveries, returns, and merchant inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div 
          onClick={() => navigateTo('tracking')}
          className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs hover:border-[#104D49] cursor-pointer transition-all space-y-2"
        >
          <Truck className="w-8 h-8 text-[#104D49] mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">Track Package</h4>
          <p className="text-xs text-slate-500">Locate your parcel in transit across Kenya</p>
        </div>

        <div 
          onClick={() => navigateTo('returns-policy')}
          className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs hover:border-[#104D49] cursor-pointer transition-all space-y-2"
        >
          <RotateCcw className="w-8 h-8 text-[#104D49] mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">Returns & Refunds</h4>
          <p className="text-xs text-slate-500">7-day free money-back return process</p>
        </div>

        <div 
          onClick={() => navigateTo('faqs')}
          className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs hover:border-[#104D49] cursor-pointer transition-all space-y-2"
        >
          <HelpCircle className="w-8 h-8 text-[#104D49] mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">Browse FAQs</h4>
          <p className="text-xs text-slate-500">Answers to frequent questions</p>
        </div>

        <div 
          onClick={() => navigateTo('contact')}
          className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs hover:border-[#104D49] cursor-pointer transition-all space-y-2"
        >
          <Phone className="w-8 h-8 text-[#104D49] mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">Contact Hotline</h4>
          <p className="text-xs text-slate-500">+254 700 112 233 direct call</p>
        </div>
      </div>
    </div>
  );
};
