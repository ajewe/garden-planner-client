import React, { useState, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import yard from '../../models/yard.glb';

const objectScale = {
  x: 0.15,
  y: 0.55,
  z: 0.15,
};
const squareLengthX = objectScale.x * 3.233;
const squareLengthZ = objectScale.z * 2.9733;
const offsetPos = {
  x: -(6 * squareLengthX),
  y: 0,
  z: -(6 * squareLengthZ),
}

export const Yard = props => {
  const gltf = useLoader(GLTFLoader, yard);
  const [ yardSquares, setYardSquares ] = useState([]);

  const setYardSquareCoordinates = () => {
    let squaresArr = [];
    for (let i = 1; i <= 12; i++) {
      let squareObjX = {
        x: squareLengthX * i,
        y: 0,
        z: squareLengthZ * 1,
      }
      squaresArr.push(squareObjX);
      for (let j = 2; j <= 12; j++) {
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
  }, []);

  // const [ boxes, setBoxes ] = useState([
  //   {
  //     objectType: 'box',
  //     positionX: 0,
  //     positionY: 0.1,
  //   }
  // ])
  // const addBox = box => {
  //   // console.log(box)
  //   setBoxes( boxes => [ ...boxes, {
  //     objectType: 'box',
  //     positionX: box.x,
  //     positionY: box.y + 0.1,
  //     positionZ: box.z,
  //   }]);
  // }

  return (
    <group 
      position={[ offsetPos.x, offsetPos.y, offsetPos.z ]}
      // ref={ yardRef }
    >
      { yardSquares.map( (square, i) => {
        return (
          <EachYardSquare
            key={ i }
            gltf={ gltf } 
            addBox={ props.addBox }
            isLoading={ props.isLoading }
            setIsLoading={ props.setIsLoading }
            position={ [ square.x, square.y, square.z ] }
            yardSquares={ yardSquares }
          />
        );
      })}
    </group>
  );
}

const EachYardSquare = React.memo(({ gltf, addBox, isLoading, setIsLoading, position, yardSquares }) => {
  const [hovered, setHover] = useState(false);
  let yardRef = useRef();

  return (
    <group
      scale={ [objectScale.x, objectScale.y, objectScale.z] }
      position={ position }
      ref={ yardRef }
      onPointerOver={ e => setHover(true) }
      onPointerOut={ e => setHover(false) }
      onClick={ e => {
        e.stopPropagation();
        // if( yardRef.current ) {
        //   yardRef.current.setAttribute('disabled', 'disabled');
        //   console.log('current')

        // }
        // console.log(e.point.x, e.point.z)
        // console.log( yardSquares )
        // console.log('event', e)
        // console.log('addbox pos', position[0], position[2] )
        // console.log(offsetPos.x, offsetPos.z)
        addBox({ x: position[0] + offsetPos.x, y: position[1] + offsetPos.y, z: position[2] + offsetPos.z }) }}>
      <primitive object={ gltf.scene.clone() } />
    </group>
  );
})