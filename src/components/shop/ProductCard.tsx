'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Star, Check } from 'lucide-react';
import { ProductItem } from '@/types';

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  return (
    <div
      className={`group bg-[#18211C] border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/40 rounded-xl overflow-hidden ambient-shadow transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#202A24]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="bg-[#111714]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#D8C19A] px-2.5 py-0.5 rounded">
              {product.category}
            </span>
            {product.drillFree && (
              <span className="bg-[#141c18]/90 text-[9px] uppercase font-medium text-[#929F87] px-2 py-0.5 rounded border border-[#929F87]/20 flex items-center gap-1">
                <Check className="w-2.5 h-2.5" />
                Drill-Free
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#898C83]">
            <span>via {product.retailer}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-[#D8C19A]">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[11px] font-medium">{product.rating}</span>
              </div>
            )}
          </div>

          <h4 className="text-sm font-medium text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h4>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-4 pt-0 border-t border-[rgba(216,193,154,0.08)] mt-3 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-[#898C83] uppercase block">Price</span>
          <span className="font-serif text-lg text-[#F2EFE7] font-semibold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded bg-[#202A24] text-[#D8C19A] border border-[#D8C19A]/30 hover:bg-[#D8C19A] hover:text-[#111714] transition-all"
        >
          <span>Find</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
