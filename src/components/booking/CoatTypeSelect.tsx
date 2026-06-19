'use client';

import { Icon } from '@iconify/react';
import { useBookingContext } from '@/context/BookingContext';
import { CUT_PRICES, DOG_SIZE_LABELS } from '@/types';

export function CoatTypeSelect() {
  const { state, onSelectCoatType, onGoBackToSize } = useBookingContext();
  const dogSize = state.dogSize;

  if (!dogSize || dogSize === 'cat') return null;

  const prices = CUT_PRICES[dogSize];
  const sizeLabel = DOG_SIZE_LABELS[dogSize];

  return (
    <div className="flex-1 p-8 md:p-12">
      <button
        onClick={onGoBackToSize}
        className="mb-6 text-xs font-bold text-primary/40 hover:text-primary uppercase tracking-wide flex items-center gap-1 transition-colors"
      >
        <Icon icon="lucide:arrow-left" className="w-4 h-4" /> Volver
      </button>

      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-peach-dark mb-2 block">
          {sizeLabel}
        </span>
        <h3 className="text-2xl font-bold text-primary mb-2 tracking-tight">
          ¿Cómo es el pelo de tu mascota?
        </h3>
        <p className="text-primary/50 text-sm">
          El tipo de pelo determina el precio del corte
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {/* Pelo corto */}
        <button
          onClick={() => onSelectCoatType('short')}
          className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-primary/10 bg-white hover:border-accent-peach/60 hover:shadow-lg hover:shadow-accent-peach/10 transition-all text-left"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-all">
            <Icon icon="lucide:scissors" className="w-6 sm:w-7 h-6 sm:h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-primary group-hover:text-accent-peach-dark transition-colors text-sm">
              Pelo corto
            </p>
            <p className="text-xs text-primary/50 mt-1">
              Recto, sin enredos, fácil de manejar
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-primary/70 group-hover:text-accent-peach-dark transition-colors">
              {prices.short}
            </span>
            <Icon
              icon="lucide:chevron-right"
              className="w-5 h-5 text-primary/20 group-hover:text-accent-peach group-hover:translate-x-1 transition-all shrink-0"
            />
          </div>
        </button>

        {/* Pelo largo o medio */}
        <button
          onClick={() => onSelectCoatType('long')}
          className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-primary/10 bg-white hover:border-accent-peach/60 hover:shadow-lg hover:shadow-accent-peach/10 transition-all text-left"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-peach/20 text-accent-peach-dark flex items-center justify-center shrink-0 group-hover:scale-110 transition-all">
            <Icon icon="lucide:wind" className="w-6 sm:w-7 h-6 sm:h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-primary group-hover:text-accent-peach-dark transition-colors text-sm">
              Pelo largo o medio
            </p>
            <p className="text-xs text-primary/50 mt-1">
              Abundante, con capa, o que crece rápido
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-primary/70 group-hover:text-accent-peach-dark transition-colors">
              {prices.long}
            </span>
            <Icon
              icon="lucide:chevron-right"
              className="w-5 h-5 text-primary/20 group-hover:text-accent-peach group-hover:translate-x-1 transition-all shrink-0"
            />
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-primary/40 mt-6">
        * Baño y estética básica: baño, secado, cepillado, limpieza de oídos y corte higiénico
      </p>
    </div>
  );
}
