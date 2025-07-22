import React from 'react';
import Shape, { ShapeType } from './Shape';

interface SidebarProps {
  setSelectedShape: (type: ShapeType) => void;
  selectedShape: ShapeType | null;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedShape, selectedShape }) => {
  const tools: ShapeType[] = ['circle', 'square', 'triangle'];

  const onDragStart = (e: React.DragEvent, type: ShapeType) => {
    e.dataTransfer.setData('shape', type);
  };

  return (
    <div className='tools-section'>
      <div className='tools-label'>Tools</div>
      {tools.map((type) => (
        <div key={type} draggable onClick={() => setSelectedShape(type)} onDragStart={(e) => onDragStart(e, type)} 
          style={{ cursor: 'pointer', padding: '8px', margin: '4px 0', background: selectedShape === type ? '#e0e0e0' : undefined}}>
          <Shape type={type} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
