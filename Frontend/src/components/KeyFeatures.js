import React from 'react';

const KeyFeatures = ({ theme }) => {
  return (
    <div className={`key-features ${theme} py-16`}>
      <h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>
        Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
        <div className={`feature-card rounded-lg p-8 shadow-xl transform transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-blue-500 text-white p-4 rounded-full mb-6 w-14 h-14 flex items-center justify-center mx-auto">
            <span className="material-icons">library_books</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">NLP & Legal Database</h3>
          <p className="text-lg">
            Interprets incident details and connects to legal databases for relevant laws.​
          </p>
        </div>

        <div className={`feature-card rounded-lg p-8 shadow-xl transform transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-green-500 text-white p-4 rounded-full mb-6 w-14 h-14 flex items-center justify-center mx-auto">
            <span className="material-icons">sync</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Unified Platform</h3>
          <p className="text-lg">
            Centralized repository of updated laws with easy search by act, section, or keyword.​
          </p>
        </div>

        <div className={`feature-card rounded-lg p-8 shadow-xl transform transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="icon bg-red-500 text-white p-4 rounded-full mb-6 w-14 h-14 flex items-center justify-center mx-auto">
            <span className="material-icons">devices</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Available on all platforms</h3>
          <p className="text-lg">
            Web, Android, iOS, Windows, Mac for seamless access across devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
