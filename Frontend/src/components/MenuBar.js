import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { motion } from 'framer-motion'; // Import Framer Motion
import './component-styles/MenuBar.css'; // External CSS for styling

const MenuBar = () => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open/close
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [name, setName] = useState(''); // State for user's name
  const [badgeNumber, setBadgeNumber] = useState(''); // State for user's badge number

  // Check localStorage for login state and user details when MenuBar mounts
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    const loggedInStatus = storedName && storedBadgeNumber;

    if (loggedInStatus) {
      setName(storedName); // Set name from localStorage
      setBadgeNumber(storedBadgeNumber); // Set badgeNumber from localStorage
      setIsLoggedIn(true); // Set logged in state
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
  };

  const menuVariants = {
    hidden: { x: -250 },
    visible: { x: 0 },
  };

  return (
    <div className="menu-bar-container light">
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="material-icons">menu</span>
      </div>

      {isMenuOpen && (
        <motion.nav
          className="menu-options"
          initial="hidden"
          animate="visible"
          variants={menuVariants}
          transition={{ type: 'tween', stiffness: 300 }}
          style={{
            backgroundColor: '#ffffff', // Fixed light mode background
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="menu-header">
            <h1>LawAI</h1>
            <span className="material-icons">gavel</span>
          </div>

          {/* Display User info if logged in */}
          {isLoggedIn && (
            <div className="user-info" style={{ textAlign: 'left', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <div className="profile-icon" style={{ marginBottom: '15px' }}>
                <img 
                  src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png" // Example random profile image
                  alt="User Profile" 
                  style={{ borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover' }} 
                />
              </div>
            </div>
          )}

          <nav className="menu-nav">
            <ul>
              <li><NavLink to="/home/query" activeClassName="active">AI Lawyer</NavLink></li>
              <li><NavLink to="/bareacts" activeClassName="active">Bare Acts</NavLink></li>
              <li><NavLink to="/home/database" activeClassName="active">Database</NavLink></li>
              <li>
                {isLoggedIn ? (
                  <NavLink to="/home/login" activeClassName="active">Logged In</NavLink>
                ) : (
                  <NavLink to="/home/login" activeClassName="active">Login</NavLink>
                )}
              </li>
              <li><NavLink to="/home/settings" activeClassName="active">Settings</NavLink></li>
            </ul>
          </nav>
        </motion.nav>
      )}
    </div>
  );
};

export default MenuBar;
