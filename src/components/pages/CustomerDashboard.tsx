import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Truck, 
  ShoppingBag, 
  Check, 
  LogOut, 
  Printer, 
  User as UserIcon,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { KENYA_COUNTIES } from '../../data/locations';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist, 
    navigateTo, 
    formatPrice, 
    logout, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'security'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Filter wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  // Saved addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home (Nairobi)',
      recipient: currentUser?.name || 'Sarah Wambui',
      phone: currentUser?.phone || '+254 712 908 123',
      street: 'Ring Road Parklands, Skyview Terrace 4B',
      town: 'Parklands',
      county: 'Nairobi',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office (Westlands)',
      recipient: currentUser?.name || 'Sarah Wambui',
      phone: currentUser?.phone || '+254 712 908 123',
      street: 'Westlands Commercial Boulevard, 5th Floor',
      town: 'Westlands',
      county: 'Nairobi',
      isDefault: false
    }
  ]);

  const [newAddrModal, setNewAddrModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCounty, setNewCounty] = useState('Nairobi');
  const [newTown, setNewTown] = useState('CBD');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStreet) {
      setAddresses(prev => [
        ...prev,
        {
          id: 'addr-' + Date.now(),
          label: newLabel || 'Other',
          recipient: currentUser?.name || 'Sarah Wambui',
          phone: currentUser?.phone || '+254 712 908 123',
          street: newStreet,
          town: newTown,
          county: newCounty,
          isDefault: false
        }
      ]);
      setNewAddrModal(false);
      showToast('New delivery address saved!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Profile Banner */}
      <div className="bg-[#083C39] text-white rounded-xl p-6 sm:p-8 border border-[#104D49] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#104D49] border-2 border-[#D99A68] text-[#D99A68] flex items-center justify-center font-bold text-2xl font-display">
            {currentUser?.name ? currentUser.name.charAt(0) : 'K'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display">{currentUser?.name || 'Customer Account'}</h1>
              <span className="text-[10px] bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Verified
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-0.5">{currentUser?.email} · {currentUser?.phone}</p>
            <p className="text-[11px] text-[#D99A68] mt-1">Default Shipping: {currentUser?.town || 'Parklands'}, {currentUser?.county || 'Nairobi'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('catalogue')}
            className="px-4 py-2 bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] rounded text-xs font-bold transition-colors"
          >
            Browse Catalogue
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#104D49] hover:bg-[#155a55] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-4 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'orders' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'wishlist' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'addresses' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Delivery Addresses ({addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'security' ? 'border-[#104D49] text-[#104D49]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Profile</span>
        </button>
      </div>

      {/* 3. Tab Content */}
      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-[#E7EBE8] p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#104D49]">{order.id}</span>
                    <span className="text-slate-400 text-xs ml-2">Placed on {order.createdAt.split('T')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => navigateTo('tracking', order.id)}
                      className="px-3 py-1 bg-[#104D49] hover:bg-[#083C39] text-white rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1"
                      title="View Invoice"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-14 h-14 object-cover rounded border border-slate-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{item.productName}</h4>
                        <p className="text-slate-500 mt-0.5">
                          Qty: {item.quantity} · Merchant: {item.sellerName}
                        </p>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div>
                    <span>Delivery destination: </span>
                    <strong className="text-slate-800">{order.deliveryAddress.town}, {order.deliveryAddress.county}</strong>
                  </div>
                  <div className="text-right">
                    <span>Total Paid: </span>
                    <strong className="text-sm font-bold text-[#104D49]">{formatPrice(order.total)}</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No orders placed yet</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(prod => (
                <div key={prod.id} className="bg-white rounded-xl border border-[#E7EBE8] overflow-hidden p-4 flex flex-col justify-between shadow-xs">
                  <div className="flex gap-4">
                    <img src={prod.images[0]} alt={prod.name} className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                    <div>
                      <span className="text-[10px] font-bold text-[#104D49] uppercase">{prod.brand}</span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{prod.name}</h4>
                      <p className="text-sm font-bold text-[#104D49] mt-1">{formatPrice(prod.price)}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="flex-1 bg-[#104D49] hover:bg-[#083C39] text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 text-xs"
                      title="Remove from wishlist"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Your wishlist is empty</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 font-display">Saved Shipping Addresses</h3>
            <button
              onClick={() => setNewAddrModal(true)}
              className="bg-[#104D49] text-white px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-white p-5 rounded-xl border border-[#E7EBE8] shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-slate-800 font-medium">{addr.recipient}</p>
                <p className="text-slate-600">{addr.street}</p>
                <p className="text-slate-600">{addr.town}, {addr.county} County</p>
                <p className="text-slate-500">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>

          {newAddrModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
                <h4 className="text-base font-bold text-slate-900">Add New Kenyan Address</h4>
                <form onSubmit={handleAddAddress} className="space-y-3">
                  <div>
                    <label className="font-semibold block mb-1">Address Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Mombasa Holiday Home / Kisumu Branch"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full border border-slate-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">County</label>
                    <select
                      value={newCounty}
                      onChange={(e) => setNewCounty(e.target.value)}
                      className="w-full border border-slate-300 rounded p-2"
                    >
                      {KENYA_COUNTIES.map(c => <option key={c.county} value={c.county}>{c.county} County</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Town / Area</label>
                    <input
                      type="text"
                      value={newTown}
                      onChange={(e) => setNewTown(e.target.value)}
                      placeholder="e.g. Nyali or Milimani"
                      className="w-full border border-slate-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Street / Building Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Links Road, Plot 5"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="w-full border border-slate-300 rounded p-2"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setNewAddrModal(false)}
                      className="flex-1 py-2 bg-slate-100 rounded font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#104D49] text-white rounded font-bold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SECURITY & PROFILE */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 max-w-xl space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900 font-display">Account Security Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Account Holder Name</label>
              <input
                type="text"
                defaultValue={currentUser?.name}
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Email</label>
              <input
                type="email"
                defaultValue={currentUser?.email}
                disabled
                className="w-full bg-slate-100 border border-slate-300 rounded p-2 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">M-Pesa Verified Mobile Number</label>
              <input
                type="tel"
                defaultValue={currentUser?.phone}
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>
            <button
              onClick={() => showToast('Profile details updated!', 'success')}
              className="bg-[#104D49] text-white py-2 px-4 rounded font-bold text-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 text-xs space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Invoice Top */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-bold font-display text-[#104D49]">KAVORA</h3>
                <p className="text-[10px] text-slate-500">Official Electronic Tax Receipt</p>
                <p className="text-[10px] text-slate-500">KRA PIN: P051289456M · Nairobi, Kenya</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-slate-900 text-sm">INVOICE #{selectedInvoiceOrder.id}</span>
                <p className="text-[11px] text-slate-500">Date: {selectedInvoiceOrder.createdAt.split('T')[0]}</p>
                <p className="text-[11px] font-mono text-emerald-700">M-Pesa: {selectedInvoiceOrder.paymentReference}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Billed To:</span>
                <p className="font-semibold">{selectedInvoiceOrder.customerName}</p>
                <p>{selectedInvoiceOrder.deliveryAddress.street}</p>
                <p>{selectedInvoiceOrder.deliveryAddress.town}, {selectedInvoiceOrder.deliveryAddress.county}</p>
                <p>{selectedInvoiceOrder.customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-800 block mb-1">Payment Status:</span>
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                  PAID IN FULL
                </span>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px]">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceOrder.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium text-slate-800">{it.productName}</td>
                    <td className="py-2.5 text-center">{it.quantity}</td>
                    <td className="py-2.5 text-right">{formatPrice(it.price)}</td>
                    <td className="py-2.5 text-right font-bold text-slate-900">{formatPrice(it.price * it.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-slate-200 pt-3 space-y-1 text-right">
              <p>Subtotal: <strong className="font-semibold">{formatPrice(selectedInvoiceOrder.subtotal)}</strong></p>
              <p>Delivery Fee: <strong className="font-semibold">{formatPrice(selectedInvoiceOrder.deliveryFee)}</strong></p>
              <p className="text-sm font-bold text-[#104D49]">
                Total Amount Paid: {formatPrice(selectedInvoiceOrder.total)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-800 text-white py-2.5 rounded font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF</span>
              </button>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
