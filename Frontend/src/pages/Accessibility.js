import React from 'react';
import Footer from '../components/Footer'; // Import Footer component

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-8">
      {/* Accessibility Header */}
      <header className="text-center py-8 bg-blue-600 text-white">
        <h1 className="text-4xl font-semibold">Accessibility Statement</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8">
        {/* Intro Section */}
        <section className="mb-8">
          <p className="text-lg">
            CODE-A-COLA is committed to making our website accessible and inclusive to all users, regardless of their abilities. We aim to ensure that our digital content can be accessed and enjoyed by everyone.
          </p>
        </section>

        {/* Accessibility Features Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>Text alternatives for non-text content, including images and videos.</li>
            <li>Keyboard navigability to allow access without the need for a mouse.</li>
            <li>Compatible with screen readers to provide content descriptions.</li>
            <li>Readable fonts, clear contrasts, and scalable text for better legibility.</li>
          </ul>
        </section>

        {/* Best Practices Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Best Practices</h2>
          <p>
            We follow the Web Content Accessibility Guidelines (WCAG) 2.1, which provide standards for making web content more accessible for people with disabilities. Our website strives to meet Level AA compliance, which includes:
          </p>
          <ul className="list-disc list-inside space-y-4">
            <li>Providing text descriptions for images and icons.</li>
            <li>Ensuring all functionality is operable through a keyboard.</li>
            <li>Offering text that is scalable and contrasts well with backgrounds.</li>
            <li>Maintaining a logical structure and readable layout.</li>
          </ul>
        </section>

        {/* Feedback Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">We Value Your Feedback</h2>
          <p>
            Accessibility is an ongoing effort, and we welcome feedback to improve our services. If you encounter any barriers or have suggestions, please contact us at:
          </p>
          <p className="font-semibold text-blue-600 mt-2">code.a.cola.01@gmail.com</p>
        </section>
      </main>

      {/* Footer */}
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default Accessibility;
