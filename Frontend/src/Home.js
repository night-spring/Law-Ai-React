// Home.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Import Theme Context
import Sidebar from './components/Sidebar'; // Import Sidebar component
import './Home.css'; // External CSS for styling

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`home-container ${theme}`}>
      <Sidebar theme={theme} /> {/* Pass theme to Sidebar for consistent styling */}
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
        <h2>Welcome to LawAI</h2>
        <p>Your AI-powered assistant for legal information.</p>
        {/* Add more content here as needed */}
      </main>
    </div>
  );
};

export default Home;
