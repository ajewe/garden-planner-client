import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, useLoader, useThree, extend, Group } from 'react-three-fiber';
import * as THREE from "three";
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

const Asset = ({ url, addBox }) => {
  const gltf = useLoader(GLTFLoader, url);
  const [hovered, setHover] = useState(false);
  
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
  
  return ( <group
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      onPointerDown={(e) => {
        e.stopPropagation()
        // You may optionally capture the target
        console.log('addBox', e.point.x, e.point.z)
        addBox({ x: e.point.x, y: e.point.y, z: e.point.z }) }}> 
    <primitive object={gltf.scene} position={[0, -0.02, 0]} />
    </group> )
}

export const Scene = props => {
  const { camera, scene } = useThree()
  const [boxes, setBoxes] = useState([
    {
      objectType : 'box',
      positionX: 0,
      positionY: 0.1,
    }
  ])

  const addBox = (box) => {
    console.log(box)
    setBoxes(boxes => [...boxes, {
      objectType : 'box', 
      positionX: box.x, 
      positionY: box.y + 0.1,
      positionZ: box.z,
    }])
  }


  useFrame(({ mouse }) => {
    // const x = (mouse.x * viewport.width) / 2
    // const y = (mouse.y * viewport.height) / 2
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
      // console.log('ya', intersects[i])
    }
  })
  
  return (
    <>
      <Controls
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={0.5}
      />
      <ambientLight />
      <pointLight intensity={0.1} position={[10, 200, 0]} />
      <Suspense fallback={null}>
        <Asset url={yard} addBox={addBox} />
      </Suspense>
      { boxes.length ? 
        boxes.map((obj, i) => {
          return (
            <Box position={ [obj.positionX, obj.positionY, obj.positionZ ] }/>
          )
        })
        : console.log('nooooo') }
    </>
  )
}