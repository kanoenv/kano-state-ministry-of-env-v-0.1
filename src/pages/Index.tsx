
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import QuickLinks from '@/components/home/QuickLinks';
import MissionVision from '@/components/home/MissionVision';
import Messages from '@/components/home/Messages';
import FeaturedAgencies from '@/components/home/FeaturedAgencies';
import AirQualityWidget from '@/components/home/AirQualityWidget';
import SuccessStories from '@/components/home/SuccessStories';
import EventsSection from '@/components/home/EventsSection';
import VideoSection from '@/components/home/VideoSection';
import ReportBanner from '@/components/ui/ReportBanner';
import CareerSection from '@/components/home/CareerSection';
import PartnersSection from '@/components/home/PartnersSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Enhanced for desktop/tablet */}
        <div className="w-full">
          <HeroSection />
        </div>
        
        {/* Quick Links - Professional spacing for larger screens */}
        <div className="w-full">
          <QuickLinks />
        </div>
        
        {/* Mission & Vision - Better layout for desktop */}
        <div className="w-full">
          <MissionVision />
        </div>
        
        {/* Governor & Commissioner Messages - Enhanced for larger screens */}
        <div className="w-full">
          <Messages />
        </div>
        
        {/* Featured Agencies - Professional desktop layout */}
        <div className="w-full">
          <FeaturedAgencies />
        </div>
        
        {/* Careers Section - Enhanced responsiveness */}
        <div className="w-full">
          <CareerSection />
        </div>
        
        {/* Air Quality Widget - Better positioning */}
        <div className="w-full">
          <AirQualityWidget />
        </div>
        
        {/* Video Section - Optimized for all screens */}
        <div className="w-full">
          <VideoSection />
        </div>
        
        {/* Success Stories - Professional layout */}
        <div className="w-full">
          <SuccessStories />
        </div>
        
        {/* Events Section - Enhanced for desktop */}
        <div className="w-full">
          <EventsSection />
        </div>
        
        {/* Partners Section - Better spacing */}
        <div className="w-full">
          <PartnersSection />
        </div>
        
        {/* Report Banner - Consistent width */}
        <div className="w-full">
          <ReportBanner />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
