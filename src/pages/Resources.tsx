
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/resources/PdfViewer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with new banner */}
        <section className="relative h-[50vh] min-h-[400px]" style={{
          backgroundImage: "url('/lovable-uploads/0d3d1165-7047-471a-9bcb-114fda7427da.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                Law Resources & Policies
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl">
                for Kano State Ministry of Environment
              </p>
              <p className="text-white/80 text-base md:text-lg max-w-3xl mt-4">
                Access comprehensive environmental laws, regulations, and policy documents to stay informed and compliant with Kano State environmental standards.
              </p>
            </div>
          </div>
        </section>

        {/* Laws Resources & Policies Button Section */}
        <section className="py-8 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200/50">
          <div className="container-custom">
            <div className="flex justify-center">
              <Link to="/resources/laws">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:translate-y-[-2px] rounded-xl border border-blue-500/20"
                >
                  <Scale className="mr-3 h-6 w-6" />
                  Laws Resources & Policies
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* PDF Documents Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Environmental Law Documents</h2>
              <p className="text-gray-600 text-lg">
                Browse and download official environmental laws, regulations, and policy documents.
              </p>
            </div>
            
            <PdfViewer />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
