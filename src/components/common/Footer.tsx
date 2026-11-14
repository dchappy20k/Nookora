import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Instagram, Youtube, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1512] border-t border-[rgba(216,193,154,0.14)] text-[#F2EFE7] pt-16 pb-12">
      <div className="w-full max-w-[1360px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(216,193,154,0.1)]">
          {/* Brand Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-sm bg-[#18211C] border border-[#D8C19A]/30 flex items-center justify-center text-[#D8C19A]">
                <Sparkles className="w-4 h-4 text-[#D8C19A]" />
              </div>
              <span className="font-serif tracking-[0.2em] text-xl font-medium text-[#F2EFE7]">
                NOOKORA
              </span>
            </Link>
            <p className="text-sm text-[#C0BBAF] leading-relaxed max-w-sm">
              A home inspiration and affordable makeover platform dedicated to transforming compact, rental, and student living spaces through atmospheric design and total budget transparency.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#898C83]">
              <ShieldCheck className="w-4 h-4 text-[#D8C19A]" />
              <span>100% Drill-Free & Renter-Friendly Verified</span>
            </div>
          </div>

          {/* Column 1: By Budget */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#D8C19A]">
              By Budget
            </span>
            <ul className="space-y-2 text-xs text-[#C0BBAF]">
              <li>
                <Link href="/explore?budget=under-2k" className="hover:text-[#F2EFE7] transition-colors">
                  Under ₹2,000 (Micro)
                </Link>
              </li>
              <li>
                <Link href="/explore?budget=under-5k" className="hover:text-[#F2EFE7] transition-colors">
                  Under ₹5,000 (Focus)
                </Link>
              </li>
              <li>
                <Link href="/explore?budget=under-10k" className="hover:text-[#F2EFE7] transition-colors">
                  Under ₹10,000 (Makeover)
                </Link>
              </li>
              <li>
                <Link href="/explore?budget=under-20k" className="hover:text-[#F2EFE7] transition-colors">
                  Under ₹20,000 (Studio)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Aesthetics */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#D8C19A]">
              Aesthetics
            </span>
            <ul className="space-y-2 text-xs text-[#C0BBAF]">
              <li>
                <Link href="/explore?aesthetic=Japandi" className="hover:text-[#F2EFE7] transition-colors">
                  Japandi
                </Link>
              </li>
              <li>
                <Link href="/explore?aesthetic=Korean+Minimal" className="hover:text-[#F2EFE7] transition-colors">
                  Korean Minimal
                </Link>
              </li>
              <li>
                <Link href="/explore?aesthetic=Modern+Indian" className="hover:text-[#F2EFE7] transition-colors">
                  Modern Indian
                </Link>
              </li>
              <li>
                <Link href="/explore?aesthetic=Warm+Neutral" className="hover:text-[#F2EFE7] transition-colors">
                  Warm Neutral
                </Link>
              </li>
              <li>
                <Link href="/explore?aesthetic=Gaming+Setup" className="hover:text-[#F2EFE7] transition-colors">
                  Gaming Battlestation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#D8C19A]">
              Platform
            </span>
            <ul className="space-y-2 text-xs text-[#C0BBAF]">
              <li>
                <Link href="/explore" className="hover:text-[#F2EFE7] transition-colors">
                  Discovery Feed
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F2EFE7] transition-colors">
                  Shop Pieces
                </Link>
              </li>
              <li>
                <Link href="/creators" className="hover:text-[#F2EFE7] transition-colors">
                  Meet Creators
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-[#F2EFE7] transition-colors">
                  Creator Studio
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#F2EFE7] transition-colors">
                  Saved Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#D8C19A]">
              Monograph
            </span>
            <p className="text-xs text-[#898C83]">
              Curated rental makeovers delivered weekly. Zero spam.
            </p>
            <div className="flex items-center gap-1 bg-[#18211C] border border-[rgba(216,193,154,0.2)] rounded p-1">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent text-xs text-[#F2EFE7] px-2 py-1 focus:outline-none w-full placeholder:text-stone-600"
              />
              <button
                aria-label="Subscribe"
                className="p-1.5 bg-[#D8C19A] text-[#111714] rounded hover:bg-[#B89565] transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#898C83] gap-4">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} NOOKORA Inc. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Made for Renters & Dreamers across India</span>
          </div>
          <div className="flex items-center gap-4 text-[#C0BBAF]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D8C19A] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D8C19A] transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <Link href="/explore" className="hover:text-[#D8C19A] transition-colors flex items-center gap-1 text-[11px] uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
