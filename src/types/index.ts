export type ProductCategory = 
  | 'Electronics'
  | 'Phones & Accessories'
  | 'Fashion & Apparel'
  | 'Beauty & Personal Care'
  | 'Home & Living'
  | 'Furniture'
  | 'Kitchen & Dining'
  | 'Supermarket & Groceries'
  | 'Sports & Outdoors'
  | 'Automotive'
  | 'Baby & Kids'
  | 'Books & Stationery'
  | 'Health & Wellness'
  | 'Watches & Accessories';

export interface ProductReview {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  price: number; // in KES
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  images: string[];
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  colors?: string[];
  sizes?: string[];
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerVerified: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 
  | 'Pending Payment'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Ready for Dispatch'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  sellerName: string;
}

export interface Order {
  id: string; // e.g. KAV-2026-8941
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    county: string;
    town: string;
    buildingApartment?: string;
    deliveryInstructions?: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: 'mpesa' | 'card' | 'airtel' | 'bank';
  paymentReference?: string;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  estimatedDeliveryDate: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  county?: string;
  town?: string;
  savedAddresses?: {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    county: string;
    town: string;
    street: string;
    isDefault: boolean;
  }[];
}

export interface Seller {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  kraPin: string;
  businessRegNumber: string;
  county: string;
  town: string;
  bankOrMpesaPayout: string;
  categories: ProductCategory[];
  description: string;
  status: 'pending' | 'approved' | 'suspended';
  commissionRate: number; // percentage, e.g. 10
  rating: number;
  totalSales: number;
  pendingBalance: number;
  joinedDate: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
  isActive: boolean;
}

export interface CountyDeliveryZone {
  county: string;
  towns: string[];
  standardFee: number;
  expressFee: number;
  estimatedDays: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  details: string;
  timestamp: string;
}
