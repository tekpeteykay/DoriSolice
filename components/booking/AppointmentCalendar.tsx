"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface AppointmentCalendarProps {
  /** ISO date ("2026-04-20") of the currently chosen day, if any. */
  selectedDate?: string;
  onSelect: (isoDate: string) => void;
  /** Extra closed-day rule on top of "in the past" — e.g. weekends. */
  isDateDisabled?: (date: Date) => boolean;
}

// A real month-view calendar for picking any future day, not a flat list —
// prev/next month navigation, past days and closed days (weekends, by
// default) greyed out and unclickable, today and the current selection
// visually marked.
export function AppointmentCalendar({ selectedDate, onSelect, isDateDisabled }: AppointmentCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonthStart = startOfMonth(today);

  const [viewMonth, setViewMonth] = useState(currentMonthStart);

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  // JS getDay() is 0=Sun..6=Sat; shift so the grid starts on Monday.
  const leadingBlanks = (viewMonth.getDay() + 6) % 7;

  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)),
  ];

  const isViewingCurrentMonth = isSameDay(viewMonth, currentMonthStart);

  function goPrevMonth() {
    setViewMonth((m) => {
      const prev = new Date(m.getFullYear(), m.getMonth() - 1, 1);
      return prev < currentMonthStart ? currentMonthStart : prev;
    });
  }
  function goNextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  return (
    <div className="rounded-2xl border border-navy-100 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          disabled={isViewingCurrentMonth}
          aria-label="Previous month"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            isViewingCurrentMonth ? "cursor-not-allowed text-navy-200" : "text-navy-500 hover:bg-navy-50 hover:text-navy-800"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="font-semibold text-navy-900">{viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
        <button
          type="button"
          onClick={goNextMonth}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-800"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-navy-400">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />;
          const iso = toISODate(date);
          const isPast = date < today;
          const isClosed = isDateDisabled?.(date) ?? false;
          const disabled = isPast || isClosed;
          const isSelected = selectedDate === iso;
          const isToday = isSameDay(date, today);

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              className={cn(
                "aspect-square rounded-xl text-sm font-semibold transition-colors",
                disabled && "cursor-not-allowed text-navy-200",
                !disabled && !isSelected && "text-navy-700 hover:bg-navy-50",
                isSelected && "bg-red-500 text-white shadow-glow",
                !isSelected && isToday && !disabled && "ring-1 ring-inset ring-red-300"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
