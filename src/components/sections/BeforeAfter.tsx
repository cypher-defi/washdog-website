'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const CASES = [
  { src: '/antes-despues/washdog-antes-despues-perro-poodle.jpg', caption: 'Poodle — Baño + corte' },
  { src: '/antes-despues/washdog-antes-despues-perro-gris.jpg', caption: 'Caniche gris — Baño + corte' },
  { src: '/antes-despues/washdog-antes-despues-perro-negro.jpg', caption: 'Mestizo negro — Baño + corte' },
  { src: '/antes-despues/washdog-antes-despues-perro-pequeño.jpg', caption: 'Shih Tzu — Baño + corte' },
  { src: '/antes-despues/washdog-antes-despues-perro-blanco.jpg', caption: 'Shih Tzu blanco — Baño + corte' },
];

export function BeforeAfter() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + CASES.length) % CASES.length);
  const next = () => setCurrent(i => (i + 1) % CASES.length);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">Resultados reales</h2>
          <p className="text-primary/50 font-light mt-2">Así quedan nuestros clientes. Sin filtros.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl border border-primary/5 shadow-sm">
            <div className="relative aspect-[8/5] w-full">
              <Image
                src={CASES[current].src}
                alt={CASES[current].caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority={current === 0}
              />

              {/* Centered logo overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm shadow-lg">
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white/20">
                    <Icon icon="lucide:dog" className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="font-serif font-medium text-lg tracking-tight text-white leading-none">
                    Wash<span className="text-accent-blue">dog.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-base text-primary/70 font-medium mt-5 tracking-tight">
            {CASES[current].caption}
          </p>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          >
            <Icon icon="lucide:chevron-left" className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          >
            <Icon icon="lucide:chevron-right" className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {CASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className="p-3 flex items-center justify-center"
            >
              <span className={`block w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-primary/20'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
