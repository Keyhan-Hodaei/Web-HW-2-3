import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import { ShapeType, ShapeData } from './components/Shape';


function App() {

  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
  const [drawingName, setDrawingName] = useState<string>('Untitled Drawing');
  
  const exportJSON = () => {
    
  };

  const importJSON = (file: File) => {
    
  };

  return (
    <div className='app-container'>
      <Header drawingName={drawingName} setDrawingName={setDrawingName} />
      
      <div className='main-content'>
        <div className='canvas-section'>
          <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape} />
          <Footer shapes={shapes} />
        </div>
        <Sidebar setSelectedShape={setSelectedShape} selectedShape={selectedShape} />
      </div>
    </div>
  );
}

export default App;
