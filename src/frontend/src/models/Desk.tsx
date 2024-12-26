import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    desk: THREE.Mesh
  }
  materials: {
    ['Material.007']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/desk.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="desk"
        castShadow
        receiveShadow
        geometry={nodes.desk.geometry}
        material={materials['Material.007']}
      />
    </group>
  )
}

useGLTF.preload('/desk.glb')

export default Model;
