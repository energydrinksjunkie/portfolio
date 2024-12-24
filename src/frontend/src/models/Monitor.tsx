import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { useEffect, useRef } from 'react';

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
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>();

    useEffect(() => {
        console.log('Camera position:', camera.position);
        console.log('Camera rotation:', camera.rotation);
    }, [camera]);

    const handlePointerOver = () => {
        console.log('Mouse is over the model');
    };

    const handlePointerOut = () => {
        console.log('Mouse left the model');
    };

    return (
        <group {...props}>
            <group
                ref={groupRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <mesh
                    geometry={nodes.Cube003.geometry}
                    material={materials.Material}
                />
                <mesh
                    geometry={nodes.Cube003_1.geometry}
                    material={materials['Material.009']}
                />
            </group>
        </group>
    );
};

export default Model;
