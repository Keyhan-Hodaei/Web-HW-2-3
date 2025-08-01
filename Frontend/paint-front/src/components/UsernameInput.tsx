import React, { useState } from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (username: string) => void;
  onUsernameChange: () => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ username, setUsername, onUsernameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [showNotification, setShowNotification] = useState(false);

  const handleSave = () => {
    if (tempUsername.trim()) {
      const newUsername = tempUsername.trim();
      if (newUsername !== username) {
        onUsernameChange();
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
      setUsername(newUsername);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="username-input-container">
        <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} placeholder="Enter username"
          className="username-input" autoFocus />
        <button onClick={handleSave} className="username-save-btn">Save</button>
        <button onClick={handleCancel} className="username-cancel-btn">Cancel</button>
      </div>
    );
  }

  return (
    <div className="username-display">
      <span>User: {username || 'Not set'}</span>
      <button onClick={() => setIsEditing(true)} className="username-edit-btn">Edit</button>
      {showNotification && (
        <div className="username-notification">
          Username Changed
        </div>
      )}
    </div>
  );
};

export default UsernameInput; 