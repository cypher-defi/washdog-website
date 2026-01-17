'use client';

import { Icon } from '@iconify/react';

interface ServicesProps {
  onBookClick: () => void;
}

export function Services({ onBookClick }: ServicesProps) {
  return (
    <section className="py-24 bg-white relative" id="servicios">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Divider */}
        <div className="flex items-center gap-4 mb-16 opacity-40">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Nuestros Servicios
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-6 tracking-tight">
            Bienestar diseñado para ellos
          </h2>
          <p className="text-primary/50 max-w-xl mx-auto font-light text-lg">
            Servicios creados para la comodidad y salud de tu mejor amigo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-min">
          {/* Bath Card - Large */}
          <div className="card-hover lg:col-span-7 bg-white border border-accent-blue/20 rounded-5xl p-10 relative overflow-hidden flex flex-col justify-between group hover:border-accent-blue/60 hover:shadow-2xl hover:shadow-accent-blue/10 transition-all">
            <div className="absolute top-8 right-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
              <Icon icon="lucide:droplets" className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl border border-accent-blue/30 flex items-center justify-center text-accent-blue mb-8 bg-white shadow-sm">
                <Icon icon="lucide:bath" className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-semibold text-primary mb-4 tracking-tight">
                Baños suaves
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-lg bg-accent-blue/10 text-primary/70 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <Icon icon="lucide:clock" className="w-3 h-3" /> 15 min aprox
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-accent-blue/10 text-primary/70 text-[10px] font-bold tracking-widest uppercase">
                  Hipoalergénico
                </span>
              </div>
              <p className="text-primary/70 leading-relaxed font-light max-w-md text-sm md:text-base">
                Utilizamos productos específicos para el manto de tu mascota. Secado delicado sin
                ruido excesivo.
              </p>
            </div>
            <button
              onClick={onBookClick}
              className="mt-8 text-xs font-bold text-accent-blue uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              Reservar <Icon icon="lucide:arrow-right" className="w-4 h-4" />
            </button>
          </div>

          {/* Cut Card - Tall */}
          <div className="card-hover lg:col-span-5 lg:row-span-2 bg-white border border-accent-peach/30 rounded-5xl p-10 relative overflow-hidden flex flex-col justify-between group hover:border-accent-peach/70 hover:shadow-2xl hover:shadow-accent-peach/10 transition-all">
            <div className="absolute bottom-0 right-0 opacity-[0.03] group-hover:opacity-10 transition-all duration-700">
              <Icon icon="lucide:scissors" className="w-64 h-64 translate-x-12 translate-y-12" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl border border-accent-peach/40 flex items-center justify-center text-accent-peach mb-8 bg-white shadow-sm">
                <Icon icon="lucide:scissors" className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-semibold text-primary mb-4 tracking-tight">
                Corte y arreglo
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-lg bg-accent-peach/10 text-primary/70 text-[10px] font-bold tracking-widest uppercase">
                  1 - 2 hrs
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-accent-peach/10 text-primary/70 text-[10px] font-bold tracking-widest uppercase">
                  Tijera / Máquina
                </span>
              </div>
              <p className="text-primary/70 leading-relaxed font-light mb-10 text-sm md:text-base">
                Adaptado a cada raza y estilo de vida. Cortes a tijera o stripping respetando la
                morfología.
              </p>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 text-sm text-primary/80 font-medium bg-white/50 p-2 rounded-lg backdrop-blur-sm">
                <Icon icon="lucide:check-circle-2" className="text-accent-green w-4 h-4" /> Adaptado a la raza
              </div>
              <div className="flex items-center gap-3 text-sm text-primary/80 font-medium bg-white/50 p-2 rounded-lg backdrop-blur-sm">
                <Icon icon="lucide:check-circle-2" className="text-accent-green w-4 h-4" /> Deslanado profesional
              </div>
              <button
                onClick={onBookClick}
                className="mt-6 w-full py-4 rounded-xl border border-accent-peach text-accent-peach-dark font-bold hover:bg-accent-peach hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg shadow-accent-peach/10 hover:shadow-accent-peach/30"
              >
                Reservar Hora
              </button>
            </div>
          </div>

          {/* Small Card - Calm Care */}
          <div className="card-hover lg:col-span-4 bg-white border border-accent-green/40 rounded-5xl p-8 flex flex-col justify-between group hover:border-accent-green/80 hover:shadow-xl hover:shadow-accent-green/10 transition-all min-h-[220px]">
            <div className="w-12 h-12 rounded-xl border border-accent-green/40 flex items-center justify-center text-accent-green-dark mb-4 bg-white shadow-sm">
              <Icon icon="lucide:heart" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3 tracking-tight">
                Atención calmada
              </h3>
              <p className="text-primary/70 text-sm font-light leading-relaxed">
                Sin estrés. Respetamos los tiempos y miedos de tu mascota.
              </p>
            </div>
          </div>

          {/* Small Card - Sanitized */}
          <div className="card-hover lg:col-span-3 bg-white border border-accent-purple/50 rounded-5xl p-8 flex flex-col justify-between group hover:border-accent-purple hover:shadow-xl hover:shadow-accent-purple/20 transition-all min-h-[220px]">
            <div className="w-12 h-12 rounded-xl border border-accent-purple/50 flex items-center justify-center text-accent-purple-dark mb-4 bg-white shadow-sm">
              <Icon icon="lucide:sparkles" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3 tracking-tight">
                Sanitizado
              </h3>
              <p className="text-primary/70 text-sm font-light leading-relaxed">
                Instalaciones seguras e higienizadas tras cada uso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
