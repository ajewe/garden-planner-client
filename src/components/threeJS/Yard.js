import React, { useState, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import yard from '../../3d/yard.glb';

export const Yard = () => {
  const gltf = useLoader(GLTFLoader, yard);
  const [ yardSquares, setYardSquares ] = useState([]);

  const setCoordinates = () => {
    let squaresArr = [];

    for (let i = 0; i <= 11; i++) {
      let squareObjX = {
        x: (0.15*3.233)*i,
        y: 0,
        z: 0,
      }
      squaresArr.push(squareObjX);
      for (let j = 1; j <= 11; j++) {
        let squareObjY = {
          x: squareObjX.x,
          y: 0,
          z: (0.15*2.9733)*j,
        }
        squaresArr.push(squareObjY);
      }
    }
    console.log(squaresArr)
    setYardSquares(squaresArr);
  }

  useEffect(() => {
    setCoordinates();
  }, [])

  const [ boxes, setBoxes ] = useState([
    {
      // objectType: 'box',
      // positionX: 0,
      // positionY: 0.1,
    }
  ])
  const addBox = box => {
    console.log(box)
    setBoxes( boxes => [ ...boxes, {
      objectType: 'box',
      positionX: box.x,
      positionY: box.y + 0.1,
      positionZ: box.z,
    }]);
  }

  return (
    <>
      { yardSquares.map( (square, i) => {
        return <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ square.x, square.y, square.z ] } />
      })}

      {/* <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 0, 0, 0 ] } /> */}
      {/* <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 0, 0, 0.446 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 0, 0, 0.892 ] }/> */}
      {/* <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ -0.162, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 0.97, 0, 0 ] } />
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ -0.97, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 1.455, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ -1.455, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 1.94, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ -1.94, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 2.425, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ -2.425, 0, 0 ] }/>
      <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ 2.91, 0, 0 ] }/> */}
    </>
  );
}

const EachYardSquare = React.memo(({ gltf, addBox, position }) => {
  // const gltf = useLoader(GLTFLoader, url);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    function updateMaterial() {
      // gltf.scene.children[0].children[0].children.forEach(child => {
      //   // this is just an example - not every child might be a mesh
      //   child.material = new THREE.MeshBasicMaterial({ color: "#c40000" });
      // });
      gltf.scene.children[2].scale.x = 0.15
      gltf.scene.children[2].scale.y = 0.55
      gltf.scene.children[2].scale.z = 0.15
    }
    updateMaterial();
  });
  
  return (
    <group
      position={ position }
      onPointerOver={ e => setHover(true) }
      onPointerOut={ e => setHover(false) }
      onPointerDown={ e => {
        e.stopPropagation();
        //you may optionally capture the target
        console.log('addBox', e.point.x, e.point.z)
        addBox({ x: e.point.x, y: e.point.y, z: e.point.z }) }}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
})