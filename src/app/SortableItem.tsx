"use client";

import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/app/components/shadCN/button";
import { X } from "lucide-react"; // Puedes usar otro icono si quieres
import Image from "next/image";

export function SortableItem({
  id,
  src,
  onRemove,
}: {
  id: string;
  src: any;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="absolute left-[12.6%] w-[75%] h-[25%] border border-gray-300 rounded overflow-hidden bg-white"
    >
      <div className="relative w-full h-full">
        <Image src={src} alt="módulo" fill className="object-contain" />

        {/* Handle (puedes usar otra posición o estilo) */}
        <div {...listeners} className="absolute top-1 right-1 cursor-grab text-gray-500 text-sm">
          ::
        </div>

        {/* Botón eliminar */}
        <Button
          onClick={() => onRemove(id)}
          size="icon"
          variant="ghost"
          className="absolute top-1 left-1 w-6 h-6 p-1 text-red-600"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
