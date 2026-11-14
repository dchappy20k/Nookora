import React, { Suspense } from 'react';
import ExploreContent from './ExploreContent';

export const metadata = {
  title: 'Explore Room Makeovers & Budgets | NOOKORA',
  description: 'Filter real compact bedroom transformations by budget, aesthetic, dimensions, and rental-friendly criteria.',
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111714] flex items-center justify-center text-xs text-[#898C83]">Loading Discovery Feed...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
