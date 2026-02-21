'use client';

import { Icon } from '@iconify/react';
import { CoatType, DogSize, CUT_PRICES, DOG_SIZE_LABELS } from '@/types';

interface CoatTypeSelectProps {
  dogSize: DogSize;
  onSelectCoat: (coat: CoatType) => void;
  onBack: () => void;
}

export function CoatTypeSelect({ dogSize, onSelectCoat, onBack }: CoatTypeSelectProps) {
  if (!dogSize || dogSize === 'cat') return null;

  const prices = CUT_PRICES[dogSize];
  const sizeLabel = DOG_SIZE_LABELS[dogSize];

  return (
    <div className="flex-1 p-8 md:p-12">
      <button
        onClick={onBack}
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
          onClick={() => onSelectCoat('short')}
          className="group flex items-center gap-5 p-6 rounded-2xl border border-primary/10 bg-white hover:border-accent-peach/60 hover:shadow-lg hover:shadow-accent-peach/10 transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center group-hover:scale-110 transition-all">
            <Icon icon="lucide:scissors" className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary group-hover:text-accent-peach-dark transition-colors">
              Pelo corto
            </p>
            <p className="text-xs text-primary/50 mt-1">
              Recto, sin enredos, fácil de manejar
            </p>
          </div>
          <span className="text-lg font-bold text-primary/70 group-hover:text-accent-peach-dark transition-colors shrink-0">
            {prices.short}
          </span>
          <Icon
            icon="lucide:chevron-right"
            className="w-5 h-5 text-primary/20 group-hover:text-accent-peach group-hover:translate-x-1 transition-all"
          />
        </button>

        {/* Pelo largo o medio */}
        <button
          onClick={() => onSelectCoat('long')}
          className="group flex items-center gap-5 p-6 rounded-2xl border border-primary/10 bg-white hover:border-accent-peach/60 hover:shadow-lg hover:shadow-accent-peach/10 transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-accent-peach/20 text-accent-peach-dark flex items-center justify-center group-hover:scale-110 transition-all">
            <Icon icon="lucide:wind" className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary group-hover:text-accent-peach-dark transition-colors">
              Pelo largo o medio
            </p>
            <p className="text-xs text-primary/50 mt-1">
              Abundante, con capa, o que crece rápido
            </p>
          </div>
          <span className="text-lg font-bold text-primary/70 group-hover:text-accent-peach-dark transition-colors shrink-0">
            {prices.long}
          </span>
          <Icon
            icon="lucide:chevron-right"
            className="w-5 h-5 text-primary/20 group-hover:text-accent-peach group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <p className="text-center text-xs text-primary/40 mt-6">
        * Incluye baño, brushing y limpiado de orejas
      </p>
    </div>
  );
}
