import './App.css'
import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Monitor from './models/Monitor'
import Desk from './models/Desk'
import Keyboard from './models/Keyboard'
import Chair from './models/Chair'
import Room from './models/Room'
import Blinds from './models/Blinds'
import Case from './models/Case'
import Printer from './models/Printer'
import Notebook from './models/Notebook'

function CameraController({ cameraPosition, cameraTarget }: { cameraPosition: [number, number, number], cameraTarget: [number, number, number] }) {
  useFrame(({ camera }) => {
    camera.position.lerp({ x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2] }, 0.1);
    camera.lookAt(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
  });
  return null;
}

function App() {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([-0.2, 1, 0]);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([-0.3, 1.1, 0.8]);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleMonitorClick = () => {
    setCameraPosition([-0.3, 1.2, 0.45]);
    setCameraTarget([-0.4, 1.1, 0]);
    setIsZoomedIn(true);
  };

  const handleKeyboardClick = () => {
    setCameraPosition([-0.3, 1.1, 0.3]);
    setCameraTarget([-0.3, 0.8, 0.3]);
    setIsZoomedIn(true);
  };

  const handlePointerMissed = () => {
    if (isZoomedIn) {
      setCameraPosition([-0.3, 1.1, 0.8]);
      setCameraTarget([-0.3, 1, 0]);
      setIsZoomedIn(false);
    }
  };

  return (
    <Canvas 
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [-0.3, 1.1, 0.8], fov: 75 }}
      onPointerMissed={handlePointerMissed}
      shadows
      frameloop='demand'
    >
      <ambientLight intensity={0.2} />
      <directionalLight 
      color={0xaaaaff}
      position={[-2,.6,1.1]}
      intensity={3} 
      castShadow 
      shadow-mapSize={[2048, 2048]} 
      shadow-bias={-0.0001}
      />
      <CameraController cameraPosition={cameraPosition} cameraTarget={cameraTarget} />
      <Monitor scale={.7} position={[-.4,0.915,0]} rotation={[0,0.3,0]} onClick={handleMonitorClick} />
      <Desk />
      <Keyboard rotation={[0,0.1,0]} position={[-.35,0.808,.33]} onClick={handleKeyboardClick} />
      <Chair position={[-.3,0,.7]} rotation={[0,3,0]}/>
      <Room />
      <Case position={[-.4,0.8,0]}  scale={.5} />
      <Printer position={[0.3,0.8,-0.15]} scale={.8} />
      <Notebook position={[0.15,0.82,0.3]} scale={.7} rotation={[-1.57,0,-0.3]} />
      <Blinds />
      <OrbitControls 
        target={cameraTarget} 
        minPolarAngle={Math.PI/10} 
        maxPolarAngle={Math.PI/2} 
        minAzimuthAngle={-Math.PI/6} 
        maxAzimuthAngle={Math.PI/6} 
        enableZoom={false}
      />
    </Canvas>
  )
}

export default App