import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";

export function DroppableSlot({
  id,
  top,
  moduleId,
  modulesMap,
  onRemove,
}: {
  id: string;
  top: string;
  moduleId: string | null;
  modulesMap: { [key: string]: any };
  onRemove: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`absolute left-[12.6%] w-[75%] h-[25%] border 
        ${isOver ? "border-green-500 bg-green-100" : "border-dashed border-gray-400"} 
        transition-all duration-200`}
      style={{ top }}
    >
      {moduleId && (
        <div className="relative w-full h-full group">
            {/* Botón oculto hasta hover */}
            <button
                onClick={() => onRemove(id)}
                className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center 
                            opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                            hover:scale-110 hover:bg-red-600 active:scale-125 
                            transition-all duration-200 cursor-pointer"
                >
                X
            </button>


          {/* Imagen del módulo */}
          <Image
            src={modulesMap[moduleId]}
            alt="módulo"
            fill
            className="object-contain drag-none"
          />
          
        </div>
      )}
    </div>
  );
}
