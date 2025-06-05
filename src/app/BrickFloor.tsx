// components/BrickWall.tsx
import { useTexture } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';

export function BrickWall() {
  const { viewport } = useThree();
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/bricks/Bricks101_4K-JPG_Color.jpg",
    "/textures/bricks/Bricks101_4K-JPG_NormalGL.jpg",
    "/textures/bricks/Bricks101_4K-JPG_Roughness.jpg",
  ]);

  return (
    <mesh position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
      {/* plano adaptado al tamaño visible del canvas */}
      <planeGeometry args={[viewport.width * 5, viewport.height * 5]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
}