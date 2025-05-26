"use client";

import Image, { StaticImageData } from "next/image";
import logo from "../../public/logo_golmar.png";
import placa from "../../public/INOX_03.png";
import img1 from "../../public/modulo mando.png";
import img2 from "../../public/3puls.png";
import img3 from "../../public/6puls.png";
import { Button } from "@/components/ui/button";
import { DndContext, useDraggable, useDroppable, DragOverlay, MeasuringStrategy } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableImage } from "./DraggableImage";
import { DroppableSlot } from "./DroppableSlot";



export default function Home() {
  const [slots, setSlots] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
  });

  const modulesMap: Record<string, StaticImageData> = {
  img1,
  img1b: img1,
  img1c: img1,
  img2,
  img2b: img2,
  img3,
};

const isUsed = (id: string) => {
  return Object.values(slots).includes(id);
};



  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
  const { active, over } = event;
    setActiveId(null);

    if (over) {
      setSlots((prev) => ({ ...prev, [over.id]: active.id }));
    }
  };

  

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-white to-gray-200 p-10">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between ">
        {/* Imagen izquierda */}
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

          <div className="w-1/2  p-4 rounded gap-4 flex flex-col">
            {!isUsed("img1") && <DraggableImage id="img1" src={img1} />}
            {!isUsed("img2") && <DraggableImage id="img2" src={img2} />}
            {!isUsed("img3") && <DraggableImage id="img3" src={img3} />}
          </div>

          <div className="w-1/4  p-4 rounded">
            <div className="relative w-[200px] h-[600px]">
              <Image src={placa} alt="placa" fill className="object-contain drag-none" />

                <DroppableSlot id="slot1" top="8.4%"  moduleId={slots.slot1} modulesMap={modulesMap} />

                <DroppableSlot id="slot2" top="37.6%"  moduleId={slots.slot2} modulesMap={modulesMap} />

                <DroppableSlot id="slot3" top="66.6%"  moduleId={slots.slot3} modulesMap={modulesMap} />

              {/* Hueco 2 */}
              <div className="absolute top-[37.5%] left-[12.6%] w-[75%] h-[25%] border border-dashed">
                
              </div>

              {/* Hueco 3 */}
              <div className="absolute top-[66.6%] left-[12.6%] w-[75%] h-[25%] border border-dashed">
                
              </div>
            </div>
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
