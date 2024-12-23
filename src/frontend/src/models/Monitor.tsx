import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
  }
}

const Model: React.FC<JSX.IntrinsicElements['group']> = (props) => {
  const { nodes, materials } = useGLTF('/monitor.glb') as GLTFResult

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
        castShadow
        receiveShadow
        geometry={nodes.Cube003_1.geometry}
        material={new THREE.MeshBasicMaterial({ color: 'hotpink' })}
      />
    </group>
  )
}

useGLTF.preload('/monitor.glb')

export default Model