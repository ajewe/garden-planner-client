import React, { useRef, useState } from 'react';

export const Box = props => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
  return (
    <mesh
      { ...props }
      ref={ mesh }
      scale={ [0.49, 0.45, 0.46] }
      onClick={ (e) => setActive(!active) }
      onPointerOver={ (e) => setHover(true) }
      onPointerOut={ (e) => setHover(false) }>
      <boxBufferGeometry attach="geometry" args={ [1, 1, 1] } />
      <meshStandardMaterial attach="material" color={ hovered ? 'hotpink' : 'orange' } />
    </mesh>
  );
}