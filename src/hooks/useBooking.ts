'use client';

import { useState, useCallback } from 'react';
import { BookingState, DogSize } from '@/types';

const initialState: BookingState = {
  service: null,
  dogSize: null,
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

  const selectDogSize = useCallback((dogSize: DogSize) => {
    setState((prev) => ({ ...prev, dogSize, time: null }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date, time: null }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const resetBooking = useCallback(() => {
    setState(initialState);
    setIsSuccess(false);
  }, []);

  const goBackToSize = useCallback(() => {
    setState((prev) => ({ ...prev, dogSize: null, date: null, time: null }));
  }, []);

  const submitBooking = useCallback(() => {
    setIsSuccess(true);
  }, []);

  const canSubmit = state.date !== null && state.time !== null && state.dogSize !== null;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'long' });
  };

  const summary =
    state.date && state.time
      ? `${formatDate(state.date)} a las ${state.time}`
      : 'Selecciona fecha y hora';

  return {
    state,
    isOpen,
    isSuccess,
    openModal,
    closeModal,
    selectService,
    selectDogSize,
    selectDate,
    selectTime,
    resetBooking,
    goBackToSize,
    submitBooking,
    canSubmit,
    summary,
  };
}
