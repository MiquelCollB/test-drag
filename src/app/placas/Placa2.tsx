import { useGLTF } from '@react-three/drei';
export function Placa2 (props) {
  const { scene } = useGLTF('/models/marcos/12586004b_s6004_bk_4x1.glb');
  return (
    <primitive
    castShadow receiveShadow
      object={scene}
      rotation={[0, Math.PI / 1, 0]} // <--- Ajusta esto según lo que necesites
      {...props}
      scale={5}
    />
  );
}
