"use client"

import { useState, useCallback } from "react"
import { BookingState, DogSize, CoatType } from "@/types"
import { createReservation } from "@/lib/reservations"
import { BookingContextValue } from "@/context/BookingContext"

const initialState: BookingState = {
  service: null,
  dogSize: null,
  coatType: null,
  date: null,
  time: null
}

export function useBookingSteps(): BookingContextValue {
  const [state, setState] = useState<BookingState>(initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dogName, setDogName] = useState("")

  // Modal actions
  const openModal = useCallback(() => {
    setIsOpen(true)
    setIsSuccess(false)
    setState(initialState)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setIsSuccess(false)
      setState(initialState)
    }, 300)
  }, [])

  const onReset = useCallback(() => {
    setState(initialState)
    setIsSuccess(false)
  }, [])

  // Step navigation
  const onSelectService = useCallback((service: "bath" | "cut") => {
    setState((prev) => ({ ...prev, service }))
  }, [])

  const onSelectDogSize = useCallback((dogSize: DogSize) => {
    setState((prev) => ({ ...prev, dogSize, coatType: null, date: null, time: null }))
  }, [])

  const onSelectCoatType = useCallback((coatType: CoatType) => {
    setState((prev) => ({ ...prev, coatType, date: null, time: null }))
  }, [])

  const onSelectDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date, time: null }))
  }, [])

  const onSelectTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }))
  }, [])

  const onGoBackToSize = useCallback(() => {
    setState((prev) => ({ ...prev, dogSize: null, coatType: null, date: null, time: null }))
  }, [])

  const onGoBackToCoat = useCallback(() => {
    setState((prev) => ({ ...prev, coatType: null, date: null, time: null }))
  }, [])

  // Form handlers
  const onChangeName = useCallback((value: string) => {
    setName(value)
  }, [])

  const onChangePhoneNumber = useCallback((value: string) => {
    setPhoneNumber(value)
  }, [])

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value)
  }, [])

  const onChangeDogName = useCallback((value: string) => {
    setDogName(value)
  }, [])

  // Submission
  const onSubmit = useCallback(async () => {
    if (!state.service || !state.dogSize || !state.date || !state.time) return

    try {
      const year = state.date.getFullYear()
      const month = String(state.date.getMonth() + 1).padStart(2, '0')
      const day = String(state.date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      const startTimeStr = `${dateStr}T${state.time}:00`

      const coatNote = state.coatType ? `, Pelo: ${state.coatType === 'short' ? 'corto' : 'largo'}` : ''

      await createReservation({
        service: state.service,
        size: state.dogSize,
        startTime: startTimeStr,
        name,
        email,
        notes: `Dog: ${dogName}, Phone: ${phoneNumber}${coatNote}`
      })

      setIsSuccess(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err)
        alert(err.message)
      } else {
        console.error(err)
        alert("Error creating reservation")
      }
    }
  }, [state, name, email, dogName, phoneNumber])

  // Validation helpers
  const needsCoatType = state.service === 'cut' && state.dogSize !== null && state.dogSize !== 'cat'

  const canSubmit = !!(
    state.date &&
    state.time &&
    state.dogSize &&
    (!needsCoatType || state.coatType) &&
    name &&
    phoneNumber &&
    email &&
    dogName
  )

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("es-CL", { day: "numeric", month: "long" })
  }

  const summary =
    state.date && state.time
      ? `${formatDate(state.date)} a las ${state.time}`
      : "Selecciona fecha y hora"

  return {
    state,
    isOpen,
    isSuccess,
    name,
    phoneNumber,
    email,
    dogName,
    canSubmit,
    summary,
    openModal,
    closeModal,
    onReset,
    onSelectService,
    onSelectDogSize,
    onSelectCoatType,
    onSelectDate,
    onSelectTime,
    onGoBackToSize,
    onGoBackToCoat,
    onChangeName,
    onChangePhoneNumber,
    onChangeEmail,
    onChangeDogName,
    onSubmit
  }
}
