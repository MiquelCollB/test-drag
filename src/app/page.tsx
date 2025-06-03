"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import logo from "../../public/logo_golmar.png";
import img1 from "../../public/modulo mando.png";
import img2 from "../../public/3puls.png";
import img3 from "../../public/6puls.png";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { DraggableImage } from "./DraggableImage";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { PlacaModel } from "./PlacaModel";
import { ModuloModel } from "./ModuloModel";
import { Environment } from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import { BrickWall } from "./BrickFloor";

export default function Home() {
  const [slots, setSlots] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
  const { active, over } = event;
  setActiveId(null);

  // "over" no funcionará sobre un mesh 3D, así que hacemos fallback:
  if (!over) {
    // Decide el slot en base a cuál está libre
    if (!slots.slot1) {
      setSlots((prev) => ({ ...prev, slot1: active.id }));
    } else if (!slots.slot2) {
      setSlots((prev) => ({ ...prev, slot2: active.id }));
    } else if (!slots.slot3) {
      setSlots((prev) => ({ ...prev, slot3: active.id }));
    }
  } else {
    setSlots((prev) => ({ ...prev, [over.id]: active.id }));
  }
};


  const handleRemove = (slotId: string) => {
    setSlots((prev) => ({ ...prev, [slotId]: null }));
  };

  const modulesMap: Record<string, StaticImageData> = {
    img1,
    img1b: img1,
    img1c: img1,
    img2,
    img2b: img2,
    img3,
  };

  const isUsed = (id: string) => Object.values(slots).includes(id);

  const slotPositions = {
    slot1: [0, 0.56, 0.01],
    slot2: [0, 0, 0.2],
    slot3: [0, -1.5, 0.2],
  };

  const [hovered, setHovered] = useState<string | null>(null);


  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-white to-gray-200 p-10">
        {/* HEADER */}
        <header className="w-full flex items-center justify-between">
          <div className="relative w-48 h-18">
            <Image src={logo} alt="Logo" fill className="object-contain" />
          </div>
        </header>

        {/* MAIN */}
        <main className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
            Configuración de la instalación
          </h1>

          <div className="flex w-full gap-6">
            {/* Módulos disponibles */}
            <div className="w-1/2 p-4 rounded gap-4 flex flex-col">
              {!isUsed("img1") && <DraggableImage id="img1" src={img1} />}
              {!isUsed("img2") && <DraggableImage id="img2" src={img2} />}
              {!isUsed("img3") && <DraggableImage id="img3" src={img3} />}
            </div>

            {/* Canvas con placa 3D */}
            <div className="w-1/2 h-[600px] bg-white rounded shadow">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} />
                <PlacaModel position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <OrbitControls />
                {/* <Environment files="/hdr/red_wall_4k.hdr" background /> */}
                {Object.entries(slots).map(([slotId, moduleId]) => {
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

                  // fallback para módulos sin modelo aún
                  return (
                    <mesh key={slotId} position={pos} /* ... */>
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
                {/* <axesHelper args={[1.5]} /> */}
                <BrickWall />
              </Canvas>
            </div>
          </div>
        </main>
      </div>

      <DragOverlay>
        {activeId && (
          <Image
            src={modulesMap[activeId]}
            alt="preview"
            width={100}
            height={100}
            className="z-[9999] fixed top-0 left-0 pointer-events-none shadow-xl scale-105 opacity-90 rounded transition-transform duration-150"
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
