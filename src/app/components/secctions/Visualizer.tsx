import { ModuloModel } from "@/app/ModuloModel";
import { Placa1 } from "@/app/placas/Placa1";
import { Placa2 } from "@/app/placas/Placa2";
import { PlacaGrid } from "@/app/placas/PlacaGrid";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useMemo, useState } from "react";
import BrickWallLoader from "@/app/BrickWallLoader";
import Loader from "../custom/Loader";
import MenuButtons from "../custom/menuButtons";
import { useDroppable } from "@dnd-kit/core";
import { DroppableSlot3D } from "@/app/DroppableSlot3d";

type Props = {
  selectedPlate: string | null;
  slots: Record<string, string | null>;
  setSlots: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
  activeId: string | null; // 👈 nueva prop
};

const slotPositions = {
  slot1: [0, 0.56, 0.01],
  slot2: [0, 0, 0.01],
  slot3: [0, -0.56, 0.1],
};

const Visualizer: React.FC<Props> = ({
  selectedPlate,
  slots,
  setSlots,
  activeId,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: "visualizer" });

  const plateSizes: Record<string, [number, number, number]> = {
    img5: [0.75, 1.9, 0.5], // Placa1
    img6: [0.5, 1.85, 0.5], // Placa2
  };

  const handleRemove = (slotId: string) => {
    setSlots((prev) => ({ ...prev, [slotId]: null }));
  };

  //slots custom
  const gridSlots = useMemo(() => {
    if (selectedPlate !== "placaGrid") return [];
    const cols = 3;
    const rows = 5;
    const spacing = 0.25; // ajusta según tus necesidades
    const positions: [number, number, number][] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Centrar el grid en el origen:
        const x = (col - (cols - 1) / 2) * spacing;
        const y = ((rows - 1) / 2 - row) * spacing;
        positions.push([x, y, 0.05]);
      }
    }
    return positions;
  }, [selectedPlate]);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 35 }}
        className="animate-fade-in"
        ref={setNodeRef}
      >
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }
        >
          {/* Luces */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          {isOver && activeId && plateSizes[activeId] && (
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={plateSizes[activeId]} />
              <meshStandardMaterial color="orange" transparent opacity={0.3} />
            </mesh>
          )}
          {/* Previsualización de huecos si estás arrastrando un módulo */}
          {/* Si es la placa grid, renderiza gridSlots */}
          {selectedPlate === "placaGrid" &&
            gridSlots.map((pos, idx) => (
              <DroppableSlot3D
                key={`grid-${idx}`}
                id={`grid-${idx}`}
                position={pos}
                moduleId={slots[`grid-${idx}`] || null}
                onRemove={handleRemove}
              />
            ))}

          {(selectedPlate === "placa1" || selectedPlate === "placa2") &&
            Object.entries(slotPositions).map(([slotId, moduleId]) => {
              const pos = slotPositions[
                slotId as keyof typeof slotPositions
              ] as [number, number, number];
              return (
                <DroppableSlot3D
                  key={slotId}
                  id={slotId}
                  position={pos}
                  moduleId={slots[slotId] || null}
                  onRemove={handleRemove}
                />
              );
            })}
          {/* Placa seleccionada */}
          {selectedPlate === "placa1" && (
            <Placa1 position={[0, 0, 0]} scale={1.2} object={undefined} />
          )}
          {selectedPlate === "placa2" && (
            <Placa2 position={[0, 0, 0]} scale={1.2} object={undefined} />
          )}
          {selectedPlate === "placaGrid" && (
            <PlacaGrid
              position={[0, 0, 0]}
              scale={5}
              rotation={[0, Math.PI, 0]} // rota 180 grados en el eje Y
            />
          )}

          {/* Controles de cámara */}
          <OrbitControls
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.7}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
          />
          {/* Fondo ladrillos */}
          <BrickWallLoader />
        </Suspense>
      </Canvas>

      {/* Menú de botones fuera del Canvas */}
      <MenuButtons />
    </>
  );
};

export default Visualizer;
