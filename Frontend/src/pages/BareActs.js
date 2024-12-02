import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MenuBar from "../components/MenuBar";
import "../styles/BareActs.css";
import axios from "axios";
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
  const [pdfError, setPdfError] = useState(null);
  const [pdfSearchQuery, setPdfSearchQuery] = useState("");
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [showDownloads, setShowDownloads] = useState(false);
  const [selectedActType, setSelectedActType] = useState("");

  useEffect(() => {
    const fetchLaws = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://sih-backend-seven.vercel.app/database/"
        );
        setLaws(response.data.data);
      } catch (err) {
        console.error("Error fetching laws:", err);
        setError("Failed to fetch laws data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaws();
  }, []);

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

    try {
      const response = await axios.post(
        "https://sih-backend-seven.vercel.app/search/",
        {
          query: searchQuery,
          act: selectedActType,
        }
      );
      setSearchResults(response.data.data);
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
          "https://sih-backend-seven.vercel.app/pdfs/"
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
        `https://sih-backend-seven.vercel.app/pdfs/${pdfId}/download/`,
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


  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow">
        <h2 className="bareacts-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          Bare Acts Database
        </h2>

        <div className="toggle-section flex justify-center mb-6">
          <button
            onClick={() => setShowDownloads(false)}
            className={`p-4 rounded-l-lg border font-medium transition-all duration-300 ease-in-out ${
              !showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
            }`}
          >
            View Bare Acts
          </button>
          <button
            onClick={() => setShowDownloads(true)}
            className={`p-4 rounded-r-lg border font-medium transition-all duration-300 ease-in-out ${
              showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
            }`}
          >
            Download PDFs
          </button>
        </div>

        {!showDownloads ? (
          <div className="bare-acts-section">
            <div className="flex justify-center items-center ">
              <form
                onSubmit={handleSearch}
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
                  {["bns", "ipc", "crpc", "iea", "cpc", "mva"].map((actType) => (
                    <option key={actType} value={actType}>
                      {actType.toUpperCase()} {/* Display as uppercase */}
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

            {searchQuery && selectedActType ? (
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
              <div className="all-laws bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-3xl font-semibold text-blue-900 mb-6">
                  Bare Acts
                </h3>
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
                                  ? {
                                      ...l,
                                      showDescription: !l.showDescription,
                                    }
                                  : l
                              )
                            )
                          }
                          className="text-blue-600 hover:underline mt-4"
                        >
                          {law.showDescription
                            ? "Hide Description"
                            : "Show Description"}
                        </button>
                        {law.showDescription && (
                          <p className="mt-4 text-gray-600">{law.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic mt-4">
                    No bare acts available.
                  </p>
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
                    value={pdfSearchQuery}  // State to hold the search input value
                    onChange={handlePdfSearchChange}  // Function to handle input changes
                    className="w-full p-3 text-lg rounded-lg border-2 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {pdfLoading ? (
                <p>Loading PDFs...</p>
              ) : pdfError ? (
                <p className="text-red-500">{pdfError}</p>
              ) : (
                <div className="space-y-4">
                  {/* Filter PDFs based on search query */}
                  {pdfs
                    .filter((pdf) => {
                      if (pdfSearchQuery === "") {
                        return true;  // If search query is empty, show all PDFs
                      }
                      // If search query is not empty, filter by act_name or description
                      return (
                        pdf.act_name.toLowerCase().includes(pdfSearchQuery.toLowerCase()) ||
                        pdf.description.toLowerCase().includes(pdfSearchQuery.toLowerCase())
                      );
                    })
                    .map((pdf) => (
                      <div
                        key={pdf.id}
                        className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center"
                      >
                        <div className="pdf-info flex-1">
                          <h4 className="text-xl font-semibold text-blue-800">
                            {pdf.act_name} {/* Display the name of the PDF */}
                          </h4>
                          <p className="text-md text-gray-700">{pdf.description}</p> {/* Display the description */}
                        </div>
                        <div className="pdf-action ml-4">
                          {/* Button to download the PDF */}
                          <button
                            onClick={() => handleDownloadPdf(pdf.id)} // Trigger PDF download
                            className="p-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
        


        )}

        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
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
