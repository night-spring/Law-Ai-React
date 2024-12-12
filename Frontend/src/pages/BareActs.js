import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MenuBar from "../components/MenuBar";
import "../styles/BareActs.css";
import axios from "axios";
import { FaMicrophone, FaInfoCircle, FaArrowUp } from 'react-icons/fa';
import Footer from "../components/Footer";

const BareActs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [laws, setLaws] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showButton, setShowButton] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Define isLoading and its setter
  const [pdfError, setPdfError] = useState(null);
  const [pdfSearchQuery, setPdfSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Loading state
  const [fetchError, setFetchError] = useState(null);  // Error state
  const [results, setResults] = useState([]);          // Results state
  const [showPdfPreview, setShowPdfPreview] = useState(false); // Control modal visibility
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null); // Blob URL for the PDF preview
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Tracks loading state
  const [alertMessage, setAlertMessage] = useState(null);           // Stores search results
  const [showDownloads, setShowDownloads] = useState(false);
  const [selectedActType, setSelectedActType] = useState("");

  useEffect(() => {
    const fetchLaws = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://sih-backend-881i.onrender.com/database/");
        const lawsData = response.data.data; // Adjust based on the exact structure of the response
  
        // Map through the laws to initialize showDescription
        setLaws(
          lawsData.map((law) => ({
            ...law,
            showDescription: false, // Initialize toggle state for each law
          }))
        );
      } catch (err) {
        console.error("Error fetching laws:", err);
        setError("Failed to fetch laws data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLaws(); // Call the function on component mount
  }, []); // Empty dependency array to ensure it o

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure the search is only triggered if `selectedActType` is provided
    if (!selectedActType) {
      setError("Please select an act type to proceed with the search.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://sih-backend-881i.onrender.com/search/",
        {
          query: searchQuery || "", // Send an empty string if searchQuery is not provided
          act: selectedActType,     // Always include `selectedActType`
        },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set Content-Type header
          },
        }
      );
      setSearchResults(response.data.data); // Update results with API response
    } catch (err) {
      setError("An error occurred while fetching results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch PDF metadata
    const fetchPdfs = async () => {
      setPdfLoading(true);
      setPdfError(null);

      try {
        const response = await axios.get(
          "https://sih-backend-881i.onrender.com/pdfs/"
        );
        setPdfs(response.data); // Assuming the response contains the list of PDFs with metadata
        setFilteredPdfs(response.data); // Set initial filtered PDFs to all PDFs
      } catch (err) {
        setPdfError("Failed to fetch PDF data.");
        console.error("Error fetching PDFs:", err);
      } finally {
        setPdfLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  // Function to handle PDF search input change
  const handlePdfSearchChange = (e) => {
    const query = e.target.value;
    setPdfSearchQuery(query);

    // Filter PDFs based on the search query
    if (query === "") {
      setFilteredPdfs(pdfs); // Show all PDFs if no query
    } else {
      const filtered = pdfs.filter((pdf) =>
        pdf.act_name.toLowerCase().includes(query.toLowerCase()) || // Match act name
        pdf.description.toLowerCase().includes(query.toLowerCase()) // Match description
      );
      setFilteredPdfs(filtered);
    }
  };

  const handleDownloadPdf = async (pdfId) => {
    setPdfLoading(true); // Show loading indicator
    setPdfError(null); // Clear any previous errors

    try {
      // Fetch the PDF file for download using the pdfId
      const response = await axios.get(
        `https://sih-backend-881i.onrender.com/pdfs/${pdfId}/download/`,
        { responseType: "blob" } // Ensure we get binary PDF data
      );

      // Create a link to initiate the download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", `Document_${pdfId}.pdf`); // Set the filename to include pdfId

      // Trigger the download by programmatically clicking the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM

      // Optionally revoke the object URL
      URL.revokeObjectURL(url);
    } catch (err) {
      setPdfError("Failed to fetch PDF data.");
      console.error("Error fetching PDF:", err);
    } finally {
      setPdfLoading(false); // Hide the loading indicator once download completes or fails
    }
  };
  const handlePreviewPdf = async (pdfId) => {
    setPdfLoading(true); // Show loading indicator
    setPdfError(null); // Clear any previous errors

    try {
      // Fetch the PDF file for preview using the pdfId
      const response = await axios.get(
        `https://sih-backend-881i.onrender.com/pdfs/${pdfId}/download/`,
        { responseType: "blob" } // Ensure we get binary PDF data
      );

      // Check if the response is a valid PDF (by checking the MIME type)
      const contentType = response.headers["content-type"];
      if (contentType && contentType.startsWith("application/pdf")) {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Generate a URL for the Blob to use in the iframe
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url); // Set the Blob URL to display in the modal

        // Show the modal
        setShowPdfPreview(true);
      } else {
        throw new Error("The fetched document is not a PDF.");
      }

    } catch (err) {
      // Handle errors
      setPdfError("Failed to fetch PDF data.");
      console.error("Error fetching PDF:", err);
    } finally {
      setPdfLoading(false); // Hide the loading indicator once download completes or fails
    }
  };

  // Close the PDF preview modal
  const closePreviewModal = () => {
    setShowPdfPreview(false);  // Hide the preview modal
    setPdfBlobUrl(null);  // Reset the Blob URL
  };

  const performSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFetchError(null);
    try {
      // Prepare the payload  
      const payload = {
        query: searchQuery || "",  // If searchQuery is empty, send an empty string  
        act: selectedActType || "", // If selectedActType is empty, send an empty string  
      };

      // If neither field is filled, show an error message and don't make the API call  
      if (!payload.query && !payload.act) {
        setResults([]);
        setFetchError("At least one field required for search.");
        return;
      }

      // If act is selected and query is empty, set query as an empty string and search by act  
      if (!payload.query && payload.act) {
        const apiResponse = await axios.post(
          "https://sih-backend-881i.onrender.com/search/",
          { query: '', act: payload.act }
        );

        // Check if apiResponse.data.response has results  
        if (apiResponse.data.response && apiResponse.data.response.length > 0) {
          setResults(apiResponse.data.response); // Set the search results from the response  
        } else {
          setResults([]);
          setFetchError("No results found for the selected act.");
        }
        return;
      }

      // If both fields are filled, proceed with the search  
      const apiResponse = await axios.post(
        "https://sih-backend-881i.onrender.com/search/",
        payload
      );

      // Check if apiResponse.data.response has results  
      if (apiResponse.data.response && apiResponse.data.response.length > 0) {
        setResults(apiResponse.data.response); // Set the search results from the response  
      } else {
        setResults([]);
        setFetchError("No results found for your search.");
      }
    } catch (error) {
      setFetchError("An error occurred while fetching results.");
      console.error(error);
    } finally {
      setIsLoading(false); // Ensure loading state is turned off once the request is complete  
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform search logic based on conditions
    if (selectedActType && searchQuery) {
      handleSearch(event);
    } else if (selectedActType && !searchQuery) {
      performSearch(event);
    }
  };

  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow">
        <h2 className="bareacts-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Bare Acts Library
        </h2>

        <div className="toggle-section flex justify-center mb-6">
          <button
            onClick={() => setShowDownloads(false)}
            className={`p-4 rounded-l-lg border font-medium transition-all duration-300 ease-in-out ${!showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
              }`}
          >
            View Bare Acts
          </button>
          <button
            onClick={() => setShowDownloads(true)}
            className={`p-4 rounded-r-lg border font-medium transition-all duration-300 ease-in-out ${showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
              }`}
          >
            Original Documents
          </button>
        </div>
        {!showDownloads ? (
          <div className="bare-acts-section">
            <div className="flex justify-center items-center ">
              <form
                onSubmit={handleSubmit}
                className="bareacts-search-form flex flex-col items-center gap-4 sm:flex-row sm:gap-6 mb-10"
              >
                <input
                  type="text"
                  placeholder="Search for a Bare Act"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bareacts-search-input w-full sm:w-96 p-3 text-lg rounded-lg border-2 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <select
                  value={selectedActType}
                  onChange={(e) => setSelectedActType(e.target.value)}
                  className="bareacts-select-input w-full sm:w-96 p-3 text-lg rounded-lg border-2 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Act Type</option>
                  {[
                    { value: "bns", label: "Bharatiya Nyaya Sanhita" },
                    { value: "ipc", label: "Indian Penal Code" },
                    { value: "crpc", label: "Code of Criminal Procedure" },
                    { value: "iea", label: "Indian Evidence Act" },
                    { value: "cpc", label: "Code of Civil Procedure" },
                    { value: "mva", label: "Motor Vehicles Act" },
                  ].map(({ value, label }) => (
                    <option key={value} value={value}>
                      {value.toUpperCase()} ({label})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bareacts-search-btn p-4 rounded-lg bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                  Search
                </button>
              </form>
            </div>
            {selectedActType ? (
              searchQuery ? (
                // Case 1: Both `selectedActType` and `searchQuery` are present
                // setSearchResults(response.data.data); /
                <div className="search-results bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-3xl font-semibold text-blue-900 mb-6">
                    Search Results
                  </h3>
                  {loading ? (
                    <p className="text-gray-500 italic mt-4">Loading...</p>
                  ) : error ? (
                    <p className="text-red-500 italic mt-4">{error}</p>
                  ) : searchResults && Object.keys(searchResults).length > 0 ? (
                    <div className="p-4 bg-white border border-gray-300 rounded-xl shadow-md">
                      <h4 className="text-2xl font-semibold text-blue-800">
                        Section {searchResults.section}
                      </h4>
                      <p className="text-lg font-bold mt-2">
                        {searchResults.title}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {searchResults.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic mt-4">
                      No results found for your search.
                    </p>
                  )}
                </div>
              ) : (
                // Case 2: Only `selectedActType` is present
                //  setResults(apiResponse.data.response); // Set the search results from the response  
                <div className="search-results bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-3xl font-semibold text-blue-900 mb-6">
                    Search Results
                  </h3>
                  {/* Loading State */}
                  {isLoading ? (
                    <p className="text-gray-500 italic mt-4">Loading...</p>
                  ) : fetchError ? (
                    <p className="text-red-500 italic mt-4">{fetchError}</p>
                  ) : results && results.length > 0 ? (
                    <div className="p-4 bg-white border border-gray-300 rounded-xl shadow-md">
                      {results.map((law) => (
                        <div key={law.id} className="mb-6">
                          <h4 className="text-2xl font-semibold text-blue-800">
                            Section {law.section_id}
                          </h4>
                          <p className="text-lg font-bold mt-2">
                            {law.section_title}
                          </p>

                          <p className="text-gray-600 mt-2">
                            {law.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic mt-4">
                      No results found for your search.
                    </p>
                  )}
                </div>
              )
            ) : (
              // Case 3: Neither `selectedActType` nor `searchQuery` is present
              <div className="all-laws bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-3xl font-semibold text-blue-900 mb-6">Bare Acts</h3>
              {loading ? (
                <p className="text-gray-500 italic mt-4">Loading...</p>
              ) : error ? (
                <p className="text-red-500 italic mt-4">{error}</p>
              ) : laws.length > 0 ? (
                <div className="space-y-6">
                  {laws.map((law) => (
                    <div
                      key={law.id}
                      className="law-item p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 border-l-[4px] border-l-blue-500"
                    >
                      <h4 className="law-title text-2xl font-semibold text-blue-800">
                        Section {law.section_id}
                      </h4>
                      <p className="text-lg font-bold text-black mt-2">
                        {law.section_title}
                      </p>
                      <button
                        onClick={() =>
                          setLaws((prevLaws) =>
                            prevLaws.map((l) =>
                              l.id === law.id
                                ? { ...l, showDescription: !l.showDescription }
                                : l
                            )
                          )
                        }
                        className="text-blue-600 hover:underline mt-4"
                      >
                        {law.showDescription ? "Hide Description" : "Show Description"}
                      </button>
                      {law.showDescription && (
                        <p className="mt-4 text-gray-600">{law.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic mt-4">No bare acts available.</p>
              )}
            </div>
            
            )}
          </div>
        ) : (
          <div className="pdf-download-section">
            <div className="flex justify-center items-center mb-6">
              {/* Search Box for PDFs */}
              <div className="w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search PDFs"
                  value={pdfSearchQuery}
                  onChange={handlePdfSearchChange} // Handle input change
                  className="w-full p-3 text-lg rounded-lg border-2 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            {/* If PDFs are loading or error occurred */}
            {pdfLoading ? (
              <p>Loading PDFs...</p>
            ) : pdfError ? (
              <p className="text-red-500">{pdfError}</p>
            ) : (
              <div className="space-y-4">
                {/* Display filtered PDFs */}
                {filteredPdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="pdf-info flex-1">
                      <h4 className="text-xl font-semibold text-blue-800">{pdf.act_name}</h4>
                      <p className="text-md text-gray-700">{pdf.description}</p>
                    </div>
                    <div className="pdf-action ml-4">
                      {/* Preview Button */}
                      <button
                        onClick={() => handlePreviewPdf(pdf.id)} // Show PDF preview
                        className="p-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 mr-4"
                      >
                        Preview PDF
                      </button>
                      {/* Download Button */}
                      <button
                        onClick={() => handleDownloadPdf(pdf.id)} // Download PDF
                        className="p-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mt-2"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* PDF Preview Modal */}
            {showPdfPreview && pdfBlobUrl && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg max-w-4xl w-full h-[80vh] relative overflow-hidden">
                  <button
                    onClick={closePreviewModal}
                    className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full hover:bg-red-700"
                  >
                    <span className="material-icons">close</span>
                  </button>
                  <h3 className="text-2xl font-semibold text-blue-900 mb-4">PDF Preview</h3>
                  <div className="w-full h-full">
                    {/* Display the PDF in an iframe */}
                    <iframe
                      src={pdfBlobUrl}
                      title="PDF Preview"
                      className="w-full h-full border border-gray-300 rounded-lg"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {showButton && (
          <button
            onClick={scrollToTop}
            className="scroll-to-top-btn fixed bottom-4 right-4 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-white"
          >
            <span className="material-icons text-lg">arrow_upward</span>
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BareActs;