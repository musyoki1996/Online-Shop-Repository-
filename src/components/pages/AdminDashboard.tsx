import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Store, 
  TrendingUp, 
  Check, 
  X, 
  AlertCircle, 
  Package, 
  Search, 
  Tag, 
  Activity, 
  Plus, 
  Clock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    sellers, 
    updateProductStatus, 
    updateOrderStatus, 
    updateSellerStatus, 
    auditLogs, 
    formatPrice, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'sellers' | 'marketing' | 'audit'>('analytics');

  // Analytics Computations
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 7250000;
  const marketplaceCommissionTotal = Math.round(totalGrossRevenue * 0.095);
  const totalOrdersCount = orders.length + 184;
  const averageOrderValue = Math.round(totalGrossRevenue / totalOrdersCount);
  const pendingOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-[#083C39] text-white rounded-xl p-6 sm:p-8 border border-[#104D49] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#D99A68]" />
            <h1 className="text-2xl font-bold font-display">Kavora Administrator Control Panel</h1>
          </div>
          <p className="text-xs text-emerald-200/80 mt-1">
            System Overseer · Head of Marketplace Operations & Compliance (Nairobi Hub)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-200">Daraja Gateway: Active · Kenya Servers: Healthy</span>
        </div>
      </div>

      {/* 2. Top Analytics Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Platform GMV
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {formatPrice(totalGrossRevenue)}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +28.4% vs last quarter
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Marketplace Net Commission
          </span>
          <span className="text-2xl font-bold text-[#104D49] mt-1 block">
            {formatPrice(marketplaceCommissionTotal)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Avg take rate: 9.5%
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Orders Processed
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {totalOrdersCount}
          </span>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">
            {pendingOrdersCount} active in delivery pipeline
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Average Order Value (AOV)
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {formatPrice(averageOrderValue)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across 47 Kenyan Counties
          </span>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'analytics' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Analytics & Sales Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'products' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalog & Product Moderation ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sellers')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'sellers' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Merchants & KYC Approvals ({sellers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'audit' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* 4. Tab Content */}
      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales trend visual bars */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 font-display">Monthly Revenue Growth (KES)</h3>
                <span className="text-xs text-slate-400">Current Year 2026</span>
              </div>
              <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2">
                {[
                  { month: 'May', val: 3200000, height: '40%' },
                  { month: 'Jun', val: 4100000, height: '52%' },
                  { month: 'Jul', val: 4800000, height: '60%' },
                  { month: 'Aug', val: 5600000, height: '70%' },
                  { month: 'Sep', val: 6900000, height: '85%' },
                  { month: 'Oct', val: 8200000, height: '100%' }
                ].map(item => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-[#104D49]">
                      KES {(item.val / 1000000).toFixed(1)}M
                    </span>
                    <div 
                      style={{ height: item.height }} 
                      className="w-full bg-[#104D49] hover:bg-[#083C39] rounded-t transition-all cursor-pointer"
                    />
                    <span className="text-[11px] font-semibold text-slate-600">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* County sales distribution */}
            <div className="bg-white p-6 rounded-xl border border-[#E7EBE8] shadow-xs space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 font-display pb-3 border-b border-slate-100">
                Top County Destinations
              </h3>
              <div className="space-y-3">
                {[
                  { county: 'Nairobi (CBD, Westlands, Kilimani)', share: '58%', gmv: 'KES 4,756,000' },
                  { county: 'Mombasa (Nyali, CBD)', share: '16%', gmv: 'KES 1,312,000' },
                  { county: 'Kiambu (Thika, Ruiru)', share: '12%', gmv: 'KES 984,000' },
                  { county: 'Nakuru (Town, Naivasha)', share: '8%', gmv: 'KES 656,000' },
                  { county: 'Uasin Gishu (Eldoret)', share: '6%', gmv: 'KES 492,000' }
                ].map(c => (
                  <div key={c.county} className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-800">{c.county}</span>
                      <span className="font-bold text-[#104D49]">{c.share}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-[#104D49] h-full" style={{ width: c.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">All Marketplace Orders</h3>
            <span className="text-xs text-slate-500">Live Daraja M-Pesa Synced</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F8F6] text-slate-500 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map(ord => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-[#104D49]">{ord.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{ord.customerName}</p>
                    <p className="text-[11px] text-slate-400">{ord.customerPhone}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {ord.deliveryAddress.town}, {ord.deliveryAddress.county}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{formatPrice(ord.total)}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      {ord.paymentMethod.toUpperCase()} ({ord.paymentReference || 'OK'})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus, `Status updated by Admin`)}
                      className="bg-white border border-slate-300 rounded p-1 text-[11px] font-semibold text-slate-800"
                    >
                      <option value="Pending Payment">Pending Payment</option>
                      <option value="Payment Confirmed">Payment Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready for Dispatch">Ready for Dispatch</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PRODUCTS MODERATION */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Catalogue Listings & Approval</h3>
            <span className="text-xs text-slate-500">{products.length} Products registered</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F8F6] text-slate-500 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (KES)</th>
                <th className="py-3 px-4">Merchant</th>
                <th className="py-3 px-4">Listing Status</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.images[0]} alt="" className="w-8 h-8 object-cover rounded border" />
                      <span className="font-semibold text-slate-900 max-w-xs truncate">{prod.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{prod.brand}</td>
                  <td className="py-3 px-4 text-slate-600">{prod.category}</td>
                  <td className="py-3 px-4 font-bold text-[#104D49]">{formatPrice(prod.price)}</td>
                  <td className="py-3 px-4 text-slate-700">{prod.sellerName}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prod.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {prod.status === 'approved' ? (
                      <button
                        onClick={() => updateProductStatus(prod.id, 'rejected')}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => updateProductStatus(prod.id, 'approved')}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: SELLERS / MERCHANTS KYC */}
      {activeTab === 'sellers' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Registered Sellers & Verification KYC</h3>
            <span className="text-xs text-slate-500">KRA PIN & Business Certificates</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F8F6] text-slate-500 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Store Name</th>
                <th className="py-3 px-4">Owner / Contact</th>
                <th className="py-3 px-4">KRA PIN</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">KYC Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sellers.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{s.storeName}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800">{s.ownerName}</p>
                    <p className="text-[11px] text-slate-400">{s.phone}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{s.kraPin}</td>
                  <td className="py-3 px-4 text-slate-600">{s.town}, {s.county}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{s.commissionRate}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.status === 'approved' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : s.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {s.status === 'pending' ? (
                      <button
                        onClick={() => updateSellerStatus(s.id, 'approved')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded text-[11px] font-bold"
                      >
                        Approve KYC
                      </button>
                    ) : s.status === 'approved' ? (
                      <button
                        onClick={() => updateSellerStatus(s.id, 'suspended')}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateSellerStatus(s.id, 'approved')}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Re-activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 font-display pb-3 border-b border-slate-100">
            System Security Audit Trail
          </h3>
          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-[#F7F8F6] border border-slate-200 rounded flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-[#104D49] text-white px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="font-semibold text-slate-800">{log.actor}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{log.details}</p>
                </div>
                <span className="font-mono text-[10px] text-slate-400 whitespace-nowrap">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
