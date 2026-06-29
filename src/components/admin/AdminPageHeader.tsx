import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

export function AdminPageHeader({ title, description, breadcrumbs, action }: AdminPageHeaderProps) {
  const ActionIcon = action?.icon || Plus;

  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gray-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-600">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#1565c0]" />
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
          {description && (
            <p className="text-sm text-gray-500 mt-1 ml-3">{description}</p>
          )}
        </div>
        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d47a1] text-white text-sm font-medium rounded-xl hover:bg-[#0a3a82] active:bg-[#082d66] active:scale-[0.98] transition-all duration-150"
            >
              <ActionIcon className="size-4" />
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d47a1] text-white text-sm font-medium rounded-xl hover:bg-[#0a3a82] active:bg-[#082d66] active:scale-[0.98] transition-all duration-150"
            >
              <ActionIcon className="size-4" />
              {action.label}
            </button>
          )
        )}
      </div>
      {/* Gradient divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-[#0d47a1]/20 via-gray-200/80 to-transparent" />
    </div>
  );
}
