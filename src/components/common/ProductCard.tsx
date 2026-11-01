import React from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateTo, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setQuickViewProduct,
    formatPrice 
  } = useApp();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-white border border-[#E7EBE8] rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      {/* 1. Image Container with Badges & Action Overlays */}
      <div className="relative aspect-square w-full bg-[#F7F8F6] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onClick={() => navigateTo('product-detail', product.id)}
        />

        {/* Top Badges (Discount & Stock) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="bg-[#104D49] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs">
              -{product.discountPercentage}%
            </span>
          ) : null}

          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-600 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            isFavorited 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-0 bottom-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full bg-white/95 backdrop-blur-xs hover:bg-[#104D49] text-slate-800 hover:text-white py-1.5 px-3 rounded text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Meta & Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category line */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-[11px] font-semibold text-[#104D49] tracking-wider uppercase truncate max-w-[120px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => navigateTo('product-detail', product.id)}
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#104D49] cursor-pointer line-clamp-2 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* 3. Pricing and Add to Bag */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#104D49]">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 sm:px-3 sm:py-1.5 rounded bg-[#104D49]/10 hover:bg-[#104D49] text-[#104D49] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
            title="Add to shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
