
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ForestGuardSuccess = () => {
  const location = useLocation();
  const { referenceNumber, email } = location.state || {};
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50 border-b pb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-800">Application Submitted Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 pb-6 text-center">
              <div className="space-y-6">
                <div className="bg-gray-50 py-3 px-4 rounded-lg">
                  <p className="text-sm text-gray-500">Your Reference Number</p>
                  <p className="text-2xl font-mono font-bold">{referenceNumber || "FG12345678"}</p>
                </div>
                
                <div>
                  <p className="mb-4">
                    Thank you for applying to join the Kano State Forest Guard program. Your application has been received and is currently under review.
                  </p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
                    <p className="font-medium">Important:</p>
                    <p className="text-sm text-gray-700">
                      Please save your reference number for tracking your application status. A confirmation email has also been sent to {email || "your email address"}.
                    </p>
                  </div>
                </div>
                
                <div className="text-left space-y-3">
                  <h3 className="font-bold text-lg">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Watch for email updates regarding your application status.</li>
                    <li>Shortlisted candidates will receive an invitation for a physical assessment.</li>
                    <li>Prepare required original documents for verification if shortlisted.</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-8">
              <Button 
                variant="outline"
                asChild
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                <Link to="/careers/forest-guard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Forest Guard Page
                </Link>
              </Button>
              
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>For any inquiries, please contact our recruitment team at:</p>
            <p className="font-semibold">recruitment@kanoforestguard.gov.ng</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForestGuardSuccess;
