import React, { useRef } from 'react';
import Shape, { ShapeType, ShapeData } from './Shape';

interface CanvasProps {
  shapes: ShapeData[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeData[]>>;
  selectedShape: ShapeType | null;
}

const Canvas: React.FC<CanvasProps> = ({ shapes, setShapes, selectedShape }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.detail !== 1 || !selectedShape || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setShapes(prev => [
      ...prev, {
        type: selectedShape,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    ]);
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const type = e.dataTransfer.getData('shape') as ShapeType;
    if (!type) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes(prev => [...prev, { type, x, y }]);
  };

  return (
    <div className='canvas' ref={canvasRef} onClick={handleClick} onDrop={handleDrop}
         style={{ position: 'relative', width: '100%', height: '100%' }}>
      {shapes.map((shape, i) => (
        <div key={i} style={{ position: 'absolute', left: shape.x, top: shape.y, transform: 'translate(-50%, 50%)', cursor: 'pointer' }}>
          <Shape type={shape.type} x={0} y={0} />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
