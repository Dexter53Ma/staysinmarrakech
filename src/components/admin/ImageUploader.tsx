"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { GripVertical, X, Star } from "lucide-react";

export interface ImageItem {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  file?: File;
}

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

function SortableImage({
  image,
  onRemove,
  onSetPrimary,
}: {
  image: ImageItem;
  onRemove: (id: string) => void;
  onSetPrimary: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
        image.isPrimary ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
      } ${isDragging ? "shadow-xl" : ""}`}
    >
      <Image
        src={image.url}
        alt={image.alt || ""}
        fill
        sizes="120px"
        className="object-cover"
      />

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-1.5 left-1.5 p-1 rounded-md bg-black/50 text-white/80 hover:text-white hover:bg-black/70 cursor-grab active:cursor-grabbing transition-colors"
      >
        <GripVertical className="size-3.5" />
      </button>

      {/* Primary badge */}
      {image.isPrimary && (
        <div className="absolute top-1.5 right-8 px-1.5 py-0.5 rounded-md bg-blue-500 text-white text-[9px] font-bold uppercase flex items-center gap-1">
          <Star className="size-2.5 fill-current" />
          Principal
        </div>
      )}

      {/* Delete */}
      <button
        onClick={() => onRemove(image.id)}
        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-500/80 text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>

      {/* Set primary overlay */}
      {!image.isPrimary && (
        <button
          onClick={() => onSetPrimary(image.id)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100"
        >
          <span className="px-2 py-1 rounded-md bg-white/90 text-[10px] font-semibold text-gray-700 shadow-sm">
            Définir principal
          </span>
        </button>
      )}
    </div>
  );
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);
    const reordered = arrayMove(images, oldIndex, newIndex);

    const withSortOrder = reordered.map((img, i) => ({
      ...img,
      sortOrder: i,
    }));

    onChange(withSortOrder);
  };

  const handleRemove = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    const withSortOrder = filtered.map((img, i) => ({
      ...img,
      sortOrder: i,
      isPrimary: i === 0 ? true : img.isPrimary && filtered.length > 1 ? false : i === 0,
    }));
    if (withSortOrder.length > 0 && !withSortOrder.some((img) => img.isPrimary)) {
      withSortOrder[0].isPrimary = true;
    }
    onChange(withSortOrder);
  };

  const handleSetPrimary = (id: string) => {
    const updated = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {images.map((image) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  onRemove={handleRemove}
                  onSetPrimary={handleSetPrimary}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-[13px] text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          Aucune image. Cliquez sur &quot;Ajouter des images&quot; pour commencer.
        </div>
      )}
    </div>
  );
}
