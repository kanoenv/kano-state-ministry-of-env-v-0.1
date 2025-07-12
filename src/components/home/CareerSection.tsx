
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Users, Award, MapPin, Clock } from 'lucide-react';

const CareerSection = () => {
  const careers = [
    {
      title: "Forest Guard Program",
      description: "Join Kano's elite Forest Guard initiative as specialized conservation professionals. Protect our natural heritage while building a sustainable career in environmental stewardship.",
      requirements: "Qualified Kano Indigenes aged 18–35 with passion for conservation",
      benefits: ["Competitive Compensation", "Professional Training", "Career Advancement", "Health Benefits"],
      urgent: true,
      link: "/careers/forest-guard"
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header - Mobile Responsive */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-white/90 backdrop-blur-lg border border-emerald-200/50 text-emerald-700 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Career Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight px-4">
            Professional
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Career Development
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Build your career with Kano State's premier environmental organization. 
            Join our mission to create sustainable solutions for future generations.
          </p>
        </div>

        {/* Enhanced Career Card - Mobile Responsive */}
        <div className="max-w-5xl mx-auto">
          {careers.map((career, index) => (
            <div key={index} className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-200/50 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2">
              {/* Urgent Badge */}
              {career.urgent && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      Urgent Hiring
                    </span>
                  </div>
                </div>
              )}
              
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50"></div>
              
              <div className="relative p-6 sm:p-8 lg:p-12 xl:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                  {/* Content */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                      <div className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-0 sm:mr-4 lg:mr-6 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="text-white w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{career.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 font-medium">{career.description}</p>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 border border-emerald-200/30">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mr-2 sm:mr-3" />
                        <p className="text-emerald-800 font-bold text-sm sm:text-base">Requirements:</p>
                      </div>
                      <p className="text-emerald-700 font-medium text-sm sm:text-base">{career.requirements}</p>
                    </div>
                    
                    {/* Benefits Grid - Mobile Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                      {career.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200/50 shadow-sm">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-xs sm:text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-12 text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
                    >
                      <Link to={career.link} className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Visual Element - Hidden on mobile, visible on large screens */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl lg:rounded-3xl shadow-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mb-4 lg:mb-6 mx-auto shadow-lg">
                            <Users className="w-8 h-8 lg:w-12 lg:h-12 text-white" strokeWidth={2} />
                          </div>
                          <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Join Our Team</h4>
                          <p className="text-gray-600 font-medium">Make a difference today</p>
                        </div>
                      </div>
                      
                      {/* Floating Stats */}
                      <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl border border-gray-200/50">
                        <div className="text-center">
                          <div className="text-lg lg:text-2xl font-black text-emerald-600">100+</div>
                          <div className="text-xs text-gray-600 font-medium">Positions</div>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl border border-gray-200/50">
                        <div className="text-center">
                          <div className="text-lg lg:text-2xl font-black text-blue-600">2025</div>
                          <div className="text-xs text-gray-600 font-medium">Recruitment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action - Mobile Responsive */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-4 sm:gap-6">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <Link to="/careers" className="group flex items-center gap-2 sm:gap-3 text-emerald-700 hover:text-emerald-800 font-bold text-sm sm:text-base lg:text-lg transition-colors">
              <span>View All Career Opportunities</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
