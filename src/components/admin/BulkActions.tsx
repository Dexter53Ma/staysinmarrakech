"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selected: string[];
  onClear: () => void;
  entityType: "property" | "booking";
  onDelete: () => void;
  onExport: () => void;
  onConfirm?: () => void;
  onReject?: () => void;
  loading?: boolean;
}

export function BulkActions({
  selected,
  onClear,
  entityType,
  onDelete,
  onExport,
  onConfirm,
  onReject,
  loading,
}: BulkActionsProps) {
  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-xl">
      <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold text-gray-900">
            {selected.length} élément{selected.length > 1 ? "s" : ""} sélectionné{selected.length > 1 ? "s" : ""}
          </span>
          <button
            onClick={onClear}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {entityType === "booking" && onConfirm && (
            <Button
              variant="default"
              size="sm"
              className="h-8 text-[12px] font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={onConfirm}
              disabled={loading}
            >
              Confirmer
            </Button>
          )}
          {entityType === "booking" && onReject && (
            <Button
              variant="destructive"
              size="sm"
              className="h-8 text-[12px] font-medium rounded-lg"
              onClick={onReject}
              disabled={loading}
            >
              Refuser
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            className="h-8 text-[12px] font-medium rounded-lg"
            onClick={onDelete}
            disabled={loading}
          >
            Supprimer
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] font-medium rounded-lg"
            onClick={onExport}
          >
            Exporter CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
