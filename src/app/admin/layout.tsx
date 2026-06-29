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
  Search,
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
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — dark navy */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#0B1120] flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 sidebar-noise ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-5 px-5 border-b border-white/[0.06]">
          <Link href="/admin" className="flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="StaysInMarrakech"
              width={100}
              height={100}
              className="object-contain w-24 h-24"
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 admin-scrollbar">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si} className="mb-5">
              {section.title && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 active:scale-[0.98] ${
                      isActive
                        ? "text-white bg-white/[0.08]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#3b82f6]" />
                    )}
                    <item.icon className={`size-[18px] ${isActive ? "text-blue-400" : ""}`} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500/90 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors duration-200 mb-1"
          >
            <ExternalLink className="size-[18px]" />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors duration-200"
          >
            <LogOut className="size-[18px]" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
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

          {/* Search bar (center) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <div className="w-full h-9 pl-9 pr-4 rounded-xl bg-gray-50 border border-gray-200/80 text-sm text-gray-400 flex items-center cursor-default select-none">
                Rechercher...
              </div>
            </div>
          </div>

          {/* Right side: notifications + avatar */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#0d47a1] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-tight">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
