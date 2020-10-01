import React, { useRef, useState, useDispatch, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { useSelector } from 'react-redux';
import { useFrame, useLoader, useThree, useResource, extend, Renderer } from 'react-three-fiber';
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

export const FullGardenView = () => {
  const { camera, scene } = useThree();
  // let gardenDimensions = useSelector( state => state.garden.dimensions)
  // let sceneObjects = useSelector( state => state.garden.sceneObjects)
  
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
  const [ boxes, setBoxes ] = useState([
    // {
    //   objectType: 'box',
    //   positionX: 0,
    //   positionY: 0.1,
    // }
  ])
  const [ isLoading, setIsLoading ] = useState( false )

  const addBox = box => {
    //make sure no boxes already there
    let checkBoxStateX = boxes.filter( eachBox => eachBox.positionX === box.x);
    if (checkBoxStateX.length > 0) {
      let checkBoxStateZ = checkBoxStateX.filter( eachCheckedBox => eachCheckedBox.positionZ === box.z);
      if ( checkBoxStateZ.length > 0) {
        return console.log('already there');
      }
    }
    console.log('jo', box)
    setBoxes( boxes => [ ...boxes, {
      objectType: 'box',
      positionX: box.x,
      positionY: box.y + 0.25,
      positionZ: box.z,
    }]);
    setIsLoading( true );
  }

  // useFrame(({ mouse }) => {
  //   let raycaster = new THREE.Raycaster();
  //   raycaster.setFromCamera( mouse, camera );
  //   //calculate objects intersecting the picking ray
  //   let intersects = raycaster.intersectObjects( scene.children );
  //   // console.log(intersects[0])
  //   // console.log('intersects', scene.children)
  //   for ( let i = 0; i < intersects.length; i++ ) {
  //     if ( i === 0) {
  //       console.log(i)
  //       console.log(intersects[i])
  //     }
  //   }
  // })

  return (
    <>
      <Controls
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={ 0.5 } />
      <ambientLight />
      <pointLight intensity={ 0.1 } position={ [10, 200, 0] } />
      <Suspense fallback={ null } >
          {/* {isLoading && <Box position={[0, 0, 0]} />} */}
          <Yard addBox={ addBox } isLoading={ isLoading } setIsLoading={ setIsLoading } />
                                                                                                                
          {/* <gridHelper args={[ 2, 10 ]} onDoubleClick={(e) => {
            // let newClickObject = gardenObjects
            // newClickObject.object = "box"
            // newClickObject.positionX = e.nativeEvent.clientX
            // newClickObject.positionY = e.nativeEvent.clientY
            // setGardenObjects(newClickObject)
            // console.log(gardenObjects)
            handleDblClick(e)
          }}/> */}

          {boxes.length ? 
            boxes.map((obj, i) => {
              return (
                <Box 
                  key={ i }
                  position={ [ obj.positionX, obj.positionY, obj.positionZ ] }
                />
              );
            })
            : console.log('nooooo')}

          {/* {gardenObjects.object === 'box' ? console.log('yo') : console.log('no')} */}
          {/* {gardenObjects.object === 'box' && <Box position={ [0, 0, 0] }/>} */}
          {/* <Box position={ [(369 / window.innerWidth) * 2 - 1, 0.1, 0] }/> */}
          {/* <Box position={ [0, 0, 0] }/> */}
      </Suspense>
    </>
  );
}