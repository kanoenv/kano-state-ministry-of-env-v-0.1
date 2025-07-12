
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TreePine, ArrowRight, Home, FileText } from 'lucide-react';

const FiveMillionTreesSuccess = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Application Submitted Successfully!
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Thank you for your interest in joining the 2025 Five Million Trees Planting Campaign. 
                  Your application has been received and will be reviewed by our team.
                </p>
              </div>

              <Card className="text-left mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TreePine className="w-6 h-6 text-green-600" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Application Review (Weeks 2-3)</p>
                      <p className="text-gray-600">Our team will carefully review your application and organizational capacity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Notification (Week 3)</p>
                      <p className="text-gray-600">Selected organizations will be notified via email and phone.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">Training Sessions (Weeks 3-4)</p>
                      <p className="text-gray-600">Participate in regional training workshops on planting techniques and tracking tools.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <p className="font-semibold">Implementation (Weeks 5-24)</p>
                      <p className="text-gray-600">Begin coordinated tree planting activities with ongoing support from the Ministry.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">Important Reminders</h3>
                <ul className="text-left space-y-2 text-blue-800">
                  <li>• Check your email regularly for updates and communications</li>
                  <li>• Ensure your contact information is up to date</li>
                  <li>• Prepare your team for potential training sessions</li>
                  <li>• Application deadline: June 30, 2025</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Return to Home
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link to="/programs/five-million-trees">
                    <FileText className="mr-2 h-5 w-5" />
                    Campaign Details
                  </Link>
                </Button>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  Have questions about your application or the campaign?
                </p>
                <p className="text-lg font-semibold text-green-700">
                  Contact us: trees2025@environment.kano.gov.ng
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FiveMillionTreesSuccess;
