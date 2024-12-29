import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { OutlineShaderMaterial } from '../components/OutlineShaderMaterial'
import { useState } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    Cube021: THREE.Mesh
    Cube021_1: THREE.Mesh
    Cube027: THREE.Mesh
    Cube027_1: THREE.Mesh
    Cube025: THREE.Mesh
    Cube025_1: THREE.Mesh
  }
  materials: {
    ['Material.022']: THREE.MeshStandardMaterial
    ['Material.023']: THREE.MeshStandardMaterial
    ['back page.001']: THREE.MeshStandardMaterial
    ['front page.001']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/notebook.glb') as GLTFResult
  const [outlineAlpha, setOutlineAlpha] = useState(0);

  const handlePointerOver = () => {
    console.log('Mouse is over the model');
    setOutlineAlpha(1.0); // Set alpha to full when pointer is over
};

const handlePointerOut = () => {
    console.log('Mouse left the model');
    setOutlineAlpha(0); // Set alpha to 0 when pointer is out
};


  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="notebook" userData={{ name: 'notebook' }}>
          <mesh
            name="Cube021"
            castShadow
            receiveShadow
            geometry={nodes.Cube021.geometry}
            material={materials['Material.022']}
          />
          <mesh
            name="Cube021_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube021_1.geometry}
            material={materials['Material.023']}
          />
          <group name="back_page" userData={{ name: 'back page' }}>
            <mesh
              name="Cube027"
              castShadow
              receiveShadow
              geometry={nodes.Cube027.geometry}
              material={materials['Material.022']}
            />
            <mesh
              name="Cube027_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube027_1.geometry}
              material={materials['back page.001']}
            />
          </group>
          <group name="front_page" userData={{ name: 'front page' }}>
            <mesh
              name="Cube025"
              castShadow
              receiveShadow
              geometry={nodes.Cube025.geometry}
              material={materials['Material.022']}
            />
            <mesh
              name="Cube025_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube025_1.geometry}
              material={materials['front page.001']}
            />
          </group>
        </group>
      </group>
      <group name="Outline"
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
        <mesh
            geometry={nodes.Cube021.geometry}
            material={new THREE.ShaderMaterial({
                ...OutlineShaderMaterial,
                uniforms: {
                    ...OutlineShaderMaterial.uniforms,
                    alpha: { value: outlineAlpha }, // Dynamically set alpha
                    },
                })}
                />
                <mesh
            geometry={nodes.Cube021_1.geometry}
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

useGLTF.preload('/notebook.glb')

export default Model;