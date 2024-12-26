import * as THREE from 'three';

export const OutlineShaderMaterial = {
    uniforms: {
        outlineColor: { value: new THREE.Color('white') },
        alpha: { value: 0 },
        growAmount: { value: 0.01 },
    },
    vertexShader: `
        varying vec3 vNormal;
        uniform float growAmount;

        void main() {
            vec3 transformed = position + normal * growAmount;
            vNormal = -normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 outlineColor;
        uniform float alpha;
        void main() {
            gl_FragColor = vec4(outlineColor, alpha);
        }
    `,
    transparent: true,
    side: THREE.BackSide, // Backface culling
    depthWrite: false,
    depthTest: true,
};