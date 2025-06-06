import { useGLTF } from "@react-three/drei";

export function ModuloModel({
  position,
  rotation,
  scale = [0.3, 0.3, 0.3], // Valor por defecto
  moduleId,
}: {
  position: any;
  rotation: any;
  scale?: [number, number, number];
  moduleId: string;
}) {
  const { scene } = useGLTF(`/models/${moduleId}.glb`);

  return (
    <primitive
      castShadow
      receiveShadow
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
