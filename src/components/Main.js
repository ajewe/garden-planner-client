import React from 'react';
import { Scene } from './threeJS/Scene';

export const Main = () => {
  return (
    <>
      <div style={{width: '100%', height: '90%'}}>
        <Scene />
      </div>
      <div>hello</div>
    </>
  );
}
