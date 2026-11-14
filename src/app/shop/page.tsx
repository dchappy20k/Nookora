import React, { Suspense } from 'react';
import ShopContent from './ShopContent';

export const metadata = {
  title: 'Shop Key Makeover Pieces | NOOKORA',
  description: 'Verified renter-friendly, drill-free home decor, ambient lighting, and space-saving furniture curated from trusted Indian retailers.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111714] flex items-center justify-center text-xs text-[#898C83]">Loading Product Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
