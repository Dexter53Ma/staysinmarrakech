"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-[13px] text-gray-500">
        Page <span className="font-medium text-gray-700">{page}</span> sur <span className="font-medium text-gray-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-10 px-3 text-[12px] font-medium rounded-lg border-gray-200/80"
        >
          <ChevronLeft size={14} className="mr-1" />
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-10 px-3 text-[12px] font-medium rounded-lg border-gray-200/80"
        >
          Suivant
          <ChevronRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
