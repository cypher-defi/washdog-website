'use client';

import { Icon } from '@iconify/react';
import type { PlaceReview } from '@/lib/google-places';

const CARD_STYLES = [
  { bgColor: 'bg-accent-blue/20', textColor: 'text-accent-blue', hoverBorder: 'hover:border-accent-blue/20' },
  { bgColor: 'bg-accent-peach/20', textColor: 'text-accent-peach', hoverBorder: 'hover:border-accent-peach/20' },
  { bgColor: 'bg-accent-green/20', textColor: 'text-accent-green-dark', hoverBorder: 'hover:border-accent-green/20' },
];

interface TestimonialsProps {
  reviews: PlaceReview[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <section className="py-24 bg-background border-t border-primary/5 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-primary tracking-tight">Lo que dicen los dueños</h2>
          <p className="text-primary/50 font-light mt-2">Más de 200 perros atendidos en Ñuñoa.</p>
        </div>
        <div className="flex text-accent-peach gap-1">
          {[...Array(5)].map((_, i) => (
            <Icon key={i} icon="lucide:star" className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-8 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {reviews.map((review, i) => {
          const style = CARD_STYLES[i % CARD_STYLES.length];
          const initial = review.authorName.charAt(0).toUpperCase();
          return (
            <div
              key={i}
              className={`min-w-72 snap-center bg-white p-10 rounded-3xl border border-primary/5 flex flex-col ${style.hoverBorder} transition-colors shadow-sm`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-full ${style.bgColor} flex items-center justify-center ${style.textColor} font-serif italic text-lg`}
                >
                  {initial}
                </div>
                <div className="text-sm font-bold text-primary">{review.authorName}</div>
              </div>
              <p className="text-primary/70 text-sm italic leading-relaxed flex-1">"{review.text}"</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
