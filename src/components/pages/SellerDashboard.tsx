import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  Package, 
  Plus, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Send, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  TrendingUp,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCategory, Product } from '../../types';

export const SellerDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    sellers, 
    addProduct, 
    updateOrderStatus, 
    formatPrice, 
    showToast,
    navigateTo 
  } = useApp();

  // Active seller store profile
  const activeSeller = sellers[0] || {
    id: 'sel-001',
    storeName: 'iStore Westlands Hub',
    ownerName: 'James Kariuki',
    email: 'james@istorewestlands.co.ke',
    phone: '+254 712 345 678',
    kraPin: 'P051289456M',
    county: 'Nairobi',
    town: 'Westlands',
    bankOrMpesaPayout: 'M-Pesa Till 894102',
    status: 'approved',
    commissionRate: 8,
    rating: 4.95,
    totalSales: 3450000,
    pendingBalance: 245000
  };

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'payouts'>('inventory');

  // Add Product Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newBrand, setNewBrand] = useState('Apple');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Phones & Accessories');
  const [newPrice, setNewPrice] = useState<number>(45000);
  const [newOrigPrice, setNewOrigPrice] = useState<number>(52000);
  const [newStock, setNewStock] = useState<number>(10);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80');
  const [newDescription, setNewDescription] = useState('');

  // Seller's products
  const sellerProducts = products.filter(p => p.sellerId === activeSeller.id || p.sellerName === activeSeller.storeName);

  // Seller's orders
  const sellerOrders = orders.filter(o => 
    o.items.some(it => it.sellerName === activeSeller.storeName || it.productId.startsWith('kav-prod-001'))
  );

  // Handle Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newPrice || !newImage) {
      showToast('Please provide product title, price, and image URL', 'warning');
      return;
    }

    const discount = newOrigPrice > newPrice ? Math.round(((newOrigPrice - newPrice) / newOrigPrice) * 100) : 0;

    addProduct({
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: newBrand,
      category: newCategory,
      price: Number(newPrice),
      originalPrice: Number(newOrigPrice),
      discountPercentage: discount,
      rating: 5.0,
      reviewCount: 0,
      stock: Number(newStock),
      isAvailable: true,
      images: [newImage],
      description: newDescription || `Authentic ${newProdName} with official warranty.`,
      features: ['Genuine verified merchant merchandise', '1 Year Official Warranty'],
      specifications: [
        { label: 'Condition', value: 'Brand New In Box' },
        { label: 'Warranty', value: '1 Year Warranty' }
      ],
      sellerId: activeSeller.id,
      sellerName: activeSeller.storeName,
      sellerRating: activeSeller.rating,
      sellerVerified: true,
      status: 'approved'
    });

    setAddModalOpen(false);
    // reset form
    setNewProdName('');
    setNewDescription('');
  };

  // Request Payout
  const handleRequestPayout = () => {
    showToast(`Payout request for ${formatPrice(activeSeller.pendingBalance)} initiated via Safaricom B2C Daraja to ${activeSeller.bankOrMpesaPayout}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Seller Portal Header */}
      <div className="bg-[#083C39] text-white rounded-xl p-6 sm:p-8 border border-[#104D49] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold font-display">{activeSeller.storeName}</h1>
            <span className="text-[10px] bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {activeSeller.status}
            </span>
          </div>
          <p className="text-xs text-emerald-200/80 mt-1">
            Merchant: {activeSeller.ownerName} · KRA PIN: {activeSeller.kraPin} · {activeSeller.town}, {activeSeller.county}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#D99A68] mt-2">
            <span>Marketplace Commission Rate: <strong>{activeSeller.commissionRate}%</strong></span>
            <span>·</span>
            <span>Settlement: <strong>{activeSeller.bankOrMpesaPayout}</strong></span>
          </div>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Listing</span>
        </button>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Gross Sales Volume
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {formatPrice(activeSeller.totalSales)}
          </span>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Available Payout Balance
          </span>
          <span className="text-2xl font-bold text-[#104D49] mt-1 block">
            {formatPrice(activeSeller.pendingBalance)}
          </span>
          <button
            onClick={handleRequestPayout}
            className="mt-2 text-xs font-bold text-[#104D49] hover:underline flex items-center gap-1"
          >
            <span>Request M-Pesa Payout →</span>
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Active Catalog Listings
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {sellerProducts.length} Products
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across {activeSeller.categories.join(', ')}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Seller Rating Score
          </span>
          <span className="text-2xl font-bold text-amber-500 mt-1 block">
            ★ {activeSeller.rating} / 5.0
          </span>
          <span className="text-[11px] text-emerald-700 mt-1 block">
            Top 5% Rated Merchant
          </span>
        </div>
      </div>

      {/* 3. Dashboard Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'inventory' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Inventory ({sellerProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Orders to Fulfill ({sellerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'payouts' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Settlements & Commissions</span>
        </button>
      </div>

      {/* 4. Tab Contents */}
      {/* TAB 1: PRODUCT INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">Active Store Inventory</h3>
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#104D49] text-white rounded text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Listing</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F7F8F6] text-slate-500 uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4">Catalog Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sellerProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.images[0]} alt="" className="w-10 h-10 object-cover rounded border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900">{prod.name}</p>
                          <p className="text-[11px] text-slate-400">SKU: {prod.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{prod.category}</td>
                    <td className="py-3 px-4 font-bold text-[#104D49]">{formatPrice(prod.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prod.stock > 5 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigateTo('product-detail', prod.id)}
                        className="text-[#104D49] hover:underline font-semibold flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS TO DISPATCH */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">Merchant Orders Fulfilment</h3>

          {sellerOrders.length > 0 ? (
            sellerOrders.map(ord => (
              <div key={ord.id} className="bg-white rounded-xl border border-[#E7EBE8] p-5 shadow-xs space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="font-mono font-bold text-slate-900 text-sm">{ord.id}</span>
                    <span className="text-slate-400 ml-2">Recipient: {ord.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded">
                      {ord.status}
                    </span>
                    {ord.status !== 'Shipped' && ord.status !== 'Delivered' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'Shipped', `Dispatched by ${activeSeller.storeName}`)}
                        className="bg-[#104D49] hover:bg-[#083C39] text-white px-3 py-1 rounded font-bold"
                      >
                        Mark as Dispatched
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Destination in Kenya:</span>
                    <p>{ord.deliveryAddress.street}</p>
                    <p>{ord.deliveryAddress.town}, {ord.deliveryAddress.county} County</p>
                    <p className="text-slate-500">Contact: {ord.customerPhone}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Order Value:</span>
                    <p className="text-base font-bold text-[#104D49]">{formatPrice(ord.total)}</p>
                    <p className="text-[11px] text-emerald-700">M-Pesa Verified Callback: {ord.paymentReference}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">No pending orders for your store at this moment.</p>
          )}
        </div>
      )}

      {/* TAB 3: COMMISSION & PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-6 text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">M-Pesa B2C Automated Settlements</h3>
              <p className="text-slate-500 mt-0.5">Transparent commission ledger with real-time disbursement.</p>
            </div>
            <button
              onClick={handleRequestPayout}
              className="bg-[#104D49] hover:bg-[#083C39] text-white px-5 py-2.5 rounded font-bold text-xs"
            >
              Request Immediate Payout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#F7F8F6] border border-slate-200">
              <span className="text-slate-500 block">Gross Accumulated Revenue</span>
              <span className="text-xl font-bold text-slate-900">{formatPrice(activeSeller.totalSales)}</span>
            </div>
            <div className="p-4 rounded-lg bg-[#F7F8F6] border border-slate-200">
              <span className="text-slate-500 block">Kavora Commission (8%)</span>
              <span className="text-xl font-bold text-slate-700">{formatPrice((activeSeller.totalSales * 8) / 100)}</span>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-800 block">Net Payout to Seller (92%)</span>
              <span className="text-xl font-bold text-emerald-800">{formatPrice((activeSeller.totalSales * 92) / 100)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display">Create New Product Listing</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="font-semibold block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony WH-1000XM6 Wireless Noise-Cancelling"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Price (KES) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs font-bold text-[#104D49]"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Original Price (KES)</label>
                  <input
                    type="number"
                    value={newOrigPrice}
                    onChange={(e) => setNewOrigPrice(Number(e.target.value))}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Inventory Units *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">High-Resolution Image URL *</label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed specs, features, origin..."
                  className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#104D49] hover:bg-[#083C39] text-white rounded font-bold"
                >
                  Publish Listing to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
