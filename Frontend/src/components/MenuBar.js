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
            background: 'linear-gradient(to right, #3b82f6, #6366f1, #9333ea)', // Dark background, matching the Sidebar theme
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Deeper shadow for better contrast
          }}
        >
          <div className="menu-header flex justify-between items-center mb-6">
            <NavLink to="/" className="text-white text-2xl font-bold">
              LawAI
            </NavLink>
            <span className="material-icons text-white text-3xl">gavel</span>
          </div>

          {/* Display User info if logged in */}
          {isLoggedIn && (
            <div
              className="user-info flex flex-col items-start mb-6"
              style={{
                textAlign: 'left',
              }}
            >
              <div className="profile-icon mb-4">
                <img
                  src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png" // Example random profile image
                  alt="User Profile"
                  className="rounded-full w-20 h-20 object-cover" // Updated to make the image slightly larger
                />
              </div>
              <div className="user-details text-white">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-sm text-gray-300">Badge #: {badgeNumber}</p>
              </div>
            </div>
          )}

          <nav className="menu-nav">
            <ul>
              <li><NavLink to="/query" activeClassName="active">AI Lawyer</NavLink></li>
              <li><NavLink to="/bareacts" activeClassName="active">Bare Acts</NavLink></li>

              <li><NavLink to="/database" activeClassName="active">Database</NavLink></li>
              <li><NavLink to="/fir" activeClassName="active">FIR Builder</NavLink></li>
              <li>
                {isLoggedIn ? (
                  <NavLink to="/login" activeClassName="active">Logged In</NavLink>
                ) : (
                  <NavLink to="/login" activeClassName="active">Login</NavLink>
                )}
              </li>
              <li><NavLink to="/settings" activeClassName="active">Settings</NavLink></li>
            </ul>
          </nav>
        </motion.nav>
      )}
    </div>
  );
};

export default MenuBar;
