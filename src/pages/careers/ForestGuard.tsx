import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ForestGuard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]" style={{
          backgroundImage: "url('/lovable-uploads/0b018972-2140-4a42-9fb7-b6537ae84644.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Join Kano State's Forest Guard</h1>
              <p className="text-white/90 text-lg mb-8">Protect our forests, preserve our heritage.</p>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/careers/forest-guard/apply">Apply Now</Link>
              </Button>
              <p className="text-white/80 mt-4 text-sm">
                Casual staff recruitment open to qualified Kano Indigenes aged 18–35.
              </p>
            </div>
          </div>
        </section>

        {/* About the Programme */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">About the Forest Guard Programme</h2>
            <h3 className="text-xl font-semibold mb-6 text-center text-green-700">Safeguarding Kano's Green Heritage</h3>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-6">As a Forest Guard, you will:</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Patrol designated forest reserves to deter illegal logging and poaching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Assist in fire break creation and wildfire prevention</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Support tree planting and community conservation efforts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Educate local communities on sustainable forest use</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-6">Eligibility & Requirements</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Shield className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Age:</span> 18–35 years
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Education:</span> Minimum Secondary School Certificate (WAEC/NABTEB)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Physical Fitness:</span> Able to complete a 5 km trek in forest terrain
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-green-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Citizenship:</span> Kano Indigenes by birth or residency
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 bg-gray-50 p-8 rounded-xl">
              <h4 className="text-xl font-bold mb-4">Skills & Qualities:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow-sm">
                  <p className="font-medium">Good communication skills</p>
                </div>
                <div className="p-4 bg-white rounded shadow-sm">
                  <p className="font-medium">Team player attitude</p>
                </div>
                <div className="p-4 bg-white rounded shadow-sm">
                  <p className="font-medium">Commitment to environmental protection</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 bg-gray-50 p-8 rounded-xl">
              <h4 className="text-xl font-bold mb-4">Documents to Prepare:</h4>
              <ul className="space-y-3">
                <li className="flex items-center bg-white p-3 rounded">
                  <ChevronRight className="text-green-600 mr-2 h-5 w-5" />
                  Birth certificate or National ID
                </li>
                <li className="flex items-center bg-white p-3 rounded">
                  <ChevronRight className="text-green-600 mr-2 h-5 w-5" />
                  Educational certificates (WAEC/NABTEB)
                </li>
                <li className="flex items-center bg-white p-3 rounded">
                  <ChevronRight className="text-green-600 mr-2 h-5 w-5" />
                  Recent passport style photograph (max 2 MB, JPG/PNG)
                </li>
                <li className="flex items-center bg-white p-3 rounded">
                  <ChevronRight className="text-green-600 mr-2 h-5 w-5" />
                  Local Government Area (LGA) of origin letter
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* How to Apply */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">How to Apply</h2>
            
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-gray-200 ml-6">
                <li className="mb-10 ml-10">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-white text-white">
                    1
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Create your applicant account</h3>
                  <p className="mt-1 text-sm text-gray-600">Click "Apply Now" to begin the application process.</p>
                </li>
                <li className="mb-10 ml-10">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-white text-white">
                    2
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Complete the registration form</h3>
                  <p className="mt-1 text-sm text-gray-600">Fill in all personal details and qualifications.</p>
                </li>
                <li className="mb-10 ml-10">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-white text-white">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Upload required documents</h3>
                  <p className="mt-1 text-sm text-gray-600">Submit your passport photo and certificates.</p>
                </li>
                <li className="mb-10 ml-10">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-white text-white">
                    4
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Submit and save reference number</h3>
                  <p className="mt-1 text-sm text-gray-600">Keep your unique reference number for future correspondence.</p>
                </li>
                <li className="ml-10">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-white text-white">
                    5
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Check email for confirmation</h3>
                  <p className="mt-1 text-sm text-gray-600">You will receive an email with next steps information.</p>
                </li>
              </ol>
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/careers/forest-guard/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the deadline for applications?</AccordionTrigger>
                <AccordionContent>
                  The deadline for submitting applications is May 31, 2025.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I update my application after submitting?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can update your application until you click the final "Submit" button. After submission, you'll need to contact us for any changes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How will I know if I'm shortlisted?</AccordionTrigger>
                <AccordionContent>
                  Shortlisted candidates will receive both an SMS and email notification with instructions for the next steps in the recruitment process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What is the salary for Forest Guards?</AccordionTrigger>
                <AccordionContent>
                  Salary details will be provided during the interview process. The position offers competitive compensation along with training and development opportunities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Will accommodation be provided?</AccordionTrigger>
                <AccordionContent>
                  Basic accommodation may be provided for guards stationed in remote locations. Details will be shared with successful candidates.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForestGuard;
