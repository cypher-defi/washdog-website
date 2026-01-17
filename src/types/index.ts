export type ServiceType = 'bath' | 'cut' | null;

export interface BookingState {
  service: ServiceType;
  date: number | null;
  time: string | null;
}

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
