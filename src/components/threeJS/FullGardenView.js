import React from 'react';
import { useSelector } from 'react-redux';
import { Canvas } from 'react-three-fiber';
import { Scene } from './Scene'

export const FullGardenView = props => {
  // let gardenDimensions = useSelector( state => state.garden.dimensions)
  let sceneObjects = useSelector( state => state.garden.sceneObjects)

  return (
    <Canvas 
      camera={{ position: [1, 0.75, 1] }} >
      <Scene sceneObjects={sceneObjects} />
    </Canvas>
  );
}