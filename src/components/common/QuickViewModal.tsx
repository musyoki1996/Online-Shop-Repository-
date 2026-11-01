import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    navigateTo, 
    isInWishlist, 
    toggleWishlist,
    formatPrice 
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    quickViewProduct?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    quickViewProduct?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product-detail', id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#E7EBE8]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Gallery Column */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === i ? 'border-[#104D49]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-[#104D49] tracking-wider uppercase">
                  {quickViewProduct.brand}
                </span>
                <span className="text-slate-400">{quickViewProduct.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">{quickViewProduct.rating}</span>
                <span className="text-slate-400">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#104D49]">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                {quickViewProduct.discountPercentage && (
                  <span className="text-xs font-bold text-[#D99A68] bg-[#104D49]/10 px-2 py-0.5 rounded">
                    Save {quickViewProduct.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Colors selection */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Color: <span className="font-normal text-slate-600">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                          selectedColor === color
                            ? 'border-[#104D49] bg-[#104D49] text-white font-medium'
                            : 'border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes selection */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Size: <span className="font-normal text-slate-600">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                          selectedSize === size
                            ? 'border-[#104D49] bg-[#104D49] text-white font-medium'
                            : 'border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock status */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-700 font-medium">In Stock ({quickViewProduct.stock} units ready in Nairobi)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#104D49] hover:bg-[#083C39] text-white py-2.5 px-4 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 rounded border border-slate-200 transition-colors ${
                    isFavorited ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Full details link */}
              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold text-[#104D49] hover:text-[#083C39] py-1 flex items-center justify-center gap-1"
              >
                <span>View Full Product Specifications & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
