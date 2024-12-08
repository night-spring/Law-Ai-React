import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-4 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">

          {/* Logo and copyright section */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold text-yellow-400 mb-1">
              <Link to="/" className="hover:underline">
                LawAI - Government of India
              </Link>
            </p>
            <p className="text-sm">
              &copy; 2024 <Link to="/team" className="text-yellow-300 hover:text-yellow-500 transition-colors">CODE-A-COLA</Link>. All rights reserved.
            </p>
          </div>

          {/* Footer Navigation Links */}
          <nav className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 text-xs">
            <Link to="/privacypolicy" className="hover:text-yellow-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-300 transition-colors">Terms & Conditions</Link>
            <Link to="/accessibility" className="hover:text-yellow-300 transition-colors">Accessibility</Link>
          </nav>

        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-4 text-xs text-gray-400">
          <p>Made with ❤️ by <Link to="/team" className="text-yellow-300 hover:text-yellow-500 transition-colors">CODE-A-COLA</Link> for a smarter tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
