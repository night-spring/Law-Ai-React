import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyFeatures from '../components/KeyFeatures';
import '../styles/Landing.css';
import img from '../images/Landing.jpg';
import Footer from '../components/Footer';
import img1 from '../images/indian-emblem.png';
const Landing = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleDownload = () => {
    navigate('/download');
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing bg-gray-100 text-gray-900 font-sans">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap">
          {/* Left Section: Logo and Title */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <img
              src={img1}
              alt="Emblem of India"
              className="h-14"
            />
            <div className="text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                LawAI Portal
              </h1>
              <p className="text-xs sm:text-sm text-gray-200">
                Enforcing Law & Justice for Government of India
              </p>
            </div>
          </div>
          {/* Right Section: Buttons */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              className="bg-white text-blue-800 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transform transition hover:scale-105"
              onClick={handleDownload}
              aria-label="Download resources"
            >
              Download Software
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:bg-blue-500 transform transition hover:scale-105"
              onClick={() => window.open("https://india.gov.in", "_blank")}
            >
              Visit India.gov.in
            </button>
          </div>
        </div>
      </header>
      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <span className="material-icons text-lg">arrow_upward</span>
        </button>
      )}
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-center space-x-10">
          {/* Home Link */}
          <a
            href="#home"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
            onClick={(e) => handleSmoothScroll(e, 'home')}
          >
            Home
          </a>
          {/* Features Link */}
          <a
            href="#features"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
            onClick={(e) => handleSmoothScroll(e, 'features')}
          >
            Features
          </a>
          {/* Vision Link */}
          <a
            href="#vision"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
            onClick={(e) => handleSmoothScroll(e, 'vision')}
          >
            Vision
          </a>
          {/* Contact Link */}
          <a
            href="#contact"
            className="text-lg font-medium hover:text-yellow-300 hover:underline underline-offset-4 transition duration-200"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            Contact
          </a>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <section
          id="home"
          className="hero bg-gradient-to-br from-blue-600 to-purple-400 py-16 sm:py-20 text-center shadow-2xl"
        >
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-wide leading-tight">
            Empowering Law Enforcement with AI
          </h1>
          {/* Subtext */}
          <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto">
            Revolutionize law enforcement with AI-powered tools. Streamline FIR filing,
            access legal resources, and enhance operational efficiency with cutting-edge
            technology.
          </p>
          {/* Call-to-Action Buttons */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="/query"
              className="bg-yellow-400 text-blue-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="bg-white text-blue-800 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-medium shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </section>
        {/* Image Section */}
        <section className="image-section py-16 bg-gradient-to-r from-gray-100 to-white mt-12">
          <div className="container mx-auto text-center relative px-4">
            {/* Image */}
            <div className="relative mb-12 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <img
                src={img}
                alt="Indian Government Building"
                className="mx-auto rounded-2xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-xl"
                style={{ maxHeight: '500px', objectFit: 'cover', width: '100%', borderRadius: '1rem' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl">
                <p className="text-white text-lg md:text-2xl font-semibold text-center px-6 py-4 md:px-12 md:py-6">
                  An initiative representing trust and authority abiding by the constitution.
                </p>
              </div>
            </div>
            {/* Additional Description */}
            <p className="text-gray-700 text-md md:text-xl mx-auto max-w-8xl px-4 md:px-8 mt-6">
              This initiative is designed to bring the power of technology to law enforcement agencies, providing them with the resources they need to uphold justice and maintain public trust.
            </p>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="features bg-gray-50 py-12 mt-10">
          <KeyFeatures />
        </section>
        {/* Vision Section */}
        <section id="vision" className="vision bg-gray-50 py-16">
          <div className="container mx-auto text-center px-6">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full shadow-lg">
                <span className="material-icons text-blue-600 text-4xl">visibility</span>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-blue-800 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At LawAI, we aim to bridge the gap between law enforcement and advanced technology, empowering officers with tools to uphold justice swiftly and accurately across the nation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Innovative AI Tools</h3>
                <p className="text-gray-700 text-sm">
                  Leveraging the latest AI advancements to bring unmatched precision in legal processes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Empowering Officers</h3>
                <p className="text-gray-700 text-sm">
                  Providing law enforcement with resources that make their work efficient and impactful.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Nationwide Impact</h3>
                <p className="text-gray-700 text-sm">
                  Reaching every corner of the country to ensure justice is accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Section */}
            <div className="text-center md:text-left space-y-6">
              <h2 className="text-4xl font-bold text-blue-900">Get in Touch</h2>
              <p className="text-gray-600 text-lg">
                Have questions, feedback, or just want to say hello? Fill out the form or reach us via our contact details below. We're here to help!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-blue-500"></i>
                  <span className="text-gray-600">code.a.cola.01@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-blue-500"></i>
                  <span className="text-gray-600">+91-123-456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-500"></i>
                  <span className="text-gray-600">
                    Ministry of Law & Justice, Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <form className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="youremail@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Landing;
