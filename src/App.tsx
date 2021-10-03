import React from 'react';
import { Scene } from './components/threeJS/Scene';
import './App.css';

function App() {
  return (
    <div className="App" style={{height: '90%'}}>
      <div style={{width: '100%', height: '90%'}}>
        <Scene />
      </div>
    </div>
  );
}

export default App;
