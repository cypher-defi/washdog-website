'use client';

import { ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconBgClass?: string;
  iconColorClass?: string;
  hoverBorderClass?: string;
  hoverShadowClass?: string;
  hoverTextClass?: string;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-white border border-primary/5 rounded-4xl
        ${hover ? 'card-hover hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgClass = 'bg-accent-blue/10',
  iconColorClass = 'text-accent-blue',
  hoverBorderClass = 'hover:border-accent-blue/30',
  hoverShadowClass = 'hover:shadow-accent-blue/5',
  hoverTextClass = 'group-hover:text-accent-blue',
}: FeatureCardProps) {
  return (
    <div
      className={`
        card-hover group bg-white border border-primary/5 p-10 rounded-4xl
        ${hoverBorderClass} hover:shadow-xl ${hoverShadowClass}
        transition-all hover:-translate-y-1
      `}
    >
      <div
        className={`
          w-12 h-12 rounded-xl ${iconBgClass} ${iconColorClass}
          flex items-center justify-center mb-6
          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
        `}
      >
        <Icon icon={icon} className="w-6 h-6" />
      </div>
      <h3 className={`text-xl font-semibold text-primary mb-3 tracking-tight ${hoverTextClass} transition-colors`}>
        {title}
      </h3>
      <p className="text-primary/60 font-light leading-relaxed text-sm">{description}</p>
    </div>
  );
}
