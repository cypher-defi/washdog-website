'use client';

import { Navbar, Footer } from '@/components/layout';
import { Hero, Features, Services, Testimonials, Contact } from '@/components/sections';
import { BookingModal } from '@/components/booking';
import { FloatingCTA } from '@/components/ui';
import { useBooking } from '@/hooks/useBooking';

export default function Home() {
  const booking = useBooking();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onBookClick={booking.openModal} />

      <main className="grow pt-20">
        <Hero
          onBookClick={booking.openModal}
          onServicesClick={() => scrollToSection('servicios')}
        />
        <Features />
        <Services onBookClick={booking.openModal} />
        <Testimonials />
        <Contact />
      </main>

      <Footer onBookClick={booking.openModal} />

      <FloatingCTA onClick={booking.openModal} />

      <BookingModal
        isOpen={booking.isOpen}
        onClose={booking.closeModal}
        state={booking.state}
        isSuccess={booking.isSuccess}
        onSelectService={booking.selectService}
        onSelectDogSize={booking.selectDogSize}
        onSelectDate={booking.selectDate}
        onSelectTime={booking.selectTime}
        onReset={booking.resetBooking}
        onGoBackToSize={booking.goBackToSize}
        onSubmit={booking.submitBooking}
        canSubmit={booking.canSubmit}
        summary={booking.summary}
      />
    </>
  );
}
