import { prisma } from "@/lib/prisma";
import { Home, CalendarDays, Mail, Eye, TrendingUp, Clock, ArrowUpRight, Plus, Wrench, FileText } from "lucide-react";
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
  let dbConnected = true;

  try {
    [
      totalProperties,
      activeListings,
      totalBookings,
      pendingBookings,
      totalViews,
      pendingContacts,
      recentBookings,
      popularProperties,
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
    ]);
  } catch {
    dbConnected = false;
  }

  const stats = [
    {
      label: "Propriétés",
      value: totalProperties,
      icon: Home,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/admin/properties",
    },
    {
      label: "Annonces actives",
      value: activeListings,
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      href: "/admin/properties",
    },
    {
      label: "Réservations",
      value: totalBookings,
      icon: CalendarDays,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/admin/bookings",
    },
    {
      label: "En attente",
      value: pendingBookings + pendingContacts,
      icon: Clock,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      href: "/admin/bookings",
      highlight: pendingBookings + pendingContacts > 0,
    },
    {
      label: "Total vues",
      value: totalViews,
      icon: Eye,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      href: "/admin/properties",
    },
    {
      label: "Messages",
      value: pendingContacts,
      icon: Mail,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      href: "/admin/contacts",
      highlight: pendingContacts > 0,
    },
  ];

  const quickActions = [
    { label: "Nouvelle propriété", href: "/admin/properties/new", icon: Plus, color: "bg-gray-900 hover:bg-gray-800 text-white" },
    { label: "Nouveau service", href: "/admin/services/new", icon: Wrench, color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" },
    { label: "Nouvel article", href: "/admin/blog/new", icon: FileText, color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" },
  ];

  return (
    <div className="space-y-8">
      {!dbConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-amber-800 text-sm font-medium">
            Base de données non connectée. Configurez votre <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">.env</code> puis lancez <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">npx prisma db push</code>.
          </p>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Vue d&apos;ensemble de votre activité</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`size-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="size-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
              </div>
              {stat.highlight && (
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-medium text-amber-600">Action requise</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${action.color}`}>
              <action.icon className="size-4" />
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Réservations récentes</h2>
            <Link href="/admin/bookings" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <CalendarDays className="size-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucune réservation</p>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="px-6 py-3.5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-medium text-sm text-gray-900 truncate">{booking.guestName}</p>
                    <span className={`shrink-0 ml-4 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[booking.status] || ""}`}>
                      {STATUS_LABELS[booking.status] || booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-1">{booking.property.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(booking.checkIn).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    {" → "}
                    {new Date(booking.checkOut).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Propriétés populaires</h2>
            <Link href="/admin/properties" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {popularProperties.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <Home className="size-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucune vue enregistrée</p>
              </div>
            ) : (
              popularProperties.map((prop, i) => (
                <div
                  key={prop.slug}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{prop.title}</p>
                      <p className="text-xs text-gray-500">/{prop.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    <Eye className="size-3.5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{prop._count.views}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
