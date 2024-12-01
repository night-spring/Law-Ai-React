import React, { useState, useEffect, useMemo } from 'react';
import { FaMicrophone, FaInfoCircle, FaArrowUp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Menubar from '../components/MenuBar'; // Import Menubar
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

  // Web Speech API initialization
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = useMemo(() => {
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = 'en-US';
    return recog;
  }, [SpeechRecognition]);

  // Check if the screen is mobile on initial load and on window resize
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
      console.error("Speech recognition error:", event.error);
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
      const response = await fetch('http://127.0.0.1:8000/ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      const data = await response.json();
      setResponse(parseMarkdownToHTML(data.response || 'No response received'));
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
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="query-page-container">
      {isMobile ? <Menubar /> : <Sidebar />}

      <div className="query-page-main-content bg-gradient-to-r from-gray-100 to-white p-8 rounded-xl shadow-lg min-h-[70vh]">
        <h2 className="query-page-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Ask a Query
        </h2>

        <div className="text-center mb-4">
          <button
            onClick={toggleModal}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <FaInfoCircle className="inline mr-2" />
            How It Works
          </button>
        </div>

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

        <form onSubmit={handleQuerySubmit} className="query-input-container max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-300">
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
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn bg-blue-600 text-white p-3 rounded-full fixed bottom-10 right-10 hover:bg-blue-700 transition duration-200"
        >
          <FaArrowUp />
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="modal-title text-2xl font-semibold mb-4">How It Works</h3>
            <p className="modal-description text-gray-700 mb-4">
              Enter a query, and the AI assistant will provide a list of relevant laws and sections related to FIR filing.
            </p>
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Query;
