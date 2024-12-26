import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    keyboard: THREE.Mesh
  }
  materials: {
    ['Material.008']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/keyboard.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="keyboard"
        castShadow
        receiveShadow
        geometry={nodes.keyboard.geometry}
        material={materials['Material.008']}
      />
    </group>
  )
}

useGLTF.preload('/keyboard.glb')

export default Model;
