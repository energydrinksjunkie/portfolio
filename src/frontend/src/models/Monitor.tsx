import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import Test from '../components/Test';

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ['Material.009']: THREE.MeshStandardMaterial;
  };
};

const Model: React.FC<JSX.IntrinsicElements['group']> = (props) => {
  const { nodes, materials } = useGLTF('/monitor.glb') as GLTFResult;
  const textureRef = useRef<THREE.Texture>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadHtmlAsTexture = async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<Test />, container);

      const element = document.getElementById('html-content');
      if (element) {

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for re-render

        const canvas = await html2canvas(element);
        const texture = new THREE.CanvasTexture(canvas);
        textureRef.current = texture;
        setIsLoaded(true);
        document.body.removeChild(container);
      }
    };

    loadHtmlAsTexture();
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube003"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Material}
      />
      <mesh
        name="Cube003_1"
        geometry={nodes.Cube003_1.geometry}
        material={isLoaded && textureRef.current ? new THREE.MeshBasicMaterial({ map: textureRef.current }) : new THREE.MeshBasicMaterial({ color: 'blue' })}
      />
    </group>
  );
};

useGLTF.preload('/monitor.glb');

export default Model;