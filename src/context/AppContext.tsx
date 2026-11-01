import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  User, 
  Seller, 
  PromoCode, 
  OrderStatus, 
  ProductCategory,
  AuditLog
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_SELLERS, INITIAL_ORDERS, INITIAL_PROMO_CODES, INITIAL_AUDIT_LOGS } from '../data/mockData';
import { getCountyDeliveryInfo } from '../data/locations';

export type AppView = 
  | 'home'
  | 'catalogue'
  | 'categories'
  | 'category'
  | 'product-detail'
  | 'search'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'register'
  | 'account'
  | 'tracking'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'shipping-policy'
  | 'returns-policy'
  | 'privacy'
  | 'terms'
  | 'seller-register'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'support';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation
  currentView: AppView;
  viewParam: string | null;
  navigateTo: (view: AppView, param?: string) => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProductStatus: (id: string, status: 'approved' | 'rejected') => void;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  
  // Delivery & Discount
  selectedCounty: string;
  setSelectedCounty: (county: string) => void;
  deliveryFee: number;
  appliedPromo: PromoCode | null;
  applyPromoCode: (codeStr: string) => boolean;
  removePromoCode: () => void;
  discountAmount: number;
  cartTotal: number;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: 'customer' | 'seller' | 'admin') => void;
  login: (email: string, role?: 'customer' | 'seller' | 'admin') => boolean;
  logout: () => void;
  registerUser: (name: string, email: string, phone: string, role?: 'customer' | 'seller') => void;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  
  // Sellers
  sellers: Seller[];
  registerSeller: (sellerData: Omit<Seller, 'id' | 'status' | 'rating' | 'totalSales' | 'pendingBalance' | 'joinedDate'>) => void;
  updateSellerStatus: (sellerId: string, status: 'approved' | 'suspended') => void;
  
  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;
  
  // Notification Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  
  // Helpers
  formatPrice: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [viewParam, setViewParam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products state (persisted or defaults)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kavora_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kavora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('kavora_wishlist');
    return saved ? JSON.parse(saved) : ['kav-prod-001', 'kav-prod-004'];
  });

  // Kenyan Delivery County
  const [selectedCounty, setSelectedCounty] = useState<string>('Nairobi');

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Authentication & Role
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kavora_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-default',
      name: 'Sarah Wambui',
      email: 'sarah.wambui@gmail.com',
      phone: '+254 712 908 123',
      role: 'customer',
      county: 'Nairobi',
      town: 'Parklands'
    };
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kavora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Sellers
  const [sellers, setSellers] = useState<Seller[]>(() => {
    const saved = localStorage.getItem('kavora_sellers');
    return saved ? JSON.parse(saved) : INITIAL_SELLERS;
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('kavora_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kavora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kavora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kavora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kavora_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kavora_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('kavora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kavora_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('kavora_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation
  const navigateTo = (view: AppView, param?: string) => {
    setCurrentView(view);
    setViewParam(param || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency Formatter
  const formatPrice = (amount: number): string => {
    return `KES ${Math.round(amount).toLocaleString('en-KE')}`;
  };

  // Cart calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Delivery Fee
  const deliveryInfo = getCountyDeliveryInfo(selectedCounty);
  const rawDeliveryFee = cart.length === 0 ? 0 : deliveryInfo.standardFee;
  
  // Promo calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = (cartSubtotal * appliedPromo.discountValue) / 100;
    } else if (appliedPromo.discountType === 'fixed') {
      discountAmount = Math.min(appliedPromo.discountValue, cartSubtotal);
    }
  }

  // Free shipping promo condition
  let deliveryFee = rawDeliveryFee;
  if (appliedPromo?.code === 'FREESHIP' && cartSubtotal >= 5000) {
    deliveryFee = 0;
  }

  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const matchIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    showToast(`Added "${product.name.slice(0, 32)}..." to your bag`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
    ));
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (codeStr: string): boolean => {
    const clean = codeStr.trim().toUpperCase();
    const found = INITIAL_PROMO_CODES.find(p => p.code === clean && p.isActive);
    if (!found) {
      showToast('Invalid or expired promotional code', 'error');
      return false;
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      showToast(`Requires minimum spend of ${formatPrice(found.minSpend)}`, 'warning');
      return false;
    }

    setAppliedPromo(found);
    showToast(`Promo "${found.code}" applied successfully!`, 'success');
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Role switching & Auth
  const switchRole = (newRole: 'customer' | 'seller' | 'admin') => {
    if (newRole === 'customer') {
      setCurrentUser({
        id: 'usr-customer-01',
        name: 'Sarah Wambui',
        email: 'sarah.wambui@gmail.com',
        phone: '+254 712 908 123',
        role: 'customer',
        county: 'Nairobi',
        town: 'Parklands'
      });
      showToast('Switched to Customer mode (Sarah Wambui)', 'info');
    } else if (newRole === 'seller') {
      setCurrentUser({
        id: 'usr-seller-01',
        name: 'James Kariuki',
        email: 'james@istorewestlands.co.ke',
        phone: '+254 712 345 678',
        role: 'seller',
        county: 'Nairobi',
        town: 'Westlands'
      });
      showToast('Switched to Seller Portal (iStore Westlands Hub)', 'info');
    } else if (newRole === 'admin') {
      setCurrentUser({
        id: 'usr-admin-01',
        name: 'Kavora Executive Admin',
        email: 'admin@kavora.africa',
        phone: '+254 700 000 001',
        role: 'admin',
        county: 'Nairobi',
        town: 'Westlands'
      });
      showToast('Switched to Administrator Control Panel', 'info');
    }
  };

  const login = (email: string, role: 'customer' | 'seller' | 'admin' = 'customer'): boolean => {
    const user: User = {
      id: 'usr-' + Date.now().toString().slice(-5),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '+254 712 000 000',
      role,
      county: 'Nairobi',
      town: 'Westlands'
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out safely', 'info');
    navigateTo('home');
  };

  const registerUser = (name: string, email: string, phone: string, role: 'customer' | 'seller' = 'customer') => {
    const newUser: User = {
      id: 'usr-' + Date.now().toString().slice(-5),
      name,
      email,
      phone,
      role,
      county: 'Nairobi',
      town: 'Westlands'
    };
    setCurrentUser(newUser);
    showToast(`Account created! Karibu sana, ${name}`, 'success');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory'>): Order => {
    const orderNumber = `KAV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestampStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      ...orderData,
      id: orderNumber,
      createdAt: now.toISOString(),
      statusHistory: [
        {
          status: 'Pending Payment',
          timestamp: timestampStr,
          note: `Order submitted via ${orderData.paymentMethod.toUpperCase()}`
        },
        {
          status: 'Payment Confirmed',
          timestamp: timestampStr,
          note: `M-Pesa Daraja callback processed. Ref: ${orderData.paymentReference || 'QKE' + Math.random().toString().slice(2, 9).toUpperCase()}`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    addAuditLog('ORDER_CREATED', `Order ${orderNumber} placed for ${formatPrice(newOrder.total)} by ${orderData.customerName}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date();
    const timestampStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          statusHistory: [
            ...order.statusHistory,
            {
              status,
              timestamp: timestampStr,
              note: note || `Status updated to ${status}`
            }
          ]
        };
      }
      return order;
    }));

    addAuditLog('ORDER_STATUS_UPDATE', `Order ${orderId} moved to ${status}`);
    showToast(`Order ${orderId} status set to "${status}"`, 'info');
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase() || o.customerPhone.includes(orderId));
  };

  // Products manipulation
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = 'kav-prod-' + Math.floor(100 + Math.random() * 900);
    const newProduct: Product = {
      ...prodData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('PRODUCT_SUBMITTED', `New product listing "${newProduct.name}" submitted for approval`);
    showToast(`Product "${newProduct.name}" submitted successfully for catalog review!`, 'success');
  };

  const updateProductStatus = (id: string, status: 'approved' | 'rejected') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    addAuditLog('PRODUCT_REVIEW', `Product ${id} marked as ${status}`);
    showToast(`Product listing ${status}`, 'info');
  };

  // Sellers
  const registerSeller = (sellerData: Omit<Seller, 'id' | 'status' | 'rating' | 'totalSales' | 'pendingBalance' | 'joinedDate'>) => {
    const newId = 'sel-' + Math.floor(100 + Math.random() * 900);
    const newSeller: Seller = {
      ...sellerData,
      id: newId,
      status: 'pending',
      rating: 5.0,
      totalSales: 0,
      pendingBalance: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setSellers(prev => [newSeller, ...prev]);
    addAuditLog('SELLER_REGISTRATION', `New seller application from ${newSeller.storeName} (KRA PIN: ${newSeller.kraPin})`);
    showToast('Seller application submitted! Our merchant verification team will review your business credentials within 24 hours.', 'success');
  };

  const updateSellerStatus = (sellerId: string, status: 'approved' | 'suspended') => {
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status } : s));
    addAuditLog('SELLER_STATUS_UPDATE', `Seller ${sellerId} status changed to ${status}`);
    showToast(`Seller store ${status}`, 'info');
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now().toString(),
      action,
      actor: currentUser?.name || 'System Operator',
      details,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Selected product resolution
  const selectedProduct = viewParam ? products.find(p => p.id === viewParam || p.slug === viewParam) || null : null;

  return (
    <AppContext.Provider
      value={{
        currentView,
        viewParam,
        navigateTo,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProductStatus,
        selectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        selectedCounty,
        setSelectedCounty,
        deliveryFee,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        setCurrentUser,
        switchRole,
        login,
        logout,
        registerUser,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        sellers,
        registerSeller,
        updateSellerStatus,
        auditLogs,
        addAuditLog,
        toasts,
        showToast,
        dismissToast,
        formatPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
