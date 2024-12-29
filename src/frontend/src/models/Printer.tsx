import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { OutlineShaderMaterial } from '../components/OutlineShaderMaterial';
import { useState } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    printer: THREE.Mesh
  }
  materials: {
    ['Material.018']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/printer.glb') as GLTFResult
  const [outlineAlpha, setOutlineAlpha] = useState(0);

  const handlePointerOver = () => {
    console.log('Mouse is over the model');
    setOutlineAlpha(1.0); // Set alpha to full when pointer is over
};

const handlePointerOut = () => {
    console.log('Mouse left the model');
    setOutlineAlpha(0); // Set alpha to 0 when pointer is out
};

const handleClick = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'cv.pdf';
    link.click();
};

  return (
    <group {...props} dispose={null}>
      <group>
        <mesh
        onClick={handleClick}
          castShadow
          receiveShadow
          geometry={nodes.printer.geometry}
          material={materials['Material.018']}
        />
        <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
            geometry={nodes.printer.geometry}
            material={new THREE.ShaderMaterial({
                ...OutlineShaderMaterial,
                uniforms: {
                    ...OutlineShaderMaterial.uniforms,
                    alpha: { value: outlineAlpha }, // Dynamically set alpha
                    },
                })}
                />
      </group>
    </group>
  )
}

useGLTF.preload('/printer.glb')

export default Model;