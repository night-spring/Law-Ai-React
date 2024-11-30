import React, { useContext, useEffect, useState } from 'react'; 
import { ThemeContext } from '../ThemeContext'; 
import Sidebar from '../components/Sidebar'; 
import MenuBar from '../components/MenuBar'; // Import MenuBar component for mobile
import Footer from '../components/Footer';

const Database = () => {
  const { theme } = useContext(ThemeContext);

  // State to store cases
  const [cases, setCases] = useState([]);

  // State to track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Scroll button visibility state
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Effect to fetch data
  useEffect(() => {
    fetch('https://chatbot-for-fir-backend.vercel.app/api/server/cases')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  // Effect to update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    });
  };

  // Determine the background color based on the case status
  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-green-500'; // Green for Open
      case 'closed':
        return 'bg-red-500'; // Red for Closed
      case 'under-investigation':
        return 'bg-yellow-500'; // Yellow for Pending
      default:
        return 'bg-gray-500'; // Default case if status is undefined
    }
  };

  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {/* Render Sidebar or MenuBar based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow p-8 bg-gray-50">
        <h2 className="database-title text-center text-3xl font-semibold text-gray-800 mb-8 mt-4">
          Case Database
        </h2>

        <div className="case-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div
              key={caseItem.srNo}
              className="case-card bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="case-header flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Sr No: {caseItem.srNo}</h3>
                <span
                  className={`status-badge inline-block py-1 px-4 rounded-full text-white text-sm font-medium ${getStatusColor(
                    caseItem.status
                  )}`}
                >
                  {caseItem.status}
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <span className="material-icons text-lg">arrow_upward</span>
        </button>
      )}
    </div>
  );
};

export default Database;
