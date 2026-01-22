"use client"

import { useState, useCallback } from "react"
import { BookingState, DogSize } from "@/types"
import { createReservation } from "@/lib/reservations"

const initialState: BookingState = {
  service: null,
  dogSize: null,
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
    setState((prev) => ({ ...prev, dogSize, time: null }))
  }, [])

  const selectDate = useCallback((date: Date) => {
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
    setState((prev) => ({ ...prev, dogSize: null, date: null, time: null }))
  }, [])

  const submitBooking = useCallback(async () => {
    if (!state.service || !state.dogSize || !state.date || !state.time) return

    try {
      // Get date in Santiago timezone format (YYYY-MM-DD)
      const dateStr = state.date.toLocaleDateString('en-CA', { timeZone: 'America/Santiago' })
      // Combine with time (already in Santiago timezone) as ISO-like string without Z suffix
      const startTimeStr = `${dateStr}T${state.time}:00`

      const res = await createReservation({
        service: state.service,
        size: state.dogSize,
        startTime: startTimeStr,
        name,
        email,
        notes: `Dog: ${dogName}, Phone: ${phoneNumber}`
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

  const canSubmit = !!(
    state.date &&
    state.time &&
    state.dogSize &&
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
    selectDate,
    selectTime,
    resetBooking,
    goBackToSize,
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
