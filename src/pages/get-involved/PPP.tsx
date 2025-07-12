
import React, { useState } from 'react';
import { Building2, Handshake, Target, Award, Upload, FileText, User, Mail, Phone, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  companyName: z.string().min(2, 'Company/Organization name is required'),
  abstract: z.string().min(50, 'Abstract must be at least 50 characters'),
});

type FormData = z.infer<typeof formSchema>;

const PPP = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalFile, setProposalFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      companyName: '',
      abstract: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
        return;
      }
      setProposalFile(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!proposalFile) {
      toast({
        title: "Missing PDF",
        description: "Please upload your proposal PDF before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format the message for WhatsApp
      const whatsappMessage = `*Partnership Proposal Submission*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Company/Organization:* ${data.companyName}

*Abstract:*
${data.abstract}

*Note:* Proposal PDF will be shared separately via email.

Sent from Ministry of Environment PPP Portal`;

      const phoneNumber = '2348030719901';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Proposal Submitted Successfully!",
        description: "Your partnership proposal has been sent via WhatsApp. Please also email your PDF proposal to complaints@environment.kn.gov.ng",
      });
      
      form.reset();
      setProposalFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerships = [
    {
      title: "Renewable Energy Projects",
      description: "Partner with us to develop solar and wind energy infrastructure",
      icon: <Target className="h-6 w-6" />,
      sector: "Energy"
    },
    {
      title: "Waste-to-Energy Solutions",
      description: "Innovative waste management and energy generation partnerships",
      icon: <Building2 className="h-6 w-6" />,
      sector: "Waste Management"
    },
    {
      title: "Environmental Technology",
      description: "Develop and deploy cutting-edge environmental monitoring systems",
      icon: <Award className="h-6 w-6" />,
      sector: "Technology"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]" style={{
          backgroundImage: "url('/lovable-uploads/b891ccb4-0eae-4159-a4fe-b8c1456a3efb.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Public-Private Partnership</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Collaborate with the Ministry to create sustainable environmental solutions through strategic partnerships.
            </p>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {partnerships.map((partnership, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        {partnership.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{partnership.title}</CardTitle>
                        <div className="text-sm text-gray-500">{partnership.sector}</div>
                      </div>
                    </div>
                    <CardDescription>{partnership.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Partnership Proposal Form */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Submit Partnership Proposal
                </CardTitle>
                <CardDescription>
                  Fill out the form below to submit your partnership proposal. We'll review it and get back to you within 5 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Company/Organization Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company/organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="abstract"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abstract</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a detailed abstract of your partnership proposal (minimum 50 characters)"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Proposal Document (PDF)
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                      {proposalFile && (
                        <p className="text-sm text-green-600">✓ {proposalFile.name} selected</p>
                      )}
                      {!proposalFile && (
                        <p className="text-sm text-gray-500">Please select a PDF file</p>
                      )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Important Notes:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Your proposal will be sent via WhatsApp for immediate notification</li>
                        <li>• Please also email your PDF proposal to complaints@environment.kn.gov.ng</li>
                        <li>• We'll review your proposal within 5 business days</li>
                        <li>• Make sure your proposal includes budget estimates and timeline</li>
                      </ul>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Partnership Proposal'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="bg-purple-50 p-8 rounded-xl text-center mt-12">
              <Handshake className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have questions about the partnership process or need assistance with your proposal, don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:complaints@environment.kn.gov.ng"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  complaints@environment.kn.gov.ng
                </a>
                <a 
                  href="tel:+2348030719901"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 px-6 py-3 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +234 803 071 9901
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PPP;
