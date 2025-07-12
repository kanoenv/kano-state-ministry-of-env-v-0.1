
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `Hello! New message from ${formData.name}

Subject: ${formData.subject}

Message: ${formData.message}

Email: ${formData.email}`;

    const phoneNumber = '2348030719901'; // Updated phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Message Prepared",
      description: "Your message has been prepared for WhatsApp. Please send it to complete your inquiry.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]"
          style={{
            backgroundImage: "url('/lovable-uploads/ef52aa35-5a46-44df-82a7-a54293a8cbbf.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Get in touch with the Ministry of Environment & Climate Change, Kano State.
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-kano-primary mb-8">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kano-primary focus:border-transparent"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kano-primary focus:border-transparent"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kano-primary focus:border-transparent"
                      placeholder="Subject of your message"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kano-primary focus:border-transparent"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-kano-primary mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-kano-primary/10 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-kano-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Address</h3>
                          <p className="text-gray-600">Block 5, Audu Bako Secretariat,</p>
                          <p className="text-gray-600">Kano State, Nigeria</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-kano-primary/10 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-kano-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Phone</h3>
                          <a href="tel:+2348030719901" className="text-gray-600 hover:text-kano-primary transition-colors">
                            +234 803 071 9901
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-kano-primary/10 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-kano-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Email</h3>
                          <a href="mailto:complaints@environment.kn.gov.ng" className="text-gray-600 hover:text-kano-primary transition-colors">
                            complaints@environment.kn.gov.ng
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-kano-primary/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-kano-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                          <p className="text-gray-600">Monday - Friday: 8:00 AM - 4:00 PM</p>
                          <p className="text-gray-600">Saturday - Sunday: Closed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="bg-kano-primary text-white p-3 rounded-full hover:bg-kano-primary/80 transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="https://twitter.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="bg-kano-primary text-white p-3 rounded-full hover:bg-kano-primary/80 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="https://instagram.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="bg-kano-primary text-white p-3 rounded-full hover:bg-kano-primary/80 transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="https://youtube.com/@kanoenvironment" target="_blank" rel="noopener noreferrer" className="bg-kano-primary text-white p-3 rounded-full hover:bg-kano-primary/80 transition-colors">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-8">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-kano-primary">Our Location</h2>
              <a 
                href="https://www.google.com/maps/place/Ministry+of+Environment/@11.9840882,8.5386095,738m/data=!3m2!1e3!4b1!4m6!3m5!1s0x11ae81a7e6151263:0x46d11be22f2243a3!8m2!3d11.9840882!4d8.5386095!16s%2Fg%2F11fzvj_7zw?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-kano-primary text-white px-4 py-2 rounded-lg hover:bg-kano-primary/90 transition-colors"
              >
                <ExternalLink size={18} />
                Open in Google Maps
              </a>
            </div>
            
            <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.5577234567!2d8.5386095!3d11.9840882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae81a7e6151263%3A0x46d11be22f2243a3!2sMinistry%20of%20Environment!5e0!3m2!1sen!2sng!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ministry of Environment Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
