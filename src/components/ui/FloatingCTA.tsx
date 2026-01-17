'use client';

import { Icon } from '@iconify/react';

interface FloatingCTAProps {
  onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-[#1a1f24] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/10"
        aria-label="Reservar hora"
      >
        <Icon icon="lucide:calendar-plus" className="w-7 h-7" />
      </button>
    </div>
  );
}
