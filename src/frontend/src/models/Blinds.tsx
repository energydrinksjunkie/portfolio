import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    blinds: THREE.Mesh
  }
  materials: {
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/blinds.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="blinds"
        castShadow
        receiveShadow
        geometry={nodes.blinds.geometry}
        material={materials['Material.004']}
      />
    </group>
  )
}

useGLTF.preload('/blinds.glb')

export default Model;