import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/Login.css'; // External CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name input
  const [badgeNumber, setBadgeNumber] = useState(''); // State for badge number input
  const [isSignup, setIsSignup] = useState(false); // State for toggling between login and signup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [userId, setUserId] = useState(''); // State for storing user ID
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to track screen size

  // Check localStorage for login state when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    const storedEmail = localStorage.getItem('email');
    if (storedUserId && storedName && storedBadgeNumber && storedEmail) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setName(storedName);
      setBadgeNumber(storedBadgeNumber);
      setEmail(storedEmail);
    }
  }, []);

  // Handle window resize to update the isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setUserId(email);
    setIsLoggedIn(true);
    // Store user data in localStorage
    localStorage.setItem('userId', email); // Store userId in localStorage
    localStorage.setItem('name', name); // Store name in localStorage
    localStorage.setItem('badgeNumber', badgeNumber); // Store badge number in localStorage
    localStorage.setItem('email', email); // Store email in localStorage
    console.log('Logging in with', { email, password, name, badgeNumber });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setName('');
    setBadgeNumber('');
    setEmail('');
    // Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('badgeNumber');
    localStorage.removeItem('email');
    console.log('Logged out successfully');
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="login-container light-mode">
      {/* Conditionally render Sidebar or MenuBar based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar isLoggedIn={isLoggedIn} userId={userId} className="sidebar" />}
      <main className="main-content">
        {isLoggedIn ? (
          <>
            <h2 className="login-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-14">You are logged in</h2>
            {/* Display user details in a visually appealing format */}
            <div className="user-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Badge Number:</strong> {badgeNumber}</p>
            </div>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <h2 className="login-title bareacts-title text-4xl font-semibold text-blue-900 text-center mb-8">
              {isSignup ? 'Sign Up' : 'Login'}
            </h2>
            <form onSubmit={handleLogin} className="login-form">
              {isSignup && (
                <>
                  <div className="login-form-item">
                    <label htmlFor="name" className="login-form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="login-form-input"
                      required
                    />
                  </div>
                  <div className="login-form-item">
                    <label htmlFor="badgeNumber" className="login-form-label">Badge Number</label>
                    <input
                      type="text"
                      id="badgeNumber"
                      value={badgeNumber}
                      onChange={(e) => setBadgeNumber(e.target.value)}
                      className="login-form-input"
                      required
                    />
                  </div>
                </>
              )}
              <div className="login-form-item">
                <label htmlFor="email" className="login-form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-form-input"
                  required
                />
              </div>
              <div className="login-form-item">
                <label htmlFor="password" className="login-form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-form-input"
                  required
                />
              </div>
              <button type="submit" className="login-btn primary-btn">
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <p className="login-toggle-text">
              {isSignup ? 'Already a user? ' : 'Not a user? '}
              <span className="login-toggle-link" onClick={toggleForm}>
                {isSignup ? 'Login' : 'Sign Up'}
              </span>
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Login;
