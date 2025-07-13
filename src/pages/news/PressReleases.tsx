
import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PressReleases = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const pressReleases = [
    {
      id: 1,
      title: "New Air Quality Monitoring Network Operational",
      date: "2024-03-15",
      excerpt: "The Ministry announces the successful deployment of 10 new air quality monitoring stations across Kano State, providing real-time data to residents.",
      content: "The Ministry of Environment & Climate Change is pleased to announce the successful deployment of 10 new air quality monitoring stations across Kano State. These state-of-the-art monitoring stations are now operational and providing real-time air quality data to residents through our online portal. The stations are strategically located in high-traffic areas including Sabon Gari, Fagge, Dala, and other key locations across the metropolitan area. Each station monitors PM2.5, PM10, NO2, SO2, CO, and Ozone levels, providing comprehensive air quality information. Residents can access this data through our website and mobile application to make informed decisions about outdoor activities. This initiative is part of our commitment to environmental transparency and public health protection."
    },
    {
      id: 2,
      title: "Forest Guard Recruitment Programme Launched",
      date: "2024-02-20",
      excerpt: "Applications are now open for 200 forest guard positions as part of our commitment to strengthen environmental protection in Kano State.",
      content: "The Ministry of Environment & Climate Change has officially launched the recruitment program for 200 Forest Guard positions. This recruitment drive is part of our comprehensive strategy to strengthen environmental protection across Kano State's forest reserves and green spaces. Successful candidates will undergo intensive training in forest management, wildlife protection, fire prevention, and community engagement. The program aims to enhance our capacity to protect and preserve Kano State's natural resources while providing employment opportunities for qualified young people. Applications are open until March 31, 2024, and interested candidates must meet specific educational and physical fitness requirements. Training will commence in May 2024, with deployment scheduled for July 2024."
    },
    {
      id: 3,
      title: "Partnership Agreement with UNDP Signed",
      date: "2024-01-18",
      excerpt: "Strategic partnership established to enhance climate change adaptation and environmental sustainability projects across the state.",
      content: "The Ministry of Environment & Climate Change has signed a strategic partnership agreement with the United Nations Development Programme (UNDP) to enhance climate change adaptation and environmental sustainability projects across Kano State. This three-year partnership will focus on capacity building, technology transfer, and implementation of climate-resilient infrastructure projects. Key areas of collaboration include renewable energy development, sustainable agriculture practices, water resource management, and community-based environmental conservation programs. The partnership will also support the establishment of climate data collection systems and early warning mechanisms for extreme weather events. Through this collaboration, we aim to build a more resilient and sustainable environment for the people of Kano State."
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container-custom">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Press Releases</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Official statements and announcements from the Ministry of Environment & Climate Change.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="container-custom">
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <Card key={release.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {release.date}
                      </div>
                      <p className="text-gray-600 mb-4">{release.excerpt}</p>
                      
                      {expandedId === release.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">{release.content}</p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        onClick={() => toggleExpand(release.id)}
                        className="flex items-center gap-2"
                      >
                        {expandedId === release.id ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Read Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Read More
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PressReleases;
