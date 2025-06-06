// components/BrickWallLoader.tsx
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function BrickWallLoader() {
  const { viewport } = useThree();

  const [colorMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/bricks/Bricks101_4K-JPG_Color.jpg",
    "/textures/bricks/Bricks101_4K-JPG_NormalGL.jpg",
    "/textures/bricks/Bricks101_4K-JPG_Roughness.jpg",
  ]);

  return (
    <mesh position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 5, viewport.height * 5]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
}
