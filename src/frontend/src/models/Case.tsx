import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['case']: THREE.Mesh
  }
  materials: {
    ['Material.017']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/case.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="case"
        castShadow
        receiveShadow
        geometry={nodes['case'].geometry}
        material={materials['Material.017']}
      />
    </group>
  )
}

useGLTF.preload('/case.glb')

export default Model;
