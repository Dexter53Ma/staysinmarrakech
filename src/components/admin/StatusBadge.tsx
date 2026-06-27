import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  AVAILABLE: { label: "Disponible", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
  SOLD: { label: "Vendu", className: "bg-red-50 text-red-700 ring-red-600/20" },
  RENTED: { label: "Loué", className: "bg-blue-50 text-blue-700 ring-blue-600/20" },
  PENDING: { label: "En attente", className: "bg-amber-50 text-amber-700 ring-amber-600/20" },
  CONFIRMED: { label: "Confirmée", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
  REJECTED: { label: "Refusée", className: "bg-red-50 text-red-700 ring-red-600/20" },
  CANCELLED: { label: "Annulée", className: "bg-gray-50 text-gray-600 ring-gray-500/20" },
  NEW: { label: "Nouveau", className: "bg-blue-50 text-blue-700 ring-blue-600/20" },
  READ: { label: "Lu", className: "bg-gray-50 text-gray-600 ring-gray-500/20" },
  DRAFT: { label: "Brouillon", className: "bg-gray-50 text-gray-600 ring-gray-500/20" },
  PUBLISHED: { label: "Publié", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
  VILLA: { label: "Villa", className: "bg-purple-50 text-purple-700 ring-purple-600/20" },
  APARTMENT: { label: "Appartement", className: "bg-blue-50 text-blue-700 ring-blue-600/20" },
  HOUSE: { label: "Maison", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
  LAND: { label: "Terrain", className: "bg-amber-50 text-amber-700 ring-amber-600/20" },
  COMMERCIAL: { label: "Commercial", className: "bg-red-50 text-red-700 ring-red-600/20" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || { label: status, className: "bg-gray-50 text-gray-600 ring-gray-500/20" };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
