import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-grow flex flex-col">
        <main className="min-h-screen bg-gray-100 font-sans text-gray-800 p-8">
          {/* Header */}
          <header className="text-center py-8 bg-blue-600 text-white">
            <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          </header>
          <section className="mb-10 mt-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Introduction</h3>
            <p className="text-gray-700">
              At LawAI, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website and use our services.
            </p>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Information We Collect</h3>
            <p className="text-gray-700 mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Personal Information:</strong> This includes your name, email address, and other details that you provide when you register on our website or contact us.</li>
              <li><strong>Usage Data:</strong> We collect data on how you interact with our website, including IP address, browser type, pages visited, etc.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance your experience and gather data about website usage.</li>
            </ul>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">How We Use Your Information</h3>
            <p className="text-gray-700 mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To improve our website and services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you updates, promotions, or other marketing materials (if you opt-in)</li>
              <li>To monitor and analyze usage patterns to improve user experience</li>
            </ul>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Data Protection</h3>
            <p className="text-gray-700">
              We take the security of your data seriously. We implement technical and organizational measures to protect your personal information from unauthorized access, alteration, and deletion.
            </p>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Your Rights</h3>
            <p className="text-gray-700">
              You have the right to access, correct, and delete your personal information. You can also opt out of receiving marketing emails by following the unsubscribe link in the email or by contacting us directly.
            </p>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Changes to This Policy</h3>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of any significant updates.
            </p>
          </section>
          <section className="mb-10">
            <h3 className="text-2xl text-blue-600 font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:code.a.cola.01@gmail.com" className="text-blue-500 underline">code.a.cola.01@gmail.com</a>.
            </p>
          </section>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
