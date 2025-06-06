"use client";
import Image, { StaticImageData } from "next/image";
import logo from "./../../public/logo_golmar.png";
import img1 from "./../../public/modulo-mando.png";
import img2 from "./../../public/3puls.png";
import img3 from "./../../public/6puls.png";
import img4 from "./../../public/marco-nexa.webp";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import SelectorPanel from "./components/secctions/SelectorPanel";
import Visualizer from "./components/secctions/Visualizer";
import SummaryPanel from "./components/secctions/SummaryPanel";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import Loader from "./components/custom/Loader";
import { useTexture } from "@react-three/drei";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [availableModules, setAvailableModules] = useState<string[]>([
    "img1",
    "img2",
    "img3",
  ]);

  const [slots, setSlots] = useState<Record<string, string | null>>({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  const [selectedPlate, setSelectedPlate] = useState<string | null>(null); // placa final
  const [activeId, setActiveId] = useState<string | null>(null); // id activo al arrastrar
  const [isOverVisualizer, setIsOverVisualizer] = useState(false); // flag para saber si está encima

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  useGLTF.preload("/models/Intercom_System_0602085624_texture.glb");

  useGLTF.preload("/models/Intercom_Panel_0602083606_texture.glb");
  useGLTF.preload("/models/Placa2.glb");

  useTexture.preload([
    "/textures/bricks/Bricks101_4K-JPG_Color.jpg",
    "/textures/bricks/Bricks101_4K-JPG_NormalGL.jpg",
    "/textures/bricks/Bricks101_4K-JPG_Roughness.jpg",
  ]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    const activeIdStr = active.id.toString();
    const overIdStr = over?.id?.toString() ?? null;

    if (!overIdStr) {
      // Restaurar si no se suelta en zona válida
      if (!Object.values(slots).includes(activeIdStr)) {
        if (!availableModules.includes(activeIdStr)) {
          setAvailableModules((prev) => [...prev, activeIdStr]);
        }
      }
      return;
    }

    // Si es placa
    if (activeIdStr === "img5") {
      setSelectedPlate("placa1");
      return;
    } else if (activeIdStr === "img6") {
      setSelectedPlate("placa2");
      return;
    }

    // Si se suelta sobre un slot válido
    if (overIdStr.startsWith("slot")) {
      setSlots((prev) => ({
        ...prev,
        [overIdStr]: activeIdStr,
      }));

      // Quitar del array de módulos disponibles
      setAvailableModules((prev) => prev.filter((id) => id !== activeIdStr));
    }
  };

  const modulesMap: Record<string, StaticImageData> = {
    img1,
    img1b: img1,
    img1c: img1,
    img2,
    img2b: img2,
    img3,
  };

  return (
    <>
      <DndContext
        onDragStart={({ active }) => {
          if (typeof active.id === "string") {
            setActiveId(active.id);
          }
        }}
        onDragOver={({ over }) => {
          setIsOverVisualizer(over?.id === "visualizer");
        }}
        onDragEnd={({ active, over }) => {
          const activeIdStr = active.id.toString();
          const overIdStr = over?.id?.toString() ?? null;

          setActiveId(null);
          setIsOverVisualizer(false);

          // Si se suelta sobre visualizer y es placa
          if (
            overIdStr === "visualizer" &&
            (activeIdStr === "img5" || activeIdStr === "img6")
          ) {
            setSelectedPlate(activeIdStr === "img5" ? "placa1" : "placa2");
            return;
          }

          // 👇 NUEVO: si se suelta sobre un slot
          if (overIdStr?.startsWith("slot")) {
            setSlots((prev) => ({
              ...prev,
              [overIdStr]: activeIdStr,
            }));
            setAvailableModules((prev) =>
              prev.filter((id) => id !== activeIdStr)
            ); // 👈 esto
            return;
          }
        }}
      >
        <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-white to-gray-200 p-10">
          {/* HEADER */}
          <header className="w-full flex items-center justify-between">
            <div className="relative w-48 h-18">
              <Image src={logo} alt="Logo" fill className="object-contain" />
            </div>
          </header>

          {/* MAIN */}
          <main className="mt-8">
            <div className="flex w-full gap-6">
              {/* Módulos disponibles */}
              <div className="w-1/3 p-4 rounded gap-4 flex flex-col">
                <SelectorPanel
                  slots={slots}
                  availableModules={availableModules}
                  img1={img1}
                  img2={img2}
                  img3={img3}
                  img4={img4}
                />
              </div>

              {/* Canvas con placa 3D */}
              <div className="w-1/3 h-[600px] bg-white rounded shadow mt-6">
                <Visualizer
                  selectedPlate={selectedPlate}
                  slots={slots}
                  setSlots={setSlots}
                  activeId={activeId}
                />
              </div>

              {/* Resumen de la instalación */}
              <div className="w-1/3 p-4 rounded gap-4 flex flex-col">
                <SummaryPanel />
              </div>
            </div>
          </main>
        </div>

        <DragOverlay>
          {activeId && modulesMap[activeId] && (
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
    </>
  );
}
