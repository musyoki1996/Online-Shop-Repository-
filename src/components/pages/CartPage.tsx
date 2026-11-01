import React, { useState } from 'react';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Tag, 
  X, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KENYA_COUNTIES } from '../../data/locations';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    deliveryFee, 
    discountAmount, 
    cartTotal, 
    formatPrice, 
    selectedCounty, 
    setSelectedCounty, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    navigateTo 
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#104D49]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#104D49]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Explore our curated marketplace of authentic electronics, Kenyan designer fashion, lifestyle decor, and premium coffee.
        </p>
        <button
          onClick={() => navigateTo('catalogue')}
          className="mt-6 bg-[#104D49] hover:bg-[#083C39] text-white py-3 px-8 rounded-md font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Steps Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E7EBE8] gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your selected products, calculate Kenyan delivery, and apply discount vouchers.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalogue')}
          className="text-xs font-semibold text-[#104D49] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items in Cart (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                  
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-slate-200 flex-shrink-0 cursor-pointer"
                      onClick={() => navigateTo('product-detail', item.product.id)}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#104D49] tracking-wider block">
                        {item.product.brand}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-detail', item.product.id)}
                        className="text-sm font-bold text-slate-900 hover:text-[#104D49] truncate cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        {item.selectedColor && (
                          <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                        )}
                        {item.selectedSize && (
                          <span>Size: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                        )}
                        <span>·</span>
                        <span className="text-[11px] text-slate-400">Merchant: {item.product.sellerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="px-2.5 py-1 text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="px-2.5 py-1 text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-right min-w-[90px]">
                      <div className="text-sm font-bold text-[#104D49]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-slate-400">
                          {formatPrice(item.product.price)} each
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Need to start over?</span>
              <button
                onClick={clearCart}
                className="text-rose-600 hover:underline font-semibold"
              >
                Clear entire bag
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary & Checkout (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 font-display pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Kenyan Delivery Destination Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#104D49]" />
                Delivery Destination County:
              </label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#104D49]"
              >
                {KENYA_COUNTIES.map(c => (
                  <option key={c.county} value={c.county}>{c.county} County</option>
                ))}
              </select>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Standard Delivery ({selectedCounty}):</span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Voucher Discount:</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between text-base font-bold text-slate-900">
                <span>Total Payable:</span>
                <span className="text-xl text-[#104D49]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="border-t border-slate-100 pt-3">
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded p-2.5 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <strong className="font-bold">{appliedPromo.code}</strong> applied
                      <div className="text-[10px] text-emerald-600">{appliedPromo.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="p-1 hover:text-rose-600"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try 'KAVORA10' or 'FREESHIP'"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#F7F8F6] border border-slate-300 rounded px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#104D49]"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full bg-[#104D49] hover:bg-[#083C39] text-white py-3.5 px-4 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* M-Pesa Security Reassurance */}
            <div className="text-[11px] text-slate-500 space-y-1.5 pt-2">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Instant Safaricom M-Pesa STK Push Available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#104D49] flex-shrink-0" />
                <span>Encrypted 256-bit checkout SSL protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
