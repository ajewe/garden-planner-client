import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree, extend } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import yard from '../../3d/yard.glb'

extend({ OrbitControls });

const Controls = props => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

const Box = props => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

const Yard = () => {
  const gltf = useLoader(GLTFLoader, yard);
  console.log(1, gltf);
  // useEffect(() => {
  //   function updateMaterial() {
  //     gltf.scene.children[0].children[0].children.forEach(child => {
  //       // this is just an example - not every child might be a mesh
  //       child.material = new THREE.MeshBasicMaterial({ color: "#c40000" });
  //     });
  //   }
  //   updateMaterial();
  // });
   return <primitive object={gltf.scene} position={[0, 1, 0]} />
}

export const FullGardenView = props => {

  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Controls
        autoRotate
        enablePan={true}
        enableZoom={true}
        enableDamping
        dampingFactor={0.5}
        rotateSpeed={1}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <spotLight intensity={0.8} position={[300, -300, 600]} />
      <spotLight intensity={0.8} position={[-300, 300, -600]} /> */}
      <Suspense fallback={ <Box position={ [1.2, 0, 0] }/> }>
        <Yard />
      </Suspense>
    </Canvas>
  );
}