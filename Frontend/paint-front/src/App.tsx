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
  const [username, setUsername] = useState<string>('');
  
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(shapes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = drawingName + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    file.text().then(txt => {
      try {
        const data = JSON.parse(txt) as ShapeData[];
        setShapes(data);
      } catch (err) {
        console.error('Failed to parse JSON', err);
      }
    });
  };

  const handleUsernameChange = () => {
    setShapes([]);
    setDrawingName('Untitled Drawing');
  };

  return (
    <div className='app-container'>
      <Header drawingName={drawingName} setDrawingName={setDrawingName} exportJSON={exportJSON} importJSON={importJSON}
        shapes={shapes} setShapes={setShapes} username={username} setUsername={setUsername} onUsernameChange={handleUsernameChange} />
      
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
