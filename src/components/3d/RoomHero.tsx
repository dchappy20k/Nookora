'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Layers, Sparkles, RotateCcw, Play, Pause } from 'lucide-react';
import { RoomFallback } from './RoomFallback';

// Dynamically import the 3D Scene with ssr: false
const RoomScene = dynamic(() => import('./RoomScene').then((mod) => mod.RoomScene), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-xs text-[#898C83]">Initializing 3D Spatial Canvas...</div>,
});

export const RoomHero: React.FC = () => {
  const [stage, setStage] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [is3DMode, setIs3DMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto detect reduced motion or mobile
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 640) {
      setIs3DMode(false);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStage((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stages = [
    { num: 1, label: 'Bare Room', cost: '₹0' },
    { num: 2, label: 'Platform Bed', cost: '₹3,500' },
    { num: 3, label: 'Desk & Storage', cost: '₹5,900' },
    { num: 4, label: 'Atmospheric Light', cost: '₹7,400' },
    { num: 5, label: 'Finished Japandi', cost: '₹8,517' },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-[#18211C] border border-[rgba(216,193,154,0.18)] overflow-hidden ambient-shadow flex flex-col">
      {/* 3D Visual Stage Viewport */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] bg-[#141b17]">
        {mounted && is3DMode ? (
          <RoomScene stage={stage} />
        ) : (
          <RoomFallback stage={stage} />
        )}

        {/* Viewport Floating Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-[#111714]/80 backdrop-blur-md border border-[rgba(216,193,154,0.2)] text-[#D8C19A] hover:bg-[#D8C19A] hover:text-[#111714] transition-colors"
            title={isPlaying ? 'Pause auto transformation' : 'Play transformation'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="px-2.5 py-1 rounded-full bg-[#111714]/80 backdrop-blur-md border border-[rgba(216,193,154,0.2)] text-[10px] font-mono uppercase tracking-wider text-[#C0BBAF] hover:text-[#D8C19A] transition-colors flex items-center gap-1.5"
            title="Toggle between 3D Spatial Canvas and High-Resolution Monograph View"
          >
            <Layers className="w-3 h-3 text-[#D8C19A]" />
            <span>{is3DMode ? '3D Interactive' : 'Editorial View'}</span>
          </button>
        </div>

        {/* Live Transformation Metric Card */}
        <div className="absolute top-4 left-4 z-10 bg-[#111714]/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[rgba(216,193,154,0.2)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D8C19A] font-semibold font-mono">
            <Sparkles className="w-3 h-3" />
            <span>Transformation Stage {stage}/5</span>
          </div>
          <span className="text-xs text-[#F2EFE7] font-medium block">
            {stages[stage - 1].label}
          </span>
        </div>
      </div>

      {/* Stage Timeline Stepper Bar */}
      <div className="p-4 md:px-6 bg-[#111714] border-t border-[rgba(216,193,154,0.12)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {stages.map((st) => (
            <button
              key={st.num}
              onClick={() => {
                setStage(st.num);
                setIsPlaying(false);
              }}
              className={`p-2 sm:p-2.5 rounded text-left transition-all duration-200 border ${
                stage === st.num
                  ? 'bg-[#202A24] border-[#D8C19A] text-[#F2EFE7] shadow-md'
                  : 'bg-[#18211C] border-transparent hover:border-stone-700 text-[#898C83]'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-mono">
                <span className={stage === st.num ? 'text-[#D8C19A] font-bold' : ''}>
                  0{st.num}
                </span>
                <span className="hidden sm:inline font-mono text-[#898C83]">
                  {st.cost}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium block truncate mt-0.5">
                {st.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
