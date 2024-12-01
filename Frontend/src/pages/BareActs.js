import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MenuBar from "../components/MenuBar";
import "../styles/BareActs.css";
import axios from "axios";
import Footer from "../components/Footer";

const BareActs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [laws, setLaws] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showButton, setShowButton] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [selectedActType, setSelectedActType] = useState("");

  const dummyPDFs = [
    { id: 1, title: "Bare Act 1", description: "Dummy PDF Description 1" },
    { id: 2, title: "Bare Act 2", description: "Dummy PDF Description 2" },
    { id: 3, title: "Bare Act 3", description: "Dummy PDF Description 3" },
  ];

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await axios.get(
          "https://sih-backend-seven.vercel.app/database/"
        );
        setLaws(response.data);
      } catch (err) {
        console.error("Error fetching laws:", err);
        setError("Failed to fetch laws data.");
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
      let response;
  
      if (searchQuery || selectedActType) {
        // Use POST if searchQuery or selectedActType are provided
        response = await axios.post("https://sih-backend-seven.vercel.app/search/", {
          query: searchQuery, // Send `searchQuery` as `query`
          act: selectedActType, // Send `selectedActType` as `act`
        });
      } else {
        // Use GET if no specific query or act type is provided
        response = await axios.get("https://sih-backend-seven.vercel.app/search/");
      }
  
      setSearchResults(response.data);
    } catch (err) {
      setError("An error occurred while fetching results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  
  // Updated filtering logic
  const filteredLaws = searchQuery
    ? laws.filter(
        (law) =>
          (selectedActType ? law.actType === selectedActType : true) &&
          (law.section.includes(searchQuery) ||
            law.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : selectedActType
    ? laws.filter((law) => law.actType === selectedActType) // Filter only by actType if search query is empty
    : laws;

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
                      {actType}
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


            <div className="all-laws bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
  <h3 className="text-3xl font-semibold text-blue-900 mb-6">
    {searchQuery
      ? `Search Results (${filteredLaws.length})`
      : "Bare Acts"}
  </h3>
  {filteredLaws.length > 0 ? (
    <div className="space-y-6">
      {filteredLaws.map((law) => (
        <div
          key={law.section}
          className="law-item p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 border-l-[4px] border-l-blue-500"


        >
          <h4 className="law-title text-2xl font-semibold text-blue-800 mb-2">
            {law.actType} - {law.section}
          </h4>
          <p className="text-lg font-medium text-gray-700 mb-2">
            {law.title}
          </p>
          <p className="text-gray-600">{law.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic mt-4">
      No laws found. Try a different search query.
    </p>
  )}
</div>




          </div>
        ) : (
          <div className="download-section bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-semibold text-blue-900 text-center mb-8">
            Download PDF Files
          </h3>
        
          {dummyPDFs.map((pdf) => (
            <div
              key={pdf.id}
              className="pdf-item flex items-center justify-between p-6 mb-6 border-2 border-gray-300 rounded-lg shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              style={{ height: "120px" }}
            >
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-blue-900 mb-2">{pdf.title}</h4>
                <p className="text-gray-600">{pdf.description}</p>
              </div>
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                Download
              </button>
            </div>
          ))}
        </div>
        
        )}
      </main>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        >
           <span className="material-icons text-lg">arrow_upward</span>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default BareActs;
