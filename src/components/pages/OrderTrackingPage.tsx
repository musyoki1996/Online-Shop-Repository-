import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, viewParam, getOrderById, formatPrice, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState(viewParam || (orders[0] ? orders[0].id : 'KAV-2026-8941'));
  const [activeOrder, setActiveOrder] = useState(() => {
    return viewParam ? getOrderById(viewParam) || orders[0] : orders[0];
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const found = getOrderById(searchQuery.trim());
      if (found) {
        setActiveOrder(found);
      } else {
        alert(`No order found matching "${searchQuery}". Please verify the Order ID (e.g. ${orders[0]?.id || 'KAV-2026-8941'}).`);
      }
    }
  };

  const stages: OrderStatus[] = [
    'Pending Payment',
    'Payment Confirmed',
    'Processing',
    'Ready for Dispatch',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const currentStageIndex = activeOrder ? stages.indexOf(activeOrder.status) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#104D49]/10 text-[#104D49] flex items-center justify-center mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Track Your Shipment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Enter your Kavora Order Number (e.g. KAV-2026-8941) or telephone number to view live courier status.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleTrackSubmit} className="flex gap-2 max-w-md mx-auto pt-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. KAV-2026-8941 or 0712908123"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#104D49]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="bg-[#104D49] hover:bg-[#083C39] text-white px-5 py-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>
      </div>

      {activeOrder ? (
        <div className="space-y-6">
          {/* Order Header Summary Banner */}
          <div className="bg-[#083C39] text-white rounded-xl p-6 shadow-md border border-[#104D49] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-300">Order ID:</span>
                <span className="font-mono text-base font-bold text-[#D99A68]">{activeOrder.id}</span>
                <span className="text-xs text-emerald-200/60">· {activeOrder.statusHistory[0]?.timestamp}</span>
              </div>
              <h2 className="text-xl font-bold font-display mt-1">
                Current Status: <span className="text-[#D99A68]">{activeOrder.status}</span>
              </h2>
              <p className="text-xs text-emerald-100/80 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D99A68]" />
                Estimated Delivery: <strong className="text-white">{activeOrder.estimatedDeliveryDate}</strong>
              </p>
            </div>

            <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-emerald-800">
              <span className="text-xs text-emerald-300 block">Total Amount Paid</span>
              <span className="text-2xl font-bold text-white">{formatPrice(activeOrder.total)}</span>
              <span className="text-[11px] text-emerald-400 block font-mono">
                M-Pesa Ref: {activeOrder.paymentReference || 'N/A'}
              </span>
            </div>
          </div>

          {/* 7-Stage Progression Timeline */}
          <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
              Delivery Milestones
            </h3>

            {/* Desktop timeline horizontal */}
            <div className="hidden lg:grid grid-cols-7 gap-2 relative">
              {stages.map((stage, i) => {
                const isCompleted = i <= currentStageIndex;
                const isCurrent = i === currentStageIndex;

                return (
                  <div key={stage} className="flex flex-col items-center text-center relative group">
                    {/* Connecting line */}
                    {i < stages.length - 1 && (
                      <div className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${
                        i < currentStageIndex ? 'bg-emerald-600' : 'bg-slate-200'
                      }`} />
                    )}

                    {/* Step Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${
                      isCompleted 
                        ? 'bg-[#104D49] text-white ring-4 ring-emerald-50' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>

                    {/* Label */}
                    <span className={`text-[11px] font-medium mt-2 leading-tight ${
                      isCurrent ? 'font-bold text-[#104D49]' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Status History Log */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Logistics Activity Feed
              </h4>
              <div className="space-y-3">
                {activeOrder.statusHistory.map((hist, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#104D49] mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-semibold">{hist.status}</strong>
                        <span className="text-slate-400 text-[11px]">{hist.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{hist.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery & Items Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Details */}
            <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-3 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#104D49]" />
                Destination Address
              </h4>
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold text-slate-900">{activeOrder.customerName}</p>
                <p>{activeOrder.deliveryAddress.street}</p>
                <p>{activeOrder.deliveryAddress.town}, {activeOrder.deliveryAddress.county} County</p>
                <p className="text-slate-500">Phone: {activeOrder.customerPhone}</p>
                {activeOrder.deliveryAddress.deliveryInstructions && (
                  <p className="text-slate-500 italic mt-2">
                    Note: "{activeOrder.deliveryAddress.deliveryInstructions}"
                  </p>
                )}
              </div>
            </div>

            {/* Items inside package */}
            <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-3 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#104D49]" />
                Package Contents ({activeOrder.items.length})
              </h4>
              <div className="space-y-3 divide-y divide-slate-100">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 pt-2 first:pt-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-10 h-10 object-cover rounded border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.productName}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity} · Merchant: {item.sellerName}</p>
                    </div>
                    <span className="font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
