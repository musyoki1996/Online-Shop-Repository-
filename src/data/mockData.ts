import { Seller, Order, PromoCode, User, AuditLog } from '../types';

export const INITIAL_SELLERS: Seller[] = [
  {
    id: 'sel-001',
    storeName: 'iStore Westlands Hub',
    ownerName: 'James Kariuki',
    email: 'james@istorewestlands.co.ke',
    phone: '+254 712 345 678',
    kraPin: 'P051289456M',
    businessRegNumber: 'BN-892144-KE',
    county: 'Nairobi',
    town: 'Westlands',
    bankOrMpesaPayout: 'M-Pesa Till 894102',
    categories: ['Phones & Accessories', 'Electronics'],
    description: 'Authorized Apple and premium tech distributor located in Westlands Mall, Nairobi.',
    status: 'approved',
    commissionRate: 8,
    rating: 4.95,
    totalSales: 3450000,
    pendingBalance: 245000,
    joinedDate: '2025-11-10'
  },
  {
    id: 'sel-004',
    storeName: 'Karen Leather Artisans Guild',
    ownerName: 'Faith Mutiso',
    email: 'faith@karenleather.com',
    phone: '+254 722 987 654',
    kraPin: 'P067123987K',
    businessRegNumber: 'BN-763421-KE',
    county: 'Nairobi',
    town: 'Karen',
    bankOrMpesaPayout: 'NCBA Bank - A/C 100293847',
    categories: ['Fashion & Apparel', 'Home & Living'],
    description: 'Bespoke hand-crafted Kenyan full-grain leather bags, belts, and luxury safari accessories.',
    status: 'approved',
    commissionRate: 10,
    rating: 4.98,
    totalSales: 1890000,
    pendingBalance: 168000,
    joinedDate: '2026-01-15'
  },
  {
    id: 'sel-007',
    storeName: 'Equator Roasters Kenya',
    ownerName: 'Peter Kibet',
    email: 'sales@equatorroasters.ke',
    phone: '+254 733 445 566',
    kraPin: 'P059887711Q',
    businessRegNumber: 'BN-903125-KE',
    county: 'Nyeri',
    town: 'Nyeri Town',
    bankOrMpesaPayout: 'M-Pesa Paybill 247247 A/C 98124',
    categories: ['Supermarket & Groceries'],
    description: 'Specialty coffee roasters sourcing single-estate beans from Mount Kenya & Kericho highlands.',
    status: 'approved',
    commissionRate: 10,
    rating: 4.99,
    totalSales: 940000,
    pendingBalance: 82000,
    joinedDate: '2026-02-01'
  },
  {
    id: 'sel-014-pending',
    storeName: 'Maasai Mara Beadworks Collective',
    ownerName: 'Naserian Senteu',
    email: 'naserian@marabeads.org',
    phone: '+254 701 556 778',
    kraPin: 'P078129984Z',
    businessRegNumber: 'BN-104928-KE',
    county: 'Kajiado',
    town: 'Kiserian',
    bankOrMpesaPayout: 'M-Pesa 0701556778',
    categories: ['Fashion & Apparel', 'Watches & Accessories'],
    description: 'Community-led women cooperative producing traditional ceremonial and contemporary glass bead accessories.',
    status: 'pending',
    commissionRate: 10,
    rating: 5.0,
    totalSales: 0,
    pendingBalance: 0,
    joinedDate: '2026-10-28'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'KAV-2026-8941',
    customerName: 'Sarah Wambui',
    customerEmail: 'sarah.wambui@gmail.com',
    customerPhone: '+254 712 908 123',
    deliveryAddress: {
      street: 'Ring Road Parklands, Block C Apt 4B',
      county: 'Nairobi',
      town: 'Parklands',
      buildingApartment: 'Skyview Terrace, 4th Floor',
      deliveryInstructions: 'Call rider upon arrival at gate. Reception has access.'
    },
    items: [
      {
        productId: 'kav-prod-001',
        productName: 'Apple iPhone 15 Pro 256GB - Natural Titanium',
        productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
        price: 178500,
        quantity: 1,
        color: 'Natural Titanium',
        sellerName: 'iStore Westlands Hub'
      }
    ],
    subtotal: 178500,
    deliveryFee: 250,
    discountAmount: 0,
    total: 178750,
    paymentMethod: 'mpesa',
    paymentReference: 'QKD8941ZX90',
    status: 'Out for Delivery',
    statusHistory: [
      { status: 'Pending Payment', timestamp: '2026-10-31 10:14 AM', note: 'Customer initiated checkout with M-Pesa STK Push' },
      { status: 'Payment Confirmed', timestamp: '2026-10-31 10:15 AM', note: 'M-Pesa Daraja Callback Verified. Receipt: QKD8941ZX90' },
      { status: 'Processing', timestamp: '2026-10-31 11:30 AM', note: 'Verified genuine seal and packaged at Westlands Hub' },
      { status: 'Ready for Dispatch', timestamp: '2026-10-31 01:20 PM', note: 'Handed over to Kavora Express Courier' },
      { status: 'Shipped', timestamp: '2026-11-01 08:30 AM', note: 'Dispatched from Nairobi Central Logistics Center' },
      { status: 'Out for Delivery', timestamp: '2026-11-01 09:45 AM', note: 'With courier rider Kevin (+254 799 123 456)' }
    ],
    estimatedDeliveryDate: 'Today by 2:00 PM',
    createdAt: '2026-10-31T10:14:00Z'
  },
  {
    id: 'KAV-2026-7720',
    customerName: 'Kevin Mutua',
    customerEmail: 'k.mutua@enterprise.co.ke',
    customerPhone: '+254 722 456 789',
    deliveryAddress: {
      street: 'Nyali Links Road, Villa 12',
      county: 'Mombasa',
      town: 'Nyali',
      buildingApartment: 'Palms Beach Court',
      deliveryInstructions: 'Deliver between 10am and 4pm'
    },
    items: [
      {
        productId: 'kav-prod-004',
        productName: 'Ostrich & Full-Grain Bovine Leather Safari Weekender Duffel',
        productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        price: 26500,
        quantity: 1,
        color: 'Cognac Tan',
        sellerName: 'Karen Leather Artisans Guild'
      },
      {
        productId: 'kav-prod-007',
        productName: 'Single Origin Mount Kenya Peaberry Arabica Coffee (Whole Bean 1kg)',
        productImage: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
        price: 2400,
        quantity: 2,
        sellerName: 'Equator Roasters Kenya'
      }
    ],
    subtotal: 31300,
    deliveryFee: 450,
    discountAmount: 2000,
    total: 29750,
    paymentMethod: 'mpesa',
    paymentReference: 'QKC7720AA12',
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending Payment', timestamp: '2026-10-24 02:10 PM', note: 'Checkout initiated' },
      { status: 'Payment Confirmed', timestamp: '2026-10-24 02:11 PM', note: 'M-Pesa confirmed' },
      { status: 'Processing', timestamp: '2026-10-25 09:00 AM', note: 'Packed at Nairobi Hub' },
      { status: 'Shipped', timestamp: '2026-10-25 04:30 PM', note: 'Coastway Overnight Transit to Mombasa' },
      { status: 'Out for Delivery', timestamp: '2026-10-27 10:00 AM', note: 'Out for delivery in Nyali' },
      { status: 'Delivered', timestamp: '2026-10-27 01:15 PM', note: 'Signed and delivered to recipient' }
    ],
    estimatedDeliveryDate: '27 Oct 2026',
    createdAt: '2026-10-24T14:10:00Z'
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: 'KAVORA10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off your entire order (Welcome bonus)',
    isActive: true
  },
  {
    code: 'KARIBU2026',
    discountType: 'fixed',
    discountValue: 1500,
    minSpend: 15000,
    description: 'KES 1,500 off orders exceeding KES 15,000',
    isActive: true
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 450,
    minSpend: 5000,
    description: 'Free Standard Delivery across Kenya on orders above KES 5,000',
    isActive: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    action: 'SELLER_VERIFICATION',
    actor: 'Admin (System Superuser)',
    details: 'Approved seller registration for iStore Westlands Hub after KRA PIN & Business Registration validation.',
    timestamp: '2026-10-20 14:22:01'
  },
  {
    id: 'log-02',
    action: 'MPESA_SETTLEMENT',
    actor: 'Daraja Reconciliation Engine',
    details: 'Batch payout settled for Karen Leather Artisans Guild (KES 168,000 via B2C Daraja).',
    timestamp: '2026-10-28 09:15:30'
  },
  {
    id: 'log-03',
    action: 'PRODUCT_APPROVAL',
    actor: 'Admin Moderator',
    details: 'Approved product listing: Vitron 55" 4K UHD Frameless Smart Android TV.',
    timestamp: '2026-10-29 11:40:12'
  }
];
