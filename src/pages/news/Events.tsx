
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Events = () => {
  const upcomingEvents = [
    {
      title: "World Environment Day Celebration",
      date: "2024-06-05",
      time: "9:00 AM - 4:00 PM",
      location: "Sani Abacha Stadium, Kano",
      description: "Join us for tree planting, environmental exhibitions, and awareness programs to celebrate World Environment Day.",
      type: "Public Event"
    },
    {
      title: "Climate Change Adaptation Workshop",
      date: "2024-04-22",
      time: "10:00 AM - 3:00 PM",
      location: "Ministry Conference Hall",
      description: "Training workshop for local government officials on climate change adaptation strategies.",
      type: "Workshop"
    },
    {
      title: "Community Clean-up Campaign",
      date: "2024-04-15",
      time: "7:00 AM - 12:00 PM",
      location: "Various Locations",
      description: "Monthly community clean-up campaign across major markets and residential areas in Kano metropolis.",
      type: "Community Event"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="container-custom">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Join our environmental programs, workshops, and community events throughout the year.
            </p>
          </div>
        </section>

        {/* Events */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">{event.type}</span>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <Button className="w-full">Register / Learn More</Button>
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

export default Events;
