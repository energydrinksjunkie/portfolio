import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    chair: THREE.Mesh
  }
  materials: {
    ['Material.016']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/chair.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="chair"
        castShadow
        receiveShadow
        geometry={nodes.chair.geometry}
        material={materials['Material.016']}
        position={[-0.001, 0, 0.031]}
        scale={0.26}
      />
    </group>
  )
}

useGLTF.preload('/chair.glb')

export default Model;