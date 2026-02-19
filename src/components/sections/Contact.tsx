'use client';

import { Icon } from '@iconify/react';

export function Contact() {
  return (
    <section className="py-20 bg-background border-t border-primary/5" id="contacto">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-green/20 rounded-full text-primary mb-6">
          <Icon icon="lucide:message-circle-question" className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">¿Tienes dudas?</h2>
        <p className="text-primary/70 mb-8 font-light text-lg">
          Escríbenos por WhatsApp si no sabes qué tratamiento elegir.
        </p>
        <a
          href="https://wa.me/56987230388"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-primary/10 bg-white text-primary px-8 py-3 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Icon icon="lucide:message-circle" className="group-hover:scale-110 transition-transform w-4 h-4" />
          Hablar por WhatsApp
        </a>
      </div>
    </section>
  );
}
