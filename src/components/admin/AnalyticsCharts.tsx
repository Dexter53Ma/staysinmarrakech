"use client";

import { useEffect, useState } from "react";

interface MonthData {
  month: string;
  count: number;
  total?: number;
}

interface Tooltip {
  visible: boolean;
  x: number;
  y: number;
  label: string;
  value: string;
}

export function AnalyticsCharts() {
  const [bookings, setBookings] = useState<MonthData[]>([]);
  const [tooltip, setTooltip] = useState<Tooltip>({ visible: false, x: 0, y: 0, label: "", value: "" });

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setBookings(d.monthlyBookings || d.bookingsByMonth || []);
      })
      .catch(() => {});
  }, []);

  const handleBarHover = (e: React.MouseEvent, month: string, value: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top - 8, label: month, value });
  };

  const handleBarLeave = () => setTooltip((t) => ({ ...t, visible: false }));

  const maxBookings = Math.max(...bookings.map((b) => b.count), 1);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bookings chart */}
        <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="font-semibold text-[13px] text-gray-900">Réservations par mois</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">6 derniers mois</p>
          </div>
          <div className="px-5 py-6">
            <div className="flex items-end gap-3 h-40">
              {bookings.map((b) => {
                const pct = (b.count / maxBookings) * 100;
                return (
                  <div key={b.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-semibold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {b.count}
                    </span>
                    <div
                      className="w-full rounded-t-md cursor-pointer transition-all duration-200 hover:opacity-80"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: "linear-gradient(180deg, #0d47a1, #1565c0)",
                      }}
                      onMouseEnter={(e) => handleBarHover(e, b.month, `${b.count} réservation${b.count !== 1 ? "s" : ""}`)}
                      onMouseLeave={handleBarLeave}
                    />
                    <span className="text-[11px] text-gray-500 font-medium">{b.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bookings count summary */}
        <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="font-semibold text-[13px] text-gray-900">Résumé</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Tendance des réservations</p>
          </div>
          <div className="px-5 py-6">
            <div className="flex items-end gap-3 h-40">
              {bookings.map((b) => {
                const pct = (b.count / maxBookings) * 100;
                return (
                  <div key={b.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-semibold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {b.count}
                    </span>
                    <div
                      className="w-full rounded-t-md cursor-pointer transition-all duration-200 hover:opacity-80"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: "linear-gradient(180deg, #0d47a1, #1565c0)",
                      }}
                      onMouseEnter={(e) => handleBarHover(e, b.month, `${b.count} réservation${b.count !== 1 ? "s" : ""}`)}
                      onMouseLeave={handleBarLeave}
                    />
                    <span className="text-[11px] text-gray-500 font-medium">{b.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 px-2.5 py-1.5 bg-gray-900 text-white text-[11px] font-medium rounded-lg shadow-lg pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          <p className="font-semibold">{tooltip.value}</p>
          <p className="text-gray-400">{tooltip.label}</p>
        </div>
      )}
    </>
  );
}
