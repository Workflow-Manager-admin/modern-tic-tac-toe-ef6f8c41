import React, { useState, useEffect } from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /** PUBLIC_INTERFACE
   * Toggle between light and dark theme (added for demonstration, TTT is light by default)
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header 
        className="App-header"
        style={{
          paddingTop: '14px',
          paddingBottom: '0px',
          background: "none",
          marginBottom: '6px',
        }}
      >
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          margin: 0,
          marginBottom: '4px',
          letterSpacing: '0.03em',
          color: '#1976d2',
        }}>
          Tic Tac Toe
        </h1>
        <div style={{
          fontSize: '1.1rem',
          color: 'var(--text-primary)',
          opacity: 0.88,
          marginBottom: 0,
        }}>
          A modern, minimal tic-tac-toe game for two players
        </div>
      </header>
      <main style={{ marginTop: '-4px' }}>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;
