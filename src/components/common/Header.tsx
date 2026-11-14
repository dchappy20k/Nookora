'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, Search, Menu, X, PlusCircle, User, Compass, Sparkles, ShoppingBag, Users } from 'lucide-react';
import { storageService } from '@/services/storageService';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateSaved = () => {
      setSavedCount(storageService.getSavedRoomIds().length);
    };
    updateSaved();
    window.addEventListener('nookora_storage_change', updateSaved);
    return () => window.removeEventListener('nookora_storage_change', updateSaved);
  }, []);

  const navLinks = [
    { href: '/explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { href: '/shop', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
    { href: '/creators', label: 'Creators', icon: <Users className="w-4 h-4" /> },
    { href: '/upload', label: 'Studio', icon: <PlusCircle className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111714]/95 backdrop-blur-md shadow-2xl shadow-black/60 border-b border-[rgba(216,193,154,0.14)]'
          : 'bg-[#111714] border-b border-[rgba(216,193,154,0.1)]'
      }`}
    >
      <div className="w-full max-w-[1360px] mx-auto px-5 md:px-12 flex items-center justify-between h-20">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-9 h-9 rounded-sm bg-[#18211C] border border-[#D8C19A]/30 flex items-center justify-center text-[#D8C19A] group-hover:border-[#D8C19A] transition-colors shadow-inner">
            <Sparkles className="w-4 h-4 text-[#D8C19A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.2em] text-xl font-medium text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors">
              NOOKORA
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#898C83] -mt-1 font-sans">
              Make Space Yours
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#F2EFE7] font-semibold'
                    : 'text-[#C0BBAF] hover:text-[#D8C19A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D8C19A] rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Shortcut */}
          <Link
            href="/explore"
            className="p-2.5 text-[#C0BBAF] hover:text-[#D8C19A] hover:bg-[#18211C] rounded-md transition-colors"
            title="Search Rooms"
            aria-label="Search rooms"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Saved Collections */}
          <Link
            href="/saved"
            className="relative p-2.5 text-[#C0BBAF] hover:text-[#D8C19A] hover:bg-[#18211C] rounded-md transition-colors"
            title="Saved Rooms"
            aria-label="Saved collections"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D8C19A] text-[#111714] text-[9px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          {/* Upload Button */}
          <Link
            href="/upload"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#202A24] text-[#F2EFE7] border border-[rgba(216,193,154,0.25)] hover:border-[#D8C19A] hover:bg-[#252F29] transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#D8C19A]" />
            <span>Upload Nook</span>
          </Link>

          {/* Profile / Account */}
          <Link
            href="/profile"
            className="p-2 text-[#C0BBAF] hover:text-[#D8C19A] hover:bg-[#18211C] rounded-full border border-stone-800 transition-colors"
            title="Profile"
            aria-label="User profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#C0BBAF] hover:text-[#F2EFE7] focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18211C] border-b border-[rgba(216,193,154,0.15)] px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm uppercase tracking-wider text-[#C0BBAF] hover:text-[#D8C19A] transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-sm uppercase tracking-wider text-[#C0BBAF] hover:text-[#D8C19A] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Collections ({savedCount})</span>
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-sm uppercase tracking-wider text-[#C0BBAF] hover:text-[#D8C19A] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>
          </nav>
          <div className="pt-4 border-t border-[rgba(216,193,154,0.1)] flex flex-col gap-2.5">
            <Link
              href="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded text-center"
            >
              Upload Transformation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
