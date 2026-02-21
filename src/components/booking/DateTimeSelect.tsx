"use client"

import { FormEvent, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Calendar } from "./Calendar"
import { TimeSlots } from "./TimeSlots"
import { DogSize, DOG_SIZE_LABELS, SLOT_DURATIONS } from "@/types"

type ValidSize = NonNullable<DogSize>

const BASE_SLOT_MINUTES = 15

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidChileanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  return /^(\+?56)?9\d{8}$/.test(cleaned)
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

function expandToSlots(startTime: string, durationMinutes: number): string[] {
  const slots: string[] = []
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = startMinutes + durationMinutes
  for (let min = startMinutes; min < endMinutes; min += BASE_SLOT_MINUTES) {
    slots.push(minutesToTime(min))
  }
  return slots
}

interface DateTimeSelectProps {
  selectedDate: Date | null
  selectedTime: string | null
  onSelectDate: (date: Date) => void
  onSelectTime: (time: string) => void
  onBack: () => void
  onSubmit: () => void
  canSubmit: boolean
  summary: string
  serviceType: "bath" | "cut" | null
  dogSize: DogSize
  name: string
  phoneNumber: string
  email: string
  dogName: string
  onChangeName: (value: string) => void
  onChangePhoneNumber: (value: string) => void
  onChangeEmail: (value: string) => void
  onChangeDogName: (value: string) => void
}

function getDurationLabel(serviceType: "bath" | "cut", size: ValidSize): string {
  const duration = SLOT_DURATIONS[serviceType][size]
  if (duration < 60) return `${duration} min`
  if (duration === 60) return "1 hora"
  if (duration === 90) return "1 hora 30 min"
  return `${duration / 60} horas`
}

export function DateTimeSelect({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
  onSubmit,
  canSubmit,
  summary,
  serviceType,
  dogSize,
  name,
  phoneNumber,
  email,
  dogName,
  onChangeName,
  onChangePhoneNumber,
  onChangeEmail,
  onChangeDogName
}: DateTimeSelectProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  // Fetch booked slots from the service calendar when date/service changes
  useEffect(() => {
    if (!selectedDate || !serviceType) {
      setTimeout(() => setBookedSlots([]), 0)
      return
    }

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    fetch(`/api/reservations?date=${dateStr}&service=${serviceType}`)
      .then(res => res.json())
      .then(data => setBookedSlots(data.bookedSlots || []))
      .catch(() => setBookedSlots([]))
  }, [selectedDate, serviceType])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newErrors: { email?: string; phone?: string } = {}
    if (!isValidEmail(email)) newErrors.email = "Email inválido"
    if (!isValidChileanPhone(phoneNumber)) newErrors.phone = "Teléfono inválido (ej: 912345678)"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    if (canSubmit) {
      onSubmit()
      if (selectedTime && serviceType && dogSize) {
        const duration = SLOT_DURATIONS[serviceType][dogSize as ValidSize]
        setBookedSlots((prev) => [...prev, ...expandToSlots(selectedTime, duration)])
      }
    }
  }

  const serviceLabel = serviceType === "bath" ? "Baño" : "Corte"
  const sizeLabel = dogSize ? DOG_SIZE_LABELS[dogSize] : ""
  const durationLabel =
    serviceType && dogSize
      ? getDurationLabel(serviceType, dogSize as ValidSize)
      : ""

  return (
    <div className='flex flex-col md:flex-row flex-1 h-full'>
      {/* Left Panel - Calendar */}
      <div className='w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-primary/5 bg-background/50'>
        <button
          onClick={onBack}
          className='mb-6 text-xs font-bold text-primary/40 hover:text-primary uppercase tracking-wide flex items-center gap-1 transition-colors'
        >
          <Icon icon='lucide:arrow-left' className='w-4 h-4' /> Volver
        </button>

        <div className='mb-4 flex flex-wrap gap-2'>
          <span
            className={`
            px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase
            ${serviceType === "bath" ? "bg-accent-blue/10 text-accent-blue" : "bg-accent-peach/10 text-accent-peach-dark"}
          `}
          >
            {serviceLabel}
          </span>
          <span className='px-3 py-1.5 rounded-lg bg-primary/5 text-primary/70 text-[10px] font-bold tracking-widest uppercase'>
            {sizeLabel}
          </span>
          <span className='px-3 py-1.5 rounded-lg bg-primary/5 text-primary/70 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1'>
            <Icon icon='lucide:clock' className='w-3 h-3' /> {durationLabel}
          </span>
        </div>

        <h3 className='font-bold text-primary mb-4 text-lg'>
          Selecciona horario
        </h3>

        <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />

        <div className='h-px w-full bg-primary/10 my-6' />

        <h4 className='text-xs font-bold uppercase tracking-widest text-primary/40 mb-3'>
          Horas disponibles
        </h4>

        <TimeSlots
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
          selectedDate={selectedDate}
          serviceType={serviceType}
          dogSize={dogSize}
          bookedSlots={bookedSlots}
        />
      </div>

      {/* Right Panel - Form */}
      <div className='w-full md:w-1/2 p-8 flex flex-col justify-center bg-white'>
        <h3 className='font-bold text-primary mb-6 text-xl'>Tus datos</h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              placeholder='Tu Nombre'
              required
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              className='w-full px-4 py-3 bg-background border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30'
            />
          </div>
          <div>
            <input
              type='tel'
              placeholder='Teléfono (ej: 912345678)'
              required
              value={phoneNumber}
              onChange={(e) => {
                onChangePhoneNumber(e.target.value)
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              className={`w-full px-4 py-3 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30 ${errors.phone ? 'border-red-400' : 'border-primary/10'}`}
            />
            {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
          </div>
          <div>
            <input
              type='email'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => {
                onChangeEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              className={`w-full px-4 py-3 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30 ${errors.email ? 'border-red-400' : 'border-primary/10'}`}
            />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
          </div>
          <div>
            <input
              type='text'
              placeholder='Nombre Mascota'
              required
              value={dogName}
              onChange={(e) => onChangeDogName(e.target.value)}
              className='w-full px-4 py-3 bg-background border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all placeholder:text-primary/30'
            />
          </div>

          <div className='text-xs text-primary/70 bg-accent-blue/10 p-3 rounded-xl mt-4 border border-accent-blue/20 flex items-center gap-2'>
            <Icon icon='lucide:info' className='text-accent-blue w-4 h-4 shrink-0' />
            <span>
              Reserva: <span className='font-bold'>{summary}</span>
            </span>
          </div>

          <button
            type='submit'
            disabled={!canSubmit}
            className='w-full bg-primary text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest mt-2 hover:bg-accent-blue hover:shadow-lg hover:shadow-accent-blue/20 transition-all'
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  )
}
