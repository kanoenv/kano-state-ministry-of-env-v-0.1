
import React from 'react';
import { Building, Leaf, FileText, Shield, ThermometerSnowflake, Trash, Target, Globe, Award, Users, TreePine, Droplets } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50/50 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header - Mobile Responsive with Red Accent */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-white/90 backdrop-blur-lg border border-red-200/50 text-red-700 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Our Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Mission, Vision & 
            <span className="block bg-gradient-to-r from-emerald-600 via-red-600 to-blue-600 bg-clip-text text-transparent">
              Strategic Mandate
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-20 lg:mb-24">
          {/* Enhanced Mission - Mobile Responsive */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-700/10 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-emerald-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 md:p-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg sm:rounded-xl shadow-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-black">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
                To manage land, air, and water pollution; conserve habitats and biodiversity; 
                develop alternative energy sources; promote environmental education; 
                prevent and control drought, desertification, flood, and erosion; 
                restore degraded lands; and address climate change issues through innovative, 
                technology-driven solutions.
              </p>
            </div>
          </div>

          {/* Enhanced Vision - Mobile Responsive */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl sm:rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-blue-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 md:p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl shadow-lg">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-blue-700 text-xl sm:text-2xl lg:text-3xl font-black">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
                To improve the quality of living through healthy environmental development, 
                transforming Kano into a clean, green, and climate‑resilient state that serves 
                as a model for sustainable development across West Africa.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Mandate Section - Mobile Responsive with Red Accents */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 sm:mb-8 px-4">
              Strategic <span className="text-red-600">Mandate</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Our comprehensive approach to environmental stewardship encompasses six core areas of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-emerald-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Policy Excellence</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Plan, promote, coordinate, and oversee implementation of cutting-edge environmental policies and sustainable development programs.</p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Environmental Quality</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Secure and foster a quality environment conducive to ecosystem health, biodiversity conservation, and human well‑being.</p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-red-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trash className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Waste Innovation</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Provide effective, efficient waste management systems and promote sustainable use of natural resources through innovation.</p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-cyan-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Climate Protection</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Design and execute advanced measures to prevent flooding, erosion, drought, and desertification through climate resilience.</p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-red-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Pollution Control</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Control industrial waste, atmospheric pollution, and implement advanced sewage treatment technologies.</p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-300/50 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-2 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-gray-900">Sanitation Excellence</h4>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">Undertake comprehensive solid waste disposal and implement world-class environmental sanitation standards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
