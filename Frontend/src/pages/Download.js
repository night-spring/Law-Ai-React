import React from 'react';
import '../styles/Download.css'; // Update your CSS to match the design

const Download = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-blue-900">Download LawAI Application</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Choose your platform to download the LawAI installation file and start using our services.
        </p>
      </div>
      {/* Download Options */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-center">
        {/* Android */}
        <a
          href="https://drive.google.com/uc?export=download&id=1lPszpovE10_TFEdpZn9Ufbg13sfMSxAz"
          download
          className="download-card hover:shadow-lg"
        >
          <img
            src="https://pngimg.com/d/android_logo_PNG2.png"
            alt="Android"
            className="download-logo"
          />
          <h3 className="text-blue-900 text-lg font-medium mt-2">Android</h3>
          <button className="download-btn mt-3 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
            Download APK
          </button>
        </a>
        {/* iOS */}
        <div className="download-card opacity-50">
          <img
            src="https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-512.png"
            alt="iOS"
            className="download-logo"
          />
          <h3 className="text-blue-900 text-lg font-medium mt-2">iOS</h3>
          <p className="mt-3 text-gray-500">Coming Soon</p>
        </div>
        {/* Linux */}
        <div className="download-card opacity-50">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png"
            alt="Linux"
            className="download-logo"
          />
          <h3 className="text-blue-900 text-lg font-medium mt-2">Linux</h3>
          <p className="mt-3 text-gray-500">Coming Soon</p>
        </div>
        {/* Windows */}
        <div className="download-card opacity-50">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/2048px-Windows_logo_-_2021.svg.png"
            alt="Windows"
            className="download-logo"
          />
          <h3 className="text-blue-900 text-lg font-medium mt-2">Windows</h3>
          <p className="mt-3 text-gray-500">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Download;
