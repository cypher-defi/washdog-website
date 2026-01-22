'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Get today's date in Santiago timezone
function getTodayInSantiago(): Date {
  const now = new Date();
  const santiagoDateStr = now.toLocaleDateString('en-CA', { timeZone: 'America/Santiago' });
  const [year, month, day] = santiagoDateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = getTodayInSantiago();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Calculate max month (current + 1)
  const maxMonth = today.getMonth() + 1;
  const maxYear = maxMonth > 11 ? today.getFullYear() + 1 : today.getFullYear();
  const adjustedMaxMonth = maxMonth > 11 ? 0 : maxMonth;

  const canGoNext = currentYear < maxYear || (currentYear === maxYear && currentMonth < adjustedMaxMonth);
  const canGoPrev = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  const goToNextMonth = () => {
    if (!canGoNext) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get number of days in the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Check if a date is selectable (today or future, within the allowed range)
  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  };

  // Check if a date is selected
  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const handleDateClick = (day: number) => {
    if (!isDateSelectable(day)) return;
    const date = new Date(currentYear, currentMonth, day);
    console.log("[Calendar] Click:", { day, currentYear, currentMonth, dateCreated: date.toString(), getDate: date.getDate() });
    onSelectDate(date);
  };

  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Icon icon="lucide:chevron-left" className="w-5 h-5 text-primary" />
        </button>
        <h4 className="font-semibold text-primary">
          {MONTHS[currentMonth]} {currentYear}
        </h4>
        <button
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className="p-2 rounded-lg hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Icon icon="lucide:chevron-right" className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs font-medium">
        {/* Day headers */}
        {DAYS.map((day, index) => (
          <div key={`header-${index}`} className="text-center text-primary/30 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day numbers */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const selectable = isDateSelectable(day);
          const selected = isDateSelected(day);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square flex items-center justify-center rounded-lg transition-all
                ${selected
                  ? 'calendar-day selected shadow-md'
                  : selectable
                    ? 'cursor-pointer hover:bg-background hover:text-accent-blue'
                    : 'text-primary/20 cursor-not-allowed'
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
