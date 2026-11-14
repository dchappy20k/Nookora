'use client';

import React from 'react';
import Image from 'next/image';

interface FallbackProps {
  stage: number;
}

export const RoomFallback: React.FC<FallbackProps> = ({ stage }) => {
  const stageImages: Record<number, { url: string; title: string; desc: string }> = {
    1: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      title: 'Stage 1: Bare Rental Canvas',
      desc: '110 sq ft empty architectural bedroom shell with plain off-white rental walls.',
    },
    2: {
      url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
      title: 'Stage 2: Spatial Layout & Platform',
      desc: 'Low-profile solid teak platform bed positioning without obstructing window light.',
    },
    3: {
      url: 'https://images.unsplash.com/photo-1584990347449-3991316b2511?auto=format&fit=crop&w=1200&q=80',
      title: 'Stage 3: Ergonomic Study & Storage',
      desc: 'Floating ash wood study desk and command-mounted bamboo wall pegboard.',
    },
    4: {
      url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      title: 'Stage 4: 2700K Ambient Illumination',
      desc: 'Akari-style pleated lantern and warm concealed backlights replacing harsh fluorescent glare.',
    },
    5: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0HgQ43F_o8O5tqwUkkzmfg8fvE9hjnDdSglWWYGZyTUmFWH7WNFm0DFmQNQ5n5L7h7SlHKibLVq6FMNAZWne79Wi03H3yRjDHvyYImZl6JMgZ1-yCgWWw8i2ElT-SWX5Wy17rjtJ7QvEIq_zcj0I0dghKA9Qfm_AogzZP7g9Db_BoVNK0ms9VvTv110cLBB5V3I7Mp4SVm8nx8lKfRuB32DWumUboCd3l7Q44PQ4',
      title: 'Stage 5: Finished Japandi Sanctuary',
      desc: 'Tactile ochre linens, Monstera greenery, natural jute rug. Total budget: ₹8,517.',
    },
  };

  const current = stageImages[stage] || stageImages[5];

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[460px] rounded-xl overflow-hidden bg-[#18211C] border border-[rgba(216,193,154,0.18)]">
      <Image
        src={current.url}
        alt={current.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-opacity duration-700 brightness-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-lg bg-[#111714]/90 backdrop-blur-md border border-[rgba(216,193,154,0.2)]">
        <span className="text-[10px] font-mono text-[#D8C19A] tracking-wider uppercase block">
          {current.title}
        </span>
        <p className="text-xs text-[#C0BBAF] mt-1">{current.desc}</p>
      </div>
    </div>
  );
};
