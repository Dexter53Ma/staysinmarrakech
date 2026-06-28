"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Wrench,
  FileText,
  Star,
  Mail,
  Image as ImageIcon,
  MapPin,
  File,
  Bell,
  Settings,
  History,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

const NAV_SECTIONS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Gestion",
    items: [
      { label: "Propriétés", href: "/admin/properties", icon: Home },
      { label: "Réservations", href: "/admin/bookings", icon: CalendarDays },
      { label: "Services", href: "/admin/services", icon: Wrench },
      { label: "Blog", href: "/admin/blog", icon: FileText },
    ],
  },
  {
    title: "Contenu",
    items: [
      { label: "Témoignages", href: "/admin/testimonials", icon: Star },
      { label: "Contacts", href: "/admin/contacts", icon: Mail },
      { label: "Slides Hero", href: "/admin/hero-slides", icon: ImageIcon },
      { label: "Locations", href: "/admin/locations", icon: MapPin },
      { label: "Pages", href: "/admin/pages", icon: File },
    ],
  },
  {
    title: "Système",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
      { label: "Paramètres", href: "/admin/settings", icon: Settings },
      { label: "Journal", href: "/admin/audit-log", icon: History },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/properties": "Propriétés",
  "/admin/bookings": "Réservations",
  "/admin/services": "Services",
  "/admin/blog": "Blog",
  "/admin/testimonials": "Témoignages",
  "/admin/contacts": "Contacts",
  "/admin/hero-slides": "Slides Hero",
  "/admin/locations": "Locations",
  "/admin/pages": "Pages",
  "/admin/notifications": "Notifications",
  "/admin/newsletter": "Newsletter",
  "/admin/settings": "Paramètres",
  "/admin/audit-log": "Journal",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const getPageTitle = () => {
    if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 3) {
      if (pathname.includes("/new")) return "Nouveau";
      if (pathname.includes("/edit")) return "Modifier";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-gray-200/80 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center h-16 px-5 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="StaysInMarrakech"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-gray-900 leading-tight truncate">StaysInMarrakech</p>
              <p className="text-[11px] text-gray-400 leading-tight">Administration</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si} className="mb-4">
              {section.title && (
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5 active:scale-[0.98] ${
                      isActive
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="size-[18px]" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 mb-1"
          >
            <ExternalLink className="size-[18px]" />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150"
          >
            <LogOut className="size-[18px]" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
            >
              <Menu className="size-5" />
            </button>
            <nav className="hidden sm:flex items-center gap-1.5 text-sm">
              <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
                Admin
              </Link>
              {pathname !== "/admin" && (
                <>
                  <ChevronRight className="size-3.5 text-gray-300" />
                  <span className="text-gray-700 font-medium">{getPageTitle()}</span>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
