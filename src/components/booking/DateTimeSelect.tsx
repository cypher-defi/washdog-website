'use client';

import { FormEvent } from 'react';
import { Icon } from '@iconify/react';
import { Calendar } from './Calendar';
import { TimeSlots } from './TimeSlots';

interface DateTimeSelectProps {
  selectedDate: number | null;
  selectedTime: string | null;
  onSelectDate: (date: number) => void;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  summary: string;
  serviceType: 'bath' | 'cut' | null;
}

export function DateTimeSelect({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
  onSubmit,
  canSubmit,
  summary,
  serviceType,
}: DateTimeSelectProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 h-full">
      {/* Left Panel - Calendar */}
      <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-primary/5 bg-background/50">
        <button
          onClick={onBack}
          className="mb-6 text-xs font-bold text-primary/40 hover:text-primary uppercase tracking-wide flex items-center gap-1 transition-colors"
        >
          <Icon icon="lucide:arrow-left" className="w-4 h-4" /> Volver
        </button>
        <h3 className="font-bold text-primary mb-4 text-lg">Selecciona horario</h3>

        <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />

        <div className="h-px w-full bg-primary/10 my-6" />

        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-3">
          Horas disponibles
        </h4>

        <TimeSlots
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
          hasDate={selectedDate !== null}
          serviceType={serviceType}
        />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
        <h3 className="font-bold text-primary mb-6 text-xl">Tus datos</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Tu Nombre"
              required
              className="w-full px-4 py-3 bg-background border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Teléfono"
              required
              className="w-full px-4 py-3 bg-background border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nombre Mascota"
              required
              className="w-full px-4 py-3 bg-background border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30"
            />
          </div>

          <div className="text-xs text-primary/70 bg-accent-blue/10 p-3 rounded-xl mt-4 border border-accent-blue/20 flex items-center gap-2">
            <Icon icon="lucide:info" className="text-accent-blue w-4 h-4 shrink-0" />
            <span>
              Reserva: <span className="font-bold">{summary}</span>
            </span>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest mt-2 hover:bg-accent-blue hover:shadow-lg hover:shadow-accent-blue/20 transition-all"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}
