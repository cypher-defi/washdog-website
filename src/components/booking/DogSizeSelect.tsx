'use client';

import { Icon } from '@iconify/react';
import { DogSize, DOG_SIZE_LABELS, SLOT_DURATIONS, BATH_PRICES, CUT_PRICES } from '@/types';

interface DogSizeSelectProps {
  serviceType: 'bath' | 'cut';
  onSelectSize: (size: DogSize) => void;
  onBack: () => void;
}

type ValidSize = 'toy' | 'small' | 'medium' | 'large' | 'giant' | 'cat';

const BATH_OPTIONS: { size: ValidSize; icon: string; label: string }[] = [
  { size: 'small', icon: 'lucide:dog', label: 'Hasta 20 kg (pequeño o mediano)' },
  { size: 'large', icon: 'lucide:dog', label: 'Más de 20 kg (grande)' },
];

const CUT_OPTIONS: { size: ValidSize; icon: string; label: string }[] = [
  { size: 'toy',    icon: 'lucide:dog', label: DOG_SIZE_LABELS.toy },
  { size: 'small',  icon: 'lucide:dog', label: DOG_SIZE_LABELS.small },
  { size: 'medium', icon: 'lucide:dog', label: DOG_SIZE_LABELS.medium },
  { size: 'large',  icon: 'lucide:dog', label: DOG_SIZE_LABELS.large },
  { size: 'giant',  icon: 'lucide:dog', label: DOG_SIZE_LABELS.giant },
  { size: 'cat',    icon: 'lucide:cat', label: DOG_SIZE_LABELS.cat },
];

function getDurationLabel(serviceType: 'bath' | 'cut', size: ValidSize): string {
  const duration = SLOT_DURATIONS[serviceType][size];
  if (duration < 60) {
    return `${duration} min`;
  } else if (duration === 60) {
    return '1 hora';
  } else if (duration === 90) {
    return '1 hora 30 min';
  } else {
    return `${duration / 60} horas`;
  }
}

const SIZE_COLORS: Record<ValidSize, string> = {
  toy:    'bg-accent-purple/10 text-accent-purple-dark',
  small:  'bg-accent-blue/10 text-accent-blue',
  medium: 'bg-accent-green/20 text-accent-green-dark',
  large:  'bg-accent-peach/20 text-accent-peach-dark',
  giant:  'bg-accent-peach/30 text-accent-peach-dark',
  cat:    'bg-accent-purple/10 text-accent-purple-dark',
};

const SIZE_ICON_SIZES: Record<ValidSize, string> = {
  toy:    'w-5 h-5',
  small:  'w-6 h-6',
  medium: 'w-7 h-7',
  large:  'w-8 h-8',
  giant:  'w-9 h-9',
  cat:    'w-7 h-7',
};

export function DogSizeSelect({ serviceType, onSelectSize, onBack }: DogSizeSelectProps) {
  const serviceLabel = serviceType === 'bath' ? 'baño' : 'corte';
  const options = serviceType === 'bath' ? BATH_OPTIONS : CUT_OPTIONS;

  return (
    <div className="flex-1 p-8 md:p-12">
      <button
        onClick={onBack}
        className="mb-6 text-xs font-bold text-primary/40 hover:text-primary uppercase tracking-wide flex items-center gap-1 transition-colors"
      >
        <Icon icon="lucide:arrow-left" className="w-4 h-4" /> Volver
      </button>

      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-primary mb-2 tracking-tight">
          ¿Cuánto pesa tu mascota?
        </h3>
        <p className="text-primary/50 text-sm">
          Selecciona el tamaño para calcular la duración del {serviceLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        {options.map(({ size, icon, label }) => {
          const duration = getDurationLabel(serviceType, size);
          const price = serviceType === 'bath'
            ? BATH_PRICES[size]
            : size === 'cat'
              ? CUT_PRICES.cat.start
              : `a partir de ${CUT_PRICES[size].start}`;

          return (
            <button
              key={size}
              onClick={() => onSelectSize(size)}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-primary/10 bg-white hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/10 transition-all text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${SIZE_COLORS[size]}`}>
                <Icon icon={icon} className={SIZE_ICON_SIZES[size]} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary group-hover:text-accent-blue transition-colors text-sm">
                  {label}
                </p>
                <p className="text-xs text-primary/50 mt-0.5">
                  Duración aprox: <span className="font-medium">{duration}</span>
                </p>
              </div>
              <span className="text-sm font-bold text-primary/70 group-hover:text-accent-blue transition-colors shrink-0 text-right">
                {price}
              </span>
              <Icon
                icon="lucide:chevron-right"
                className="w-4 h-4 text-primary/20 group-hover:text-accent-blue group-hover:translate-x-1 transition-all"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
