export type ServiceType = 'bath' | 'cut' | null;
export type DogSize = 'small' | 'medium' | 'large' | null;

export interface BookingState {
  service: ServiceType;
  dogSize: DogSize;
  date: Date | null;
  time: string | null;
}

// Slot duration in minutes based on service and dog size
export const SLOT_DURATIONS = {
  bath: {
    small: 15,    // 1 token (15 min)
    medium: 30,   // 2 tokens (30 min)
    large: 45,    // 3 tokens (45 min)
  },
  cut: {
    small: 60,    // 1 hour
    medium: 90,   // 1.5 hours
    large: 120,   // 2 hours
  },
} as const;

export const DOG_SIZE_LABELS = {
  small: '5-10 kgs (pequeño)',
  medium: '10-20 kgs (mediano)',
  large: '20-40 kgs (grande)',
} as const;

export const BATH_PRICES: Record<'small' | 'medium' | 'large', string> = {
  small: '$8.500',
  medium: '$10.000',
  large: '$14.000',
};

export interface BookingContextValue {
  state: BookingState;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectService: (service: 'bath' | 'cut') => void;
  selectDate: (date: number) => void;
  selectTime: (time: string) => void;
  resetBooking: () => void;
  submitBooking: () => void;
  isSuccess: boolean;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colorClass: string;
  hoverBorder: string;
  hoverShadow: string;
  iconBg: string;
  iconColor: string;
}

export interface Testimonial {
  initial: string;
  name: string;
  text: string;
  bgColor: string;
  textColor: string;
  hoverBorder: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  features?: string[];
  iconBgClass: string;
  iconColorClass: string;
  borderClass: string;
  hoverBorderClass: string;
  hoverShadowClass: string;
  tagBgClass: string;
  buttonColorClass?: string;
  buttonBorderClass?: string;
  buttonHoverBgClass?: string;
  buttonHoverTextClass?: string;
  onBook: () => void;
}
