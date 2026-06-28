"use client";

import { useState, useEffect, useRef } from "react";
import { Icon, faCalendarAlt, faChevronDown, faArrowLeft, faArrowRight } from "@/components/icons";

const monthNames = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const dayNames = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

function CalendarGrid({
  value,
  onChange,
  minDate,
  onSelect,
}: {
  value: string;
  onChange: (d: string) => void;
  minDate: Date;
  onSelect?: () => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => (value ? new Date(value + "T00:00:00") : new Date()));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectDate = (day: number) => {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
    onSelect?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))} className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Icon icon={faArrowLeft} className="text-gray-500 text-xs" />
        </button>
        <p className="text-sm font-bold text-gray-800">{monthNames[month]} {year}</p>
        <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Icon icon={faArrowRight} className="text-gray-500 text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const d = new Date(year, month, day);
          d.setHours(0, 0, 0, 0);
          const isDisabled = d < minDate;
          const isToday = d.getTime() === today.getTime();
          const isSelected = value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => selectDate(day)}
              className={`h-9 w-full rounded-full text-xs font-medium transition-all
                ${isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-[#0d47a1] hover:text-white active:bg-[#0d47a1] active:text-white cursor-pointer"}
                ${isSelected ? "bg-[#0d47a1] text-white font-bold" : ""}
                ${isToday && !isSelected ? "ring-1 ring-[#0d47a1] text-[#0d47a1] font-bold" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <button
          type="button"
          onClick={() => {
            const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            onChange(iso);
            onSelect?.();
          }}
          className="text-xs font-semibold text-[#0d47a1] hover:underline"
        >
          Aujourd&apos;hui
        </button>
      </div>
    </div>
  );
}

interface DateCalendarPickerProps {
  value: string;
  onChange: (d: string) => void;
  minDate?: string;
  label: string;
  placeholder: string;
  variant?: "desktop" | "mobile";
}

export default function DateCalendarPicker({
  value,
  onChange,
  minDate,
  label,
  placeholder,
  variant = "desktop",
}: DateCalendarPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ? new Date(minDate + "T00:00:00") : today;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const calendarPanel = (
    <CalendarGrid value={value} onChange={onChange} minDate={min} onSelect={() => setOpen(false)} />
  );

  if (variant === "mobile") {
    return (
      <div ref={ref} className="relative">
        <div
          className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3.5 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-3">
            <Icon icon={faCalendarAlt} className="text-[#0d47a1] shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
              <p className={`text-sm font-medium mt-0.5 ${displayValue ? "text-gray-800" : "text-gray-400"}`}>
                {displayValue || placeholder}
              </p>
            </div>
          </div>
          <Icon icon={faChevronDown} className={`text-gray-400 text-xs transition-transform ${open ? "rotate-180" : ""}`} />
        </div>

        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
            <div className="px-4 w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
              {calendarPanel}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Icon icon={faCalendarAlt} className="text-[#0d47a1] text-sm shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
          <p className={`text-sm font-medium mt-0.5 ${displayValue ? "text-gray-800" : "text-gray-400"}`}>
            {displayValue || placeholder}
          </p>
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 md:hidden" onClick={() => setOpen(false)}>
            <div className="px-4 w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
              {calendarPanel}
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 hidden md:block" onClick={(e) => e.stopPropagation()}>
            {calendarPanel}
          </div>
        </>
      )}
    </div>
  );
}
