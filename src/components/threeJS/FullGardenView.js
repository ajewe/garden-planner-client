import React, { useRef, useState, useDispatch, useEffect, useMemo, useCallback, Suspense } from 'react';
import * as THREE from "three";
import { useSelector } from 'react-redux';
import { Canvas, useFrame, useLoader, useThree, useResource, extend } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import yard from '../../3d/yard.glb'
import { Box } from './Box'

extend({ OrbitControls });

const Controls = props => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

const Yard = () => {
  const gltf = useLoader(GLTFLoader, yard);
  // console.log(1, gltf);
  useEffect(() => {
    function updateMaterial() {
      // gltf.scene.children[0].children[0].children.forEach(child => {
      //   // this is just an example - not every child might be a mesh
      //   child.material = new THREE.MeshBasicMaterial({ color: "#c40000" });
      // });
      gltf.scene.children[2].scale.x = 0.5
      gltf.scene.children[2].scale.y = 0.5
      gltf.scene.children[2].scale.z = 0.5
    }
    updateMaterial();
  });
   return <primitive object={gltf.scene} position={[0, -0.02, 0]} />
}

export const FullGardenView = props => {
  let gardenDimensions = useSelector( state => state.garden.dimensions)
  let sceneObjects = useSelector( state => state.garden.sceneObjects)
  // sceneObjects.map((obj) => console.log(obj.objectType))
  const [ isClicked, setIsClicked ] = useState(false)
  const [ gardenObjects, setGardenObjects ] = useState({})
  // const [ clickLocation, setClickLocation ] = useState({
  //     clientX: 0,
  //     clientY: 0,
  //   })
  const handleDblClick = e => {
    e.stopPropagation();
    setIsClicked(true);
    console.log(isClicked);
  }

  return (
    <Canvas camera={{ position: [1, 0.75, 1] }}>
      <Controls
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={0.5}
      />
      <ambientLight />
      <pointLight intensity={0.1} position={[10, 200, 0]} />
      <Suspense fallback={ <Box position={ [0, 0, 0] }/> }>
          <Yard />
          <gridHelper args={[ 2, 10 ]} onDoubleClick={(e) => {
            // let newClickObject = gardenObjects
            // newClickObject.object = "box"
            // newClickObject.positionX = e.nativeEvent.clientX
            // newClickObject.positionY = e.nativeEvent.clientY
            // setGardenObjects(newClickObject)
            // console.log(gardenObjects)
            handleDblClick(e)
          }}/>
          {sceneObjects.length ? 
            sceneObjects.map((obj, i) => {
              return (
                <Box position={ [obj.positionX, obj.positionY, 0] }/>
              )
            })
            : console.log('nooooo')}
          {/* {gardenObjects.object === 'box' ? console.log('yo') : console.log('no')} */}
          {/* {gardenObjects.object === 'box' && <Box position={ [0, 0, 0] }/>} */}
          {/* <Box position={ [(369 / window.innerWidth) * 2 - 1, 0.1, 0] }/> */}
          {/* <Box position={ [0, 0, 0] }/> */}
      </Suspense>
    </Canvas>
  );
}