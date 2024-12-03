import React, { useContext, useEffect, useState } from 'react'; 
import Sidebar from '../components/Sidebar'; 
import MenuBar from '../components/MenuBar'; // Import MenuBar component for mobile
import Footer from '../components/Footer';

const Database = () => {

  // State to store cases
  const [cases, setCases] = useState([]);
  const [activeCase, setActiveCase] = useState(null);  // State to store the active case for displaying details

  // State to track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Scroll button visibility state
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Dummy data to fallback on in case of an error
  const dummyData = [
    {
      srNo: 1,
      query: "What is the status of the case?",
      caseHeading: "Case Heading 1",
      applicableArticles: "Article 1, Article 2",
      tags: ["urgent", "pending"],
      status: "under-investigation",
      description: "Description of the case with detailed information. The content is long enough to demonstrate the scroll bar functionality. It includes several aspects of the case that are currently being investigated. The case involves multiple parties and requires thorough examination of legal documentation."
    },
    {
      srNo: 2,
      query: "Has the case been resolved?",
      caseHeading: "Case Heading 2",
      applicableArticles: "Article 3, Article 4",
      tags: ["resolved"],
      status: "closed",
      description: "Description of the case. Here we have some details that could be long enough for scrolling. The case has been closed after a thorough investigation and all parties have been notified of the final decision. No further action is expected unless new evidence emerges."
    },
    {
      srNo: 3,
      query: "What steps are being taken to investigate the case?",
      caseHeading: "Case Heading 3",
      applicableArticles: "Article 5, Article 6",
      tags: ["investigating", "high-priority"],
      status: "under-investigation",
      description: "The investigation is ongoing, and various agencies are involved in gathering evidence and interviewing witnesses. Legal teams are preparing for potential court hearings. The process is expected to take several weeks due to the complexity of the case."
    },
    {
      srNo: 4,
      query: "When can the case be expected to close?",
      caseHeading: "Case Heading 4",
      applicableArticles: "Article 7, Article 8",
      tags: ["pending", "awaiting-evidence"],
      status: "under-investigation",
      description: "The timeline for closing the case is uncertain. Investigators are still awaiting key pieces of evidence that will be critical in determining the outcome. Once the necessary information is received, the case will be moved to the next phase."
    },
    {
      srNo: 5,
      query: "Has the defendant responded to the charges?",
      caseHeading: "Case Heading 5",
      applicableArticles: "Article 9, Article 10",
      tags: ["response-pending", "urgent"],
      status: "assigned",
      description: "The defendant has yet to provide an official response to the charges. Legal representatives are preparing their arguments and are expected to submit a formal statement within the next week. The case is currently in the early stages of legal proceedings."
    },
    {
      srNo: 6,
      query: "What are the consequences if the case is lost?",
      caseHeading: "Case Heading 6",
      applicableArticles: "Article 11, Article 12",
      tags: ["potential-outcome", "high-stakes"],
      status: "under-investigation",
      description: "The consequences of losing the case could include severe financial penalties and potential legal ramifications for the parties involved. The case is being treated with the utmost importance to avoid these potential outcomes. All parties are preparing for a lengthy legal battle."
    }
  ];

  // Effect to fetch data
  useEffect(() => {
    fetch('https://sih-backend-seven.vercel.app/case_list/') // The URL for fetching data
      .then((response) => response.json())
      .then((data) => {
        // If data is fetched successfully, update the state
        setCases(data);
      })
      .catch((error) => {
        console.error('Error fetching cases:', error);
        // If there is an error, use the dummy data
        setCases(dummyData);
      });
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

  const openCaseDetailsModal = (srNo) => {
    setActiveCase(srNo); // Set active case to open the modal
  };

  const closeCaseDetailsModal = () => {
    setActiveCase(null); // Close the modal
  };

  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {/* Render Sidebar or MenuBar based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow p-8 bg-gray-50">
        <h2 className="database-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Case Database
        </h2>

        <div className="case-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
  <div
    key={caseItem.srNo}
    className="case-card bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
  >
    <div className="case-header flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-blue-900 ">{caseItem.caseHeading}</h3>
      <span
        className={`status-badge inline-block py-1 px-4 rounded-full text-white text-sm font-medium ${getStatusColor(
          caseItem.status
        )}`}
      >
        {caseItem.status}
      </span>
    </div>

    {/* Display caseHeading and tags initially */}
    <p className="text-md font-semibold text-darkBlue-800 mt-2">{caseItem.query}</p>
    <p className="text-md font-medium text-mediumBlue-600 mt-1">{caseItem.applicableArticles}</p>

    {/* Tags in red */}
    <p className="text-sm text-red-600 mt-2">
      <strong>Tags:</strong> {caseItem.tags.join(', ')}
    </p>

    {/* Button to open case details modal */}
    <button
      onClick={() => openCaseDetailsModal(caseItem.srNo)}
      className="mt-4 text-blue-600 hover:underline font-semibold"
    >
      Show Details
    </button>
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

      {/* Modal for showing case details */}
      {activeCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal bg-white w-10/12 md:w-7/12 h-3/4 p-6 rounded-lg overflow-auto shadow-lg relative">
            <button
              onClick={closeCaseDetailsModal}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times;
            </button>

            {/* Display all case details inside the modal */}
            {cases
            .filter((caseItem) => caseItem.srNo === activeCase)
            .map((caseItem) => (
              <div key={caseItem.srNo} className="space-y-6">
                {/* Case Heading */}
                <h3 className="text-3xl font-semibold text-blue-900 border-b pb-2">{caseItem.caseHeading}</h3>

                {/* Query */}
                <p className="text-lg font-medium text-black-500">
                  <span className="font-semibold">Query:</span> {caseItem.query}
                </p>

                {/* Applicable Articles */}
                <p className="text-lg font-medium text-black-500">
                  <span className="font-semibold">Applicable Articles:</span> {caseItem.applicableArticles}
                </p>

                {/* Tags */}
                <p className="text-lg font-medium text-red-700">
                  <span className="font-semibold">Tags:</span> {caseItem.tags.join(', ')}
                </p>

                {/* Scrollable Description */}
                <div
                  className="case-description text-sm text-gray-800 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                  style={{
                    maxHeight: '300px', // Set a max height for scrolling
                    overflowY: 'auto',  // Enable vertical scrolling
                  }}
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
