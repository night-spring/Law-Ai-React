import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import { FaUserShield, FaLock, FaRegUser, FaUserAlt, FaSignOutAlt, FaHistory, FaBriefcase, FaUserGraduate } from 'react-icons/fa';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(15);
  const [highContrast, setHighContrast] = useState(false);
  const [professionalMode, setProfessionalMode] = useState(() => JSON.parse(localStorage.getItem('professionalMode')) || false);
  const [studentMode, setStudentMode] = useState(() => JSON.parse(localStorage.getItem('studentMode')) || false);
  const [activityLog, setActivityLog] = useState([
    { action: 'Login', time: '2024-11-25 10:30 AM' },
    { action: 'Changed Password', time: '2024-11-20 02:00 PM' },
    { action: 'Enabled 2FA', time: '2024-11-18 08:45 AM' },
    { action: 'Logged Out', time: '2024-11-17 04:10 PM' }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('professionalMode', JSON.stringify(professionalMode));
  }, [professionalMode]);

  useEffect(() => {
    localStorage.setItem('studentMode', JSON.stringify(studentMode));
  }, [studentMode]);

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handle2FAChange = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleHighContrastChange = () => {
    setHighContrast(!highContrast);
  };

  const handleSessionTimeoutChange = (e) => {
    setSessionTimeout(e.target.value);
  };

  const handleProfessionalModeChange = () => {
    if (!professionalMode) setStudentMode(false);
    setProfessionalMode(!professionalMode);
  };

  const handleStudentModeChange = () => {
    if (!studentMode) setProfessionalMode(false);
    setStudentMode(!studentMode);
  };

  return (
    <div className="settings-container min-h-screen flex flex-col bg-gray-50">
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow p-8">
        <h2 className="settings-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Settings
        </h2>
        <p className="settings-description text-lg text-gray-600 mb-12 text-center">
          Customize your privacy, security, and accessibility settings.
        </p>
        
        <div className="settings-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaBriefcase className="text-2xl text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-800">Professional Mode</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Enable professional mode for a more business-oriented interface.
            </p>
            <label className="setting-label flex items-center space-x-3">
              <input
                type="checkbox"
                checked={professionalMode}
                onChange={handleProfessionalModeChange}
                className="setting-checkbox rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Enable Professional Mode</span>
            </label>
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaUserGraduate className="text-2xl text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Student Mode</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Enable student mode for an education-focused experience.
            </p>
            <label className="setting-label flex items-center space-x-3">
              <input
                type="checkbox"
                checked={studentMode}
                onChange={handleStudentModeChange}
                className="setting-checkbox rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Enable Student Mode</span>
            </label>
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaRegUser className="text-2xl text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Manage your account details such as profile and email address.
            </p>
            <div className="setting-action">
              <button className="btn btn-primary w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaUserShield className="text-2xl text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Control your data sharing preferences and visibility settings.
            </p>
            <div className="setting-action">
              <button className="btn btn-primary w-full py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                Manage Privacy
              </button>
            </div>
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaLock className="text-2xl text-red-600" />
              <h3 className="text-xl font-semibold text-gray-800">Two-Factor Authentication</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Enable 2FA for additional security on your account.
            </p>
            <label className="setting-label flex items-center space-x-3">
              <input
                type="checkbox"
                checked={is2FAEnabled}
                onChange={handle2FAChange}
                className="setting-checkbox rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Enable Two-Factor Authentication</span>
            </label>
            {is2FAEnabled ? (
              <p className="text-green-600 text-sm mt-4">Two-Factor Authentication is enabled. Your account is more secure.</p>
            ) : (
              <p className="text-red-600 text-sm mt-4">Two-Factor Authentication is disabled. Your account is less secure.</p>
            )}
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaSignOutAlt className="text-2xl text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-800">Session Timeout</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Set an automatic session timeout for enhanced security.
            </p>
            <input
              type="number"
              value={sessionTimeout}
              onChange={handleSessionTimeoutChange}
              min="5"
              max="60"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              aria-label="Set session timeout in minutes"
            />
            <p className="text-gray-500 text-sm mt-2">Timeout after {sessionTimeout} minutes of inactivity.</p>
          </div>

          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaUserAlt className="text-2xl text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Accessibility</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Adjust text size or enable high contrast for better readability.
            </p>
            <label className="setting-label flex items-center space-x-3">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={handleHighContrastChange}
                className="setting-checkbox rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Enable High Contrast Mode</span>
            </label>
          </div>

        
          <div className="setting-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <FaHistory className="text-2xl text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-800">Activity Log</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Review your recent account activities for transparency.
            </p>
            <div className="activity-log">
              <ul className="space-y-2">
                {activityLog.map((log, index) => (
                  <li key={index} className="text-gray-600 text-sm">
                    <strong>{log.action}</strong> at {log.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
