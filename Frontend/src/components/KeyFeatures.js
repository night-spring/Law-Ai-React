import React from 'react';

const KeyFeatures = ({ theme }) => {
  return (
    <div className={`key-features ${theme} py-16 bg-gradient-to-r from-gray-100 to-white`}>
      <h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>
        Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">

        {/* Feature Card 1 */}
        <div className={`feature-card rounded-lg p-8 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-blue-500 text-white p-4 rounded-full mb-6 w-16 h-16 flex items-center justify-center mx-auto">
            <span className="material-icons">library_books</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">NLP & Legal Database</h3>
          <p className="text-lg">
            Interprets incident details and connects to legal databases for relevant laws.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className={`feature-card rounded-lg p-8 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-green-500 text-white p-4 rounded-full mb-6 w-16 h-16 flex items-center justify-center mx-auto">
            <span className="material-icons">sync</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Unified Platform</h3>
          <p className="text-lg">
            Centralized repository of updated laws with easy search by act, section, or keyword.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className={`feature-card rounded-lg p-8 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-red-500 text-white p-4 rounded-full mb-6 w-16 h-16 flex items-center justify-center mx-auto">
            <span className="material-icons">assignment_turned_in</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Case Database for Monitoring</h3>
          <p className="text-lg">
            Monitor ongoing and past cases seamlessly with real-time updates and case tracking.
          </p>
        </div>

      </div>
    </div>
  );
};

export default KeyFeatures;
