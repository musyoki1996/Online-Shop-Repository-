import { ProductCategory } from '../types';

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
  popularSubcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    itemCount: 1420,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    description: 'Smart TVs, audio equipment, home theatre, digital cameras and high-fidelity tech.',
    popularSubcategories: ['Smart TVs', 'Audio & Speakers', 'Cameras', 'Laptops & Computing', 'Gaming']
  },
  {
    id: 'cat-phones',
    name: 'Phones & Accessories',
    slug: 'phones-accessories',
    itemCount: 2150,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'Latest flagship smartphones, tablets, fast chargers, wireless earbuds, and durable protective cases.',
    popularSubcategories: ['Flagship Smartphones', 'Smartwatches', 'Earbuds & Headphones', 'Power Banks', 'Cases & Covers']
  },
  {
    id: 'cat-fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion-apparel',
    itemCount: 3840,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Curated African designer pieces, formal wear, bespoke leathercraft, footwear, and essentials.',
    popularSubcategories: ['Men’s Tailoring', 'Women’s Contemporary', 'Footwear', 'Leather Bags', 'Traditional & Ankara']
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    itemCount: 1290,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury skincare, dermatological solutions, clean haircare, natural shea butters, and fragrances.',
    popularSubcategories: ['Skincare & Serums', 'Luxury Perfumes', 'Haircare & Growth', 'Body Oils', 'Sun Care']
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    slug: 'home-living',
    itemCount: 1840,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural lighting, hand-woven Kenyan sisal baskets, luxury bedding, and statement decor.',
    popularSubcategories: ['Decor & Accents', 'Lighting', 'Luxury Bedding', 'Wall Art', 'Storage & Organization']
  },
  {
    id: 'cat-furniture',
    name: 'Furniture',
    slug: 'furniture',
    itemCount: 680,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Solid mahogany and mvule hardwood tables, ergonomic executive chairs, and bespoke lounge suites.',
    popularSubcategories: ['Living Room Suites', 'Ergonomic Office Chairs', 'Dining Sets', 'Solid Wood Beds']
  },
  {
    id: 'cat-kitchen',
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    itemCount: 1120,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Espresso machines, air fryers, cast iron cookware, artisan stoneware dinner sets, and cutlery.',
    popularSubcategories: ['Espresso & Coffee', 'Air Fryers & Blenders', 'Cookware Sets', 'Dinnerware & Glassware']
  },
  {
    id: 'cat-supermarket',
    name: 'Supermarket & Groceries',
    slug: 'supermarket-groceries',
    itemCount: 2400,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Single-origin Kenyan coffee, Mount Kenya organic teas, pantry staples, artisanal snacks, and beverages.',
    popularSubcategories: ['Kenyan Coffee & Teas', 'Organic Pantry', 'Healthy Snacks', 'Beverages', 'Household Essentials']
  },
  {
    id: 'cat-sports',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    itemCount: 950,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Running gear for champions, gym equipment, trail hiking backpacks, camping gear, and cycling.',
    popularSubcategories: ['Marathon & Running', 'Home Gym & Dumbbells', 'Hiking & Camping', 'Cycling Gear']
  },
  {
    id: 'cat-automotive',
    name: 'Automotive',
    slug: 'automotive',
    itemCount: 780,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    description: 'Dashcams, heavy-duty emergency toolkits, car detailing kits, high-output inverters, and accessories.',
    popularSubcategories: ['Car Tech & Dashcams', 'Detailing & Wax', 'Emergency Toolkits', 'Jump Starters & Inverters']
  },
  {
    id: 'cat-baby',
    name: 'Baby & Kids',
    slug: 'baby-kids',
    itemCount: 1100,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    description: 'Safe organic cotton apparel, European-standard car seats, educational STEM toys, and nursery essentials.',
    popularSubcategories: ['Baby Strollers & Seats', 'Nursery Furniture', 'STEM Toys', 'Organic Cotton Wear']
  },
  {
    id: 'cat-books',
    name: 'Books & Stationery',
    slug: 'books-stationery',
    itemCount: 1650,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    description: 'African literature, business & leadership titles, luxury fountain pens, premium Italian leather journals.',
    popularSubcategories: ['African Literature', 'Business & Leadership', 'Luxury Stationery', 'Academic & Professional']
  },
  {
    id: 'cat-health',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    itemCount: 890,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    description: 'Certified supplements, digital blood pressure monitors, organic moringa, essential oils, and orthopedic pillows.',
    popularSubcategories: ['Vitamins & Supplements', 'Health Monitors', 'Superfoods & Moringa', 'Aromatherapy']
  },
  {
    id: 'cat-watches',
    name: 'Watches & Accessories',
    slug: 'watches-accessories',
    itemCount: 720,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Chronograph luxury timepieces, polarized sunglasses, fine sterling silver cufflinks, and jewelry.',
    popularSubcategories: ['Automatic Chronographs', 'Minimalist Dress Watches', 'Polarized Eyewear', 'Fine Jewelry']
  }
];
