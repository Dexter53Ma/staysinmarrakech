"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin";
import {
  BarChart3,
  Building2,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Eye,
  RefreshCw,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

interface AnalyticsData {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  totalViews: number;
  bookingStatusCounts: { pending: number; confirmed: number; rejected: number; cancelled: number };
  monthlyBookings: { month: string; count: number }[];
  topProperties: { title: string; slug: string; views: number }[];
  conversionRate: number;
}

const PERIODS = [
  { value: "7d", label: "7 jours" },
  { value: "30d", label: "30 jours" },
  { value: "90d", label: "90 jours" },
  { value: "all", label: "Tout" },
] as const;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente", color: "text-amber-600", bg: "bg-amber-50" },
  confirmed: { label: "Confirmées", color: "text-emerald-600", bg: "bg-emerald-50" },
  rejected: { label: "Refusées", color: "text-red-600", bg: "bg-red-50" },
  cancelled: { label: "Annulées", color: "text-gray-600", bg: "bg-gray-50" },
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<string>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/analytics?period=${period}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [period, refreshKey]);

  const metricCards = data
    ? [
        { label: "Total Propriétés", value: data.totalProperties, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Réservations", value: data.totalBookings, icon: CalendarDays, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Revenu Total", value: `${data.totalRevenue.toLocaleString("fr-FR")} €`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Taux de Conversion", value: `${data.conversionRate}%`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
      ]
    : [];

  const chartData = data
    ? {
        labels: data.monthlyBookings.map((m) => m.month),
        datasets: [
          {
            label: "Réservations",
            data: data.monthlyBookings.map((m) => m.count),
            backgroundColor: "rgba(13, 71, 161, 0.8)",
            borderColor: "rgba(13, 71, 161, 1)",
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { size: 11 } },
        grid: { color: "rgba(0,0,0,0.04)" },
      },
      x: {
        ticks: { font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <AdminPageHeader
        title="Analytiques"
        description="Vue d'ensemble des performances"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Analytiques" }]}
        action={{ label: "Rafraîchir", onClick: () => setRefreshKey((k) => k + 1), icon: RefreshCw }}
      />

      {/* Period filter */}
      <div className="flex gap-1.5 flex-wrap">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold active:scale-[0.97] transition-all duration-200 ${
              period === p.value
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white border border-gray-200/80 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300/80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Metric cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200/60 p-5 animate-pulse">
              <div className="w-9 h-9 rounded-lg bg-gray-100 mb-3" />
              <div className="h-7 w-20 bg-gray-100 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200/60 p-5">
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon className={`size-[16px] ${card.color}`} />
              </div>
              <p className="text-xl font-bold text-gray-900 tracking-tight">{card.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Charts + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="font-semibold text-[13px] text-gray-900">Réservations mensuelles</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">6 derniers mois</p>
          </div>
          <div className="px-5 py-6">
            {loading ? (
              <div className="h-48 bg-gray-50 rounded-lg animate-pulse" />
            ) : chartData ? (
              <div className="h-48">
                <Bar data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-[13px] text-gray-400">Aucune donnée</div>
            )}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="font-semibold text-[13px] text-gray-900">Statut des réservations</h2>
          </div>
          <div className="px-5 py-5 space-y-3">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-100" />
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-4 w-6 bg-gray-100 rounded" />
                  </div>
                ))
              : Object.entries(STATUS_CONFIG).map(([key, config]) => {
                  const count = data?.bookingStatusCounts[key as keyof typeof data.bookingStatusCounts] || 0;
                  const total = data?.totalBookings || 1;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${config.bg}`} />
                          <span className="text-[12px] font-medium text-gray-600">{config.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-gray-500">{count}</span>
                          <span className="text-[10px] text-gray-400">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${config.bg} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      {/* Top properties */}
      <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <Eye className="size-3.5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-[13px] text-gray-900">Top propriétés par vues</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="px-5 py-3 animate-pulse flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-gray-100" />
                    <div className="h-3 w-32 bg-gray-100 rounded" />
                  </div>
                  <div className="h-4 w-8 bg-gray-100 rounded" />
                </div>
              ))
            : data?.topProperties.map((prop, i) => (
                <div key={prop.slug} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      i === 0 ? "bg-blue-50 text-blue-600" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {i + 1}
                    </span>
                    <p className="font-medium text-[13px] text-gray-900 truncate">{prop.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="size-3 text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-600">{prop.views.toLocaleString("fr-FR")}</span>
                  </div>
                </div>
              ))}
          {!loading && data?.topProperties.length === 0 && (
            <div className="px-5 py-10 text-center text-[13px] text-gray-400">Aucune donnée</div>
          )}
        </div>
      </div>
    </div>
  );
}
