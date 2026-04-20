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

              {/* Antes / Después pills */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-semibold tracking-wide shadow-lg">
                  Antes
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-sm font-semibold tracking-wide shadow-lg">
                  Después
                </span>
              </div>

              {/* Logo watermark */}
              <div className="absolute top-4 right-4">
                <Image
                  src="/Washdog.png"
                  alt="Washdog"
                  width={90}
                  height={32}
                  className="object-contain opacity-90 drop-shadow-md"
                />
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
