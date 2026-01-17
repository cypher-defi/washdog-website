'use client';

interface CalendarProps {
  selectedDate: number | null;
  onSelectDate: (date: number) => void;
}

const DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  return (
    <div className="grid grid-cols-7 gap-1 text-xs font-medium">
      {/* Day headers */}
      {DAYS.map((day, index) => (
        <div key={`header-${index}`} className="text-center text-primary/30 py-2">
          {day}
        </div>
      ))}

      {/* Day numbers */}
      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
        <div
          key={day}
          onClick={() => onSelectDate(day)}
          className={`
            aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all
            ${
              selectedDate === day
                ? 'calendar-day selected shadow-md'
                : 'hover:bg-background hover:text-accent-blue'
            }
          `}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
