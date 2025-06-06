// components/PlacaModel.tsx
import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

export function Placa1(props: JSX.IntrinsicElements["primitive"]) {
  const { scene } = useGLTF("/models/Intercom_Panel_0602083606_texture.glb");

  return (
    <primitive
      castShadow
      receiveShadow
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 2, 0]} // <--- Ajusta esto según lo que necesites
    />
  );
}
