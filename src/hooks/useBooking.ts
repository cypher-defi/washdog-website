'use client';

import { useState, useCallback } from 'react';
import { BookingState, ServiceType } from '@/types';

const initialState: BookingState = {
  service: null,
  date: null,
  time: null,
};

export function useBooking() {
  const [state, setState] = useState<BookingState>(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setIsSuccess(false);
    setState(initialState);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setState(initialState);
    }, 300);
  }, []);

  const selectService = useCallback((service: 'bath' | 'cut') => {
    setState((prev) => ({ ...prev, service }));
  }, []);

  const selectDate = useCallback((date: number) => {
    setState((prev) => ({ ...prev, date }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const resetBooking = useCallback(() => {
    setState(initialState);
    setIsSuccess(false);
  }, []);

  const submitBooking = useCallback(() => {
    setIsSuccess(true);
  }, []);

  const canSubmit = state.date !== null && state.time !== null;

  const summary =
    state.date && state.time
      ? `Día ${state.date} a las ${state.time}`
      : 'Selecciona fecha y hora';

  return {
    state,
    isOpen,
    isSuccess,
    openModal,
    closeModal,
    selectService,
    selectDate,
    selectTime,
    resetBooking,
    submitBooking,
    canSubmit,
    summary,
  };
}
