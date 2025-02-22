import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import './component-styles/Sidebar.css';
import img from '../images/MOE.png';
import img1 from '../images/indian-emblem.png';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [language, setLanguage] = useState('English');
  const [professionalMode, setProfessionalMode] = useState(false); // For Professional Mode

  useEffect(() => {
    // Initial Load from localStorage
    const storedLanguage = localStorage.getItem('language');
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    const storedProfessionalMode = JSON.parse(localStorage.getItem('professionalMode'));

    if (storedLanguage) setLanguage(storedLanguage);
    if (storedName && storedBadgeNumber) {
      setName(storedName);
      setBadgeNumber(storedBadgeNumber);
      setIsLoggedIn(true);
    }
    if (storedProfessionalMode !== null) setProfessionalMode(storedProfessionalMode);

    // Listen to localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'professionalMode') {
        setProfessionalMode(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Language change handler
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <motion.nav className="sidebar-nav">
      <div className="sidebar-content bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 text-white py-4 shadow-lg">
        {/* Logo and Title */}
        <div className="container mx-auto px-6 flex justify-between items-center py-2">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <img src={img1} alt="Emblem of India" className="h-14" />
            <div className="text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                <NavLink to="/">LawAI</NavLink>
              </h1>
              <p className="text-xs sm:text-sm text-gray-200">
                Enforcing Law & Justice for Government of India
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <img src={img} alt="MOE" className="h-12" />

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
              onChange={handleLanguageChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebarrr-nav bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm py-4 shadow-md sticky top-0 z-50">
        <div className="sidebar-contentcontainer mx-auto px-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-10">

          {/* AI Lawyer Link */}
          <NavLink
            to="/query"
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive }
              )
            }
          >
            {language === 'English' ? 'AI Lawyer' :
              language === 'Hindi' ? 'एआई वकील' :
                language === 'Bengali' ? 'এআই আইনজীবী' :
                  language === 'Tamil' ? 'ஏ.ஐ. வழக்குரைஞர்' :
                    language === 'Telugu' ? 'ఏ.ఐ. న్యాయవాది' :
                      language === 'Marathi' ? 'ए.आय. वकील' :
                        'AI Lawyer'}
          </NavLink>

          {/* Bare Acts Link */}
          <NavLink
            to="/bareacts"
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive }
              )
            }
          >
            {language === 'English' ? 'Bare Acts' :
              language === 'Hindi' ? 'नंगे कृत्य' :
                language === 'Bengali' ? 'নগ্ন আইন' :
                  language === 'Tamil' ? 'மரபுவழி சட்டங்கள்' :
                    language === 'Telugu' ? 'నగ్న చట్టాలు' :
                      language === 'Marathi' ? 'नग्न कायदे' :
                        'Bare Acts'}
          </NavLink>

          {/* Database Link - Conditionally Clickable */}
          <NavLink
            to={professionalMode ? "/database" : "#"}
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive },
                { 'opacity-50 cursor-not-allowed': !professionalMode }
              )
            }
            onClick={(e) => !professionalMode && e.preventDefault()}
          >
            {language === 'English' ? 'Database' :
              language === 'Hindi' ? 'डेटाबेस' :
                language === 'Bengali' ? 'ডাটাবেস' :
                  language === 'Tamil' ? 'தரவுத்தளம்' :
                    language === 'Telugu' ? 'డేటాబేస్' :
                      language === 'Marathi' ? 'डेटाबेस' :
                        'Database'}
          </NavLink>

          {/* FIR Builder Link - Conditionally Clickable */}
          <NavLink
            to={professionalMode ? "/fir" : "#"}
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive },
                { 'opacity-50 cursor-not-allowed': !professionalMode }
              )
            }
            onClick={(e) => !professionalMode && e.preventDefault()}
          >
            {language === 'English' ? 'FIR Builder' :
              language === 'Hindi' ? 'एफआईआर निर्माता' :
                language === 'Bengali' ? 'এফআইআর নির্মাতা' :
                  language === 'Tamil' ? 'ஃபைருக்கான கட்டுமானம்' :
                    language === 'Telugu' ? 'ఎఫ్ఐఆర్ నిర్మాణం' :
                      language === 'Marathi' ? 'एफआयआर बिल्डर' :
                        'FIR Builder'}
          </NavLink>

          {/* Settings Link */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive }
              )
            }
          >
            {language === 'English' ? 'Settings' :
              language === 'Hindi' ? 'सेटिंग्स' :
                language === 'Bengali' ? 'সেটিংস' :
                  language === 'Tamil' ? 'அமைப்புகள்' :
                    language === 'Telugu' ? 'సెట్టింగ్‌లు' :
                      language === 'Marathi' ? 'सेटिंग्ज' :
                        'Settings'}
          </NavLink>

          {/* Conditional Avatar or Login */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              classNames(
                'text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200',
                { 'text-yellow-300': isActive }
              )
            }
          >
            {isLoggedIn ? (
              <img
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png"
                alt="User Profile"
                className="user-avatar rounded-full w-8 h-8 object-cover"
              />
            ) : (
              language === 'English' ? 'Login' :
                language === 'Hindi' ? 'लॉगिन' :
                  language === 'Bengali' ? 'লগইন' :
                    language === 'Tamil' ? 'உள்நுழைவு' :
                      language === 'Telugu' ? 'లాగిన్' :
                        language === 'Marathi' ? 'लॉगिन' :
                          'Login'
            )}
          </NavLink>

        </div>
      </nav>
    </motion.nav>
  );
};

export default Sidebar;
