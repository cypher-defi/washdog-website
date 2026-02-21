'use client';

import { useMemo } from 'react';
import { DogSize, SLOT_DURATIONS } from '@/types';

type ValidSize = NonNullable<DogSize>;

interface TimeSlotsProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  selectedDate: Date | null;
  serviceType: 'bath' | 'cut' | null;
  dogSize: DogSize;
  bookedSlots?: string[];
}

const BASE_SLOT_MINUTES = 15;
const START_HOUR = 10;
const END_HOUR = 20;

function generateBaseSlots(): string[] {
  const slots: string[] = [];
  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += BASE_SLOT_MINUTES) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return slots;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function isSlotAvailable(
  startTime: string,
  durationMinutes: number,
  bookedSlots: string[]
): boolean {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + durationMinutes;
  if (endMinutes > END_HOUR * 60) return false;
  for (let min = startMinutes; min < endMinutes; min += BASE_SLOT_MINUTES) {
    if (bookedSlots.includes(minutesToTime(min))) return false;
  }
  return true;
}

function getTodayInSantiago(): { year: number; month: number; day: number } {
  const now = new Date();
  const santiagoDateStr = now.toLocaleDateString('en-CA', { timeZone: 'America/Santiago' });
  const [year, month, day] = santiagoDateStr.split('-').map(Number);
  return { year, month: month - 1, day };
}

function isToday(date: Date): boolean {
  const today = getTodayInSantiago();
  return (
    date.getFullYear() === today.year &&
    date.getMonth() === today.month &&
    date.getDate() === today.day
  );
}

function getCurrentTimeMinutes(): number {
  const now = new Date();
  const santiagoTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Santiago',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
  const [hours, minutes] = santiagoTime.split(':').map(Number);
  return hours * 60 + minutes;
}

function getAvailableSlots(
  serviceType: 'bath' | 'cut',
  dogSize: ValidSize,
  bookedSlots: string[],
  selectedDate: Date | null
): string[] {
  const durationMinutes = SLOT_DURATIONS[serviceType][dogSize];
  const baseSlots = generateBaseSlots();
  const availableSlots: string[] = [];
  const currentMinutes = selectedDate && isToday(selectedDate) ? getCurrentTimeMinutes() : 0;

  for (const slot of baseSlots) {
    const slotMinutes = timeToMinutes(slot);
    if (slotMinutes <= currentMinutes) continue;
    if (isSlotAvailable(slot, durationMinutes, bookedSlots)) {
      availableSlots.push(slot);
    }
  }

  return availableSlots;
}

export function TimeSlots({
  selectedTime,
  onSelectTime,
  selectedDate,
  serviceType,
  dogSize,
  bookedSlots = [],
}: TimeSlotsProps) {
  const availableTimes = useMemo(() => {
    if (!serviceType || !dogSize) return [];
    return getAvailableSlots(serviceType, dogSize as ValidSize, bookedSlots, selectedDate);
  }, [serviceType, dogSize, bookedSlots, selectedDate]);

  if (!selectedDate) {
    return (
      <p className="text-primary/40 text-sm">
        Selecciona una fecha primero
      </p>
    );
  }

  if (availableTimes.length === 0) {
    return (
      <p className="text-primary/40 text-sm">
        No hay horarios disponibles para esta fecha
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto no-scrollbar pr-1">
      {availableTimes.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onSelectTime(time)}
          className={`
            py-2 rounded-lg border border-primary/10 text-xs font-medium transition-all time-slot
            ${
              selectedTime === time
                ? 'bg-accent-blue text-white border-accent-blue shadow-md'
                : 'bg-white text-primary/70 hover:border-accent-blue hover:text-accent-blue'
            }
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
