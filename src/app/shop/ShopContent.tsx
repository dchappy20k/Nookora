'use client';

import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Filter, X, ShieldCheck } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';
import { productService } from '@/services/productService';

const CATEGORIES = [
  'All',
  'Lighting',
  'Bedsheets',
  'Furniture',
  'Wall Decor',
  'Storage',
  'Rugs',
  'Plants',
  'Desk accessories',
];

export default function ShopContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);

  const filteredProducts = useMemo(() => {
    return productService.filterProducts(selectedCategory, maxPrice, searchQuery);
  }, [selectedCategory, maxPrice, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* 1. HEADER */}
      <section className="bg-[#141b17] border-b border-[rgba(216,193,154,0.14)] py-12">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C19A] block mb-2">
            Verified Renter Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#F2EFE7] font-normal">
            Shop Key Makeover Pieces
          </h1>
          <p className="text-xs md:text-sm text-[#C0BBAF] mt-2 max-w-xl">
            Individual fixtures, lamps, linens, and pegboards featured in real Nookora room makeovers. 100% renter-friendly with zero landlord drama.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <section className="sticky top-20 z-30 bg-[#111714]/95 backdrop-blur-md border-b border-[rgba(216,193,154,0.14)] py-4">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#898C83]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, lamps, rugs, retailers..."
                className="w-full pl-10 pr-9 py-2 bg-[#18211C] border border-[rgba(216,193,154,0.18)] focus:border-[#D8C19A] rounded text-xs text-[#F2EFE7] placeholder:text-[#898C83] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#898C83] hover:text-[#F2EFE7]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-3 bg-[#18211C] px-4 py-2 rounded border border-[rgba(216,193,154,0.15)] text-xs">
              <span className="text-[#898C83] whitespace-nowrap">Max Price:</span>
              <input
                type="range"
                min="500"
                max="5000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#D8C19A] cursor-pointer"
              />
              <span className="font-serif text-[#D8C19A] font-semibold">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#D8C19A] text-[#111714] font-semibold shadow-md'
                    : 'bg-[#18211C] text-[#C0BBAF] hover:text-[#F2EFE7] border border-[rgba(216,193,154,0.1)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-12">
        <div className="flex items-center justify-between text-xs text-[#898C83] mb-8 pb-3 border-b border-[rgba(216,193,154,0.08)]">
          <span>
            Showing <strong className="text-[#F2EFE7]">{filteredProducts.length}</strong> verified products
          </span>
          <div className="flex items-center gap-1.5 text-[#929F87]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Direct retailer links to verified listings</span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center max-w-sm mx-auto space-y-3">
            <ShoppingBag className="w-10 h-10 text-[#898C83] mx-auto" />
            <h3 className="font-serif text-xl text-[#F2EFE7]">No products found</h3>
            <p className="text-xs text-[#C0BBAF]">
              Try adjusting your price ceiling or search terms to see available pieces.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setMaxPrice(5000);
              }}
              className="px-4 py-2 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
