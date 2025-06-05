"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import logo from "./../../public/logo_golmar.png"
import img1 from "./../../public/modulo-mando.png"
import img2 from "./../../public/3puls.png"
import img3 from "./../../public/6puls.png"
import img4 from "./../../public/marco-nexa.webp";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import SelectorPanel from "./components/secctions/SelectorPanel";
import Visualizer from "./components/secctions/Visualizer";
import SummaryPanel from "./components/secctions/SummaryPanel";

export default function Home() {
  const [slots, setSlots] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
  });
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);


  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

//   const handleDragEnd = (event: any) => {
//   const { active, over } = event;
//   setActiveId(null);

//   // "over" no funcionará sobre un mesh 3D, así que hacemos fallback:
//   if (!over) {
//     // Decide el slot en base a cuál está libre
//     if (!slots.slot1) {
//       setSlots((prev) => ({ ...prev, slot1: active.id }));
//     } else if (!slots.slot2) {
//       setSlots((prev) => ({ ...prev, slot2: active.id }));
//     } else if (!slots.slot3) {
//       setSlots((prev) => ({ ...prev, slot3: active.id }));
//     }
//   } else {
//     setSlots((prev) => ({ ...prev, [over.id]: active.id }));
//   }
// };

const handleDragEnd = (event: any) => {
  const { active, over } = event;
  setActiveId(null);

  // Detectar selección de placa
  if (active.id === "img5") {
    setSelectedPlate("placa1");
    return; // No tocar los slots
  } else if (active.id === "img6") {
    setSelectedPlate("placa2");
    return; // No tocar los slots
  }

  // Lógica de colocación de módulos (solo si no es img5 ni img6)
  if (!over) {
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




  

  const modulesMap: Record<string, StaticImageData> = {
    img1,
    img1b: img1,
    img1c: img1,
    img2,
    img2b: img2,
    img3,
  };

  


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
          

          <div className="flex w-full gap-6">
            {/* Módulos disponibles */}
            <div className="w-1/3 p-4 rounded gap-4 flex flex-col">
              <SelectorPanel
                slots={slots}
                img1={img1}
                img2={img2}
                img3={img3}
                img4={img4}
              />
            </div>

            {/* Canvas con placa 3D */}
            <div className="w-1/3 h-[600px] bg-white rounded shadow">
              <Visualizer
                selectedPlate={selectedPlate}
                slots={slots}
                setSlots={setSlots}
              />
            </div>

            {/* Resumen de la instalación */}
            <div className="w-1/3 p-4 rounded gap-4 flex flex-col">
              <SummaryPanel/>
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
