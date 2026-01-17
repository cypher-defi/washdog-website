'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-accent-blue shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary: 'bg-accent-blue text-white hover:bg-white hover:text-primary shadow-lg shadow-black/20',
  outline: 'border border-primary/10 bg-white/60 backdrop-blur-sm text-primary hover:bg-white',
  ghost: 'text-primary/60 hover:text-primary hover:bg-black/5',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-xs',
  lg: 'px-10 py-4 text-xs',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      children,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === 'left' && <Icon icon={icon} className="w-4 h-4" />}
        {children}
        {icon && iconPosition === 'right' && <Icon icon={icon} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
