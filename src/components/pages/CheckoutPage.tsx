import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Lock, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KENYA_COUNTIES, getCountyDeliveryInfo } from '../../data/locations';
import { OrderItem } from '../../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    clearCart, 
    createOrder, 
    formatPrice, 
    currentUser, 
    navigateTo, 
    showToast,
    selectedCounty,
    setSelectedCounty
  } = useApp();

  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || 'Sarah Wambui');
  const [email, setEmail] = useState(currentUser?.email || 'sarah.wambui@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+254 712 908 123');
  const [county, setCounty] = useState(selectedCounty || 'Nairobi');
  
  const countyInfo = getCountyDeliveryInfo(county);
  const [town, setTown] = useState(countyInfo.towns[0] || 'CBD');
  const [streetAddress, setStreetAddress] = useState('Ring Road Parklands, Skyview Terrace 4B');
  const [instructions, setInstructions] = useState('Call recipient upon arrival at the gate');
  
  // Delivery speed
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'airtel' | 'bank'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState(phone);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // STK Push Dialog State
  const [stkModalOpen, setStkModalOpen] = useState(false);
  const [stkStep, setStkStep] = useState<'prompt' | 'processing' | 'success'>('prompt');
  const [mpesaPin, setMpesaPin] = useState('');
  const [generatedRef, setGeneratedRef] = useState('');

  // Calculated fees
  const activeDeliveryFee = deliverySpeed === 'express' ? countyInfo.expressFee : countyInfo.standardFee;
  const finalTotal = Math.max(0, cartSubtotal + activeDeliveryFee - discountAmount);

  // If cart is empty, redirect
  if (cart.length === 0 && !stkModalOpen && stkStep !== 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Your shopping bag is empty</h2>
        <button
          onClick={() => navigateTo('catalogue')}
          className="mt-4 px-6 py-2.5 bg-[#104D49] text-white rounded text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  // Handle Order Placement
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !streetAddress.trim()) {
      showToast('Please complete all delivery contact information', 'warning');
      return;
    }

    if (paymentMethod === 'mpesa') {
      // Open Daraja STK Simulation Prompt
      setStkStep('prompt');
      setMpesaPin('');
      setStkModalOpen(true);
    } else {
      // Process direct card/bank/airtel
      completeFinalOrder(
        paymentMethod, 
        'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase()
      );
    }
  };

  // Complete Order in Database
  const completeFinalOrder = (method: 'mpesa' | 'card' | 'airtel' | 'bank', txnRef: string) => {
    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      color: item.selectedColor,
      size: item.selectedSize,
      sellerName: item.product.sellerName
    }));

    const created = createOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: {
        street: streetAddress,
        county,
        town,
        deliveryInstructions: instructions
      },
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee: activeDeliveryFee,
      discountAmount,
      total: finalTotal,
      paymentMethod: method,
      paymentReference: txnRef,
      status: 'Payment Confirmed',
      estimatedDeliveryDate: deliverySpeed === 'express' ? 'Today / Tomorrow' : countyInfo.estimatedDays
    });

    clearCart();
    showToast(`Order #${created.id} placed successfully!`, 'success');
    navigateTo('tracking', created.id);
  };

  // Simulate M-Pesa PIN submit
  const handleConfirmMpesaPin = () => {
    setStkStep('processing');
    const newRef = 'QKH' + Math.floor(100000 + Math.random() * 900000) + 'ZX';
    setGeneratedRef(newRef);

    setTimeout(() => {
      setStkStep('success');
      setTimeout(() => {
        setStkModalOpen(false);
        completeFinalOrder('mpesa', newRef);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E7EBE8]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct integration with Safaricom Daraja M-Pesa STK Push and 256-bit encryption.
          </p>
        </div>

        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-semibold text-[#104D49] hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </button>
      </div>

      <form onSubmit={handleInitiatePayment}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact, Delivery, Payment (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#104D49] text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Customer Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Wambui"
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
                    placeholder="e.g. sarah.wambui@gmail.com"
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Kenyan Telephone Number (for Delivery Rider & M-Pesa) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setMpesaPhone(e.target.value);
                    }}
                    placeholder="+254 7XX XXX XXX or 07XX XXX XXX"
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Kenyan Delivery Address */}
            <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#104D49] text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Kenyan Shipping & Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* County Selector */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">County *</label>
                  <select
                    value={county}
                    onChange={(e) => {
                      const newCounty = e.target.value;
                      setCounty(newCounty);
                      setSelectedCounty(newCounty);
                      const info = getCountyDeliveryInfo(newCounty);
                      setTown(info.towns[0] || 'Main Town');
                    }}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  >
                    {KENYA_COUNTIES.map(c => (
                      <option key={c.county} value={c.county}>{c.county} County</option>
                    ))}
                  </select>
                </div>

                {/* Town / Estate */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Town / Area / Estate *</label>
                  <select
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  >
                    {countyInfo.towns.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Street / Building Address */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Street Name, Building, Floor & Apartment Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. Ring Road Parklands, Skyview Terrace Apt 4B"
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  />
                </div>

                {/* Delivery Instructions */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Gate code, landmark, or best time to reach you"
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
                  />
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2">Select Shipping Speed:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${
                    deliverySpeed === 'standard' ? 'border-[#104D49] bg-[#104D49]/5' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="deliverySpeed"
                      checked={deliverySpeed === 'standard'}
                      onChange={() => setDeliverySpeed('standard')}
                      className="mt-0.5 text-[#104D49]"
                    />
                    <div>
                      <div className="font-bold text-slate-900">Standard Delivery</div>
                      <div className="text-[11px] text-slate-500">{countyInfo.estimatedDays}</div>
                      <div className="font-bold text-[#104D49] mt-1">{formatPrice(countyInfo.standardFee)}</div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${
                    deliverySpeed === 'express' ? 'border-[#104D49] bg-[#104D49]/5' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="deliverySpeed"
                      checked={deliverySpeed === 'express'}
                      onChange={() => setDeliverySpeed('express')}
                      className="mt-0.5 text-[#104D49]"
                    />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Express Priority</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 rounded font-semibold">Fast</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Same-Day / Next-Day Courier</div>
                      <div className="font-bold text-[#104D49] mt-1">{formatPrice(countyInfo.expressFee)}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#104D49] text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {/* M-Pesa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'mpesa' 
                      ? 'border-[#104D49] bg-[#104D49]/10 text-[#104D49] font-bold ring-1 ring-[#104D49]' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-700" />
                  <span>M-Pesa STK</span>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card' 
                      ? 'border-[#104D49] bg-[#104D49]/10 text-[#104D49] font-bold ring-1 ring-[#104D49]' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-slate-700" />
                  <span>Visa / MC</span>
                </button>

                {/* Airtel Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('airtel')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'airtel' 
                      ? 'border-[#104D49] bg-[#104D49]/10 text-[#104D49] font-bold ring-1 ring-[#104D49]' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-rose-600" />
                  <span>Airtel Money</span>
                </button>

                {/* Bank Wire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'bank' 
                      ? 'border-[#104D49] bg-[#104D49]/10 text-[#104D49] font-bold ring-1 ring-[#104D49]' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-slate-600" />
                  <span>Bank Wire</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="p-4 rounded-lg bg-[#F7F8F6] border border-slate-200 text-xs">
                {paymentMethod === 'mpesa' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        M
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Safaricom M-Pesa Online STK Push</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          An instant payment prompt will appear on your Safaricom mobile handset. Enter your secret M-Pesa PIN to complete payment.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Safaricom Phone Number for STK Push:
                      </label>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="e.g. 0712345678 or 254712345678"
                        className="w-full sm:w-80 bg-white border border-slate-300 rounded p-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#104D49]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <p className="text-slate-600 text-[11px]">
                      Enter your credit or debit card details. 3D Secure OTP verification enabled.
                    </p>
                    <div className="space-y-2 max-w-md">
                      <input
                        type="text"
                        placeholder="Card Number (4000 1234 5678 9010)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-2 text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-white border border-slate-300 rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="CVC / CVV"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="bg-white border border-slate-300 rounded p-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'airtel' && (
                  <div>
                    <h4 className="font-bold text-slate-900">Airtel Money STK Push</h4>
                    <p className="text-slate-600 mt-1 text-[11px]">
                      A prompt will be routed to your Airtel SIM. Dial *334# or confirm on your handset screen.
                    </p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div>
                    <h4 className="font-bold text-slate-900">Direct KES Bank Transfer</h4>
                    <p className="text-slate-600 mt-1 text-[11px]">
                      NCBA Bank Kenya | A/C 100-293-8470 | Kavora Marketplace Limited. Reference will be your Order Number.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order CTA (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
                Order Review ({cart.length} Products)
              </h3>

              {/* Items summary */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-slate-500 text-[11px]">
                        Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </p>
                    </div>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price calculations */}
              <div className="border-t border-slate-200 pt-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery ({county}):</span>
                  <span className="font-semibold text-slate-900">{formatPrice(activeDeliveryFee)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Discount:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between text-base font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-[#104D49]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#104D49] hover:bg-[#083C39] text-white py-4 px-6 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer mt-4"
              >
                <Lock className="w-4 h-4 text-[#D99A68]" />
                <span>Pay {formatPrice(finalTotal)} Now</span>
              </button>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                By placing your order, you agree to Kavora’s Terms & Conditions and 7-day return guarantee.
              </p>
            </div>
          </div>

        </div>
      </form>

      {/* SAFARICOM M-PESA DARAJA STK PUSH INTERACTIVE MODAL */}
      {stkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121212] text-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-emerald-800/60 font-sans text-center relative overflow-hidden">
            {/* Top Safaricom Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                SAFARICOM M-PESA
              </span>
              <span className="text-[10px] text-neutral-400">Daraja STK v2.4</span>
            </div>

            {stkStep === 'prompt' && (
              <div className="py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
                  <Smartphone className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">Simulated Phone Prompt</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Sent to: <strong className="text-white">{mpesaPhone}</strong>
                  </p>
                </div>

                {/* SIM Card Dialog Box */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-left text-xs space-y-2">
                  <div className="text-neutral-300">
                    Do you want to pay <strong className="text-emerald-400">{formatPrice(finalTotal)}</strong> to <strong className="text-white">KAVORA MARKETPLACE</strong> (Till 894102)?
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Enter M-PESA PIN:</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={mpesaPin}
                      onChange={(e) => setMpesaPin(e.target.value)}
                      placeholder="••••"
                      className="w-full bg-black border border-neutral-700 rounded py-2 px-3 text-center text-lg tracking-[0.5em] text-white font-mono focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStkModalOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded border border-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmMpesaPin}
                    className="flex-1 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors"
                  >
                    Send PIN
                  </button>
                </div>
              </div>
            )}

            {stkStep === 'processing' && (
              <div className="py-10 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-base font-bold text-white">Awaiting Daraja Callback...</h3>
                <p className="text-xs text-neutral-400">
                  Validating transaction with Safaricom M-Pesa gateway.
                </p>
              </div>
            )}

            {stkStep === 'success' && (
              <div className="py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Payment Confirmed!</h3>
                <p className="text-xs text-emerald-400 font-mono">
                  M-Pesa Ref: {generatedRef}
                </p>
                <p className="text-xs text-neutral-400">
                  Generating order invoice & preparing dispatch...
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
