// components/BrickWall.tsx
import { useTexture } from "@react-three/drei";

export function BrickWall() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/bricks/Bricks101_4K-JPG_Color.jpg",
    "/textures/bricks/Bricks101_4K-JPG_NormalGL.jpg",
    "/textures/bricks/Bricks101_4K-JPG_Roughness.jpg",
  ]);

  return (
    <mesh position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
}
