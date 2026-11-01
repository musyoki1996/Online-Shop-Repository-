import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const CategoriesBrowserPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D99A68]">
          Curated Departments
        </span>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          Browse All 14 Product Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Discover certified electronics, African designer fashion, home living, beauty, Kenyan coffee, and everyday essentials.
        </p>
      </div>

      {/* Grid of 14 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => navigateTo('category', category.name)}
            className="group cursor-pointer bg-white rounded-xl border border-[#E7EBE8] overflow-hidden shadow-xs hover:border-[#104D49] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D99A68] block">
                  {category.itemCount.toLocaleString()} Verified Items
                </span>
                <h3 className="text-lg font-bold font-display leading-tight">{category.name}</h3>
              </div>
            </div>

            {/* Description & Subcategories */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Popular Subcategories Pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {category.popularSubcategories.slice(0, 3).map(sub => (
                    <span 
                      key={sub} 
                      className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#104D49]">
                <span>Shop {category.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
