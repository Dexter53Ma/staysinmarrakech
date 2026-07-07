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
        <nav className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3 text-gray-300" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gray-600 transition-colors duration-150">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-600 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {description && (
            <p className="text-[13px] text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <ActionIcon className="size-4" />
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <ActionIcon className="size-4" />
              {action.label}
            </button>
          )
        )}
      </div>
      <div className="mt-5 h-px bg-gradient-to-r from-gray-200/80 via-gray-200/40 to-transparent" />
    </div>
  );
}
