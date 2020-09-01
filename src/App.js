import React from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
