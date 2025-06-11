import { Html } from "@react-three/drei";
import { useDroppable } from "@dnd-kit/core";
import { ModuloModel } from "@/app/ModuloModel";

export const DroppableSlot3D = ({
  id,
  position,
  moduleId,
  onRemove,
}: {
  id: string;
  position: [number, number, number];
  moduleId: string | null;
  onRemove: (id: string) => void;
}) => {
  const { setNodeRef, isOver, active } = useDroppable({ id });

  console.log("🟩 Slot:", id, "| moduleId:", moduleId);

  const isDraggingModule = active?.id?.toString().startsWith("img");

  const moduleScales: Record<string, [number, number, number]> = {
    img1: [0.2, 0.2, 0.1],
    img2: [4, 4, 1],
    img3: [4, 4, 0.1],
    // Añade más si tienes
  };

  return (
    <group position={position}>
      {/* HTML invisible para detectar el drop, dentro del Canvas pero con un div real */}
      <Html position={[0, 0, 0]} center>
        <div
          ref={setNodeRef}
          style={{
            width: "50px",
            height: "50px",
            pointerEvents: "auto",
            opacity: 0,
          }}
        />
      </Html>

      {/* Si ya hay un módulo colocado */}
      {moduleId ? (
        
        <>
        {console.log("🧩 Renderizando módulo:", moduleId, "en slot:", id)}

        <group rotation={[Math.PI / 1, 1.57, Math.PI]}>
          <ModuloModel
            moduleId={moduleId}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={moduleScales[moduleId] || [0.3, 0.3, 0.3]}
          />

          <Html position={[0, 0.3, 0]} center>
            <button
              onClick={() => onRemove(id)}
              className="transition-all duration-300 ease-in-out px-2 py-1 text-xs rounded shadow bg-red-500 text-white hover:bg-red-600"
            >
              Eliminar
            </button>
          </Html>
        </group>
        
        </>
      ) : (
        <mesh scale={isOver ? 1.4 : 1}>
          <boxGeometry args={[0.12, 0.12, 0.02]} />
          <meshStandardMaterial
            color={
              isOver
                ? "#ffaa00" // naranja intenso
                : isDraggingModule
                ? "#cccc00" // amarillo claro
                : "gray"
            }
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};
