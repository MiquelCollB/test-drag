import React from "react";
import { useGLTF } from "@react-three/drei";

type Props = {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

export const PlacaGrid: React.FC<Props> = ({ position, scale = 1, rotation }) => {
  const { scene } = useGLTF("/models/marcos/12586004b_s6004_bk_4x1.glb"); // asegúrate que exista este archivo

  return <primitive object={scene} position={position} scale={scale} rotation={rotation}/>;
};
