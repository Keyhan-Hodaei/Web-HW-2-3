import React, { useRef, ChangeEvent } from 'react';

interface HeaderProps {
  drawingName: string;
  setDrawingName: (name: string) => void;
  exportJSON: () => void;
  importJSON: (file: File) => void;
}


const Header: React.FC<HeaderProps> = ({
  drawingName,
  setDrawingName,
  exportJSON,
  importJSON,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const triggerFilePicker = () => fileInput.current?.click();

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importJSON(file);
      e.target.value = '';
    }
  };

  return (
    <header>
      <input value={drawingName} onChange={(e) => setDrawingName(e.target.value)}
        placeholder='Untitled Drawing' />

      <div className='actions'>
        <button onClick={exportJSON}>Export</button>
        <button onClick={triggerFilePicker}>Import</button>

        <input ref={fileInput} type='file' accept='application/json' style={{ display: 'none' }} onChange={handleImport}/>
      </div>
    </header>
  );
};

export default Header;
