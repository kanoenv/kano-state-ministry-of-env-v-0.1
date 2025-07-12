
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Effective Date: 07-07-2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                At Kano State Ministry of Environment and Climate Change, we are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard the personal information you provide 
                when you visit <a href="https://environment.kn.gov.ng" className="text-blue-600 hover:text-blue-800">https://environment.kn.gov.ng</a> (the "Site").
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">We may collect:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Personal Information:</strong> Name, email address, phone number (when submitted through forms).</li>
                  <li><strong>Non-Personal Information:</strong> Browser type, IP address, pages visited, date and time of visit.</li>
                  <li><strong>Form Submissions:</strong> Any data you voluntarily submit via contact forms or feedback portals.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Respond to your inquiries.</li>
                  <li>Improve the quality and functionality of our services.</li>
                  <li>Communicate government policies or environmental updates.</li>
                  <li>Maintain security and prevent abuse.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing Your Information</h2>
                <p className="text-gray-700 mb-4">We do not sell or rent your personal data. We may share data with:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Relevant Kano State Government agencies.</li>
                  <li>Authorized service providers helping us manage this Site.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Analytics</h2>
                <p className="text-gray-700">
                  We use cookies and third-party tools (e.g., Google Analytics) to understand user behavior and improve our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700">
                  We implement administrative, technical, and physical safeguards to protect your data. However, no system is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">You may:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Request access to the data we hold about you.</li>
                  <li>Request corrections or deletions.</li>
                  <li>Opt out of cookies via browser settings.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. External Links</h2>
                <p className="text-gray-700">
                  This Site may contain links to other websites. We are not responsible for the privacy practices of those websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. Changes will be posted here.
                </p>
              </section>
            </div>

            <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about this Privacy Policy?</h3>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@environment.kn.gov.ng" className="text-blue-600 hover:text-blue-800">
                  info@environment.kn.gov.ng
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
