import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";

export function DraggableImage({ id, src }: { id: string; src: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab">
      <Image src={src} alt="módulo" width={100} height={100} className="object-contain rounded" />
    </div>
  );
}
