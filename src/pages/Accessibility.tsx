
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Eye, Calendar, CheckCircle } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 rounded-full">
                <Eye className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Last Updated: 07-07-2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                The Kano State Ministry of Environment and Climate Change is committed to ensuring digital accessibility 
                for people with disabilities. We strive to make our website accessible to the widest possible audience.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Accessibility Standards</h2>
                <p className="text-gray-700 mb-4">We aim to conform to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>WCAG 2.1 Level AA standards.</li>
                  <li>Nigerian government digital service guidelines for public websites.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Features for Accessibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Keyboard Navigation</h3>
                      <p className="text-gray-700">Full keyboard navigation support for all interactive elements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Alt Text</h3>
                      <p className="text-gray-700">Descriptive alt text on all images for screen readers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">High Contrast</h3>
                      <p className="text-gray-700">High contrast colors and readable fonts throughout the site.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Screen Reader</h3>
                      <p className="text-gray-700">Full compatibility with popular screen reader software.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Continuous Improvement</h2>
                <p className="text-gray-700">
                  We are constantly working to improve accessibility. Feedback from users is welcome and appreciated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Accessibility Features</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Accessibility Features:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Semantic HTML structure for better screen reader navigation</li>
                    <li>• Focus indicators on all interactive elements</li>
                    <li>• Consistent navigation structure throughout the site</li>
                    <li>• Responsive design that works on all devices</li>
                    <li>• Clear headings and logical content structure</li>
                    <li>• Skip links for keyboard navigation</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Known Issues</h2>
                <p className="text-gray-700 mb-4">
                  We are aware of some accessibility challenges and are working to address them:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Some embedded content may not be fully accessible</li>
                  <li>Complex data visualizations are being enhanced for screen readers</li>
                  <li>PDF documents are being reviewed for accessibility compliance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Feedback and Contact</h2>
                <p className="text-gray-700 mb-4">
                  If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Email:</strong>{' '}
                      <a href="mailto:accessibility@environment.kn.gov.ng" className="text-blue-600 hover:text-blue-800">
                        accessibility@environment.kn.gov.ng
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong>{' '}
                      <a href="tel:+2348030719901" className="text-blue-600 hover:text-blue-800">
                        +234 803 071 9901
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> Block 5, Audu Bako Secretariat, Kano State, Nigeria
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Commitment</h3>
              <p className="text-gray-700">
                We are committed to providing equal access to information and functionality for all users. 
                Your feedback helps us continue improving the accessibility of our digital services.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;
