"use client";

import { useMemo, useState } from "react";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { CalendarDays, Lock, CheckCircle2 } from "lucide-react";

interface BookedRange {
  start: Date;
  end: Date;
}

interface AvailabilityCalendarProps {
  bookedDates: BookedRange[];
  isDateBooked: (date: Date) => boolean;
}

export default function AvailabilityCalendar({ bookedDates, isDateBooked }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const selectedDates = useMemo(() => {
    return bookedDates.flatMap((b) => {
      const dates: Date[] = [];
      const d = new Date(b.start);
      while (d < b.end) {
        dates.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      return dates;
    });
  }, [bookedDates]);

  const bookedCount = selectedDates.length;
  const today = new Date();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  let availableCount = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    if (date >= today && !isDateBooked(date)) availableCount++;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d47a1]/[0.02] via-transparent to-[#ffb000]/[0.02] pointer-events-none" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d47a1] to-[#1565c0] shadow-md shadow-[#0d47a1]/20">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Disponibilité</h2>
              <p className="text-xs text-gray-400 mt-0.5">Calendrier en temps réel</p>
            </div>
          </div>
          {bookedCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-medium">
              <Lock className="w-3 h-3" />
              {bookedCount} jour{bookedCount > 1 ? "s" : ""} réservé{bookedCount > 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50/80 rounded-xl p-3 sm:p-4 border border-gray-100">
              <div className="min-w-[300px]">
                <DatePicker
                  mode="multiple"
                  selected={selectedDates}
                  disabled={(date) => isDateBooked(date)}
                  locale={fr}
                  onMonthChange={(month) => setCurrentMonth(month)}
                  classNames={{
                    root: "w-full",
                    months: "flex flex-col gap-4",
                    month: "flex flex-col gap-3",
                    nav: "flex items-center justify-between px-1",
                    button_previous: "h-8 w-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm",
                    button_next: "h-8 w-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm",
                    month_caption: "flex items-center justify-center h-9",
                    caption_label: "text-sm font-semibold text-gray-900",
                    month_grid: "w-full border-collapse",
                    weekdays: "flex",
                    weekday: "flex-1 text-[0.7rem] font-medium text-gray-400 uppercase tracking-wider select-none py-1",
                    week: "mt-1 flex w-full",
                    day: "group/day relative aspect-square h-full w-full p-0 text-center select-none",
                    disabled: "opacity-30 pointer-events-none",
                    today: "relative",
                  }}
                  components={{
                    DayButton: ({ day, ...props }) => {
                      const isBooked = isDateBooked(day.date);
                      const isPast = day.date < new Date(new Date().setHours(0, 0, 0, 0));
                      const isToday = day.date.toDateString() === new Date().toDateString();

                      return (
                        <button
                          {...props}
                          disabled={isBooked || isPast}
                          className={`
                            relative w-full h-full rounded-lg text-sm font-medium transition-all duration-300 ease-out
                            flex items-center justify-center
                            ${isBooked
                              ? "bg-gradient-to-br from-red-50 to-red-100/80 text-red-400 border border-red-200/50 cursor-not-allowed line-through decoration-red-300"
                              : isPast
                                ? "text-gray-300 cursor-not-allowed"
                                : isToday
                                  ? "bg-[#0d47a1] text-white shadow-md shadow-[#0d47a1]/30 hover:shadow-lg hover:shadow-[#0d47a1]/40 hover:scale-105"
                                  : "text-gray-700 hover:bg-gradient-to-br hover:from-[#0d47a1]/10 hover:to-[#0d47a1]/5 hover:text-[#0d47a1] hover:scale-105 cursor-pointer"
                            }
                          `}
                        >
                          {day.date.getDate()}
                          {isToday && (
                            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                          )}
                          {isBooked && (
                            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                          )}
                        </button>
                      );
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="sm:w-48 flex flex-row sm:flex-col gap-3">
            <div className="flex-1 sm:flex-none bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl p-4 border border-green-200/40 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-700">Disponible</span>
              </div>
              <p className="text-2xl font-bold text-green-800">{availableCount}</p>
              <p className="text-[0.65rem] text-green-500 mt-0.5">jours ce mois</p>
            </div>
            {bookedCount > 0 && (
              <div className="flex-1 sm:flex-none bg-gradient-to-br from-red-50 to-rose-50/50 rounded-xl p-4 border border-red-200/40 transition-all duration-300 hover:shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-xs font-medium text-red-600">Réservé</span>
                </div>
                <p className="text-2xl font-bold text-red-700">{bookedCount}</p>
                <p className="text-[0.65rem] text-red-400 mt-0.5">jours bloqués</p>
              </div>
            )}

            <div className="flex-1 sm:flex-none bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[0.65rem] font-medium text-gray-400 uppercase tracking-wider mb-2">Légende</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-[#0d47a1] shadow-sm shadow-[#0d47a1]/20" />
                  <span className="text-xs text-gray-600">Aujourd&apos;hui</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-gradient-to-br from-red-50 to-red-100 border border-red-200/50" />
                  <span className="text-xs text-gray-600">Réservé</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-white border border-gray-200" />
                  <span className="text-xs text-gray-600">Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
