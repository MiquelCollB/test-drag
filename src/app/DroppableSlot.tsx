import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";

export function DroppableSlot({
  id,
  top,
  moduleId,
  modulesMap,
}: {
  id: string;
  top: string;
  moduleId: string | null;
  modulesMap: { [key: string]: any };
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
        <div className="relative w-full h-full">
            <button className="absolute top-2 right-2 bg-red-500 text-white rounded p-1 z-50 cursor-pointer">
                X 
            </button>
          <Image
            src={modulesMap[moduleId]}
            alt="módulo"
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
