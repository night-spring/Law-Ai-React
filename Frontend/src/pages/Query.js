import React, { useState, useEffect, useMemo } from 'react';
import { FaMicrophone, FaInfoCircle, FaArrowUp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Menubar from '../components/MenuBar';
import axios from 'axios';
import Footer from '../components/Footer';
import '../styles/Query.css';

const Query = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(
    `<h2 class="text-xl font-semibold mb-4">Detailed Section</h2>
     <div>This Section will display a detailed Description of What Acts are applicable in the FIR query you entered.</div>`
  );

  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActType, setSelectedActType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
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
  const translateResponse = (text, language) => {
    switch (language) {
      case 'English':
        return text;
      case 'Hindi':
        return 'उत्तर: ' + text; // Example of a Hindi translation
      case 'Bengali':
        return 'উত্তর: ' + text; // Example of a Bengali translation
      case 'Tamil':
        return 'பதில்: ' + text; // Example of a Tamil translation
      case 'Telugu':
        return 'ప్రతిస్పందన: ' + text; // Example of a Telugu translation
      case 'Marathi':
        return 'उत्तर: ' + text; // Example of a Marathi translation
      default:
        return text; // Default to English if language is not recognized
    }
  };
  const handleSearch = async (e, act, query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://sih-backend-881i.onrender.com/search/",
        {
          query, // Use the dynamically passed query value
          act,   // Use the dynamically passed act value
        },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set Content-Type header
          },
        }
      );

      // Directly set the response data
      setSearchResults(response.data); // Save the entire response object
    } catch (err) {
      setError("An error occurred while fetching results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (loading) {
      return <div className="text-lg text-gray-500">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500 font-semibold">{error}</div>;
    }

    // If no data is returned
    if (!searchResults || Object.keys(searchResults).length === 0) {
      return (
        <div>
          <h3 className="text-xl font-semibold mb-2">Summary Section</h3>
          <div className="text-gray-600">This Section will display all the Summary of the Acts and the Sections applicable for your requested query. Details will appear on clicking each of the section buttons.</div>
        </div>
      );
    }

    const { section, title, description } = searchResults.data;

    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results:</h3>

        {/* Display section */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Section:</span>
          <div className="text-lg text-blue-600">{section}</div>
        </div>

        {/* Display title */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Title:</span>
          <div className="text-lg font-medium text-gray-800">{title}</div>
        </div>

        {/* Display description */}
        <div>
          <span className="text-sm font-semibold text-gray-500">Description:</span>
          <div
            className="bg-gray-100 p-4 rounded-lg text-gray-700"
            style={{ whiteSpace: 'pre-wrap' }} // Preserve newlines in description
          >
            {description}
          </div>
        </div>
      </div>
    );
  };






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
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    setLanguage(storedLanguage);
  }, [localStorage.getItem('language')]);
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

    const fullQuery = `${query}. You are an AI assistant with in-depth expertise in the Indian Constitution, criminal law, and all relevant acts, sections, and legal provisions. Your role is to support law enforcement officers in the process of filing a First Information Report (FIR) by identifying and listing all applicable laws, including relevant acts, sections, and provisions. For each act or section, provide a concise yet comprehensive explanation of its significance, its direct relevance to the case, and how it should be applied in the context of the incident. Ensure that no pertinent legal provision is overlooked, and that the officer is equipped with a thorough understanding of the laws involved, enabling them to file a complete and legally sound FIR.`;

    try {
      const response = await fetch('https://chatbot-for-fir-backend.vercel.app/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: fullQuery }),
      });

      const data = await response.json();

      // Translate the response based on the selected language
      const translatedResponse = translateResponse(data.response || 'No response received', language);

      // Parse response into relevant fields
      setCaseData({
        query,
        caseHeading: data.caseHeading || 'Untitled Case',
        applicableArticles: translatedResponse || 'No applicable articles',
        tags: [],
      });

      // Set the translated response (already translated)
      setResponse(translatedResponse);
      setShowPopup(true); // Show popup
    } catch (error) {
      console.error('Error fetching the response:', error);
      setError('Error occurred while fetching the response');
      setResponse('');
    }

    setIsLoading(false);
    setQuery('');
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

  const handleAddTag = (tag) => {
    if (!caseData.tags.includes(tag)) {
      setCaseData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
    }
  };

  const handleToggleTag = (tag) => {
    setCaseData((prevData) => ({
      ...prevData,
      tags: prevData.tags.includes(tag)
        ? prevData.tags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevData.tags, tag], // Add tag if not selected
    }));
  };

  const handleRemoveTag = (index) => {
    setCaseData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSaveCase = async () => {
    const endpoint = 'https://sih-backend-881i.onrender.com/case_save/'; // Replace with your actual endpoint
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
        <h2 className="query-page-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-4">
          Ask a Query
        </h2>
  
        {/* How it Works Modal */}
        <HowItWorksModal />
        <div className="flex flex-col w-full mt-8 relative">
  {isLoading && (
    <div className="absolute inset-0 bg-white flex justify-center items-center z-[9999] rounded-lg">
      <div className="spinner mb-4"></div>
      <p className="loading-message text-lg text-black">Processing your query, please wait...</p>
    </div>
  )}

  {/* Top Section */}
  <div
    className="query-response-box bg-white p-8 rounded-lg shadow-md border border-gray-300 mb-4"
    style={{
      minHeight: '200px',
      width: '100%', // Full width for the top section
    }}
  >
    <pre
      className="text-gray-800 font-medium leading-relaxed break-words whitespace-pre-wrap"
      style={{
        fontFamily: '"Arial", sans-serif',
        fontSize: '1.1rem',
        lineHeight: '1.6',
      }}
    >
      {(() => {
        if (!response) {
          return (
            <>
              <h2
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: '"Arial", sans-serif',
                  color: '#333',
                }}
              >
                Summary Section will appear here
              </h2>
              <p
                className="text-sm text-gray-700"
                style={{
                  fontFamily: '"Arial", sans-serif',
                  lineHeight: '1.4',
                }}
              >
                This section will list all the acts and sections applicable. Details will appear on clicking each of the section buttons.
              </p>
            </>
          );
        }
        const regex = /\d+/g;
        let matches = [];
        let match;

        while ((match = regex.exec(response || "")) !== null) {
          matches.push(match[0]);
        }
        let lastAct = null;
        let result = [];
        let queries = [];
        const actNames = {
          1860: 'ipc',
          1973: 'crpc',
          1989: 'bns',
          1955: 'iea',
          1908: 'cpc',
          1988: 'mva',
        };
        matches.forEach((num) => {
          num = num.trim();

          if (num.length === 4) {
            if (lastAct) {
              if (queries.length === 0) {
                result.push({ act: lastAct, query: null });
              } else {
                queries.forEach((query) => {
                  result.push({ act: lastAct, query });
                });
              }
            }
            lastAct = num;
            queries = [];
          } else if (num.length === 3) {
            queries.push(num);
          }
        });

        if (lastAct) {
          if (queries.length === 0) {
            result.push({ act: lastAct, query: null });
          } else {
            queries.forEach((query) => {
              result.push({ act: lastAct, query });
            });
          }
        }

        const renderButtons = result.map((item, index) => {
          const actName = actNames[item.act];
          if (!actName) return null;

          return (
            <button
              key={index}
              onClick={(e) => handleSearch(e, actName, item.query)}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition duration-200 mb-1"
            >
              {`ACT : ${actName.toUpperCase()}, SECTION :${item.query ? ` ${item.query}` : ""}`}
            </button>
          );
        });

        return (
          <>
            <div className="flex flex-wrap gap-2">{renderButtons}</div>

            <div className="mt-4">
              <button onClick={(e) => handleSearch(e)}></button>
              {renderSearchResults()}
            </div>
          </>
        );
      })()}
    </pre>
  </div>

  {/* Bottom Section */}
  <div
    className={`query-response-box bg-white p-8 rounded-lg shadow-md border border-gray-300 transition-all duration-500`}
    style={{
      minHeight: '200px',
      width: '100%', // Full width for the bottom section
    }}
  >
    {isLoading ? (
      <div className="flex flex-col justify-center items-center min-h-full">
        <div className="spinner mb-4"></div>
        <p className="loading-message text-lg text-gray-700">Processing your query, please wait...</p>
      </div>
    ) : error ? (
      <p className="error-message text-lg text-red-600">{error}</p>
    ) : (
      <pre
  dangerouslySetInnerHTML={{
    __html: (response || "Detailed description of the laws and the sections applicable to the entered case will appear here.")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace **text** with <strong>text</strong>
      .replace(/\*(.*?)\*/g, '<ul style="padding-left: 20px; list-style-type: disc;"><li>$1</li></ul>') // Replace *text* with a bullet point
  }}
  className="text-gray-800 font-medium leading-relaxed break-words whitespace-pre-wrap"
  style={{
    fontFamily: '"Arial", sans-serif',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  }}
></pre>

    )}
  </div>
</div>

  

        {/*Query Submit Section*/}
        <form
          onSubmit={handleQuerySubmit}
          className="query-input-container max-w-8xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-300 mt-8 mb-8"
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

        {/*Case Add to Database Popup*/}
        {showPopup && (
          <div
            className="popup-alert fixed top-36 margin-top-20 right-5 bg-blue-50 border-l-4 border-blue-600 text-blue-800 p-6 rounded-lg shadow-xl cursor-pointer max-w-xs min-w-[250px] min-h-[80px] z-[10000]"
            onClick={toggleModal}
            role="alert"
            aria-live="assertive"
            aria-labelledby="popup-alert-message"
          >
            <span id="popup-alert-message" className="font-semibold text-lg">
              New case identified! Click to review.
            </span>
          </div>
        )}
        {isModalOpen && (
          <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)} // Close modal when clicked
                className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-4xl font-bold transition duration-200"
                aria-label="Close modal"
              >
                &times; {/* Cross symbol */}
              </button>
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
                  <div className="tags-options mt-2 flex flex-wrap gap-2">
                    {['Theft', 'Domestic violence', 'Cyber crime', 'Assault/Rape', 'Missing'].map((tag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`tag-bubble ${caseData.tags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-600'
                          } px-3 py-1 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition duration-200`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Cancel and Save buttons */}
              <div className="modal-footer mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleSaveCase}
                  className="save-case-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Save Case
                </button>
              </div>
            </div>
          </div>
        )}
        {showScrollTop && (
          <div
            className="scroll-to-top-btn fixed bottom-4 right-4 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-white"
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
