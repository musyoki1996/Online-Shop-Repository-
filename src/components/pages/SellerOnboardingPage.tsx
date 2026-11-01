import React, { useState } from 'react';
import { 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  Coins, 
  Truck, 
  DollarSign 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCategory } from '../../types';
import { KENYA_COUNTIES } from '../../data/locations';

export const SellerOnboardingPage: React.FC = () => {
  const { registerSeller, navigateTo, showToast } = useApp();

  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [kraPin, setKraPin] = useState('P0');
  const [businessRegNumber, setBusinessRegNumber] = useState('BN-');
  const [county, setCounty] = useState('Nairobi');
  const [town, setTown] = useState('Westlands');
  const [bankOrMpesa, setBankOrMpesa] = useState('M-Pesa Till 894102');
  const [selectedCats, setSelectedCats] = useState<ProductCategory[]>(['Phones & Accessories']);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !ownerName || !email || !phone || !kraPin) {
      showToast('Please fill all mandatory merchant verification fields', 'warning');
      return;
    }

    registerSeller({
      storeName,
      ownerName,
      email,
      phone,
      kraPin,
      businessRegNumber,
      county,
      town,
      bankOrMpesaPayout: bankOrMpesa,
      categories: selectedCats,
      description: description || 'Specialized merchant operating in Kenya.',
      commissionRate: 10
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Merchant Application Received</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your shop <strong className="text-slate-900">{storeName}</strong> has been submitted to the Kavora Merchant Verification Committee. Your KRA PIN ({kraPin}) and business credentials are under review. You will receive an SMS confirmation once activated.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('seller-dashboard')}
            className="px-5 py-2.5 bg-[#104D49] hover:bg-[#083C39] text-white rounded text-xs font-semibold"
          >
            Go to Seller Portal Preview
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#104D49]/10 text-[#104D49] text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5 text-[#D99A68]" />
          <span>Multi-Vendor Merchant Network</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">Sell Beyond Ordinary on Kavora</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Reach hundreds of thousands of verified customers across Kenya. Enjoy automated M-Pesa payouts, transparent 8-10% commissions, and integrated doorstep logistics.
        </p>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#E7EBE8] text-center space-y-1">
          <DollarSign className="w-6 h-6 text-[#104D49] mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Weekly M-Pesa Payouts</h4>
          <p className="text-[11px] text-slate-500">Fast settlements straight to your B2C Paybill or Till.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#E7EBE8] text-center space-y-1">
          <Truck className="w-6 h-6 text-[#104D49] mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Doorstep Logistics</h4>
          <p className="text-[11px] text-slate-500">We pick up from your store and deliver countrywide.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#E7EBE8] text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-[#104D49] mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Fraud Protection</h4>
          <p className="text-[11px] text-slate-500">Zero chargeback risk with authenticated Daraja STK Push.</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Section 1: Business Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              1. Business Information & Identity
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Store / Business Trade Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mara Artisans Guild"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Owner / Director Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faith Mutiso"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="merchant@domain.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Phone Number (M-Pesa) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kenya Revenue Authority (KRA) PIN *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. P051289456M"
                  value={kraPin}
                  onChange={(e) => setKraPin(e.target.value.toUpperCase())}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs font-mono uppercase text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Business Registration Certificate Number</label>
                <input
                  type="text"
                  placeholder="e.g. BN-892144-KE or PVT-2024"
                  value={businessRegNumber}
                  onChange={(e) => setBusinessRegNumber(e.target.value.toUpperCase())}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs font-mono text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location & Payouts */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              2. Warehouse Location & Settlement Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Primary County *</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs"
                >
                  {KENYA_COUNTIES.map(c => <option key={c.county} value={c.county}>{c.county} County</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Town / Area *</label>
                <input
                  type="text"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  placeholder="e.g. Westlands, Nyali, Milimani"
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Settlement M-Pesa / Bank Account *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M-Pesa Till 894102 or Bank A/C"
                  value={bankOrMpesa}
                  onChange={(e) => setBankOrMpesa(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Categories */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              3. Primary Product Categories
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCats.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className={`p-2.5 rounded border text-left flex items-center justify-between transition-colors ${
                      isSelected 
                        ? 'border-[#104D49] bg-[#104D49]/10 text-[#104D49] font-bold' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#104D49] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full bg-[#104D49] hover:bg-[#083C39] text-white py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Submit Merchant Verification Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              By applying, you agree to adhere to Kavora Merchant Standards and Anti-Counterfeit Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
