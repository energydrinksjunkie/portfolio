import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';
import Test from '../components/Test';
import { OutlineShaderMaterial } from '../components/OutlineShaderMaterial';

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
    const textureRef = useRef<THREE.Texture>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [outlineAlpha, setOutlineAlpha] = useState(0);

    useEffect(() => {
        const loadHtmlAsTexture = async () => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            ReactDOM.render(<Test />, container);

            const element = document.getElementById('html-content');
            if (element) {
                await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for re-render

                const canvas = await html2canvas(element);
                const texture = new THREE.CanvasTexture(canvas);
                textureRef.current = texture;
                setIsLoaded(true);
                document.body.removeChild(container);
            }
        };

        loadHtmlAsTexture();
    }, []);

    const handlePointerOver = () => {
        console.log('Mouse is over the model');
        setOutlineAlpha(1.0); // Set alpha to full when pointer is over
    };

    const handlePointerOut = () => {
        console.log('Mouse left the model');
        setOutlineAlpha(0); // Set alpha to 0 when pointer is out
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
                    material={
                        isLoaded && textureRef.current
                            ? new THREE.MeshBasicMaterial({ map: textureRef.current })
                            : new THREE.MeshBasicMaterial({ color: 'blue' })
                    }
                />
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

export default Model;
