import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Search, 
  Star, 
  Check, 
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../common/ProductCard';
import { ProductCategory, Product } from '../../types';

interface CataloguePageProps {
  initialCategory?: ProductCategory | string;
  initialSearch?: string;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  initialCategory,
  initialSearch
}) => {
  const { products, navigateTo, addToCart, formatPrice, viewParam } = useApp();

  // Active filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || (viewParam && CATEGORIES.some(c => c.name === viewParam) ? viewParam : 'All')
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [keyword, setKeyword] = useState<string>(initialSearch || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands from active catalog
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach(p => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  // Handle brand toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(250000);
    setMinRating(0);
    setInStockOnly(false);
    setKeyword('');
    setSortBy('relevance');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Must be approved
      if (product.status !== 'approved') return false;

      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Brand match
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // In stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Keyword query
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // relevance
    });
  }, [products, selectedCategory, selectedBrands, minPrice, maxPrice, minRating, inStockOnly, keyword, sortBy]);

  // Sidebar filter component
  const FilterSidebar = (
    <div className="space-y-6 text-xs text-slate-700">
      {/* Header with Clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <span className="text-sm font-bold text-slate-900 font-display flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-[#104D49]" />
          Filters
        </span>
        <button
          onClick={resetFilters}
          className="text-xs text-[#104D49] hover:underline font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left py-1 px-2 rounded flex items-center justify-between transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#104D49] text-white font-medium'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>All Departments</span>
            <span>({products.filter(p => p.status === 'approved').length})</span>
          </button>
          {CATEGORIES.map(cat => {
            const count = products.filter(p => p.category === cat.name && p.status === 'approved').length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left py-1 px-2 rounded flex items-center justify-between transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-[#104D49] text-white font-medium'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map(brand => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="rounded border-slate-300 text-[#104D49] focus:ring-[#104D49]"
                />
                <span className="truncate">{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Price Range (KES)
        </h4>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={250000}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#104D49] cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>{formatPrice(minPrice)}</span>
            <span className="font-semibold text-slate-900">{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map(star => (
            <button
              key={star}
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className={`w-full text-left py-1.5 px-2 rounded flex items-center gap-2 transition-colors ${
                minRating === star ? 'bg-[#104D49]/10 text-[#104D49] font-semibold' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < star ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-[11px]">& Above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-[#104D49] focus:ring-[#104D49]"
          />
          <span className="font-medium">In Stock Items Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Breadcrumbs & Department Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#104D49]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('catalogue')} className="hover:text-[#104D49]">
            Catalogue
          </button>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-slate-800 font-semibold">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              {selectedCategory === 'All' ? 'All Marketplace Products' : selectedCategory}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredProducts.length} verified results with nationwide Kenyan delivery
            </p>
          </div>

          {/* Quick Keyword Search inside Catalogue */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Refine in this list..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:border-[#104D49]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* 2. Top Controls Strip (Mobile filter toggle, Sort dropdown, Grid/List switcher) */}
      <div className="bg-white p-3 rounded-lg border border-[#E7EBE8] mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded bg-slate-100 text-xs font-semibold text-slate-800 hover:bg-slate-200"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#104D49]" />
          <span>Filters ({selectedBrands.length + (selectedCategory !== 'All' ? 1 : 0)})</span>
        </button>

        {/* Applied active filter pills */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#104D49]/10 text-[#104D49] text-xs font-medium">
              {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
            </span>
          )}
          {selectedBrands.map(b => (
            <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
              {b}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(b)} />
            </span>
          ))}
          {maxPrice < 250000 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
              Up to {formatPrice(maxPrice)}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(250000)} />
            </span>
          )}
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#104D49] cursor-pointer"
            >
              <option value="relevance">Relevance & Best Match</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

          {/* Grid vs List toggle */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#104D49] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-[#104D49] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Grid Layout with Left Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar (1 Column) */}
        <aside className="hidden lg:block bg-white p-5 rounded-lg border border-[#E7EBE8] sticky top-36">
          {FilterSidebar}
        </aside>

        {/* Products Grid (3 Columns) */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              /* List View layout */
              <div className="space-y-4">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="bg-white border border-[#E7EBE8] rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
                  >
                    <div 
                      onClick={() => navigateTo('product-detail', prod.id)}
                      className="w-full sm:w-44 h-44 rounded bg-slate-50 overflow-hidden flex-shrink-0 cursor-pointer"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-[#104D49]">{prod.brand}</span>
                          <span className="text-amber-500 flex items-center gap-1 font-medium">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {prod.rating} ({prod.reviewCount})
                          </span>
                        </div>
                        <h3 
                          onClick={() => navigateTo('product-detail', prod.id)}
                          className="text-base font-bold text-slate-900 hover:text-[#104D49] cursor-pointer"
                        >
                          {prod.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                          {prod.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#104D49]">{formatPrice(prod.price)}</span>
                          {prod.originalPrice && (
                            <span className="text-xs text-slate-400 line-through ml-2">
                              {formatPrice(prod.originalPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="bg-[#104D49] hover:bg-[#083C39] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="bg-white rounded-lg border border-[#E7EBE8] p-12 text-center">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No matching products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                We couldn't find any items matching your active filter criteria. Try clearing some filters or searching with a different term.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#104D49] text-white rounded text-xs font-semibold hover:bg-[#083C39]"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <span className="font-bold text-base text-slate-900">Filter Products</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterSidebar}
            <div className="mt-8 pt-4 border-t border-slate-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#104D49] text-white py-2.5 rounded text-xs font-semibold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
