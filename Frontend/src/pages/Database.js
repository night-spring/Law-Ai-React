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
    fetch('https://sih-backend-881i.onrender.com/case_list/')
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
      [name]: value, // Always update the edited data with the current input value
    }));
    if (name === 'tags') {
      setEditedCaseData((prevData) => ({
        ...prevData,
        [name]: value, // Directly update the tags field
      }));
    } else {
      setEditedCaseData((prevData) => ({
        ...prevData,
        [name]: value, // Update other fields as usual
      }));
    }
  };
  const handleRemoveTag = (index) => {
    const updatedTags = editedCaseData.tags
      .replace(/[\[\]']+/g, '') // Clean up the tag string
      .split(',')
      .filter((_, i) => i !== index) // Remove the tag at the clicked index
      .join(','); // Join tags back into a string
    setEditedCaseData({ ...editedCaseData, tags: updatedTags }); // Update the state
  };
  
  const handleAddTag = () => {
    const newTag = prompt('Enter a new tag:'); // Simple prompt to add a new tag
    if (newTag) {
      const updatedTags = `${editedCaseData.tags ? editedCaseData.tags + ',' : ''}${newTag.trim()}`;
      setEditedCaseData({ ...editedCaseData, tags: updatedTags }); // Update the state with the new tag
    }
  };
  const saveCaseChanges = () => {
    // Ensure all required fields are filled
    if (!editedCaseData.caseHeading || !editedCaseData.query || !editedCaseData.status) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Prepare the request body dynamically with only the updated fields
    const updatedData = {};
  
    // Ensure the case ID is included in the request body
    updatedData.id = activeCase.id; // ID should never change, it's part of the data
  
    // Check if each field has been modified; if so, include it in the request body
    if (editedCaseData.caseHeading !== activeCase.caseHeading) {
      updatedData.caseHeading = editedCaseData.caseHeading;
    }
    if (editedCaseData.query !== activeCase.query) {
      updatedData.query = editedCaseData.query;
    }
    if (editedCaseData.applicableArticle !== activeCase.applicableArticle) {
      updatedData.applicableArticle = editedCaseData.applicableArticle;
    }
    if (editedCaseData.description !== activeCase.description) {
      updatedData.description = editedCaseData.description;
    }
    if (editedCaseData.status !== activeCase.status) {
      updatedData.status = editedCaseData.status;
    }
    if (editedCaseData.tags !== activeCase.tags) {
      updatedData.tags = editedCaseData.tags;  // Add tags to updatedData if changed
    }
  
    // Log the request body for debugging
    console.log('Request body:', updatedData);
  
    // Ensure there is at least one field to update
    if (Object.keys(updatedData).length === 1 && updatedData.id) { // Only ID is present
      alert('No changes to update.');
      return;
    }
  
    // Send the POST request with only the updated fields
    fetch(`https://sih-backend-881i.onrender.com/case_update/${activeCase.id}/`, {
      method: 'POST', // Use POST for updating
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify(updatedData), // Only include the fields that have been updated
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || 'Failed to update the case');
          });
        }
        return response.json(); // Parse the response as JSON if successful
      })
      .then((updatedCase) => {
        // Update the case list with the response data
        const updatedCases = cases.map((caseItem) =>
          caseItem.id === updatedCase.id ? updatedCase : caseItem
        );
  
        setCases(updatedCases); // Update the state with the new case data
        setActiveCase(null); // Close modal after saving changes
        alert('Case updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating case:', error);
        alert('Failed to update the case. Please try again.');
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
                className="case-card bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
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
                <p className="text-sm text-blue-400 mt-2">
                  <strong className="text-sm text-blue-900 mt-2">Tags:</strong>{" "}
                  {caseItem.tags
                    ? caseItem.tags
                      .replace(/[\[\]']+/g, '') // Remove brackets and single quotes
                      .split(',') // Split the string into individual tags
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {tag.trim()}
                        </span>
                      ))
                    : 'No tags available'}
                </p>
                {/* Make this div flex-grow to push buttons to the bottom */}
                <div className="flex-grow"></div>
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
                    className="text-blue-500 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {/*Footer section*/}
      <Footer />
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn fixed bottom-4 right-4 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-white"
          aria-label="Back to top"
        >
          <span className="material-icons text-lg">arrow_upward</span>
        </button>
      )}

{activeCase && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="modal bg-white w-10/12 md:w-7/12 h-3/4 p-6 rounded-lg overflow-auto shadow-lg relative">
      <div className="sticky top-2 flex justify-end">
        <button
          onClick={closeCaseDetailsModal}
          className="sticky top-2 right-2 text-2xl text-gray-600"
        >
          &times;
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-blue-900 border-b pb-2">
          {isEditing ? (
            <input
              name="caseHeading"
              type="text"
              value={editedCaseData.caseHeading || activeCase.caseHeading || ''}
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
              value={editedCaseData.query || activeCase.query || ''}
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
              value={editedCaseData.applicableArticle || activeCase.applicableArticle || ''}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border rounded-md"
            />
          ) : (
            activeCase.applicableArticle
              ? activeCase.applicableArticle
                  .match(/\*\*(.*?)\*\*/g)
                  ?.map((match, index) => (
                    <div key={index} className="mt-2">
                      {match.replace(/\*\*/g, '')}
                    </div>
                  )) || 'No applicable article found'
              : 'No applicable article found'
          )}
        </div>

        <div>
          <span className="font-semibold">Tags:</span>
          {isEditing ? (
            <div>
              {/* Display the existing tags as a list with remove option */}
              <div className="flex flex-wrap gap-2 mb-2">
                {editedCaseData.tags
                  ? editedCaseData.tags
                      .replace(/[\[\]']+/g, '')
                      .split(',')
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                        >
                          {tag.trim()}
                          {/* Cross (x) to remove tag */}
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                  : 'No tags available'}
              </div>
              {/* Input for new tag */}
              <input
                name="tags"
                value={editedCaseData.tags || activeCase?.tags || ''}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
                placeholder="Enter tags, separated by commas"
              />
              {/* Plus (+) button to add a new tag */}
              <button
                onClick={handleAddTag}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Tag
              </button>
            </div>
          ) : (
            // Display tags as a list of spans when not in editing mode
            activeCase?.tags
              ? activeCase.tags
                  .replace(/[\[\]']+/g, '') // Clean up the tag string
                  .split(',')
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {tag.trim()}
                    </span>
                  ))
              : 'No tags available'
          )}
        </div>

        <div>
          <span className="font-semibold">Description:</span>
          {isEditing ? (
            <textarea
              name="description"
              value={editedCaseData.description || activeCase.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border rounded-md"
              rows="4"
            />
          ) : (
            activeCase.description
          )}
        </div>

        <div className="relative">
          <select
            name="status"
            value={editedCaseData.status || activeCase.status || ''}
            onChange={handleInputChange}
            className={`w-full p-2 mt-2 border rounded-md bg-white appearance-none 
              ${editedCaseData.status === 'assigned' || activeCase.status === 'assigned' ? 'bg-green-200' : ''}
              ${editedCaseData.status === 'under-investigation' || activeCase.status === 'under-investigation' ? 'bg-yellow-100' : ''}
              ${editedCaseData.status === 'closed' || activeCase.status === 'closed' ? 'bg-red-100' : ''}`}
          >
            <option
              value="assigned"
              className={`${(editedCaseData.status === 'assigned' || activeCase.status === 'assigned') ? 'bg-green-200' : ''}`}
            >
              Assigned
            </option>
            <option
              value="under-investigation"
              className={`${(editedCaseData.status === 'under-investigation' || activeCase.status === 'under-investigation') ? 'bg-yellow-100' : ''}`}
            >
              Under Investigation
            </option>
            <option
              value="closed"
              className={`${(editedCaseData.status === 'closed' || activeCase.status === 'closed') ? 'bg-red-100' : ''}`}
            >
              Closed
            </option>
          </select>
        </div>

        {isEditing && (
          <div className="mt-4">
            <button
              onClick={saveCaseChanges} // Save changes using the updated function
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