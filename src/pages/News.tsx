
import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const News = () => {
  const latestNews = [
    {
      title: "New Air Quality Monitoring Stations Launched",
      date: "2024-03-15",
      category: "Press Release",
      excerpt: "Five new monitoring stations deployed across Kano metropolitan area to enhance real-time air quality tracking.",
      link: "/news/press-releases"
    },
    {
      title: "World Environment Day Celebration 2024",
      date: "2024-06-05",
      category: "Event",
      excerpt: "Join us for the annual World Environment Day celebration with tree planting and community awareness programs.",
      link: "/news/events"
    },
    {
      title: "Forest Guard Recruitment Drive",
      date: "2024-02-20",
      category: "Press Release",
      excerpt: "Ministry announces recruitment of 200 forest guards to strengthen environmental protection efforts.",
      link: "/news/press-releases"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]" style={{
          backgroundImage: "url('/lovable-uploads/cee4a717-6385-4f65-90ff-da330b7b74c4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">News & Media</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Stay updated with the latest environmental news, events, and announcements from the Ministry.
            </p>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Newspaper className="h-6 w-6 text-blue-600" />
                    <CardTitle>Press Releases</CardTitle>
                  </div>
                  <CardDescription>
                    Official announcements and statements from the Ministry of Environment & Climate Change.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/news/press-releases">View All Press Releases</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-6 w-6 text-green-600" />
                    <CardTitle>Events</CardTitle>
                  </div>
                  <CardDescription>
                    Upcoming events, workshops, and community programs organized by the Ministry.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/news/events">View All Events</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent News Items */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Recent News</h3>
              {latestNews.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 font-medium">{item.category}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <Link to={item.link} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      Read more <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
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

export default News;
