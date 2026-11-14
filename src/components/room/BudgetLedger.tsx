'use client';

import React, { useState } from 'react';
import { ExternalLink, Check, ShoppingBag } from 'lucide-react';
import { BudgetItem } from '@/types';

interface BudgetLedgerProps {
  items: BudgetItem[];
  totalBudget: number;
}

export const BudgetLedger: React.FC<BudgetLedgerProps> = ({ items, totalBudget }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((i) => i.category === selectedCategory);

  const filteredTotal = filteredItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl overflow-hidden ambient-shadow">
      {/* Table Header */}
      <div className="p-6 md:p-8 border-b border-[rgba(216,193,154,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#D8C19A] font-semibold block mb-1">
            Complete Line-Item Ledger
          </span>
          <h3 className="font-serif text-2xl text-[#F2EFE7]">
            Itemized Makeover Breakdown
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#D8C19A] text-[#111714] font-semibold'
                  : 'bg-[#202A24] text-[#C0BBAF] hover:text-[#F2EFE7] border border-[rgba(216,193,154,0.1)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Rows */}
      <div className="divide-y divide-[rgba(255,255,255,0.06)]">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 md:px-8 hover:bg-[#202A24]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            {/* Index & Title */}
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-[#898C83] pt-0.5 w-8">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors">
                    {item.name}
                  </h4>
                  {item.drillFree && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#929F87] bg-[#141c18] border border-[#929F87]/20 px-2 py-0.5 rounded font-sans">
                      <Check className="w-2.5 h-2.5" />
                      Drill-Free
                    </span>
                  )}
                </div>
                {item.notes && (
                  <p className="text-xs text-[#898C83] mt-1">{item.notes}</p>
                )}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#898C83] bg-[#111714] px-2 py-0.5 rounded border border-stone-800">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-[#C0BBAF]">
                    via {item.retailer}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & External CTA */}
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:pl-4">
              <span className="font-serif text-lg text-[#F2EFE7] font-semibold">
                ₹{item.price.toLocaleString('en-IN')}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded bg-[#252F29] text-[#D8C19A] border border-[#D8C19A]/30 hover:bg-[#D8C19A] hover:text-[#111714] transition-all"
              >
                <span>View Item</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-6 md:p-8 bg-[#141b17] border-t border-[rgba(216,193,154,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#202A24] border border-[#D8C19A]/20 flex items-center justify-center text-[#D8C19A]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#898C83] block">
              {filteredItems.length} Products Curated
            </span>
            <span className="text-sm font-medium text-[#C0BBAF]">
              Direct Links to Verified Indian Retailers
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#898C83] block">
            {selectedCategory === 'All' ? 'Total Makeover Investment' : `${selectedCategory} Subtotal`}
          </span>
          <span className="font-serif text-2xl md:text-3xl text-[#D8C19A] font-bold">
            ₹{filteredTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};
