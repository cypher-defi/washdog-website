'use client';

import { Icon } from '@iconify/react';

interface BookingSuccessProps {
  onClose: () => void;
}

export function BookingSuccess({ onClose }: BookingSuccessProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 absolute inset-0 bg-white z-50 rounded-4xl">
      <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green-dark mb-6 animate-bounce">
        <Icon icon="lucide:check" className="w-10 h-10" />
      </div>
      <h3 className="text-3xl font-bold text-primary mb-2 tracking-tight">
        ¡Reserva Confirmada!
      </h3>
      <p className="text-primary/60 text-sm mt-2 mb-8 max-w-xs mx-auto">
        Tu cita ha sido agendada con éxito. Te enviamos los detalles por WhatsApp.
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
