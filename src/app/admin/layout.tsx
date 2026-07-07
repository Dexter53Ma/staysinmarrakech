"use client";

import { useState, useEffect } from "react";
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
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }
    const supabase = createSupabaseBrowser();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setAuthorized(true);
      }
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Chargement...</div>
      </div>
    );
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
    <div className="min-h-screen bg-[#f8f9fb] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[264px] bg-[#0a0f1a] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0 sidebar-noise ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-5 border-b border-white/[0.06] shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Image
                src="/images/logo.png"
                alt="StaysInMarrakech"
                width={20}
                height={20}
                className="object-contain w-5 h-5 brightness-0 invert"
                priority
              />
            </div>
            <span className="text-sm font-semibold text-white/90 tracking-tight hidden xl:block">StaysInMarrakech</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 admin-scrollbar">
          {NAV_SECTIONS.map((section, si) => (
            <div key={si} className="mb-5">
              {section.title && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500/80">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`relative flex items-center gap-3 px-3 py-[7px] rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                        isActive
                          ? "text-white bg-white/[0.07] admin-nav-active"
                          : "text-slate-400/80 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <item.icon className={`size-[16px] shrink-0 transition-colors duration-200 ${
                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-400"
                      }`} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-500/90 text-white rounded-full leading-none">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/[0.06] shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-[7px] rounded-lg text-[13px] text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors duration-200 mb-0.5"
          >
            <ExternalLink className="size-[16px]" />
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-[7px] rounded-lg text-[13px] text-slate-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors duration-200"
          >
            <LogOut className="size-[16px]" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
            >
              <Menu className="size-5" />
            </button>
            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-1.5 text-[13px]">
              <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors duration-150">
                Admin
              </Link>
              {pathname !== "/admin" && (
                <>
                  <ChevronRight className="size-3 text-gray-300" />
                  <span className="text-gray-700 font-medium">{getPageTitle()}</span>
                </>
              )}
            </nav>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              <div className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50/80 border border-gray-200/60 text-sm text-gray-400 flex items-center cursor-default select-none hover:border-gray-300/60 hover:bg-gray-50 transition-all duration-200">
                Rechercher...
              </div>
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-300 bg-white border border-gray-200/60 rounded px-1.5 py-0.5 leading-none hidden lg:flex items-center gap-0.5">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150">
              <Bell className="size-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white admin-pulse-dot" />
            </button>
            <div className="w-px h-5 bg-gray-200/80 mx-1" />
            <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100/80 transition-colors duration-150">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0d47a1] to-[#1565c0] flex items-center justify-center shadow-sm shadow-blue-500/10">
                <span className="text-white text-[11px] font-bold">A</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-medium text-gray-700 leading-tight">Admin</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-auto admin-page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
