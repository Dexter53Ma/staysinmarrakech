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

const STATUS_CONFIG: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  AVAILABLE:   { label: "Disponible",     dot: "bg-emerald-400",   bg: "bg-emerald-50",   text: "text-emerald-700" },
  RENTED:      { label: "Loué",          dot: "bg-blue-400",      bg: "bg-blue-50",      text: "text-blue-700" },
  MAINTENANCE: { label: "Maintenance",   dot: "bg-amber-400",     bg: "bg-amber-50",     text: "text-amber-700" },
  UNAVAILABLE: { label: "Indisponible",   dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
  DRAFT:       { label: "Brouillon",      dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
  PUBLISHED:   { label: "Publié",        dot: "bg-emerald-400",   bg: "bg-emerald-50",   text: "text-emerald-700" },
  PENDING:     { label: "En attente",    dot: "bg-amber-400",     bg: "bg-amber-50",     text: "text-amber-700" },
  CONFIRMED:   { label: "Confirmée",     dot: "bg-emerald-400",   bg: "bg-emerald-50",   text: "text-emerald-700" },
  REJECTED:    { label: "Refusée",       dot: "bg-red-400",       bg: "bg-red-50",       text: "text-red-700" },
  CANCELLED:   { label: "Annulée",       dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
  NEW:         { label: "Nouveau",       dot: "bg-blue-400",      bg: "bg-blue-50",      text: "text-blue-700" },
  READ:        { label: "Lu",            dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
  REPLIED:     { label: "Répondu",       dot: "bg-emerald-400",   bg: "bg-emerald-50",   text: "text-emerald-700" },
  ARCHIVED:    { label: "Archivé",       dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
  ACTIVE:      { label: "Actif",         dot: "bg-emerald-400",   bg: "bg-emerald-50",   text: "text-emerald-700" },
  INACTIVE:    { label: "Inactif",       dot: "bg-gray-400",      bg: "bg-gray-100",     text: "text-gray-600" },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status as Status];
  if (!config) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        {status}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
