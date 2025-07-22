import React, { useRef, ChangeEvent } from 'react'

interface HeaderProps {
  drawingName: string;
  setDrawingName: (name: string) => void;
}


const Header: React.FC<HeaderProps> = ({
  drawingName,
  setDrawingName,
}) => {
  return (
    <header>
      <input value={drawingName} onChange={(e) => setDrawingName(e.target.value)}
        placeholder='Untitled Drawing' />

      <div className='actions'>
        <button>Export</button>
        <button>Import</button>
      </div>
    </header>
  );
};

export default Header;
