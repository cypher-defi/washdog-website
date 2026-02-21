"use client"

import { useState, useCallback } from "react"
import { BookingState, DogSize, CoatType } from "@/types"
import { createReservation } from "@/lib/reservations"

const initialState: BookingState = {
  service: null,
  dogSize: null,
  coatType: null,
  date: null,
  time: null
}

export function useBooking() {
  const [state, setState] = useState<BookingState>(initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dogName, setDogName] = useState("")

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

  const selectService = useCallback((service: "bath" | "cut") => {
    setState((prev) => ({ ...prev, service }))
  }, [])

  const selectDogSize = useCallback((dogSize: DogSize) => {
    setState((prev) => ({ ...prev, dogSize, coatType: null, date: null, time: null }))
  }, [])

  const selectCoatType = useCallback((coatType: CoatType) => {
    setState((prev) => ({ ...prev, coatType, date: null, time: null }))
  }, [])

  const selectDate = useCallback((date: Date) => {
    console.log("[useBooking] selectDate called with:", date.toString(), "getDate():", date.getDate())
    setState((prev) => ({ ...prev, date, time: null }))
  }, [])

  const selectTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }))
  }, [])

  const resetBooking = useCallback(() => {
    setState(initialState)
    setIsSuccess(false)
  }, [])

  const goBackToSize = useCallback(() => {
    setState((prev) => ({ ...prev, dogSize: null, coatType: null, date: null, time: null }))
  }, [])

  const goBackToCoat = useCallback(() => {
    setState((prev) => ({ ...prev, coatType: null, date: null, time: null }))
  }, [])

  const submitBooking = useCallback(async () => {
    if (!state.service || !state.dogSize || !state.date || !state.time) return

    try {
      // Extract date components directly (Calendar already creates dates with correct day number)
      const year = state.date.getFullYear()
      const month = String(state.date.getMonth() + 1).padStart(2, '0')
      const day = String(state.date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      // Combine with time as ISO-like string without Z suffix
      const startTimeStr = `${dateStr}T${state.time}:00`

      console.log("[useBooking] submitBooking:", {
        dateObject: state.date.toString(),
        year,
        month,
        day,
        dateStr,
        startTimeStr
      })

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

  // Coat type required for cut service (except cats)
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
    openModal,
    closeModal,
    selectService,
    selectDogSize,
    selectCoatType,
    selectDate,
    selectTime,
    resetBooking,
    goBackToSize,
    goBackToCoat,
    submitBooking,
    canSubmit,
    summary,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    dogName,
    setDogName
  }
}
