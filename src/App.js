import React, { useState } from 'react';
import NumberGuessGame from './NumberGuessGame';
import './App.css';
import number from './number.png';

function App() {
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
      <NumberGuessGame />
      <img src={number} alt="Number" className={`number-image ${nightMode ? 'night-mode' : ''}`} />
      <button onClick={toggleNightMode} className={`toggle-night-mode ${nightMode ? 'night-mode' : ''}`}>
        {nightMode ? 'Day Mode' : 'Night Mode'}
      </button>
    </div>
  );
}

export default App;
