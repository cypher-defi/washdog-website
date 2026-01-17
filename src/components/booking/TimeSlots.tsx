'use client';

interface TimeSlotsProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  hasDate: boolean;
  serviceType: 'bath' | 'cut' | null;
}

function generateTimeSlots(serviceType: 'bath' | 'cut' | null): string[] {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 21;

  // Peluquería (cut) = 1 hour slots, Baño (bath) = 15 minute slots
  const intervalMinutes = serviceType === 'cut' ? 60 : 15;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }

  return slots;
}

export function TimeSlots({ selectedTime, onSelectTime, hasDate, serviceType }: TimeSlotsProps) {
  if (!hasDate) {
    return null;
  }

  const availableTimes = generateTimeSlots(serviceType);

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
                ? 'selected shadow-md'
                : 'hover:border-accent-blue hover:text-accent-blue bg-white'
            }
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
