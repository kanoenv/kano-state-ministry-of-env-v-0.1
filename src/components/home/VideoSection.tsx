
import React, { useState } from 'react';
import { Play, Award, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = 'p_sWLnwfyLM';
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
              <Award className="w-5 h-5 text-red-400" />
              <span className="text-white font-semibold">Documentary</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Environmental Impact in Action
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              See how our ministry is transforming Kano State through innovative environmental policies and climate action programs. This video highlights our recent initiatives and the positive changes they've brought to our communities.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Comprehensive environmental restoration projects</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Community engagement and empowerment initiatives</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Climate adaptation and resilience building</span>
              </div>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-500 transform hover:translate-y-[-2px] group"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Watch Documentary
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700/50 group backdrop-blur-sm">
              {!showVideo ? (
                <>
                  <AspectRatio ratio={16 / 9} className="bg-gray-800">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ 
                        backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
                      }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <button 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl hover:shadow-red-500/50"
                      onClick={() => setShowVideo(true)}
                      aria-label="Play video"
                    >
                      <Play className="h-10 w-10 ml-1" />
                    </button>
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Kano State Environmental Transformation</h3>
                      <div className="flex items-center text-sm">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">Official Documentary</span>
                      </div>
                    </div>
                  </AspectRatio>
                </>
              ) : (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                    title="Kano State Environmental Transformation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-3xl"
                  ></iframe>
                </AspectRatio>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
