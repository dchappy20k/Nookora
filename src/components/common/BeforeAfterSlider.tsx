'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Room Before Makeover',
  afterAlt = 'Room After Makeover',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const position = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after transformation slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className={`relative select-none overflow-hidden rounded-xl border border-[rgba(216,193,154,0.18)] ambient-shadow cursor-ew-resize group ${className}`}
    >
      {/* After Image (Background full display) */}
      <div className="relative w-full h-full min-h-[380px] md:min-h-[500px]">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#111714]/85 backdrop-blur-md border border-[#D8C19A]/30 text-[#D8C19A] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none">
          AFTER
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full min-h-[380px] md:min-h-[500px]" style={{ width: containerRef.current?.clientWidth || '100%' }}>
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
            className="object-cover grayscale contrast-125"
          />
          <div className="absolute top-4 left-4 bg-[#111714]/85 backdrop-blur-md border border-stone-700 text-[#C0BBAF] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
            BEFORE
          </div>
        </div>
      </div>

      {/* Divider Line & Knob */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#D8C19A] pointer-events-none transition-transform duration-75 shadow-[0_0_12px_rgba(216,193,154,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#18211C] border-2 border-[#D8C19A] flex items-center justify-center text-[#D8C19A] shadow-2xl transition-transform group-hover:scale-110">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="rotate(180 12 12)" />
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
