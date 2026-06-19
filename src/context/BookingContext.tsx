"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { useBookingSteps } from "@/hooks/useBookingSteps"
import { BookingState, DogSize, CoatType } from "@/types"

export interface BookingContextValue {
  // State
  state: BookingState
  isOpen: boolean
  isSuccess: boolean
  name: string
  phoneNumber: string
  email: string
  dogName: string
  canSubmit: boolean
  summary: string

  // Modal actions
  openModal: () => void
  closeModal: () => void
  onReset: () => void

  // Step navigation
  onSelectService: (service: "bath" | "cut") => void
  onSelectDogSize: (size: DogSize) => void
  onSelectCoatType: (coat: CoatType) => void
  onSelectDate: (date: Date) => void
  onSelectTime: (time: string) => void
  onGoBackToSize: () => void
  onGoBackToCoat: () => void

  // Form handlers
  onChangeName: (value: string) => void
  onChangePhoneNumber: (value: string) => void
  onChangeEmail: (value: string) => void
  onChangeDogName: (value: string) => void

  // Submission
  onSubmit: () => void
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined)

interface BookingProviderProps {
  children: ReactNode
}

export function BookingProvider({ children }: BookingProviderProps) {
  const bookingData = useBookingSteps()

  return (
    <BookingContext.Provider value={bookingData}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext(): BookingContextValue {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider")
  }
  return context
}
