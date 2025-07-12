
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Calendar } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Effective Date: 07-07-2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to the official website of the Kano State Ministry of Environment and Climate Change ("Ministry"). 
                By accessing and using <a href="https://environment.kn.gov.ng" className="text-green-600 hover:text-green-800">https://environment.kn.gov.ng</a>, 
                you agree to comply with and be bound by these Terms of Service.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Website</h2>
                <p className="text-gray-700 mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Use the website for lawful and non-commercial purposes.</li>
                  <li>Not engage in hacking, phishing, or distributing harmful content.</li>
                  <li>Not post false or misleading information through our feedback/contact forms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
                <p className="text-gray-700">
                  All content on this website (text, graphics, logos, videos) is the property of the Ministry or its licensors. 
                  Unauthorized copying, reproduction, or redistribution is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Availability of Service</h2>
                <p className="text-gray-700">
                  We strive to keep the Site running smoothly, but we do not guarantee uninterrupted access. 
                  The Ministry is not liable for any downtime or service disruption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Submissions</h2>
                <p className="text-gray-700">
                  By submitting any content (e.g., feedback, suggestions), you grant the Ministry the right to use it 
                  for policy and service improvements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-700">
                  The Ministry shall not be liable for any loss or damage arising from your use or inability to use this Site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms are governed by the laws of Kano State and the Federal Republic of Nigeria.
                </p>
              </section>
            </div>

            <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about these Terms?</h3>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:info@environment.kn.gov.ng" className="text-green-600 hover:text-green-800">
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

export default TermsOfService;
