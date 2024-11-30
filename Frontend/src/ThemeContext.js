// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Set 'dark' as the default theme

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to 'dark' if nothing is saved
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // Apply the theme class to the body
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
