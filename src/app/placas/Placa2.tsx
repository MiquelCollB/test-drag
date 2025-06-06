import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

export function Placa2(props: JSX.IntrinsicElements["primitive"]) {
  const { scene } = useGLTF("/models/marcos/12586004b_s6004_bk_4x1.glb");
  return (
    <primitive
      castShadow
      receiveShadow
      scale={[4, 4, 0.2]}
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 1, 0]}
    />
  );
}
