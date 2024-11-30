import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import classNames from 'classnames'; // Add classnames for conditional styling
import './component-styles/Sidebar.css';
import img from '../images/MOE.png';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [language, setLanguage] = useState('English'); // State to store selected language

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    if (storedName && storedBadgeNumber) {
      setName(storedName);
      setBadgeNumber(storedBadgeNumber);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Optionally, you can store this in localStorage or context to persist across the app
    console.log('Selected Language:', e.target.value);
  };

  return (
    <motion.nav className="sidebar-nav">
      <div className="sidebar-content bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 text-white py-4 shadow-lg">
        {/* Logo and Title */}
        <div className="container mx-auto px-6 flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <span className="material-icons text-white text-3xl">gavel</span>
            <h1 className="text-2xl font-bold tracking-wide">
              <NavLink to="/">LawAI</NavLink>
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Official Emblem */}
            <img
              src={img}
              alt="Emblem of India"
              className="h-12"
            />
            
            {/* Help Button */}
            <button
              className="bg-white text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform transition hover:scale-105"
              onClick={() => alert("Help Section")}
            >
              Help
            </button>

            {/* Language Selector */}
            <select
              className="bg-white text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
              value={language}
              onChange={handleLanguageChange} // Handle language change
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Marathi">Marathi</option>
              {/* Add other languages as required */}
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm py-4 shadow-md">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-10">
          {/* AI Lawyer Link */}
          <NavLink
            to="/home/query"
            className={classNames(
              'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
              { 'active': isLoggedIn }
            )}
          >
            {language === 'English' ? 'AI Lawyer' : language === 'Hindi' ? 'एआई वकील' : language === 'Bengali' ? 'এআই আইনজীবী' : language === 'Tamil' ? 'ஏ.ஐ. வழக்குரைஞர்' : language === 'Telugu' ? 'ఏ.ఐ. న్యాయవాది' : language === 'Marathi' ? 'ए.आय. वकील' : 'AI Lawyer'}
          </NavLink>
          {/* Bare Acts Link */}
          <NavLink
            to="/bareacts"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
          >
            {language === 'English' ? 'Bare Acts' : language === 'Hindi' ? 'नंगे कृत्य' : language === 'Bengali' ? 'নগ্ন আইন' : language === 'Tamil' ? 'மரபுவழி சட்டங்கள்' : language === 'Telugu' ? 'నగ్న చట్టాలు' : language === 'Marathi' ? 'नग्न कायदे' : 'Bare Acts'}
          </NavLink>
          {/* Database Link */}
          <NavLink
            to="/home/database"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
          >
            {language === 'English' ? 'Database' : language === 'Hindi' ? 'डेटाबेस' : language === 'Bengali' ? 'ডাটাবেস' : language === 'Tamil' ? 'தரவுத்தளம்' : language === 'Telugu' ? 'డేటాబేస్' : language === 'Marathi' ? 'डेटाबेस' : 'Database'}
          </NavLink>
          {/* Settings Link */}
          <NavLink
            to="/home/settings"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
          >
            {language === 'English' ? 'Settings' : language === 'Hindi' ? 'सेटिंग्स' : language === 'Bengali' ? 'সেটিংস' : language === 'Tamil' ? 'அமைப்புகள்' : language === 'Telugu' ? 'సెట్టింగ్‌లు' : language === 'Marathi' ? 'सेटिंग्ज' : 'Settings'}
          </NavLink>

          {/* Conditional Rendering of Avatar or Login */}
          <NavLink
            to="/home/login"
            className={classNames(
              'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
              { 'active': isLoggedIn }
            )}
          >
            {isLoggedIn ? (
              <img
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png"
                alt="User Profile"
                className="user-avatar rounded-full w-8 h-8 object-cover"
              />
            ) : (
              // Display Login text based on selected language
              language === 'English' ? 'Login' :
              language === 'Hindi' ? 'लॉगिन' :
              language === 'Bengali' ? 'লগইন' :
              language === 'Tamil' ? 'உள்நுழைவு' :
              language === 'Telugu' ? 'లాగిన్' :
              language === 'Marathi' ? 'लॉगिन' :
              'Login' // Default to English if no match
            )}
          </NavLink>

        </div>
      </nav>
    </motion.nav>
  );
};

export default Sidebar;
