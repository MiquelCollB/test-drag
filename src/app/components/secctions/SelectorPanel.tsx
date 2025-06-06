import React from "react";
import { DraggableImage } from "../../DraggableImage";
import { StaticImageData } from "next/image";

type SelectorPanelProps = {
  slots: Record<string, string | null>;
  availableModules: string[];
  img1: StaticImageData;
  img2: StaticImageData;
  img3: StaticImageData;
  img4: StaticImageData;
};

const SelectorPanel: React.FC<SelectorPanelProps> = ({
  slots,
  availableModules,
  img1,
  img2,
  img3,
  img4,
}) => {
  const modulesMap: Record<string, StaticImageData> = {
    img1,
    img2,
    img3,
    img4,
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
        Configuración de la instalación
      </h1>

      <h2>Placas</h2>
      <div className="grid grid-cols-4 gap-2">
        {!Object.values(slots).includes("img5") && (
          <DraggableImage id="img5" src={img4} />
        )}
        {!Object.values(slots).includes("img6") && (
          <DraggableImage id="img6" src={img4} />
        )}
      </div>

      <h2 className="mt-6">Módulos</h2>
      <div className="grid grid-cols-4 gap-2">
        {availableModules
          .filter((id) => modulesMap[id])
          .map((id) => (
            <DraggableImage key={id} id={id} src={modulesMap[id]} />
          ))}
      </div>
    </>
  );
};

export default SelectorPanel;
