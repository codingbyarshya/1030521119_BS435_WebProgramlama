import React, { Component } from 'react';

class NumberGuessGame extends Component {
  constructor() {
    super();
    this.state = {
      targetNumber: Math.floor(Math.random() * 100) + 1,
      guess: '',
      message: '',
      playerAttempts: { 1: 0, 2: 0 },
      currentPlayer: 1,
      isTwoPlayerMode: false,
      isGameOver: false,
    };
  }

  handleInputChange = (event) => {
    if (!this.state.isGameOver) {
      this.setState({ guess: event.target.value });
    }
  };

  handleGuess = () => {
    const {
      targetNumber,
      guess,
      playerAttempts,
      currentPlayer,
      isTwoPlayerMode,
      isGameOver,
    } = this.state;

    if (isGameOver) {
      return; // Do nothing if the game is already over
    }

    if (isNaN(guess)) {
      this.setState({ message: 'Please enter a valid number' });
    } else {
      const newAttempts = playerAttempts[currentPlayer] + 1;
      const playerLabel = isTwoPlayerMode ? `Player ${currentPlayer}, ` : '';

      if (parseInt(guess, 10) === targetNumber || newAttempts >= 10) {
        this.setState({
          isGameOver: true,
          message: `${playerLabel}${
            parseInt(guess, 10) === targetNumber
              ? 'Congratulations! You guessed the number '
              : "Sorry, you've reached the maximum number of attempts. The correct number was "
          }${targetNumber} in ${newAttempts} attempts.`,
          playerAttempts: { ...playerAttempts, [currentPlayer]: newAttempts },
        });
      } else if (parseInt(guess, 10) < targetNumber) {
        this.setState({
          message: `${playerLabel}Too low! Try again.`,
          playerAttempts: { ...playerAttempts, [currentPlayer]: newAttempts },
        });
      } else {
        this.setState({
          message: `${playerLabel}Too high! Try again.`,
          playerAttempts: { ...playerAttempts, [currentPlayer]: newAttempts },
        });
      }

      if (isTwoPlayerMode && !isGameOver) {
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        this.setState({ currentPlayer: nextPlayer });
      }
    }
  };

  handleRestart = () => {
    this.setState({
      targetNumber: Math.floor(Math.random() * 100) + 1,
      guess: '',
      message: '',
      playerAttempts: { 1: 0, 2: 0 },
      currentPlayer: 1,
      isGameOver: false,
    });
  };

  toggleGameMode = () => {
    this.setState((prevState) => ({ isTwoPlayerMode: !prevState.isTwoPlayerMode }));
  };

  render() {
    return (
      <div>
        <h1>Number Guessing Game</h1>
        <button onClick={this.toggleGameMode}>
          {this.state.isTwoPlayerMode ? 'Switch to Single Player Mode' : 'Switch to Two Player Mode'}
        </button>
        <p>{this.state.message}</p>

        {!this.state.isGameOver && (
          <>
            <input
              type="number"
              placeholder={`${this.state.isTwoPlayerMode ? `Player ${this.state.currentPlayer}, ` : ''}enter your guess`}
              value={this.state.guess}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleGuess}>Guess</button>
          </>
        )}

        <button onClick={this.handleRestart}>Restart</button>
      </div>
    );
  }
}

export default NumberGuessGame;
