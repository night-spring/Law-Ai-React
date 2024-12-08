import React from 'react';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-8">
      {/* Header */}
      <header className="text-center py-8 bg-blue-600 text-white">
        <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
      </header>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg">
            Welcome to CODE-A-COLA! By accessing or using our website, you agree to comply with and be bound by these terms and conditions. Please read them carefully before using our website.
          </p>
        </section>
        {/* Terms of Use */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Terms of Use</h2>
          <p>
            You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the site.
          </p>
        </section>
        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of CODE-A-COLA or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our written permission.
          </p>
        </section>
        {/* User-Generated Content */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User-Generated Content</h2>
          <p>
            If you submit content to our website, you grant CODE-A-COLA a non-exclusive, royalty-free, worldwide, perpetual license to use, display, and distribute the content in connection with our services. You agree that your submissions will not violate any rights of third parties, including copyright, trademark, privacy, or other personal or proprietary rights.
          </p>
        </section>
        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p>
            CODE-A-COLA will not be liable for any damages resulting from the use or inability to use our website, including any damages caused by viruses or incorrect information.
          </p>
        </section>
        {/* External Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. External Links</h2>
          <p>
            Our website may contain links to external websites. CODE-A-COLA is not responsible for the content or practices of these third-party websites.
          </p>
        </section>
        {/* Modifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Modifications to Terms</h2>
          <p>
            CODE-A-COLA reserves the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the modified terms.
          </p>
        </section>
        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about these terms, please contact us at <a href="mailto:code.a.cola.01@gmail.com" className="text-blue-600">code.a.cola.01@gmail.com</a>.
          </p>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
