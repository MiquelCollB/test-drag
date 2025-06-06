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
      <Html>
        <div
          ref={setNodeRef}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-50%, -50%)",
            pointerEvents: "auto",
            opacity: 0,
          }}
        />
      </Html>

      {/* Si ya hay un módulo colocado */}
      {moduleId ? (
        <group rotation={[Math.PI / 1, 1.57, Math.PI]}>
          <ModuloModel
  moduleId={moduleId}
  position={[0, 0, 0]}
  rotation={[0, -Math.PI / 2, 0]}
  scale={moduleScales[moduleId] || [0.3, 0.3, 0.3]} // fallback por si falta
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
      ) : (
        <mesh scale={isOver ? 1.2 : 1}>
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <meshStandardMaterial
            color={isOver ? "orange" : isDraggingModule ? "yellow" : "gray"}
            transparent
            opacity={0.4}
          />
        </mesh>
      )}
    </group>
  );
};
