import React, { useState, useEffect, useMemo } from 'react';
import { FaMicrophone, FaInfoCircle, FaArrowUp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Menubar from '../components/MenuBar';
import Footer from '../components/Footer';
import '../styles/Query.css';

const Query = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Response will appear here...');
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [caseData, setCaseData] = useState({
    query: '',
    caseHeading: '',
    applicableArticles: '',
    tags: [],
    status: '', // New field for status
    description: '' // New field for description
  });
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useMemo(() => {
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = 'en-US';
    return recog;
  }, [SpeechRecognition]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, [recognition]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://sih-backend-seven.vercel.app/ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      const data = await response.json();

      // Parse response into relevant fields
      setCaseData({
        query,
        caseHeading: data.caseHeading || 'Untitled Case',
        applicableArticles: data.response || 'No applicable articles',
        tags: [],
      });

      setResponse(parseMarkdownToHTML(data.response || 'No response received'));
      setShowPopup(true); // Show popup
    } catch (error) {
      console.error('Error fetching the response:', error);
      setError('Error occurred while fetching the response');
      setResponse('');
    }

    setIsLoading(false);
    setQuery('');
  };

  const parseMarkdownToHTML = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setShowPopup(false); // Hide popup when modal is opened
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

 

  const handleAddTag = () => {
    if (tagInput.trim() && !caseData.tags.includes(tagInput.trim())) {
      setCaseData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()],
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (index) => {
    setCaseData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSaveCase = async () => {
    const endpoint = 'https://sih-backend-seven.vercel.app/case_save/'; // Replace with your actual endpoint
    const dataToSend = {
      caseHeading: caseData.caseHeading,
      applicableArticle: caseData.applicableArticles,
      tags: caseData.tags,
      query: caseData.query,
      status: caseData.status,
      description: caseData.description,
  };
  

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('Case saved successfully!');
        setIsModalOpen(false);  // Close modal after success
      } else {
        alert('Failed to save the case.');
      }
    } catch (error) {
      alert('Error saving the case:', error);
    }
  };

  // Modal component for "How It Works"
  const HowItWorksModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to toggle modal visibility
    const toggleVisibility = () => {
      setIsModalVisible(prevState => !prevState);
    };

    return (
      <div>
        {/* Button to toggle modal */}
        <div className="text-center mb-4">
          <button
            onClick={toggleVisibility}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <FaInfoCircle className="inline mr-2" />
            How It Works
          </button>
        </div>

        {/* Modal display */}
        {isModalVisible && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h3 className="modal-title text-3xl text-blue-600 font-semibold mb-4 text-center">
            How It Works
          </h3>

            <div className="modal-body text-center">
              <p className="text-lg">
                Type in any criminal incident and the model will try to determine the acts and sections applicable with the incident.
              </p>
            </div>
            <div className="modal-footer mt-4 flex justify-center">
              <button
                onClick={toggleVisibility}
                className="close-modal-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  }

  return (
    <div className="query-page-container">
      {isMobile ? <Menubar /> : <Sidebar />}

      <div className="query-page-main-content bg-gradient-to-r from-gray-100 to-white p-8 rounded-xl shadow-lg min-h-[70vh]">
        <h2 className="query-page-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Ask a Query
        </h2>

        {/* How it Works Modal */}
        <HowItWorksModal />

        <div className="query-response-box bg-light-gray p-8 rounded-lg shadow-md mb-10 w-full max-w-5xl mx-auto border border-gray-300">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <div className="spinner mb-4"></div>
              <p className="loading-message text-lg text-gray-700">Processing your query, please wait...</p>
            </div>
          ) : error ? (
            <p className="error-message text-lg text-red-600">{error}</p>
          ) : (
            <pre
              dangerouslySetInnerHTML={{ __html: response }}
              className="text-gray-800 font-medium leading-relaxed break-words whitespace-pre-wrap"
              style={{
                fontFamily: '"Arial", sans-serif',
                fontSize: '1.1rem',
                lineHeight: '1.6',
              }}
            ></pre>
          )}
        </div>

        <form
          onSubmit={handleQuerySubmit}
          className="query-input-container max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-300"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            <div className="query-input-box flex-grow md:mr-4">
              <input
                type="text"
                placeholder="Type your query here..."
                value={query}
                onChange={handleInputChange}
                className="query-text-input w-full p-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="query-mic-icon-container flex items-center justify-center md:mr-4">
              <FaMicrophone
                className={`query-mic-icon text-4xl cursor-pointer ${isListening ? 'text-green-500' : 'text-gray-500'}`}
                onClick={handleMicClick}
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
              />
            </div>

            <div className="query-submit-btn-container flex items-center justify-center md:ml-4">
              <button
                type="submit"
                className="submit-btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        {showPopup && (
          <div
            className="popup-alert fixed top-20 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={toggleModal}
          >
            New case identified! Click to review.
          </div>
        )}

{isModalOpen && (
      <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h3 className="modal-title text-2xl font-semibold mb-4">Add Case to Database</h3>

          <div className="modal-body max-h-60 overflow-y-auto border border-gray-300 p-4 rounded-lg">
            {/* Display Query Field */}
            <div className="mb-4">
              <label htmlFor="query" className="block text-gray-700 font-medium">
                User Query
              </label>
              <textarea
                id="query"
                value={caseData.query}
                onChange={(e) =>
                  setCaseData((prevData) => ({ ...prevData, query: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={3}
              />
            </div>

            {/* Display Case Heading */}
            <div className="mb-4">
              <label htmlFor="caseHeading" className="block text-gray-700 font-medium">
                Case Heading
              </label>
              <input
                type="text"
                id="caseHeading"
                value={caseData.caseHeading}
                onChange={(e) =>
                  setCaseData((prevData) => ({ ...prevData, caseHeading: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Display Applicable Articles */}
            <div className="mb-4">
              <label htmlFor="applicableArticles" className="block text-gray-700 font-medium">
                Applicable Articles
              </label>
              <textarea
                id="applicableArticles"
                value={caseData.applicableArticles}
                onChange={(e) =>
                  setCaseData((prevData) => ({ ...prevData, applicableArticles: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
              />
            </div>
{/* Status Field */}
<div className="mb-4">
  <label htmlFor="status" className="block text-gray-700 font-medium">
    Status
  </label>
  <select
    id="status"
    value={caseData.status}
    onChange={(e) =>
      setCaseData((prevData) => ({ ...prevData, status: e.target.value }))
    }
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
  >
    <option value="" disabled>Select Status</option>
    <option value="assigned">Assigned</option>
    <option value="closed">Closed</option>
    <option value="under-investigation">Under Investigation</option>
  </select>
</div>


{/* Description Field */}
<div className="mb-4">
  <label htmlFor="description" className="block text-gray-700 font-medium">
    Description
  </label>
  <textarea
    id="description"
    value={caseData.description}
    onChange={(e) =>
      setCaseData((prevData) => ({ ...prevData, description: e.target.value }))
    }
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    rows={4}
  />
</div>

            {/* Tags Section */}
            <div className="mb-4">
              <label htmlFor="tags" className="block text-gray-700 font-medium">
                Tags
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="add-tag-btn bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Add Tag
                </button>
              </div>
              <div className="tags-list mt-2 flex flex-wrap gap-2">
                {caseData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag-item bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="remove-tag-btn text-red-500 hover:text-red-700 transition duration-200"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer with Cancel and Save buttons */}
          <div className="modal-footer mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-modal-btn bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCase}
              className="save-case-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Case
            </button>
          </div>
        </div>
      </div>
    )
  }



        {showScrollTop && (
          <div
            className="scroll-to-top-btn fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
            onClick={scrollToTop}
          >
            <FaArrowUp />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Query;
