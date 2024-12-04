import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const Database = () => {
  const [cases, setCases] = useState([]); // Ensure initial state is an empty array
  const [activeCase, setActiveCase] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Fetch data from the endpoint
  useEffect(() => {
    fetch('https://sih-backend-seven.vercel.app/case_list/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data); // Check the structure
        setCases(data.cases || []); // Update state with cases array
      })
      .catch((error) => {
        console.error('Error fetching cases:', error);
        setCases([]); // Fallback to empty array
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      case 'under-investigation':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const openCaseDetailsModal = (srNo) => {
    setActiveCase(srNo);
  };

  const closeCaseDetailsModal = () => {
    setActiveCase(null);
  };
  const extractRelevantText = (text) => {
    // Regular expression to match text between * or **, and "Section" pattern
    const regex = /(\*{1,2})(.*?)\1/g;
    let matches = [];
    let match;

    // Find all matches and push them into the matches array
    while ((match = regex.exec(text)) !== null) {
        matches.push(match[2]); // match[2] contains the text between asterisks
    }

    // Now format the extracted text based on whether it contains "Section"
    return matches.map((item, index) => {
        // Check if the item contains a number and format accordingly
        const containsNumber = /\d/.test(item); // Check for numbers

        // Check if the item starts with "Section"
        if (item.startsWith('Section')) {
            return <strong key={index}>{item}</strong>; // If it's a section, emphasize it
        } else {
            // If it contains a number, display it on the next line
            return containsNumber ? (
                <div key={index}>
                    <span>{item}</span>
                    <br /> {/* Add a line break after items with numbers */}
                </div>
            ) : (
                <span key={index}>{item}</span> // Otherwise, display it normally
            );
        }
    });
};

  
  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow p-8 bg-gray-50">
        <h2 className="database-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Case Database
        </h2>

        {cases.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-600">No cases available</p>
        ) : (
          <div className="case-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="case-card bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="case-header flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-blue-900">{caseItem.caseHeading}</h3>
                  <span
                    className={`status-badge inline-block py-1 px-4 rounded-full text-white text-sm font-medium ${getStatusColor(
                      caseItem.status
                    )}`}
                  >
                    {caseItem.status}
                  </span>
                </div>
                <p className="text-md font-semibold text-darkBlue-800 mt-2">{caseItem.query}</p>
               
                <p className="text-sm text-red-600 mt-2">
                  <strong>Tags:</strong> {caseItem.tags}
                </p>
                <button
                  onClick={() => openCaseDetailsModal(caseItem.id)}
                  className="mt-4 text-blue-600 hover:underline font-semibold"
                >
                  Show Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <span className="material-icons text-lg">arrow_upward</span>
        </button>
      )}

      {activeCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal bg-white w-10/12 md:w-7/12 h-3/4 p-6 rounded-lg overflow-auto shadow-lg relative">
            <button
              onClick={closeCaseDetailsModal}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times;
            </button>
            {cases
              .filter((caseItem) => caseItem.id === activeCase)
              .map((caseItem) => (
                <div key={caseItem.id} className="space-y-6">
                  <h3 className="text-3xl font-semibold text-blue-900 border-b pb-2">
                    {caseItem.caseHeading}
                  </h3>
                  <p className="text-lg font-medium text-black-500">
                    <span className="font-semibold">Query:</span> {caseItem.query}
                  </p>
                  <p className="text-lg font-medium text-black-500">
                    <span className="font-semibold"><b>Applicable Articles:</b></span>{' '}
                    <br></br>
                    <span
        className="block overflow-y-auto max-h-30"
        style={{ whiteSpace: 'normal' }}
      >
        {extractRelevantText(caseItem.applicableArticle)}
      </span>
                  </p>
                  <p className="text-lg font-medium text-red-700">
                    <span className="font-semibold">Tags:</span> {caseItem.tags}
                  </p>
                  <div
                    className="case-description text-sm text-gray-800 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                    style={{ maxHeight: '300px', overflowY: 'auto' }}
                  >
                    <strong className="block font-semibold text-gray-700 mb-2">Description:</strong>
                    <p>{caseItem.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;
