'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Sparkles, ArrowUpDown, Filter } from 'lucide-react';
import { RoomCard } from '@/components/room/RoomCard';
import { roomService } from '@/services/roomService';
import { BUDGET_TIERS, AESTHETIC_CATEGORIES, SPACE_TYPES } from '@/data/categories';
import { BudgetTier, FilterState } from '@/types';

export default function ExploreContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('all');
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>('All');
  const [selectedSpaceType, setSelectedSpaceType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [maxBudgetSlider, setMaxBudgetSlider] = useState<number>(20000);

  // Sync with URL query parameters on initial load
  useEffect(() => {
    const budgetParam = searchParams.get('budget') as BudgetTier | null;
    const aestheticParam = searchParams.get('aesthetic');
    if (budgetParam) setSelectedBudget(budgetParam);
    if (aestheticParam) setSelectedAesthetic(aestheticParam);
  }, [searchParams]);

  const filteredRooms = useMemo(() => {
    return roomService.filterRooms({
      searchQuery,
      budgetTier: selectedBudget,
      aesthetic: selectedAesthetic,
      spaceType: selectedSpaceType,
      maxBudget: maxBudgetSlider,
      sortBy,
    });
  }, [searchQuery, selectedBudget, selectedAesthetic, selectedSpaceType, maxBudgetSlider, sortBy]);

  const activeFiltersCount =
    (selectedBudget !== 'all' ? 1 : 0) +
    (selectedAesthetic !== 'All' ? 1 : 0) +
    (selectedSpaceType !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (maxBudgetSlider < 20000 ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBudget('all');
    setSelectedAesthetic('All');
    setSelectedSpaceType('All');
    setMaxBudgetSlider(20000);
    setSortBy('featured');
  };

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* 1. EDITORIAL HEADER & TITLE */}
      <section className="bg-[#141b17] border-b border-[rgba(216,193,154,0.14)] pt-12 pb-10">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C19A] block mb-2">
                Curated Discovery Feed
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#F2EFE7] font-normal">
                Explore Room Transformations
              </h1>
              <p className="text-xs md:text-sm text-[#C0BBAF] mt-2 max-w-xl">
                Browse verified Indian rental room makeovers with transparent product receipts, room dimensions, and drill-free styling protocols.
              </p>
            </div>

            {/* Quick Filter Drawer Button (Mobile/Desktop) */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#202A24] border border-[rgba(216,193,154,0.25)] hover:border-[#D8C19A] text-xs font-semibold uppercase tracking-wider text-[#F2EFE7] transition-all self-start md:self-auto"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D8C19A]" />
              <span>Filters & Refine</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D8C19A] text-[#111714] text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER & SEARCH TOOLBAR */}
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
                placeholder="Search by city, aesthetic, creator, or space..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#18211C] border border-[rgba(216,193,154,0.18)] focus:border-[#D8C19A] rounded text-xs text-[#F2EFE7] placeholder:text-[#898C83] focus:outline-none transition-colors"
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

            {/* Budget Pill Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[10px] uppercase tracking-wider text-[#898C83] font-mono mr-1 hidden sm:inline">
                Budget:
              </span>
              <button
                onClick={() => setSelectedBudget('all')}
                className={`text-xs px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                  selectedBudget === 'all'
                    ? 'bg-[#D8C19A] text-[#111714] font-semibold'
                    : 'bg-[#18211C] text-[#C0BBAF] hover:text-[#F2EFE7] border border-[rgba(216,193,154,0.12)]'
                }`}
              >
                All Budgets
              </button>
              {BUDGET_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedBudget(tier.id)}
                  className={`text-xs px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                    selectedBudget === tier.id
                      ? 'bg-[#D8C19A] text-[#111714] font-semibold'
                      : 'bg-[#18211C] text-[#C0BBAF] hover:text-[#F2EFE7] border border-[rgba(216,193,154,0.12)]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#898C83]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                className="bg-[#18211C] border border-[rgba(216,193,154,0.18)] text-xs text-[#F2EFE7] px-3 py-2 rounded focus:outline-none focus:border-[#D8C19A]"
              >
                <option value="featured">Featured First</option>
                <option value="budget-asc">Budget: Low to High</option>
                <option value="budget-desc">Budget: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Aesthetic Secondary Horizontal Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#898C83] font-mono mr-1">
              Aesthetic:
            </span>
            <button
              onClick={() => setSelectedAesthetic('All')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedAesthetic === 'All'
                  ? 'bg-[#202A24] border border-[#D8C19A] text-[#D8C19A] font-semibold'
                  : 'text-[#898C83] hover:text-[#F2EFE7]'
              }`}
            >
              All Aesthetics
            </button>
            {AESTHETIC_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedAesthetic(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedAesthetic === cat.id
                    ? 'bg-[#202A24] border border-[#D8C19A] text-[#D8C19A] font-semibold'
                    : 'text-[#898C83] hover:text-[#F2EFE7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN RESULTS FEED */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-12 space-y-12">
        {/* Results Counter & Active Pills */}
        <div className="flex items-center justify-between text-xs text-[#898C83] pb-2 border-b border-[rgba(216,193,154,0.08)]">
          <div>
            Showing <span className="font-semibold text-[#F2EFE7]">{filteredRooms.length}</span> room transformations
            {selectedAesthetic !== 'All' && ` in ${selectedAesthetic}`}
            {selectedBudget !== 'all' && ` (${selectedBudget})`}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Room Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, idx) => (
              <RoomCard
                key={room.id}
                room={room}
                variant={idx === 0 && activeFiltersCount === 0 ? 'spotlight' : 'standard'}
                className={idx === 0 && activeFiltersCount === 0 ? 'md:col-span-2 lg:col-span-3' : ''}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#18211C] border border-[rgba(216,193,154,0.2)] flex items-center justify-center mx-auto text-[#D8C19A]">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#F2EFE7]">
              No rooms match your filter criteria
            </h3>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Try adjusting your maximum budget ceiling or clearing aesthetic tags to discover more compact room transformations.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* 4. SLIDE-OVER FILTER DRAWER */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setFilterDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#18211C] border-l border-[rgba(216,193,154,0.2)] p-6 md:p-8 flex flex-col justify-between shadow-2xl animate-fade-in overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(216,193,154,0.12)]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D8C19A]" />
                  <h3 className="font-serif text-xl text-[#F2EFE7]">
                    Filter & Refine
                  </h3>
                </div>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-1.5 text-[#898C83] hover:text-[#F2EFE7] rounded"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Max Budget Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#D8C19A] uppercase tracking-wider">
                    Max Total Budget
                  </span>
                  <span className="font-serif text-lg text-[#F2EFE7] font-semibold">
                    ₹{maxBudgetSlider.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="500"
                  value={maxBudgetSlider}
                  onChange={(e) => setMaxBudgetSlider(Number(e.target.value))}
                  className="w-full accent-[#D8C19A] bg-[#252F29] rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#898C83] font-mono">
                  <span>₹2,000</span>
                  <span>₹10,000</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* Space Type Selector */}
              <div className="space-y-2 pt-2 border-t border-[rgba(216,193,154,0.1)]">
                <span className="text-xs font-semibold text-[#D8C19A] uppercase tracking-wider block">
                  Space Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedSpaceType('All')}
                    className={`text-xs p-2 rounded text-left transition-colors border ${
                      selectedSpaceType === 'All'
                        ? 'bg-[#202A24] border-[#D8C19A] text-[#F2EFE7]'
                        : 'bg-[#141c18] border-stone-800 text-[#C0BBAF]'
                    }`}
                  >
                    All Spaces
                  </button>
                  {SPACE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedSpaceType(type)}
                      className={`text-xs p-2 rounded text-left transition-colors border ${
                        selectedSpaceType === type
                          ? 'bg-[#202A24] border-[#D8C19A] text-[#F2EFE7]'
                          : 'bg-[#141c18] border-stone-800 text-[#C0BBAF]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aesthetic Filter Selection */}
              <div className="space-y-2 pt-2 border-t border-[rgba(216,193,154,0.1)]">
                <span className="text-xs font-semibold text-[#D8C19A] uppercase tracking-wider block">
                  Aesthetic Style
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedAesthetic('All')}
                    className={`text-xs px-2.5 py-1 rounded transition-colors ${
                      selectedAesthetic === 'All'
                        ? 'bg-[#D8C19A] text-[#111714] font-semibold'
                        : 'bg-[#202A24] text-[#C0BBAF]'
                    }`}
                  >
                    All
                  </button>
                  {AESTHETIC_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedAesthetic(cat.id)}
                      className={`text-xs px-2.5 py-1 rounded transition-colors ${
                        selectedAesthetic === cat.id
                          ? 'bg-[#D8C19A] text-[#111714] font-semibold'
                          : 'bg-[#202A24] text-[#C0BBAF]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[rgba(216,193,154,0.14)] flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-3 rounded bg-[#202A24] text-[#C0BBAF] hover:text-[#F2EFE7] text-xs font-semibold uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="w-2/3 py-3 rounded bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89565]"
              >
                Apply ({filteredRooms.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
