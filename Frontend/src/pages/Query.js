import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaMicrophone } from 'react-icons/fa';

const Query = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Response will appear here...');
  const [isListening, setIsListening] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleDescription = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setQuery((prevQuery) => prevQuery + ' ' + spokenText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://sih-backend-881i.onrender.com/encode/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      console.error('Error fetching the response:', err);
      setError('Error occurred while fetching the response');
      setResponse('');
    }

    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  const renderResponse = (data) => {
    if (!data) {
      return <p>No data available</p>;
    }

    if (typeof data === 'object' && typeof data.acts === 'object') {
      return (
        <div>
          <h3>Act: IPC</h3>
          <div>
            {Object.entries(data.acts).map(([section, description], index) => (
              <div key={index} style={styles.sectionContainer}>
                <p>Section {section}</p>
                <button
                  onClick={() => toggleDescription(section)}
                  style={styles.linkButton}
                >
                  {activeSection === section ? 'Hide Description' : 'Show Description'}
                </button>
                {activeSection === section && <p style={styles.descriptionText}>{description}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <div style={styles.pageContainer}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.responseBox}>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={styles.errorText}>{error}</p>
          ) : (
            renderResponse(response)
          )}
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your query here..."
            style={styles.input}
          />
          <button onClick={handleMicClick} style={styles.micButton}>
  <FaMicrophone style={{ color: isListening ? 'blue' : 'black', fontSize: '24px' }} />
</button>
        </div>

        <button onClick={handleQuerySubmit} style={styles.submitButton}>
          Submit Query
        </button>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  responseBox: {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  errorText: {
    color: 'red',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    fontSize: '16px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  micButton: {
    marginLeft: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  submitButton: {
    margin: '0 auto',
    display: 'block',
    padding: '15px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  sectionContainer: {
    marginBottom: '16px',
  },
  linkButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  descriptionText: {
    marginTop: '10px',
    color: '#333',
  },
};

export default Query;
