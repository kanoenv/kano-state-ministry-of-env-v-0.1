
import React from 'react';
import { Heart, TreePine, Recycle, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VolunteerContactForm from '@/components/forms/VolunteerContactForm';

const Volunteer = () => {
  const { toast } = useToast();

  const programs = [
    {
      title: "Tree Planting Initiatives",
      description: "Join weekend tree planting events across Kano State",
      icon: <TreePine className="h-6 w-6" />,
      commitment: "Weekends",
      location: "Various locations"
    },
    {
      title: "Waste Management Campaigns",
      description: "Help organize community cleanup and recycling drives",
      icon: <Recycle className="h-6 w-6" />,
      commitment: "Monthly",
      location: "Urban areas"
    },
    {
      title: "Environmental Education",
      description: "Teach environmental awareness in schools and communities",
      icon: <GraduationCap className="h-6 w-6" />,
      commitment: "Flexible",
      location: "Schools & communities"
    }
  ];

  const handleJoinProgram = (programTitle: string) => {
    // Create WhatsApp message for program joining
    const whatsappMessage = `Hello! I'm interested in joining the "${programTitle}" volunteer program. Please provide me with more information about how to get started.`;
    
    const phoneNumber = '2348030719901';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Program Interest Sent",
      description: `Your interest in "${programTitle}" has been sent to our coordinator.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]" style={{
          backgroundImage: "url('/lovable-uploads/773a1a8d-adeb-4cee-b6a0-dbda69b1d5c1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Volunteer with Us</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Make a difference in your community through environmental volunteer programs.
            </p>
          </div>
        </section>

        {/* Volunteer Programs */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Volunteer Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {programs.map((program, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        {program.icon}
                      </div>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div><span className="font-medium">Time Commitment:</span> {program.commitment}</div>
                      <div><span className="font-medium">Location:</span> {program.location}</div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleJoinProgram(program.title)}
                    >
                      Join Program
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Contact our volunteer coordinator to learn more about upcoming opportunities and how you can contribute to environmental conservation in Kano State.
              </p>
              <VolunteerContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
