import { ModuloModel } from "@/app/ModuloModel";
import { PlacaModel } from "@/app/PlacaModel";
import { Placa1 } from "@/app/placas/Placa1";
import { Placa2 } from "@/app/placas/Placa2";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrickWall } from "@/app/BrickFloor";
import React, { useState } from "react";
import MenuButtons from "../custom/menuButtons";

type Props = {
  selectedPlate: string | null;
  slots: Record<string, string | null>;
  setSlots: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
};

const Visualizer: React.FC<Props> = ({ selectedPlate, slots, setSlots }) => {
  const slotPositions = {
    slot1: [0, 0.56, 0.01],
    slot2: [0, 0, 0.01],
    slot3: [0, -0.56, 0.1],
  };

  const [hovered, setHovered] = useState<string | null>(null);

  const handleRemove = (slotId: string) => {
    setSlots((prev) => ({ ...prev, [slotId]: null }));
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* Renderizar solo si hay placa seleccionada */}
        {selectedPlate === "placa1" && (
            <Placa1 position={[0, 0, 0]} scale={1.2} />
        )}
        {selectedPlate === "placa2" && (
            <Placa2 position={[0, 0, 0]} scale={1.2} />
        )}


        <OrbitControls
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />

        {/* Renderizar módulos solo si hay placa */}
        {selectedPlate &&
          Object.entries(slots).map(([slotId, moduleId]) => {
            if (!moduleId) return null;
            const pos = slotPositions[slotId as keyof typeof slotPositions];

            if (moduleId === "img1") {
              return (
                <group
                  key={slotId}
                  position={pos}
                  rotation={[Math.PI / 1, 1.57, Math.PI]}
                  onPointerOver={() => setHovered(slotId)}
                  onPointerOut={() => setHovered(null)}
                >
                  <ModuloModel position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                  <Html position={[0, 0.3, 0]} center>
                    <button
                      onClick={() => handleRemove(slotId)}
                      className={`transition-all duration-300 ease-in-out px-2 py-1 text-xs rounded shadow ${
                        hovered === slotId
                          ? "bg-red-500 text-white w-24"
                          : "bg-red-500 text-white w-6 overflow-hidden"
                      }`}
                    >
                      {hovered === slotId ? "Eliminar X" : "X"}
                    </button>
                  </Html>
                </group>
              );
            }

            return (
              <mesh key={slotId} position={pos}>
                <boxGeometry args={[0.4, 0.4, 0.1]} />
                <meshStandardMaterial color="blue" />
                <Html position={[0, 0.3, 0]}>
                  <button
                    onClick={() => handleRemove(slotId)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </Html>
              </mesh>
            );
          })}

        <BrickWall />
      </Canvas>

      <MenuButtons />
    </>
  );
};

export default Visualizer;
