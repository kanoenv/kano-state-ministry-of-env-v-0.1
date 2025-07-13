
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/resources/PdfViewer';
import { useIsMobile } from '@/hooks/use-mobile';

const Resources = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with responsive banner */}
        <section className={`relative ${isMobile ? 'h-[35vh] min-h-[280px]' : 'h-[45vh] min-h-[360px]'}`} style={{
          backgroundImage: "url('/lovable-uploads/0d3d1165-7047-471a-9bcb-114fda7427da.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>
          <div className={`container mx-auto px-4 relative h-full flex flex-col justify-center ${isMobile ? 'text-center' : ''}`}>
            <div className="max-w-4xl">
              <h1 className={`text-white font-bold mb-3 ${isMobile ? 'text-2xl leading-tight' : 'text-4xl md:text-5xl'}`}>
                Environmental Resources & Documentation
              </h1>
              <p className={`text-white/90 max-w-3xl ${isMobile ? 'text-sm font-medium' : 'text-lg md:text-xl'}`}>
                Kano State Ministry of Environment
              </p>
              <p className={`text-white/85 max-w-3xl mt-3 ${isMobile ? 'text-sm leading-relaxed px-2' : 'text-base md:text-lg leading-relaxed'}`}>
                Access comprehensive environmental laws, regulations, and policy documents to stay informed and compliant with Kano State environmental standards and best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Introduction Section */}
        <section className={`bg-white border-b border-slate-100 ${isMobile ? 'py-6' : 'py-12'}`}>
          <div className="container mx-auto px-4">
            <div className={`max-w-4xl mx-auto ${isMobile ? 'text-center' : ''}`}>
              <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
                <h2 className={`font-bold text-slate-800 ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                  Official Legal Framework
                </h2>
                <p className={`text-slate-600 leading-relaxed ${isMobile ? 'text-sm px-2' : 'text-base md:text-lg'}`}>
                  Our comprehensive collection of environmental legislation, regulations, and policy documents provides the foundation for environmental protection and sustainable development in Kano State. These official documents serve as essential references for compliance, enforcement, and environmental stewardship.
                </p>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-4 gap-4'} mt-6`}>
                  <div className={`bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 ${isMobile ? 'text-center' : ''}`}>
                    <div className={`font-semibold text-blue-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>4</div>
                    <div className={`text-blue-600 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Official Documents</div>
                  </div>
                  <div className={`bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 ${isMobile ? 'text-center' : ''}`}>
                    <div className={`font-semibold text-green-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>2022-2025</div>
                    <div className={`text-green-600 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Coverage Period</div>
                  </div>
                  <div className={`bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 ${isMobile ? 'text-center' : ''}`}>
                    <div className={`font-semibold text-purple-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>Bilingual</div>
                    <div className={`text-purple-600 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>English & Hausa</div>
                  </div>
                  <div className={`bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200 ${isMobile ? 'text-center' : ''}`}>
                    <div className={`font-semibold text-orange-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>Free</div>
                    <div className={`text-orange-600 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Public Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Documents Section */}
        <section className={`bg-gradient-to-b from-white to-slate-50 ${isMobile ? 'py-8' : 'py-16'}`}>
          <div className="container mx-auto px-4">
            <div className={`mb-8 ${isMobile ? 'text-center' : ''}`}>
              <h2 className={`font-bold mb-4 text-slate-800 ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                Environmental Law Documents
              </h2>
              <p className={`text-slate-600 max-w-3xl ${isMobile ? 'text-sm leading-relaxed mx-auto px-2' : 'text-base md:text-lg'}`}>
                Download official environmental laws, regulations, and policy documents. All documents are provided in PDF format for easy access and reference.
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
