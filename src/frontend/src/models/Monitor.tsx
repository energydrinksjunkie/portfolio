import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Suspense, useEffect, useRef, useState } from 'react';
import { OutlineShaderMaterial } from '../components/OutlineShaderMaterial';
import React from 'react';
import { TerminalHandle } from '../components/Terminal';
import { invalidate } from '@react-three/fiber';
const Terminal = React.lazy(() => import('../components/Terminal'));

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
    const groupRef: any = useRef<THREE.Group>();
    const [outlineAlpha, setOutlineAlpha] = useState(0);
    const terminalRef = useRef<TerminalHandle>(null);

    const handlePointerOver = () => {
        console.log('Mouse is over the model');
        setOutlineAlpha(1.0); // Set alpha to full when pointer is over
    };

    const handlePointerOut = () => {
        console.log('Mouse left the model');
        setOutlineAlpha(0); // Set alpha to 0 when pointer is out
    };

    const handleTerminalClick = () => {
        terminalRef.current?.focusInput();
    }

    return (
        <group {...props}>
            <group
                ref ={groupRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleTerminalClick}
            >
                <mesh
                    geometry={nodes.Cube003.geometry}
                    material={materials.Material}
                    castShadow
                    receiveShadow
                />
                <mesh
                    geometry={nodes.Cube003_1.geometry}
                    material={new THREE.MeshBasicMaterial({ transparent: false, opacity: 0 })}
                />
                <Html zIndexRange={[-1,-10]} style={{pointerEvents: 'none', userSelect: 'none'}} occlude={"blending"} transform rotation={[-0.03,0,0]} position={[0,0.332,.173]} scale={.0273} >
                <Suspense fallback={<div>Loading Terminal...</div>}>
            <Terminal ref={terminalRef} />
          </Suspense>
                </Html>
                {/* Outline mesh */}
                <mesh
                    geometry={nodes.Cube003_1.geometry}
                    material={new THREE.ShaderMaterial({
                        ...OutlineShaderMaterial,
                        uniforms: {
                            ...OutlineShaderMaterial.uniforms,
                            alpha: { value: outlineAlpha }, // Dynamically set alpha
                        },
                    })}
                />
                {/* Outline mesh */}
                <mesh
                    geometry={nodes.Cube003.geometry}
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
    );
};

useGLTF.preload('/monitor.glb');

export default Model;
