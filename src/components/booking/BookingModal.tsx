"use client"

import { useEffect } from "react"
import { Icon } from "@iconify/react"
import { useBookingContext } from "@/context/BookingContext"
import { ServiceSelect } from "./ServiceSelect"
import { DogSizeSelect } from "./DogSizeSelect"
import { CoatTypeSelect } from "./CoatTypeSelect"
import { DateTimeSelect } from "./DateTimeSelect"
import { BookingSuccess } from "./BookingSuccess"

export function BookingModal() {
  const {
    isOpen,
    closeModal,
    state,
    isSuccess
  } = useBookingContext()
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
      return () => document.body.classList.remove('modal-open')
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
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className='absolute inset-0 flex items-start md:items-center justify-center p-4 pt-4 md:pt-0 overflow-hidden' role="dialog">
        <div className='modal-content relative bg-white w-full sm:max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-4xl shadow-2xl flex flex-col transition-all duration-300 ring-1 ring-primary/5'>
          {/* Close Button */}
          <button
            onClick={closeModal}
            className='absolute top-7 right-6 z-20 p-2 text-primary hover:text-primary/70 transition-colors'
            aria-label='Close modal'
          >
            <Icon icon='lucide:x' className='w-6 h-6' />
          </button>

          {/* Success View */}
          {isSuccess && (
            <BookingSuccess
              onClose={closeModal}
              date={state.date}
              time={state.time}
            />
          )}

          {/* Step 1: Service Selection */}
          {!isSuccess && currentStep === "service" && (
            <ServiceSelect />
          )}

          {/* Step 2: Dog Size Selection */}
          {!isSuccess && currentStep === "size" && state.service && (
            <DogSizeSelect />
          )}

          {/* Step 3: Coat Type (cut only, non-cat) */}
          {!isSuccess && currentStep === "coat" && (
            <CoatTypeSelect />
          )}

          {/* Step 4: Date/Time Selection */}
          {!isSuccess && currentStep === "datetime" && (
            <DateTimeSelect />
          )}
        </div>
      </div>
    </div>
  )
}
