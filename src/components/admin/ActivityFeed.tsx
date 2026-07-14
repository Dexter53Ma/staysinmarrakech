"use client";

interface ActivityItem {
  action: string;
  entity: string;
  createdAt: string;
  user?: string;
}

const actionColors: Record<string, { dot: string; border: string }> = {
  CREATE: { dot: "bg-emerald-500", border: "border-l-emerald-500" },
  UPDATE: { dot: "bg-blue-500", border: "border-l-blue-500" },
  DELETE: { dot: "bg-red-500", border: "border-l-red-500" },
};

const actionLabels: Record<string, string> = {
  CREATE: "Création",
  UPDATE: "Modification",
  DELETE: "Suppression",
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "à l'instant";
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return `il y a ${m} minute${m > 1 ? "s" : ""}`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `il y a ${h} heure${h > 1 ? "s" : ""}`;
  }
  const d = Math.floor(diff / 86400);
  return `il y a ${d} jour${d > 1 ? "s" : ""}`;
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="px-5 py-8 text-center">
        <p className="text-[13px] text-gray-400 font-medium">Aucune activité récente</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-50">
      {items.map((item, i) => {
        const style = actionColors[item.action] || { dot: "bg-gray-400", border: "border-l-gray-400" };
        return (
          <div
            key={i}
            className={`px-5 py-3 border-l-2 ${style.border} hover:bg-gray-50/50 transition-colors duration-150`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-gray-700">
                  <span className="font-medium">{item.user || "Système"}</span>
                  {" · "}
                  <span className="font-medium">{actionLabels[item.action] || item.action}</span>
                  {" · "}
                  <span className="text-gray-500">{item.entity}</span>
                </p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                {relativeTime(item.createdAt)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
