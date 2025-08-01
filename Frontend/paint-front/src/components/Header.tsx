import React, { useRef, ChangeEvent, useState } from 'react';
import UsernameInput from './UsernameInput';
import { apiService } from '../services/api';

interface HeaderProps {
  drawingName: string;
  setDrawingName: (name: string) => void;
  exportJSON: () => void;
  importJSON: (file: File) => void;
  shapes: any[];
  setShapes: (shapes: any[]) => void;
  username: string;
  setUsername: (username: string) => void;
  onUsernameChange: () => void;
}

const Header: React.FC<HeaderProps> = ({
  drawingName,
  setDrawingName,
  exportJSON,
  importJSON,
  shapes,
  setShapes,
  username,
  setUsername,
  onUsernameChange,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const triggerFilePicker = () => fileInput.current?.click();

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importJSON(file);
      e.target.value = '';
    }
  };

  const handleExportToBackend = async () => {
    if (!username) {
      setMessage('Please set a username first');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const result = await apiService.saveDrawing(username, shapes);
    
    if (result.success) {
      setMessage('Drawing saved successfully!');
    } else {
      setMessage(`Error: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  const handleImportFromBackend = async () => {
    if (!username) {
      setMessage('Please set a username first');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const result = await apiService.loadDrawing(username);
    
    if (result.success && result.data) {
      setShapes(result.data);
      setMessage('Drawing loaded successfully!');
    } else {
      setMessage(`Error: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  return (
    <header>
      <div className="header-top">
        <input className='title-input' value={drawingName} onChange={(e) => setDrawingName(e.target.value)} 
          placeholder='Untitled Drawing' />
        <UsernameInput username={username} setUsername={setUsername} onUsernameChange={onUsernameChange} />
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className='actions'>
        <button onClick={exportJSON} disabled={isLoading}>Export to File</button>
        <button onClick={triggerFilePicker} disabled={isLoading}>Import from File</button>
        <button onClick={handleExportToBackend} disabled={isLoading || !username}>
          {isLoading ? 'Saving...' : 'Save to Backend'}
        </button>
        <button onClick={handleImportFromBackend} disabled={isLoading || !username}>
          {isLoading ? 'Loading...' : 'Load from Backend'}
        </button>

        <input ref={fileInput} type='file' accept='application/json' style={{ display: 'none' }} onChange={handleImport}/>
      </div>
    </header>
  );
};

export default Header;
