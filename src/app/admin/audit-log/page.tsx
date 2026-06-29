"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, RefreshCw } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { EmptyState } from "@/components/admin";
import { TableSkeleton } from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  oldValues: unknown;
  newValues: unknown;
  createdAt: string;
  user?: { name: string; email: string } | null;
}

const entityTypes = ["", "Property", "Booking", "Service", "BlogPost", "Testimonial", "ContactInquiry", "HeroSlide", "Location", "StaticPage", "Notification", "SiteSetting"];

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (entityFilter) params.set("entity", entityFilter);
      const res = await fetch(`/api/audit?${params}`);
      const data = await res.json();
      setLogs(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [entityFilter, page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const actionBadge = (action: string) => {
    switch (action) {
      case "CREATE":
        return <Badge className="bg-green-100 text-green-800">Creation</Badge>;
      case "UPDATE":
        return <Badge className="bg-blue-100 text-blue-800">Modification</Badge>;
      case "DELETE":
        return <Badge variant="destructive">Suppression</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Journal d'audit"
        description={`${total} entrée${total > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Journal" }]}
      />

      <div className="flex gap-2 items-center mb-6">
        <select
          value={entityFilter}
          onChange={(e) => { setEntityFilter(e.target.value); setPage(1); }}
          className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-400 transition-colors duration-150"
        >
          <option value="">Toutes les entités</option>
          {entityTypes.filter(Boolean).map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <Button variant="outline" size="sm" onClick={fetchLogs}>
          <RefreshCw size={16} />
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entite</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <TableSkeleton rows={5} cols={4} />
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <EmptyState
                      icon={History}
                      title="Aucun log"
                      description="L'historique des actions apparaîtra ici."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      {new Date(log.createdAt).toLocaleString("fr-FR")}
                    </TableCell>
                    <TableCell>{log.user?.name || log.userId || "Systeme"}</TableCell>
                    <TableCell>{actionBadge(log.action)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.entity}</Badge>
                      {log.entityId && (
                        <span className="text-xs text-gray-400 ml-1">
                          {log.entityId.slice(0, 8)}...
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {log.newValues ? (
                        <pre className="text-xs text-gray-500 whitespace-pre-wrap overflow-hidden">
                          {JSON.stringify(log.newValues).slice(0, 100)}
                        </pre>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
