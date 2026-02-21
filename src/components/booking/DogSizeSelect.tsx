'use client';

import { Icon } from '@iconify/react';
import { DogSize, DOG_SIZE_LABELS, SLOT_DURATIONS, BATH_PRICES } from '@/types';

interface DogSizeSelectProps {
  serviceType: 'bath' | 'cut';
  onSelectSize: (size: DogSize) => void;
  onBack: () => void;
}

const SIZE_OPTIONS: { size: DogSize; icon: string }[] = [
  { size: 'small', icon: 'lucide:dog' },
  { size: 'medium', icon: 'lucide:dog' },
  { size: 'large', icon: 'lucide:dog' },
];

function getDurationLabel(serviceType: 'bath' | 'cut', size: 'small' | 'medium' | 'large'): string {
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

export function DogSizeSelect({ serviceType, onSelectSize, onBack }: DogSizeSelectProps) {
  const serviceLabel = serviceType === 'bath' ? 'baño' : 'corte';

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

      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {SIZE_OPTIONS.map(({ size, icon }) => {
          if (!size) return null;
          const sizeKey = size as 'small' | 'medium' | 'large';
          const duration = getDurationLabel(serviceType, sizeKey);
          const label = DOG_SIZE_LABELS[sizeKey];

          return (
            <button
              key={size}
              onClick={() => onSelectSize(size)}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-primary/10 bg-white hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/10 transition-all text-left"
            >
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center transition-all
                ${size === 'small' ? 'bg-accent-blue/10 text-accent-blue' : ''}
                ${size === 'medium' ? 'bg-accent-green/20 text-accent-green-dark' : ''}
                ${size === 'large' ? 'bg-accent-peach/20 text-accent-peach-dark' : ''}
                group-hover:scale-110
              `}>
                <Icon
                  icon={icon}
                  className={`
                    ${size === 'small' ? 'w-6 h-6' : ''}
                    ${size === 'medium' ? 'w-7 h-7' : ''}
                    ${size === 'large' ? 'w-8 h-8' : ''}
                  `}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary group-hover:text-accent-blue transition-colors">
                  {label}
                </p>
                <p className="text-xs text-primary/50 mt-1">
                  Duración aprox: <span className="font-medium">{duration}</span>
                </p>
              </div>
              <span className="text-sm font-bold text-primary/70 group-hover:text-accent-blue transition-colors shrink-0">
                {serviceType === 'bath' ? BATH_PRICES[sizeKey] : 'A definir'}
              </span>
              <Icon
                icon="lucide:chevron-right"
                className="w-5 h-5 text-primary/20 group-hover:text-accent-blue group-hover:translate-x-1 transition-all"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
