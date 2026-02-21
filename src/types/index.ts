export type ServiceType = 'bath' | 'cut' | null;
export type DogSize = 'toy' | 'small' | 'medium' | 'large' | 'giant' | 'cat' | null;
export type CoatType = 'short' | 'long' | null;

export interface BookingState {
  service: ServiceType;
  dogSize: DogSize;
  coatType: CoatType;
  date: Date | null;
  time: string | null;
}

// Slot duration in minutes based on service and dog size
export const SLOT_DURATIONS = {
  bath: {
    toy: 20,
    small: 20,    // ≤20 kg (20 min)
    medium: 20,   // same slot as small for bath
    large: 40,    // >20 kg (40 min, 2 slots)
    giant: 40,    // >20 kg (40 min, 2 slots)
    cat: 20,      // cat (20 min)
  },
  cut: {
    toy: 60,      // 1 hour
    small: 60,    // 1 hour
    medium: 90,   // 1.5 hours
    large: 120,   // 2 hours
    giant: 120,   // 2 hours
    cat: 60,      // 1 hour
  },
} as const;

export const DOG_SIZE_LABELS = {
  toy: 'Toy (hasta ~5 kg)',
  small: '5–10 kg (pequeño)',
  medium: '10–20 kg (mediano)',
  large: '20–40 kg (grande)',
  giant: 'Más de 40 kg (gigante)',
  cat: 'Gato',
} as const;

export const BATH_PRICES: Record<'toy' | 'small' | 'medium' | 'large' | 'giant' | 'cat', string> = {
  toy: '$10.000',
  small: '$10.000',
  medium: '$10.000',
  large: '$16.000',
  giant: '$16.000',
  cat: '$10.000',
};

export const CUT_PRICES: Record<'toy' | 'small' | 'medium' | 'large' | 'giant' | 'cat', { short: string; long: string; start: string }> = {
  toy:    { short: '$15.000', long: '$20.000', start: '$15.000' },
  small:  { short: '$18.000', long: '$25.000', start: '$18.000' },
  medium: { short: '$22.000', long: '$30.000', start: '$22.000' },
  large:  { short: '$30.000', long: '$35.000', start: '$30.000' },
  giant:  { short: '$38.000', long: '$50.000', start: '$38.000' },
  cat:    { short: '$30.000', long: '$30.000', start: '$30.000' },
};

export interface BookingContextValue {
  state: BookingState;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectService: (service: 'bath' | 'cut') => void;
  selectDogSize: (size: DogSize) => void;
  selectCoatType: (coat: CoatType) => void;
  selectDate: (date: Date) => void;
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
