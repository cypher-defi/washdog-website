'use client';

import { Icon } from '@iconify/react';

interface BookingSuccessProps {
  onClose: () => void;
  date: Date | null;
  time: string | null;
}

export function BookingSuccess({ onClose, date, time }: BookingSuccessProps) {
  const formatDate = (d: Date | null) => {
    if (!d) return '';
    return d.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 absolute inset-0 bg-white z-50 rounded-4xl">
      <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green-dark mb-6 animate-bounce">
        <Icon icon="lucide:check" className="w-10 h-10" />
      </div>
      <h3 className="text-3xl font-bold text-primary mb-2 tracking-tight">
        ¡Reserva Confirmada!
      </h3>
      <div className="bg-background rounded-2xl p-6 mt-4 mb-6 max-w-sm mx-auto border border-primary/5">
        <p className="text-primary/80 text-sm leading-relaxed">
          Su reserva ha sido confirmada para el{' '}
          <span className="font-bold text-primary">{formatDate(date)}</span> a las{' '}
          <span className="font-bold text-primary">{time}</span> horas.
        </p>
        <div className="mt-4 pt-4 border-t border-primary/10">
          <p className="text-xs text-primary/60 flex items-center justify-center gap-2">
            <Icon icon="lucide:clock" className="w-4 h-4 text-accent-blue" />
            Por favor, llegue 5 minutos antes de su reserva.
          </p>
        </div>
      </div>
      <p className="text-primary/50 text-xs mb-8">
        Te enviamos los detalles por WhatsApp.
      </p>
      <button
        onClick={onClose}
        className="px-10 py-3 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-primary/80 transition-colors"
      >
        Cerrar
      </button>
    </div>
  );
}
