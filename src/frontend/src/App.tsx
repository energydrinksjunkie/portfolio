import { useRef } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Monitor from './models/Monitor'

function App() {
  const cameraRef: any = useRef()

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
      <ambientLight />
      <Monitor scale={[5,5,5]} position={[0,-1.5,0]}/>
      <OrbitControls />
    </Canvas>
  )
}

export default App