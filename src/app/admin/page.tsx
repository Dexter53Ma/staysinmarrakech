import { prisma } from "@/lib/prisma";
import {
  Home,
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
  Castle,
  Hotel,
  TreePalm,
  Mountain,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  REJECTED: "Refusée",
  CANCELLED: "Annulée",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  CONFIRMED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
  CANCELLED: "bg-gray-50 text-gray-600 ring-gray-500/20",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  } catch {
    dbConnected = false;
  }

  const stats = [
    {
      label: "Propriétés",
      value: totalProperties,
      icon: Building2,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/admin/properties",
    },
    {
      label: "Annonces actives",
      value: activeListings,
      icon: TrendingUp,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      href: "/admin/properties",
    },
    {
      label: "Réservations",
      value: totalBookings,
      icon: CalendarDays,
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
      href: "/admin/bookings",
    },
    {
      label: "En attente",
      value: pendingBookings + pendingContacts,
      icon: Clock,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      href: "/admin/bookings",
      highlight: pendingBookings + pendingContacts > 0,
    },
    {
      label: "Total vues",
      value: totalViews,
      icon: Eye,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/admin/properties",
    },
    {
      label: "Messages",
      value: pendingContacts,
      icon: Mail,
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
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
      gradient: "from-[#0d47a1] to-[#1565c0]",
    },
    {
      label: "Nouveau service",
      description: "Créer un service",
      href: "/admin/services/new",
      icon: Wrench,
      gradient: "from-emerald-600 to-emerald-500",
    },
    {
      label: "Nouvel article",
      description: "Publier un article",
      href: "/admin/blog/new",
      icon: FileText,
      gradient: "from-amber-500 to-amber-400",
    },
  ];

  // Bar chart colors for property types
  const typeColors: Record<string, string> = {
    VILLA: "bg-blue-500",
    APARTMENT: "bg-violet-500",
    RIAD: "bg-amber-500",
    PENTHOUSE: "bg-emerald-500",
    HOUSE: "bg-rose-500",
    STUDIO: "bg-cyan-500",
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
    <div className="space-y-6">
      {/* DB error banner */}
      {!dbConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-amber-800 text-sm font-medium">
            Base de données non connectée. Configurez votre <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">.env</code> puis lancez <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">npx prisma db push</code>.
          </p>
        </div>
      )}

      {/* Welcome section */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0d47a1] to-[#1565c0] rounded-full" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, Administrateur
            </h1>
            <p className="text-sm text-gray-500 mt-1 capitalize">{getTodayDate()}</p>
          </div>
          <div className="flex items-center gap-2">
            {(pendingBookings + pendingContacts) > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 border border-amber-200/60 rounded-xl">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-amber-700">
                  {pendingBookings + pendingContacts} action{pendingBookings + pendingContacts > 1 ? "s" : ""} en attente
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stat cards — 3 cols on md, 6 on xl */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 admin-card-hover cursor-pointer">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`size-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="size-4 text-gray-200 group-hover:text-gray-400 transition-colors duration-200" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
              {stat.highlight && (
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-amber-600">Action requise</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick action cards — gradient */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href} className="group">
            <div className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} rounded-2xl p-5 admin-card-hover cursor-pointer text-white`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <action.icon className="size-5" />
                </div>
                <p className="font-semibold text-sm">{action.label}</p>
                <p className="text-white/70 text-xs mt-0.5">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main content: 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-900">Réservations récentes</h2>
            </div>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0d47a1] transition-colors duration-150"
            >
              Tout voir
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <CalendarDays className="size-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Aucune réservation</p>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="px-5 py-3.5 hover:bg-gray-50/60 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-gray-900 truncate">{booking.guestName}</p>
                    <span className={`shrink-0 ml-3 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_COLORS[booking.status] || ""}`}>
                      {STATUS_LABELS[booking.status] || booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-0.5">{booking.property.title}</p>
                  <p className="text-[11px] text-gray-400">
                    {formatDate(booking.checkIn)} → {formatDateLong(booking.checkOut)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popular properties */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-900">Propriétés populaires</h2>
            </div>
            <Link
              href="/admin/properties"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0d47a1] transition-colors duration-150"
            >
              Tout voir
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {popularProperties.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Eye className="size-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Aucune vue enregistrée</p>
              </div>
            ) : (
              popularProperties.map((prop, i) => (
                <div
                  key={prop.slug}
                  className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/60 transition-colors duration-150"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500 shrink-0">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{prop.title}</p>
                      <p className="text-[11px] text-gray-400">/{prop.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <Eye className="size-3.5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {prop._count.views}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Property type breakdown + recent activity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Property type breakdown chart */}
          {propertyTypeBreakdown.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <Building2 className="size-4 text-gray-400" />
                <h2 className="font-semibold text-sm text-gray-900">Types de propriétés</h2>
              </div>
              <div className="px-5 py-4 space-y-3">
                {propertyTypeBreakdown.slice(0, 6).map((item) => {
                  const pct = (item._count.type / maxTypeCount) * 100;
                  return (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">
                          {typeLabels[item.type] || item.type}
                        </span>
                        <span className="text-xs font-medium text-gray-500" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {item._count.type}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${typeColors[item.type] || "bg-gray-400"} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent contacts / messages */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gray-400" />
                <h2 className="font-semibold text-sm text-gray-900">Derniers messages</h2>
              </div>
              <Link
                href="/admin/contacts"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0d47a1] transition-colors duration-150"
              >
                Tout voir
                <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentContacts.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Mail className="size-7 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Aucun message</p>
                </div>
              ) : (
                recentContacts.map((contact) => (
                  <div key={contact.id} className="px-5 py-3 hover:bg-gray-50/60 transition-colors duration-150">
                    <p className="font-medium text-sm text-gray-900 truncate">{contact.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{contact.subject}</p>
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
