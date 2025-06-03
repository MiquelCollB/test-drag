// components/PlacaModel.tsx
import { useGLTF } from '@react-three/drei';

export function PlacaModel(props) {
  const { scene } = useGLTF('/models/Intercom_Panel_0602083606_texture.glb');
  
  return (
    <primitive
      object={scene}
      rotation={[0, Math.PI, 0]} // <--- Ajusta esto según lo que necesites
      {...props}
    />
  );
}
