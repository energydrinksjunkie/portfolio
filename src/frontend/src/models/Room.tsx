import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh
    Cube001_1: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/room.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.001']}
      />
      <mesh
        name="Cube001_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={materials['Material.003']}
      />
    </group>
  )
}

useGLTF.preload('/room.glb')

export default Model;
