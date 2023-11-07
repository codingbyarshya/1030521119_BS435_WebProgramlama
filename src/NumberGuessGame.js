import React, { Component } from 'react';

class NumberGuessGame extends Component {
    constructor() {
        super();
        this.state = {
            targetNumber: Math.floor(Math.random() * 100) + 1,
            guess: '',
            message: '',
            attempts: 0,
        };
    }

    handleInputChange = (event) => {
        this.setState({ guess: event.target.value });
    };

    handleGuess = () => {
        const { targetNumber, guess, attempts } = this.state;

        if (isNaN(guess)) {
            this.setState({ message: 'Please enter a valid number' });
        } else {
            const newAttempts = attempts + 1;
            if (parseInt(guess, 10) === targetNumber) {
                this.setState({ message: `Congratulations! You guessed the number ${targetNumber} in ${newAttempts} attempts.` });
            } else if (parseInt(guess, 10) < targetNumber) {
                this.setState({ message: 'Too low! Try again.', attempts: newAttempts });
            } else {
                this.setState({ message: 'Too high! Try again.', attempts: newAttempts });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Number Guessing Game</h1>
                <p>{this.state.message}</p>
                <input
                    type="number"
                    placeholder="Enter your guess"
                    value={this.state.guess}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleGuess}>Guess</button>
            </div>
        );
    }
}

export default NumberGuessGame;
