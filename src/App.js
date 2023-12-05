import React from 'react';
import NumberGuessGame from './NumberGuessGame';
import './App.css';
import number from './number.png';

function App() {
    return (
        <div>
            <NumberGuessGame />
            <img src={number} alt="Number" />
        </div>
    );
}

export default App;
