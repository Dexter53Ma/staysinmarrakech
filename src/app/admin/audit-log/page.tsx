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
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

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

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const url = entityFilter ? `/api/audit?entity=${entityFilter}` : "/api/audit";
      const res = await fetch(url);
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [entityFilter]);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const url = entityFilter ? `/api/audit?entity=${entityFilter}` : "/api/audit";
        const res = await fetch(url);
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [entityFilter]);

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Journal d&apos;audit</h1>
        <div className="flex gap-2 items-center">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            <option value="">Toutes les entites</option>
            {entityTypes.filter(Boolean).map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={fetchLogs}>
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Aucun log d&apos;audit
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
        </CardContent>
      </Card>
    </div>
  );
}
