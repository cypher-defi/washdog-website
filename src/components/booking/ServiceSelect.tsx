'use client';

import { Icon } from '@iconify/react';

interface ServiceSelectProps {
  onSelectService: (service: 'bath' | 'cut') => void;
}

export function ServiceSelect({ onSelectService }: ServiceSelectProps) {
  return (
    <div className="flex flex-col flex-1 p-8 md:p-14">
      <h3 className="text-3xl font-bold text-primary mb-3 text-center tracking-tight">
        Elige el servicio
      </h3>
      <p className="text-center text-primary/50 text-sm mb-8">
        Selecciona qué necesita tu mascota hoy
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bath Option */}
        <button
          onClick={() => onSelectService('bath')}
          className="group flex flex-col items-center p-8 border border-primary/10 rounded-3xl hover:border-accent-blue hover:bg-accent-blue/5 transition-all text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 text-accent-blue flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
            <Icon icon="lucide:bath" className="w-8 h-8" />
          </div>
          <span className="font-bold text-primary text-lg">Baño</span>
          <span className="text-sm text-primary/50 mt-1">Limpieza regular y secado</span>
          <span className="absolute inset-x-0 bottom-0 h-1 bg-accent-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>

        {/* Grooming Option */}
        <button
          onClick={() => onSelectService('cut')}
          className="group flex flex-col items-center p-8 border border-primary/10 rounded-3xl hover:border-accent-peach hover:bg-accent-peach/5 transition-all text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent-peach/10 text-accent-peach-dark flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Icon icon="lucide:scissors" className="w-8 h-8" />
          </div>
          <span className="font-bold text-primary text-lg">Peluquería</span>
          <span className="text-sm text-primary/50 mt-1">Corte completo y estilo</span>
          <span className="absolute inset-x-0 bottom-0 h-1 bg-accent-peach scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
