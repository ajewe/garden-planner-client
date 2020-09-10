import React, { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree, useResource, extend } from 'react-three-fiber';
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

const Grid = () => {
  let size = 10;
  let divisions = 10;
  let gridHelper = new THREE.GridHelper(size, divisions);

  return (
    <>
      <gridHelper />
    </>
  );
}

// const Grid = () => {
//   const { camera, gl } = useThree();
//   const [ ref, object ] = useResource();
//   const pointsHoriz = useMemo(() => [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)], [])
//   const pointsVert = useMemo(() => [new THREE.Vector3(0, 0, -0.5), new THREE.Vector3(0, 0, 0.5)], [])
//   const onHorizUpdate = useCallback(self => self.setFromPoints(pointsHoriz), [pointsHoriz])
//   const onVertUpdate = useCallback(self => self.setFromPoints(pointsVert), [pointsVert])

//   return (
//     <>
//       <line position={[0, 0, -0.1]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, -0.2]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, -0.3]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, 0]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, 0]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onVertUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, 0.1]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0.1, 0, 0]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onVertUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, 0.2]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0.2, 0, 0]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onVertUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0, 0, 0.3]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onHorizUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//       <line position={[0.3, 0, 0]} ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={ onVertUpdate } />
//         <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//     </>
//   );
// }

const Yard = () => {
  const gltf = useLoader(GLTFLoader, yard);
  console.log(1, gltf);
  useEffect(() => {
    function updateMaterial() {
      // gltf.scene.children[0].children[0].children.forEach(child => {
      //   // this is just an example - not every child might be a mesh
      //   child.material = new THREE.MeshBasicMaterial({ color: "#c40000" });
      // });
      gltf.scene.children[2].scale.x = 0.2
      gltf.scene.children[2].scale.y = 0.2
      gltf.scene.children[2].scale.z = 0.2
    }
    updateMaterial();
  });
   return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

export const FullGardenView = props => {

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
        <Grid />
        <Yard />
      </Suspense>
    </Canvas>
  );
}