
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ArrowRight, Users, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Urban Gully Erosion Control Project at Bajallabe",
      date: "May 18, 2025",
      time: "9:00 AM - 2:00 PM",
      location: "Bajallabe Community, Kano",
      description: "Join our comprehensive community-led erosion control project featuring advanced engineering solutions and climate adaptation strategies to protect vulnerable neighborhoods.",
      attendees: "150+ Expected",
      category: "Community Impact",
      priority: "High Priority",
      image: "/lovable-uploads/ef52aa35-5a46-44df-82a7-a54293a8cbbf.png",
      highlights: ["Advanced Engineering", "Community Engagement", "Climate Adaptation", "Sustainable Solutions"],
      link: "/programs"
    },
    {
      id: 2,
      title: "2025 Five Million Trees Campaign Launch",
      date: "May 25, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Kano State Government House",
      description: "Experience the historic launch of Kano's most ambitious reforestation initiative, featuring cutting-edge planting technologies and comprehensive biodiversity conservation strategies.",
      attendees: "500+ Expected",
      category: "Government Initiative",
      priority: "Flagship Event",
      image: "/lovable-uploads/cf45aab3-ccbc-4ef5-a201-276198f68571.png",
      highlights: ["Historic Launch", "Technology Integration", "Biodiversity Focus", "State-wide Impact"],
      link: "/programs/five-million-trees"
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-slate-50/50 to-gray-50 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/6 to-cyan-500/6 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header - Mobile Responsive */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-white/90 backdrop-blur-lg border border-blue-200/50 text-blue-700 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Upcoming Events</span>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight px-4">
            Environmental
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Impact Events
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Join our transformative environmental initiatives and community engagement programs 
            designed to create lasting positive impact across Kano State.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {events.map((event, index) => (
            <Card key={event.id} className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:translate-y-[-4px] sm:hover:translate-y-[-8px] bg-white rounded-2xl sm:rounded-3xl">
              <CardContent className="p-0">
                {/* Enhanced Event Image - Mobile Responsive */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Priority Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1 sm:gap-2">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      {event.priority}
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <div className="bg-white/20 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border border-white/30">
                      {event.category}
                    </div>
                  </div>
                  
                  {/* Date Overlay */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                        <div>
                          <div className="font-black text-blue-600 text-sm sm:text-base lg:text-lg">{event.date}</div>
                          <div className="text-gray-600 text-xs sm:text-sm font-medium">{event.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Event Content - Mobile Responsive */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-4 sm:mb-6 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {event.title}
                  </h3>
                  
                  {/* Event Details Grid - Mobile Responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200/50">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-xs sm:text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200/50">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-xs sm:text-sm">{event.attendees}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed font-medium text-sm sm:text-base lg:text-lg">
                    {event.description}
                  </p>
                  
                  {/* Event Highlights - Mobile Responsive */}
                  <div className="mb-8 sm:mb-10">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      Key Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {event.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-emerald-50 px-3 sm:px-4 py-2 rounded-lg border border-emerald-200/50">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-emerald-700 font-medium text-xs sm:text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
                  >
                    <Link to={event.link}>
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Enhanced CTA - Mobile Responsive */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-4 sm:gap-6">
            <div className="w-12 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-xl font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm bg-white/80"
            >
              <Link to="/news/events">
                <span>Explore All Events</span>
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
              </Link>
            </Button>
            <div className="w-12 sm:w-20 lg:w-24 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
