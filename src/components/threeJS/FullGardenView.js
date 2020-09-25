import React, { useRef, useState, useDispatch, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { useSelector } from 'react-redux';
import { Canvas, useFrame, useLoader, useThree, useResource, extend } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Yard } from './Yard'
import { Box } from './Box'

extend({ OrbitControls });

const Controls = props => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export const FullGardenView = props => {

  let gardenDimensions = useSelector( state => state.garden.dimensions)
  let sceneObjects = useSelector( state => state.garden.sceneObjects)
  // sceneObjects.map((obj) => console.log(obj.objectType))
  // const [ isClicked, setIsClicked ] = useState(false)
  // const [ gardenObjects, setGardenObjects ] = useState({})
  // const [ clickLocation, setClickLocation ] = useState({
  //     clientX: 0,
  //     clientY: 0,
  //   })
  // const handleDblClick = e => {
  //   e.stopPropagation();
  //   setIsClicked(true);
  //   console.log(isClicked);
  // }

  return (
    <Canvas camera={{ position: [1, 0.75, 1] }}>
      <Controls
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={0.5} />
      <ambientLight />
      <pointLight intensity={0.1} position={[10, 200, 0]} />
      <Suspense fallback={ null } >
          <Yard />
                                                                                                                
          {/* <gridHelper args={[ 2, 10 ]} onDoubleClick={(e) => {
            // let newClickObject = gardenObjects
            // newClickObject.object = "box"
            // newClickObject.positionX = e.nativeEvent.clientX
            // newClickObject.positionY = e.nativeEvent.clientY
            // setGardenObjects(newClickObject)
            // console.log(gardenObjects)
            handleDblClick(e)
          }}/> */}
          {/* {boxes.length ? 
            boxes.map((obj, i) => {
              return (
                <Box position={ [ obj.positionX, obj.positionY, obj.positionZ ] }/>
              )
            })
            : console.log('nooooo')} */}
          {/* {gardenObjects.object === 'box' ? console.log('yo') : console.log('no')} */}
          {/* {gardenObjects.object === 'box' && <Box position={ [0, 0, 0] }/>} */}
          {/* <Box position={ [(369 / window.innerWidth) * 2 - 1, 0.1, 0] }/> */}
          {/* <Box position={ [0, 0, 0] }/> */}
      </Suspense>
    </Canvas>
  );
}