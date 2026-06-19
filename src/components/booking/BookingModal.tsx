"use client"

import { useEffect } from "react"
import { Icon } from "@iconify/react"
import { ServiceSelect } from "./ServiceSelect"
import { DogSizeSelect } from "./DogSizeSelect"
import { CoatTypeSelect } from "./CoatTypeSelect"
import { DateTimeSelect } from "./DateTimeSelect"
import { BookingSuccess } from "./BookingSuccess"
import { BookingState, DogSize, CoatType } from "@/types"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  state: BookingState
  isSuccess: boolean
  onSelectService: (service: "bath" | "cut") => void
  onSelectDogSize: (size: DogSize) => void
  onSelectCoatType: (coat: CoatType) => void
  onSelectDate: (date: Date) => void
  onSelectTime: (time: string) => void
  onReset: () => void
  onGoBackToSize: () => void
  onGoBackToCoat: () => void
  onSubmit: () => void
  canSubmit: boolean
  summary: string
  name: string
  phoneNumber: string
  email: string
  dogName: string
  onChangeName: (value: string) => void
  onChangePhoneNumber: (value: string) => void
  onChangeEmail: (value: string) => void
  onChangeDogName: (value: string) => void
}

export function BookingModal({
  isOpen,
  onClose,
  state,
  isSuccess,
  onSelectService,
  onSelectDogSize,
  onSelectCoatType,
  onSelectDate,
  onSelectTime,
  onReset,
  onGoBackToSize,
  onGoBackToCoat,
  onSubmit,
  canSubmit,
  summary,
  name,
  phoneNumber,
  email,
  dogName,
  onChangeName,
  onChangePhoneNumber,
  onChangeEmail,
  onChangeDogName
}: BookingModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.style.overflow = "hidden"

      const preventBodyScroll = (e: Event) => {
        const target = e.target as HTMLElement
        // Only prevent scroll if it's not inside the modal
        if (!target.closest('[role="dialog"]') && !target.closest('.modal-content')) {
          e.preventDefault()
        }
      }

      // Prevent scroll events on body
      document.addEventListener('wheel', preventBodyScroll, { passive: false })
      document.addEventListener('touchmove', preventBodyScroll, { passive: false })

      return () => {
        document.body.style.overflow = "unset"
        document.body.style.paddingRight = "unset"
        document.documentElement.style.overflow = "unset"
        document.removeEventListener('wheel', preventBodyScroll)
        document.removeEventListener('touchmove', preventBodyScroll)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Determine current step
  const getCurrentStep = () => {
    if (state.service === null) return "service"
    if (state.dogSize === null) return "size"
    // Coat type required for cut service (except cats)
    if (state.service === "cut" && state.dogSize !== "cat" && state.coatType === null) return "coat"
    return "datetime"
  }

  const currentStep = getCurrentStep()

  return (
    <div className='fixed inset-0 z-60'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='absolute inset-0 flex items-start md:items-center justify-center p-4 pt-4 md:pt-0 overflow-hidden' role="dialog">
        <div className='modal-content relative bg-white w-full sm:max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-4xl shadow-2xl flex flex-col transition-all duration-300 ring-1 ring-primary/5'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-7 right-6 z-20 p-2 text-primary hover:text-primary/70 transition-colors'
            aria-label='Close modal'
          >
            <Icon icon='lucide:x' className='w-6 h-6' />
          </button>

          {/* Success View */}
          {isSuccess && (
            <BookingSuccess
              onClose={onClose}
              date={state.date}
              time={state.time}
            />
          )}

          {/* Step 1: Service Selection */}
          {!isSuccess && currentStep === "service" && (
            <ServiceSelect onSelectService={onSelectService} />
          )}

          {/* Step 2: Dog Size Selection */}
          {!isSuccess && currentStep === "size" && state.service && (
            <DogSizeSelect
              serviceType={state.service}
              onSelectSize={onSelectDogSize}
              onBack={onReset}
            />
          )}

          {/* Step 3: Coat Type (cut only, non-cat) */}
          {!isSuccess && currentStep === "coat" && (
            <CoatTypeSelect
              dogSize={state.dogSize}
              onSelectCoat={onSelectCoatType}
              onBack={onGoBackToSize}
            />
          )}

          {/* Step 4: Date/Time Selection */}
          {!isSuccess && currentStep === "datetime" && (
            <DateTimeSelect
              selectedDate={state.date}
              selectedTime={state.time}
              onSelectDate={onSelectDate}
              onSelectTime={onSelectTime}
              onBack={state.service === "cut" && state.dogSize !== "cat" ? onGoBackToCoat : onGoBackToSize}
              onSubmit={onSubmit}
              canSubmit={canSubmit}
              summary={summary}
              serviceType={state.service}
              dogSize={state.dogSize}
              name={name}
              phoneNumber={phoneNumber}
              email={email}
              dogName={dogName}
              onChangeName={onChangeName}
              onChangePhoneNumber={onChangePhoneNumber}
              onChangeEmail={onChangeEmail}
              onChangeDogName={onChangeDogName}
            />
          )}
        </div>
      </div>
    </div>
  )
}
