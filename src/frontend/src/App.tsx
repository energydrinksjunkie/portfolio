import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Monitor from './models/Monitor'

function App() {

  return (
    <Canvas>
      <ambientLight />
      <Monitor />
      <OrbitControls />
    </Canvas>
  )
}

export default App
