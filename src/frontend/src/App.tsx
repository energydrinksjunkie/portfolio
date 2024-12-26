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
    camera={{ position: [-0.3, 1.1, 0.8], fov: 75 }}
    >
      <ambientLight />
      <Monitor scale={.8} position={[-.3,0.815,0]} rotation={[0,0.3,0]}/>
      <Desk />
      <Keyboard rotation={[0,0.1,0]} position={[-.3,0.808,.32]}/>
      <Chair position={[-.3,0,.7]} rotation={[0,3,0]} />
      <OrbitControls 
      target={[-0.3,1,0]} 
      minPolarAngle={Math.PI/10} 
      maxPolarAngle={Math.PI/2} 
      minAzimuthAngle={-Math.PI/6} 
      maxAzimuthAngle={Math.PI/6} 
      enableZoom={false}
      enableRotate={true}/>
    </Canvas>
  )
}

export default App