import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const Database = () => {
  const [cases, setCases] = useState([]);
  const [activeCase, setActiveCase] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaseData, setEditedCaseData] = useState({}); // To track edited case data

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
        setCases(data.cases || []);
      })
      .catch((error) => {
        console.error('Error fetching cases:', error);
        setCases([]);
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
    const caseItem = cases.find((caseItem) => caseItem.id === srNo);
    setActiveCase(caseItem);
    setEditedCaseData(caseItem); // Pre-populate the form with case data
    setIsEditing(false); // Default to view mode
  };

  const closeCaseDetailsModal = () => {
    setActiveCase(null);
    setIsEditing(false); // Reset editing state
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = () => {
    const updatedCases = cases.map((caseItem) =>
      caseItem.id === activeCase.id
        ? {
            ...caseItem,
            caseHeading: editedCaseData.caseHeading,
            query: editedCaseData.query,
            applicableArticle: editedCaseData.applicableArticle,
            description: editedCaseData.description,
            status: editedCaseData.status,
          }
        : caseItem
    );

    setCases(updatedCases);
    setActiveCase(null); // Close modal after saving changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const extractRelevantText = (text) => {
    const regex = /(\*{1,2})(.*?)\1/g;
    let matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      matches.push(match[2]);
    }

    return matches.map((item, index) => {
      const containsNumber = /\d/.test(item);
      return containsNumber ? (
        <div key={index}>
          <span>{item}</span>
          <br />
        </div>
      ) : (
        <span key={index}>{item}</span>
      );
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
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openCaseDetailsModal(caseItem.id)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Show Details
                  </button>
                  <button
                    onClick={() => {
                      openCaseDetailsModal(caseItem.id);
                      setIsEditing(true); // Open in edit mode
                    }}
                    className="text-yellow-500 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
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
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-blue-900 border-b pb-2">
                {isEditing ? (
                  <input
                    name="caseHeading"
                    type="text"
                    value={editedCaseData.caseHeading || ''}
                    onChange={handleInputChange}
                    className="text-3xl font-semibold text-blue-900 w-full bg-transparent border-none"
                  />
                ) : (
                  activeCase.caseHeading
                )}
              </h3>
              <p className="text-lg font-medium text-black-500">
                <span className="font-semibold">Query:</span>{' '}
                {isEditing ? (
                  <textarea
                    name="query"
                    value={editedCaseData.query || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    rows="3"
                  />
                ) : (
                  activeCase.query
                )}
              </p>
              <div>
                <span className="font-semibold">Applicable Articles:</span>
                {isEditing ? (
                  <input
                    name="applicableArticle"
                    value={editedCaseData.applicableArticle || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                ) : (
                  activeCase.applicableArticle
                )}
              </div>
              <div>
                <span className="font-semibold">Tags:</span>
                <p>{extractRelevantText(activeCase.tags)}</p>
              </div>
              <div>
                <span className="font-semibold">Description:</span>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedCaseData.description || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    rows="4"
                  />
                ) : (
                  activeCase.description
                )}
              </div>
              <div>
                <span className="font-semibold">Status:</span>
                {isEditing ? (
                  <select
                    name="status"
                    value={editedCaseData.status || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded-md"
                  >
                    <option value="assigned">Assigned</option>
                    <option value="under-investigation">Under Investigation</option>
                    <option value="closed">Closed</option>
                  </select>
                ) : (
                  activeCase.status
                )}
              </div>
              {isEditing && (
                <div className="mt-4">
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;
