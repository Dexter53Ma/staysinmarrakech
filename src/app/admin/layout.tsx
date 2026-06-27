"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { Icon, faBars, faTimes } from "@/components/icons";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Wrench,
  FileText,
  Star,
  Mail,
  Image,
  MapPin,
  File,
  Bell,
  Settings,
  History,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Propriétés", href: "/admin/properties", icon: Home },
  { label: "Réservations", href: "/admin/bookings", icon: CalendarDays },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Témoignages", href: "/admin/testimonials", icon: Star },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Slides Hero", href: "/admin/hero-slides", icon: Image },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Pages", href: "/admin/pages", icon: File },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
  { label: "Journal", href: "/admin/audit-log", icon: History },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#001122] text-white flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/admin" className="font-bold text-lg text-[#ffb000]">
            StaysInMarrakech
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <Icon icon={faTimes} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
                  isActive
                    ? "bg-[#0d47a1] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Icon icon={faBars} className="text-xl" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-[#0d47a1] transition-colors"
            >
              Voir le site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
