import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Award, Target, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  background_image_url: string;
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  display_order: number;
  is_active: boolean;
}

const HeroSection = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const [heroFrames, setHeroFrames] = useState<HomeBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap = {
    Globe,
    Target,
    Award
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from('home_banners')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching banners:', error);
          return;
        }

        if (data && data.length > 0) {
          // Transform the data to match our interface
          const transformedData: HomeBanner[] = data.map(banner => ({
            ...banner,
            stats: Array.isArray(banner.stats) ? banner.stats as Array<{value: string; label: string; icon: string}> : []
          }));
          setHeroFrames(transformedData);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);
  
  const nextFrame = () => {
    setActiveFrame((prev) => (prev + 1) % heroFrames.length);
  };

  const prevFrame = () => {
    setActiveFrame((prev) => (prev - 1 + heroFrames.length) % heroFrames.length);
  };

  useEffect(() => {
    if (heroFrames.length === 0) return;
    
    const interval = setInterval(() => {
      nextFrame();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [heroFrames.length]);

  if (isLoading) {
    return (
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] xl:h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (heroFrames.length === 0) {
    return (
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] xl:h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">No active banners found</p>
        </div>
      </section>
    );
  }

  const currentFrame = heroFrames[activeFrame];

  return (
    <section 
      className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] xl:h-screen flex items-center transition-all duration-1000 ease-in-out overflow-hidden"
      style={{
        backgroundImage: `url('${currentFrame.background_image_url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'crisp-edges'
      }}
    >
      {/* Enhanced professional gradient overlay with better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/85 sm:from-slate-900/70 sm:via-slate-800/60 sm:to-slate-900/75"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent sm:from-emerald-900/25"></div>
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 sm:-top-20 sm:-right-20 sm:w-40 sm:h-40 lg:-top-40 lg:-right-40 lg:w-80 lg:h-80 bg-emerald-400/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:-bottom-20 sm:-left-20 sm:w-48 sm:h-48 lg:-bottom-40 lg:-left-40 lg:w-96 lg:h-96 bg-blue-400/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left pt-4 sm:pt-6 lg:pt-0">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="inline-block animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <span className="bg-gradient-to-r from-emerald-600/50 to-blue-600/50 text-emerald-100 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm font-semibold border border-emerald-400/50 backdrop-blur-md shadow-xl">
                  Kano State Ministry of Environment and Climate Change
                </span>
              </div>
              
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                  {currentFrame.title}
                </span>
              </h1>
              
              <p className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light animate-slide-in drop-shadow-md px-2 sm:px-0" style={{ animationDelay: '0.6s' }}>
                {currentFrame.subtitle}
              </p>
            </div>
            
            {/* Enhanced Professional Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-in px-2 sm:px-0 justify-center lg:justify-start" style={{ animationDelay: '0.8s' }}>
              <Button 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-xl shadow-2xl transition-all duration-500 transform hover:translate-y-[-2px] hover:shadow-emerald-500/25 group border border-emerald-500/20 w-full sm:w-auto"
                asChild
              >
                <Link to={currentFrame.cta_link}>
                  <span className="font-semibold">{currentFrame.cta_text}</span>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-2 border-slate-300/60 bg-white/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-xl backdrop-blur-md transition-all duration-500 shadow-2xl hover:shadow-white/25 group w-full sm:w-auto"
                asChild
              >
                <Link to={currentFrame.secondary_cta_link}>
                  <span className="font-semibold">{currentFrame.secondary_cta_text}</span>
                  <Play size={14} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
            
            {/* Enhanced Professional Statistics - Mobile Optimized */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8 border-t border-slate-400/30 animate-slide-in px-2 sm:px-0" style={{ animationDelay: '1s' }}>
              {currentFrame.stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Globe;
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-md group-hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg">
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-emerald-300" />
                      </div>
                    </div>
                    <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">{stat.value}</div>
                    <div className="text-slate-300 text-xs sm:text-sm font-medium leading-tight drop-shadow-md">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Visual element space for larger screens */}
          <div className="hidden lg:block"></div>
        </div>
        
        {/* Enhanced frame controls - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {heroFrames.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFrame(index)}
              className={`transition-all duration-700 rounded-full shadow-xl backdrop-blur-md border ${
                index === activeFrame 
                  ? 'bg-emerald-600 w-6 h-2 sm:w-8 sm:h-2 lg:w-12 lg:h-3 border-white/50'
                  : 'bg-white/30 w-2 h-2 sm:w-3 sm:h-3 hover:bg-white/50 border-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Enhanced navigation arrows - Hidden on Mobile */}
      <button
        onClick={prevFrame}
        className="hidden sm:block absolute left-3 lg:left-4 xl:left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-emerald-600 text-white p-3 lg:p-4 rounded-full transition-all duration-500 z-20 shadow-2xl backdrop-blur-md hover:scale-110 group border border-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextFrame}
        className="hidden sm:block absolute right-3 lg:right-4 xl:right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-emerald-600 text-white p-3 lg:p-4 rounded-full transition-all duration-500 z-20 shadow-2xl backdrop-blur-md hover:scale-110 group border border-white/20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Professional scroll indicator - Mobile Optimized */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 sm:w-5 sm:h-8 lg:w-6 lg:h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-md bg-white/10 shadow-lg">
          <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 lg:h-3 bg-white/80 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
