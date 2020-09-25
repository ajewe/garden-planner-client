import React, { useState, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import yard from '../../3d/yard.glb';

const objectScale = {
  x: 0.15,
  y: 0.55,
  z: 0.15,
};
const squareLengthX = objectScale.x * 3.233;
const squareLengthZ = objectScale.z * 2.9733;

export const Yard = () => {
  const gltf = useLoader(GLTFLoader, yard);
  const [ yardSquares, setYardSquares ] = useState([]);
  console.log(gltf)

  const setYardSquareCoordinates = () => {
    let squaresArr = [];
    for (let i = 0; i <= 11; i++) {
      let squareObjX = {
        x: squareLengthX * i,
        y: 0,
        z: 0,
      }
      squaresArr.push(squareObjX);
      for (let j = 1; j <= 11; j++) {
        let squareObjY = {
          x: squareObjX.x,
          y: 0,
          z: squareLengthZ * j,
        }
        squaresArr.push(squareObjY);
      }
    }
    setYardSquares(squaresArr);
  }

  useEffect(() => {
    setYardSquareCoordinates();
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
  // -(6 * squareLengthX)

  return (
    <>
      <group 
        position={[ -(6 * squareLengthX), 0, -(6 * squareLengthZ) ]}>
        { yardSquares.map( square => {
          return <EachYardSquare gltf={ gltf } addBox={ addBox } position={ [ square.x, square.y, square.z ] } />
        })}
      </group>
    </>
  );
}

const EachYardSquare = React.memo(({ gltf, addBox, position }) => {
  const [hovered, setHover] = useState(false);

  return (
    <group
      scale={[ objectScale.x, objectScale.y, objectScale.z ]}
      position={ position }
      onPointerOver={ e => setHover(true) }
      onPointerOut={ e => setHover(false) }
      onPointerDown={ e => {
        e.stopPropagation();
        //you may optionally capture the target
        console.log('addBox', e.point.x, e.point.z)
        addBox({ x: e.point.x, y: e.point.y, z: e.point.z }) }}>
      <primitive object={ gltf.scene.clone() } />
    </group>
  );
})