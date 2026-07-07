type Status =
  | "AVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "UNAVAILABLE"
  | "DRAFT"
  | "PUBLISHED"
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "NEW"
  | "READ"
  | "REPLIED"
  | "ARCHIVED"
  | "ACTIVE"
  | "INACTIVE";

const STATUS_CONFIG: Record<Status, { label: string; dot: string; bg: string; text: string; ring: string }> = {
  AVAILABLE:   { label: "Disponible",     dot: "bg-emerald-500",   bg: "bg-emerald-50",   text: "text-emerald-700", ring: "ring-emerald-600/15" },
  RENTED:      { label: "Loué",          dot: "bg-blue-500",      bg: "bg-blue-50",      text: "text-blue-700",    ring: "ring-blue-600/15" },
  MAINTENANCE: { label: "Maintenance",   dot: "bg-amber-500",     bg: "bg-amber-50",     text: "text-amber-700",   ring: "ring-amber-600/15" },
  UNAVAILABLE: { label: "Indisponible",  dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
  DRAFT:       { label: "Brouillon",     dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
  PUBLISHED:   { label: "Publié",        dot: "bg-emerald-500",   bg: "bg-emerald-50",   text: "text-emerald-700", ring: "ring-emerald-600/15" },
  PENDING:     { label: "En attente",    dot: "bg-amber-500",     bg: "bg-amber-50",     text: "text-amber-700",   ring: "ring-amber-600/15" },
  CONFIRMED:   { label: "Confirmée",     dot: "bg-emerald-500",   bg: "bg-emerald-50",   text: "text-emerald-700", ring: "ring-emerald-600/15" },
  REJECTED:    { label: "Refusée",       dot: "bg-red-500",       bg: "bg-red-50",       text: "text-red-700",     ring: "ring-red-600/15" },
  CANCELLED:   { label: "Annulée",       dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
  NEW:         { label: "Nouveau",       dot: "bg-blue-500",      bg: "bg-blue-50",      text: "text-blue-700",    ring: "ring-blue-600/15" },
  READ:        { label: "Lu",            dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
  REPLIED:     { label: "Répondu",       dot: "bg-emerald-500",   bg: "bg-emerald-50",   text: "text-emerald-700", ring: "ring-emerald-600/15" },
  ARCHIVED:    { label: "Archivé",       dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
  ACTIVE:      { label: "Actif",         dot: "bg-emerald-500",   bg: "bg-emerald-50",   text: "text-emerald-700", ring: "ring-emerald-600/15" },
  INACTIVE:    { label: "Inactif",       dot: "bg-gray-400",      bg: "bg-gray-50",      text: "text-gray-600",    ring: "ring-gray-500/15" },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status as Status];
  if (!config) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/15">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        {status}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${config.bg} ${config.text} ring-1 ring-inset ${config.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
