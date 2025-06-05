import React from "react";
import { DraggableImage } from "../../DraggableImage";
import { StaticImageData } from "next/image";

type SelectorPanelProps = {
  slots: Record<string, string | null>;
  img1: StaticImageData;
  img2: StaticImageData;
  img3: StaticImageData;
  img4: StaticImageData;
};

const SelectorPanel: React.FC<SelectorPanelProps> = ({
  slots,
  img1,
  img2,
  img3,
  img4,
}) => {
  const isUsed = (id: string) => Object.values(slots).includes(id);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
        Configuración de la instalación
      </h1>

      <h2>Placas</h2>
      <div className="grid grid-cols-4 gap-2">
        {!isUsed("img5") && <DraggableImage id="img5" src={img4} />}
        {!isUsed("img6") && <DraggableImage id="img6" src={img4} />}
      </div>

      <h2 className="mt-6">Módulos</h2>
      <div className="grid grid-cols-4 gap-2">
        {!isUsed("img1") && <DraggableImage id="img1" src={img1} />}
        {!isUsed("img2") && <DraggableImage id="img2" src={img2} />}
        {!isUsed("img3") && <DraggableImage id="img3" src={img3} />}
        {!isUsed("img4") && <DraggableImage id="img4" src={img3} />}
      </div>
    </>
  );
};

export default SelectorPanel;
