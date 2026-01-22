"use client"

import { useEffect } from "react"
import { Icon } from "@iconify/react"
import { ServiceSelect } from "./ServiceSelect"
import { DogSizeSelect } from "./DogSizeSelect"
import { DateTimeSelect } from "./DateTimeSelect"
import { BookingSuccess } from "./BookingSuccess"
import { BookingState, DogSize } from "@/types"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  state: BookingState
  isSuccess: boolean
  onSelectService: (service: "bath" | "cut") => void
  onSelectDogSize: (size: DogSize) => void
  onSelectDate: (date: Date) => void
  onSelectTime: (time: string) => void
  onReset: () => void
  onGoBackToSize: () => void
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
  onSelectDate,
  onSelectTime,
  onReset,
  onGoBackToSize,
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
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  // Determine current step
  const getCurrentStep = () => {
    if (state.service === null) return "service"
    if (state.dogSize === null) return "size"
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
      <div className='absolute inset-0 flex items-center justify-center p-4'>
        <div className='relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl shadow-2xl flex flex-col min-h-125 transition-all duration-300 ring-1 ring-primary/5'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-5 right-5 z-20 p-2 text-primary/50 hover:bg-black/5 rounded-full transition-colors'
            aria-label='Close modal'
          >
            <Icon icon='lucide:x' className='w-5 h-5' />
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

          {/* Step 3: Date/Time Selection */}
          {!isSuccess && currentStep === "datetime" && (
            <DateTimeSelect
              selectedDate={state.date}
              selectedTime={state.time}
              onSelectDate={onSelectDate}
              onSelectTime={onSelectTime}
              onBack={onGoBackToSize}
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
