'use client';

interface TimeSlotsProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  hasDate: boolean;
}

const AVAILABLE_TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'];

export function TimeSlots({ selectedTime, onSelectTime, hasDate }: TimeSlotsProps) {
  if (!hasDate) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto no-scrollbar pr-1">
      {AVAILABLE_TIMES.map((time) => (
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
