import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-14 h-14 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center mb-4">
        <Icon className="size-6 text-gray-300" />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-[13px] text-gray-500 text-center max-w-sm mb-5 leading-relaxed">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
