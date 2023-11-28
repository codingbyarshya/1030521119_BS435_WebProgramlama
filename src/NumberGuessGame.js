import React, { useState } from 'react';

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const NumberGuessGame = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [playerAttempts, setPlayerAttempts] = useState({ 1: 0, 2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isTwoPlayerMode, setIsTwoPlayerMode] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleInputChange = (event) => {
    if (!isGameOver) {
      setGuess(event.target.value);
    }
  };

  const handleGuess = () => {
    if (isGameOver) {
      return;
    }

    if (isNaN(guess)) {
      setMessage('Please enter a valid number');
    } else {
      const newAttempts = playerAttempts[currentPlayer] + 1;
      const playerLabel = isTwoPlayerMode ? `Player ${currentPlayer}, ` : '';

      if (parseInt(guess, 10) === targetNumber || newAttempts >= 10) {
        setIsGameOver(true);
        setMessage(
          `${playerLabel}${
            parseInt(guess, 10) === targetNumber
              ? 'Congratulations! You guessed the number '
              : "Sorry, you've reached the maximum number of attempts. The correct number was "
          }${targetNumber} in ${newAttempts} attempts.`
        );
        setPlayerAttempts({ ...playerAttempts, [currentPlayer]: newAttempts });
      } else if (parseInt(guess, 10) < targetNumber) {
        setMessage(`${playerLabel}Too low! Try again.`);
        setPlayerAttempts({ ...playerAttempts, [currentPlayer]: newAttempts });
      } else {
        setMessage(`${playerLabel}Too high! Try again.`);
        setPlayerAttempts({ ...playerAttempts, [currentPlayer]: newAttempts });
      }

      if (isTwoPlayerMode && !isGameOver) {
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayer(nextPlayer);
      }
    }
  };

  const handleRestart = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setMessage('');
    setPlayerAttempts({ 1: 0, 2: 0 });
    setCurrentPlayer(1);
    setIsGameOver(false);
  };

  const toggleGameMode = () => {
    setIsTwoPlayerMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <button onClick={toggleGameMode}>
        {isTwoPlayerMode ? 'Switch to Single Player Mode' : 'Switch to Two Player Mode'}
      </button>
      <p>{message}</p>

      {!isGameOver && (
        <>
          <input
            type="number"
            placeholder={`${isTwoPlayerMode ? `Player ${currentPlayer}, ` : ''}enter your guess`}
            value={guess}
            onChange={handleInputChange}
          />
          <button onClick={handleGuess}>Guess</button>
        </>
      )}

      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default NumberGuessGame;
