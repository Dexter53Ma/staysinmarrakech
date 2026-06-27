import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, CalendarDays, Mail, Eye, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
    { label: "Propriétés", value: totalProperties, icon: Home, color: "text-blue-600", href: "/admin/properties" },
    { label: "Annonces actives", value: activeListings, icon: TrendingUp, color: "text-green-600", href: "/admin/properties" },
    { label: "Réservations", value: totalBookings, icon: CalendarDays, color: "text-purple-600", href: "/admin/bookings" },
    { label: "En attente", value: pendingBookings + pendingContacts, icon: Clock, color: "text-orange-600", href: "/admin/bookings" },
    { label: "Total vues", value: totalViews, icon: Eye, color: "text-cyan-600", href: "/admin/properties" },
    { label: "Messages", value: pendingContacts, icon: Mail, color: "text-red-600", href: "/admin/contacts" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {!dbConnected && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <p className="text-orange-800 text-sm">
              ⚠️ Base de données non connectée. Configurez votre <code>.env</code> avec les identifiants Supabase, puis lancez <code>npx prisma db push</code>.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Réservations récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune réservation</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{booking.guestName}</p>
                      <p className="text-xs text-gray-500">{booking.property.title}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular properties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Propriétés populaires</CardTitle>
          </CardHeader>
          <CardContent>
            {popularProperties.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune vue enregistrée</p>
            ) : (
              <div className="space-y-3">
                {popularProperties.map((prop) => (
                  <div
                    key={prop.slug}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{prop.title}</p>
                      <p className="text-xs text-gray-500">/{prop.slug}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {prop._count.views} vues
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
