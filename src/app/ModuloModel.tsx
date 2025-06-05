import { useGLTF } from "@react-three/drei";

export function ModuloModel({ position, rotation }: { position: any; rotation: any }) {
  const { scene } = useGLTF("/models/Intercom_System_0602085624_texture.glb");

  return (
    <primitive
    castShadow receiveShadow
      object={scene}
      position={position}
      rotation={rotation}
      scale={[0.2, 0.2, 0.2]}
    />
  );
}

useGLTF.preload("/models/modulo1.glb");
