import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  Store, 
  ChevronRight, 
  Share2, 
  HelpCircle,
  ThumbsUp,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { KENYA_COUNTIES, getCountyDeliveryInfo } from '../../data/locations';
import { INITIAL_REVIEWS } from '../../data/products';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    navigateTo, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice,
    showToast 
  } = useApp();

  const product = selectedProduct || products[0];

  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [destCounty, setDestCounty] = useState<string>('Nairobi');
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center center' });
  const [isZoomed, setIsZoomed] = useState(false);

  // Active reviews for this product
  const reviews = INITIAL_REVIEWS.filter(r => r.productId === product.id);

  // Delivery rate estimate
  const deliveryEstimate = getCountyDeliveryInfo(destCounty);

  // Related items
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const isFavorited = isInWishlist(product.id);

  // Image zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(1.8)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigateTo('home')} className="hover:text-[#104D49]">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('category', product.category)} className="hover:text-[#104D49]">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Gallery Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Zoomable Image Canvas */}
          <div 
            className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E7EBE8] shadow-xs cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-150 ease-out"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.discountPercentage && (
                <span className="bg-[#104D49] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Zoom hint overlay */}
            {!isZoomed && (
              <span className="absolute bottom-3 right-3 text-[10px] text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs pointer-events-none">
                Hover to zoom
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === i ? 'border-[#104D49] shadow-sm' : 'border-[#E7EBE8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Details & Purchase Actions (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-[#104D49] tracking-widest uppercase">
                {product.brand}
              </span>
              <button 
                onClick={handleShare}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[11px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-snug">
              {product.name}
            </h1>

            {/* Ratings & reviews count */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-lg bg-[#F7F8F6] border border-[#E7EBE8]">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#104D49]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Prices inclusive of 16% Kenyan VAT. Free pickup available in Nairobi.
            </p>
          </div>

          {/* Color Variant Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2">
                Select Color: <span className="font-medium text-[#104D49]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      selectedColor === color
                        ? 'border-[#104D49] bg-[#104D49] text-white font-medium'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Variant Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2">
                Select Size: <span className="font-medium text-[#104D49]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs rounded border transition-colors ${
                      selectedSize === size
                        ? 'border-[#104D49] bg-[#104D49] text-white font-medium'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock Availability */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-900">Quantity</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {product.stock} units in stock ready for dispatch
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                >
                  +
                </button>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded border border-slate-300 bg-white transition-colors ${
                  isFavorited ? 'text-rose-600 border-rose-300 bg-rose-50' : 'text-slate-600 hover:text-rose-600'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
              className="w-full bg-[#104D49] hover:bg-[#083C39] text-white py-3.5 px-6 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full bg-[#D99A68] hover:bg-[#c68957] text-[#083C39] py-3 px-6 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now with M-Pesa</span>
            </button>
          </div>
        </div>

        {/* Right: Seller Profile & Kenyan Delivery Calculator (3 Cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Seller Card */}
          <div className="bg-white p-5 rounded-lg border border-[#E7EBE8] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Merchant Information
            </span>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#104D49]/10 text-[#104D49] flex items-center justify-center flex-shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{product.sellerName}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Seller
                  </span>
                  <span>·</span>
                  <span className="text-amber-600 font-medium">★ {product.sellerRating}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Fast dispatch rate</span>
              <span className="font-semibold text-emerald-700">98% on-time</span>
            </div>
          </div>

          {/* Delivery & Logistics Calculator */}
          <div className="bg-white p-5 rounded-lg border border-[#E7EBE8] shadow-xs space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#104D49] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#D99A68]" />
              Kenyan Delivery Rates
            </span>

            {/* County Selector */}
            <div>
              <label className="text-xs text-slate-600 block mb-1">Deliver to County:</label>
              <select
                value={destCounty}
                onChange={(e) => setDestCounty(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-slate-300 rounded p-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#104D49]"
              >
                {KENYA_COUNTIES.map(c => (
                  <option key={c.county} value={c.county}>{c.county} County</option>
                ))}
              </select>
            </div>

            {/* Estimated rate card */}
            <div className="p-3 bg-[#F7F8F6] rounded border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Standard Delivery:</span>
                <span className="font-bold text-slate-900">{formatPrice(deliveryEstimate.standardFee)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#104D49]" />
                  Estimated time:
                </span>
                <span className="font-medium text-emerald-800">{deliveryEstimate.estimatedDays}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#104D49] flex-shrink-0" />
                <span>100% money-back escrow protection</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#104D49] flex-shrink-0" />
                <span>7 days return privilege</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Specifications & Description Tabs */}
      <div className="bg-white rounded-xl border border-[#E7EBE8] p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">Product Overview</h2>
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
            {product.description}
          </p>
        </div>

        {/* Key Features Bullet List */}
        {product.features && product.features.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Key Features & Benefits
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#104D49] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Technical Specifications
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden max-w-3xl">
              <table className="w-full text-xs text-left">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 border-b border-slate-200">
                        {spec.label}
                      </td>
                      <td className="py-2.5 px-4 text-slate-900 border-b border-slate-200">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Reviews Section */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Customer Reviews ({reviews.length > 0 ? reviews.length : product.reviewCount})
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">{product.rating} out of 5 stars</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Review submitted for moderation! Thank you for sharing your feedback.', 'success')}
              className="px-4 py-2 bg-slate-100 hover:bg-[#104D49] hover:text-white text-slate-800 rounded text-xs font-semibold transition-colors"
            >
              Write a Review
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 rounded-lg bg-[#F7F8F6] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                      <span className="text-[11px] text-slate-400">· {rev.userLocation}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{rev.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Showing verified buyer ratings summary. Be the first to post a detailed written review for this item!
            </p>
          )}
        </div>
      </div>

      {/* 4. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-6">
            Frequently Bought Together & Related Items
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
