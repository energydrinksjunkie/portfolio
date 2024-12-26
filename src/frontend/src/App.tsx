import { useRef } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Monitor from './models/Monitor'
import Desk from './models/Desk'
import Keyboard from './models/Keyboard'
import Chair from './models/Chair'

function App() {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}
    camera={{ position: [-0.3, 1.1, 0.7], fov: 75 }}
    >
      <ambientLight />
      <Monitor scale={.8} position={[-.3,0.815,0]} rotation={[0,0.3,0]}/>
      <Desk />
      <Keyboard rotation={[0,0.1,0]} position={[-.3,0.808,.32]}/>
      <Chair position={[-.3,0,.7]} rotation={[0,3,0]} />
      <OrbitControls />
    </Canvas>
  )
}

export default App