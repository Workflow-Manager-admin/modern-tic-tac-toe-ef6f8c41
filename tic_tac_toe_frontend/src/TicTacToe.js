/**
 * Component for the Tic Tac Toe game, handling state, gameplay, and rendering.
 * Modern, minimal, and fully self-contained.
 */
import React, { useState } from 'react';

// Utility function to check winner
function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], line: [a, b, c]};
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export default function TicTacToe() {
  /**
   * Main state for the game.
   * board: array of 9 (string | null)
   * xIsNext: boolean to track which player's turn
   * gameOver: boolean indicating whether the game is finished
   * winnerLine: winning triplet if exists
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winnerObj = calculateWinner(board);
  const winner = winnerObj ? winnerObj.winner : null;
  const isDraw = !winner && board.every(Boolean);

  // Handler for when a cell is clicked
  // PUBLIC_INTERFACE
  function handleClick(i) {
    if (board[i] || winner) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // Helper to render a single square
  function renderSquare(i) {
    let highlight = "";
    if (winnerObj && winnerObj.line.includes(i)) {
      highlight = "ttt-highlight";
    }
    return (
      <button
        className={`ttt-square ${highlight}`}
        onClick={() => handleClick(i)}
        aria-label={`Place ${xIsNext ? "X" : "O"} at position ${i}`}
      >
        {board[i]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a tie!";
  } else {
    status = `Next: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="ttt-container">
      <div className="ttt-status" data-testid="status">{status}</div>
      <div className="ttt-board" role="grid">
        {[0,1,2].map(row => (
          <div className="ttt-row" key={row}>
            { [0,1,2].map(col => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button
        className="ttt-reset"
        onClick={handleReset}
        aria-label="Reset game"
        data-testid="reset-btn"
      >
        Reset Game
      </button>
    </div>
  );
}
