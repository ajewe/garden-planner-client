import React from 'react';
import logo from './logo.svg';
import { Scene } from './components/threeJS/Scene';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{width: '100%', height: '90%'}}>
        <Scene />
      </div>
    </div>
  );
}

export default App;
