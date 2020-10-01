import React from 'react';
import { Canvas } from 'react-three-fiber';
import { FullGardenView } from './FullGardenView';

export const Scene = () => {
  return (
    <Canvas camera={{ position: [ 7, 3, 7 ] }}>
      <FullGardenView /> 
    </Canvas>
  )
}