'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number;
  showControls?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Room Before Makeover',
  afterAlt = 'Room After Makeover',
  className = '',
  initialPosition = 50,
  showControls = true,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animStartTimeRef = useRef<number | null>(null);

  // Calculate percentage from clientX coordinate
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  // Pointer event handlers with Pointer Capture for seamless dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPlaying(false);
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if pointer capture is not supported
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsPlaying(false);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  // Smooth sinusoidal auto-transition animation
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      animStartTimeRef.current = null;
      return;
    }

    const duration = 3200; // ms per back-and-forth cycle

    const animate = (timestamp: number) => {
      if (!animStartTimeRef.current) animStartTimeRef.current = timestamp;
      const elapsed = timestamp - animStartTimeRef.current;
      // Smooth sinusoidal oscillation between 12% and 88%
      const cycle = (elapsed % duration) / duration;
      const factor = (Math.sin(cycle * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      const targetPos = 12 + factor * 76;
      setSliderPosition(targetPos);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Slider Viewport Container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after transformation slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative select-none overflow-hidden rounded-xl border border-[rgba(216,193,154,0.22)] ambient-shadow cursor-ew-resize group w-full min-h-[380px] md:min-h-[500px] aspect-[16/10] touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Layer 1: AFTER Image (Full background layer) */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
            className="object-cover"
          />
          {/* AFTER Badge */}
          <div className="absolute top-4 right-4 bg-[#111714]/90 backdrop-blur-md border border-[#D8C19A]/40 text-[#D8C19A] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none shadow-lg z-10 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D8C19A]" />
            <span>AFTER</span>
          </div>
        </div>

        {/* Layer 2: BEFORE Image (Clipped overlay with 100% geometric alignment) */}
        <div
          className="absolute inset-0 w-full h-full select-none pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            WebkitClipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            transition: isDragging ? 'none' : 'clip-path 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
            className="object-cover"
          />
          {/* BEFORE Badge */}
          <div className="absolute top-4 left-4 bg-[#111714]/90 backdrop-blur-md border border-stone-600 text-[#C0BBAF] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none shadow-lg z-10">
            BEFORE
          </div>
        </div>

        {/* Layer 3: Divider Line & Interactive Handle Knob */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#D8C19A] pointer-events-none z-20 shadow-[0_0_16px_rgba(216,193,154,0.9)]"
          style={{
            left: `${sliderPosition}%`,
            transition: isDragging ? 'none' : 'left 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#18211C] border-2 border-[#D8C19A] flex items-center justify-center text-[#D8C19A] shadow-[0_4px_24px_rgba(0,0,0,0.85)] transition-transform group-hover:scale-110 active:scale-95">
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

        {/* Hover / Drag instructions pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#111714]/80 backdrop-blur-md border border-[rgba(216,193,154,0.2)] rounded-full text-[10px] text-[#C0BBAF] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          {isDragging ? 'Dragging transition...' : 'Drag or click anywhere to compare'}
        </div>
      </div>

      {/* Preset Controls & Play Transition Toolbar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Preset comparison buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(100);
              }}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                sliderPosition >= 98
                  ? 'bg-[#D8C19A] text-[#111714] font-medium border-[#D8C19A]'
                  : 'bg-[#202A24] text-[#C0BBAF] border-[rgba(216,193,154,0.18)] hover:text-[#F2EFE7] hover:border-[#D8C19A]/40'
              }`}
            >
              Before (Original)
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                sliderPosition > 40 && sliderPosition < 60
                  ? 'bg-[#D8C19A] text-[#111714] font-medium border-[#D8C19A]'
                  : 'bg-[#202A24] text-[#C0BBAF] border-[rgba(216,193,154,0.18)] hover:text-[#F2EFE7] hover:border-[#D8C19A]/40'
              }`}
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(0);
              }}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                sliderPosition <= 2
                  ? 'bg-[#D8C19A] text-[#111714] font-medium border-[#D8C19A]'
                  : 'bg-[#202A24] text-[#C0BBAF] border-[rgba(216,193,154,0.18)] hover:text-[#F2EFE7] hover:border-[#D8C19A]/40'
              }`}
            >
              After (Makeover)
            </button>
          </div>

          {/* Auto-Play Transition Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className={`px-3.5 py-1.5 text-xs rounded border flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-[#B89565] text-[#111714] font-semibold border-[#B89565]'
                : 'bg-[#18211C] text-[#D8C19A] border-[#D8C19A]/30 hover:border-[#D8C19A] hover:bg-[#202A24]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Motion</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto-Play Transition</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
