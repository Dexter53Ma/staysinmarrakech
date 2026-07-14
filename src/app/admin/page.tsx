import { prisma } from "@/lib/prisma";
import {
  CalendarDays,
  Mail,
  Eye,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  Wrench,
  FileText,
  ArrowUpRight,
  Building2,
  History,
} from "lucide-react";
import Link from "next/link";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { ActivityFeed } from "@/components/admin/ActivityFeed";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  REJECTED: "Refusée",
  CANCELLED: "Annulée",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/15",
  CONFIRMED: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  REJECTED: "bg-red-50 text-red-700 ring-red-600/15",
  CANCELLED: "bg-gray-50 text-gray-600 ring-gray-500/15",
};

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function formatDateLong(date: Date | string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  let totalProperties = 0;
  let activeListings = 0;
  let totalBookings = 0;
  let pendingBookings = 0;
  let totalViews = 0;
  let pendingContacts = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentBookings: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let popularProperties: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentContacts: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let propertyTypeBreakdown: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentActivity: any[] = [];
  let dbConnected = true;

  try {
    const [
      _totalProperties,
      _activeListings,
      _totalBookings,
      _pendingBookings,
      _totalViews,
      _pendingContacts,
      _recentBookings,
      _popularProperties,
      _recentContacts,
      _propertyTypeBreakdown,
      _recentActivity,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "AVAILABLE" } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.propertyView.count(),
      prisma.contactInquiry.count({ where: { status: "NEW" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { property: { select: { title: true } } },
      }),
      prisma.property.findMany({
        take: 5,
        orderBy: { views: { _count: "desc" } },
        select: { title: true, slug: true, _count: { select: { views: true } } },
      }),
      prisma.contactInquiry.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, subject: true, createdAt: true },
      }),
      prisma.property.groupBy({
        by: ["type"],
        _count: { type: true },
        orderBy: { _count: { type: "desc" } },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true } } },
      }),
    ]);
    totalProperties = _totalProperties;
    activeListings = _activeListings;
    totalBookings = _totalBookings;
    pendingBookings = _pendingBookings;
    totalViews = _totalViews;
    pendingContacts = _pendingContacts;
    recentBookings = _recentBookings;
    popularProperties = _popularProperties;
    recentContacts = _recentContacts;
    propertyTypeBreakdown = _propertyTypeBreakdown;
    recentActivity = _recentActivity;
  } catch {
    dbConnected = false;
  }

  const stats = [
    {
      label: "Propriétés",
      value: totalProperties,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50/80",
      ring: "ring-blue-500/10",
      href: "/admin/properties",
    },
    {
      label: "Annonces actives",
      value: activeListings,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50/80",
      ring: "ring-emerald-500/10",
      href: "/admin/properties",
    },
    {
      label: "Réservations",
      value: totalBookings,
      icon: CalendarDays,
      color: "text-violet-600",
      bg: "bg-violet-50/80",
      ring: "ring-violet-500/10",
      href: "/admin/bookings",
    },
    {
      label: "En attente",
      value: pendingBookings + pendingContacts,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50/80",
      ring: "ring-amber-500/10",
      href: "/admin/bookings",
      highlight: pendingBookings + pendingContacts > 0,
    },
    {
      label: "Total vues",
      value: totalViews,
      icon: Eye,
      color: "text-cyan-600",
      bg: "bg-cyan-50/80",
      ring: "ring-cyan-500/10",
      href: "/admin/properties",
    },
    {
      label: "Messages",
      value: pendingContacts,
      icon: Mail,
      color: "text-rose-600",
      bg: "bg-rose-50/80",
      ring: "ring-rose-500/10",
      href: "/admin/contacts",
      highlight: pendingContacts > 0,
    },
  ];

  const quickActions = [
    {
      label: "Nouvelle propriété",
      description: "Ajouter un nouveau bien",
      href: "/admin/properties/new",
      icon: Plus,
      color: "from-blue-600 to-blue-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Nouveau service",
      description: "Créer un service",
      href: "/admin/services/new",
      icon: Wrench,
      color: "from-emerald-600 to-emerald-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Nouvel article",
      description: "Publier un article",
      href: "/admin/blog/new",
      icon: FileText,
      color: "from-amber-500 to-amber-400",
      shadow: "shadow-amber-500/20",
    },
  ];

  const typeColors: Record<string, { bar: string; dot: string }> = {
    VILLA: { bar: "from-blue-500 to-blue-400", dot: "bg-blue-500" },
    APARTMENT: { bar: "from-violet-500 to-violet-400", dot: "bg-violet-500" },
    RIAD: { bar: "from-amber-500 to-amber-400", dot: "bg-amber-500" },
    PENTHOUSE: { bar: "from-emerald-500 to-emerald-400", dot: "bg-emerald-500" },
    HOUSE: { bar: "from-rose-500 to-rose-400", dot: "bg-rose-500" },
    STUDIO: { bar: "from-cyan-500 to-cyan-400", dot: "bg-cyan-500" },
  };

  const maxTypeCount = Math.max(...propertyTypeBreakdown.map((t) => t._count.type), 1);

  const typeLabels: Record<string, string> = {
    VILLA: "Villa",
    APARTMENT: "Appartement",
    RIAD: "Riad",
    PENTHOUSE: "Penthouse",
    HOUSE: "Maison",
    STUDIO: "Studio",
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* DB error banner */}
      {!dbConnected && (
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/60 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shrink-0" />
            <p className="text-amber-800 text-sm">
              Base de données non connectée. Configurez votre <code className="bg-amber-100/80 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> puis lancez <code className="bg-amber-100/80 px-1.5 py-0.5 rounded text-xs font-mono">npx prisma db push</code>.
            </p>
          </div>
        </div>
      )}

      {/* Welcome section */}
      <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200/60 p-6 lg:p-7">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
              {getGreeting()}, Administrateur
            </h1>
            <p className="text-[13px] text-gray-500 mt-1 capitalize">{getTodayDate()}</p>
          </div>
          <div className="flex items-center gap-2.5">
            {(pendingBookings + pendingContacts) > 0 && (
              <Link
                href="/admin/bookings"
                className="flex items-center gap-2 px-3.5 py-2 bg-amber-50/80 border border-amber-200/50 rounded-lg hover:bg-amber-50 hover:border-amber-200/80 transition-all duration-200 group"
              >
                <span className="relative w-2 h-2 bg-amber-500 rounded-full shrink-0">
                  <span className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-40" />
                </span>
                <span className="text-[13px] font-medium text-amber-700">
                  {pendingBookings + pendingContacts} action{pendingBookings + pendingContacts > 1 ? "s" : ""} en attente
                </span>
                <ArrowRight className="size-3.5 text-amber-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all duration-200" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <div className="bg-white rounded-xl border border-gray-200/60 p-4 admin-card-hover cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${stat.bg} ring-1 ${stat.ring} flex items-center justify-center`}>
                  <stat.icon className={`size-[16px] ${stat.color}`} />
                </div>
                <ArrowUpRight className="size-3.5 text-gray-300 group-hover:text-gray-400 transition-colors duration-200" />
              </div>
              <p className="text-xl font-bold text-gray-900 admin-stat-value tracking-tight">
                {stat.value.toLocaleString("fr-FR")}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{stat.label}</p>
              {stat.highlight && (
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="relative w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0">
                    <span className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-40" />
                  </span>
                  <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">Action requise</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Analytics charts */}
      <AnalyticsCharts />

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href} className="group">
            <div className={`relative overflow-hidden bg-gradient-to-br ${action.color} rounded-xl p-5 cursor-pointer text-white shadow-lg ${action.shadow} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.08] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
                  <action.icon className="size-[16px]" />
                </div>
                <p className="font-semibold text-[13px]">{action.label}</p>
                <p className="text-white/60 text-[11px] mt-0.5">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
              <History className="size-3.5 text-gray-600" />
            </div>
            <h2 className="font-semibold text-[13px] text-gray-900">Activité récente</h2>
          </div>
          <Link
            href="/admin/audit-log"
            className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-blue-600 transition-colors duration-150"
          >
            Tout voir
            <ArrowRight className="size-3" />
          </Link>
        </div>
        <ActivityFeed
          items={recentActivity.map((log) => ({
            action: log.action,
            entity: log.entity,
            createdAt: log.createdAt,
            user: log.user?.name || undefined,
          }))}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent bookings */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                <CalendarDays className="size-3.5 text-violet-600" />
              </div>
              <h2 className="font-semibold text-[13px] text-gray-900">Réservations récentes</h2>
            </div>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-blue-600 transition-colors duration-150"
            >
              Tout voir
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                  <CalendarDays className="size-5 text-gray-300" />
                </div>
                <p className="text-[13px] text-gray-400 font-medium">Aucune réservation</p>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="px-5 py-3 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-[13px] text-gray-900 truncate">{booking.guestName}</p>
                    <span className={`shrink-0 ml-3 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${STATUS_COLORS[booking.status] || ""}`}>
                      {STATUS_LABELS[booking.status] || booking.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 truncate mb-0.5">{booking.property.title}</p>
                  <p className="text-[11px] text-gray-400">
                    {formatDate(booking.checkIn)} → {formatDateLong(booking.checkOut)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popular properties */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="size-3.5 text-blue-600" />
              </div>
              <h2 className="font-semibold text-[13px] text-gray-900">Propriétés populaires</h2>
            </div>
            <Link
              href="/admin/properties"
              className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-blue-600 transition-colors duration-150"
            >
              Tout voir
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {popularProperties.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                  <Eye className="size-5 text-gray-300" />
                </div>
                <p className="text-[13px] text-gray-400 font-medium">Aucune vue enregistrée</p>
              </div>
            ) : (
              popularProperties.map((prop, i) => (
                <div
                  key={prop.slug}
                  className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      i === 0 ? "bg-blue-50 text-blue-600" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-[13px] text-gray-900 truncate">{prop.title}</p>
                      <p className="text-[11px] text-gray-400">/{prop.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <Eye className="size-3 text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-600 admin-stat-value">
                      {prop._count.views.toLocaleString("fr-FR")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: type breakdown + contacts */}
        <div className="lg:col-span-1 space-y-4">
          {/* Property type breakdown */}
          {propertyTypeBreakdown.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Building2 className="size-3.5 text-amber-600" />
                  </div>
                  <h2 className="font-semibold text-[13px] text-gray-900">Types de propriétés</h2>
                </div>
              </div>
              <div className="px-5 py-4 space-y-3">
                {propertyTypeBreakdown.slice(0, 6).map((item) => {
                  const pct = (item._count.type / maxTypeCount) * 100;
                  const colors = typeColors[item.type] || { bar: "from-gray-400 to-gray-300", dot: "bg-gray-400" };
                  return (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <span className="text-[12px] font-medium text-gray-600">
                            {typeLabels[item.type] || item.type}
                          </span>
                        </div>
                        <span className="text-[12px] font-semibold text-gray-500 admin-stat-value">
                          {item._count.type}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-700 ease-out`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent contacts */}
          <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                  <Mail className="size-3.5 text-rose-600" />
                </div>
                <h2 className="font-semibold text-[13px] text-gray-900">Derniers messages</h2>
              </div>
              <Link
                href="/admin/contacts"
                className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-blue-600 transition-colors duration-150"
              >
                Tout voir
                <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentContacts.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                    <Mail className="size-5 text-gray-300" />
                  </div>
                  <p className="text-[13px] text-gray-400 font-medium">Aucun message</p>
                </div>
              ) : (
                recentContacts.map((contact) => (
                  <div key={contact.id} className="px-5 py-3 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-semibold text-gray-500">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[13px] text-gray-900 truncate">{contact.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{contact.subject}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
