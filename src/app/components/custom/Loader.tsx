// components/Loader.tsx
import React from "react";
import { Loader as DreiLoader } from "@react-three/drei";

const Loader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded shadow">
      <div className="text-center space-y-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full mx-auto animate-spin"></div>
        <p className="text-gray-600 font-medium text-sm">
          Cargando entorno 3D...
        </p>
      </div>
    </div>
  );
};

export default Loader;
