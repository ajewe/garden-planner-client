import { Canvas } from '@react-three/fiber'
import { FullGardenView } from './FullGardenView';

export const Scene = () => {
  return (
    <Canvas style={{height: '100vh', width: '100vh'}} camera={{ position: [ 7, 3, 7 ] }}>
      <FullGardenView /> 
    </Canvas>
  )
}