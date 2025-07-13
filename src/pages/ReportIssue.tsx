
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Upload, Map, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z.string().min(3, { message: "Please enter a valid location." }),
  issueType: z.string({
    required_error: "Please select an issue type.",
  }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
});

const ReportIssue = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      issueType: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Map form values to database structure
      const reportData = {
        type: values.issueType,
        location: values.location,
        description: values.description,
        reporter_name: values.name,
        reporter_email: values.email,
        reporter_phone: values.phone,
        status: 'New',
        photos: []
      };

      console.log('Submitting report:', reportData);

      const { error } = await supabase
        .from('reports')
        .insert([reportData]);

      if (error) {
        throw error;
      }

      console.log('Report submitted successfully');
      
      toast({
        title: "Report submitted successfully",
        description: "Thank you for reporting this issue. We will investigate promptly and keep you updated.",
      });
      
      setIsSubmitted(true);
      form.reset();
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error submitting report",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="bg-kano-primary text-white py-16">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={32} />
              <h1 className="text-3xl md:text-4xl font-bold">Report Submitted Successfully</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Your environmental issue report has been received and forwarded to our response team.
            </p>
          </div>
        </div>
        
        <main className="flex-grow py-12 bg-gray-50">
          <div className="container-custom text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <CheckCircle className="mx-auto mb-4 text-green-600" size={64} />
                <h2 className="text-2xl font-bold mb-4">Thank You for Your Report</h2>
                <p className="text-gray-600 mb-6">
                  We have received your environmental issue report. Our team will review it within 24 hours and take appropriate action. 
                  You will receive updates via email at the address you provided.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mr-4"
                  >
                    Submit Another Report
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="bg-kano-primary hover:bg-kano-primary/90"
                  >
                    Return Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-kano-primary text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Report Environmental Issue</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Help us keep Kano clean and safe by reporting environmental hazards or issues in your community.
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg border-t-4 border-t-kano-primary">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
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
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location of Issue *</FormLabel>
                              <FormControl>
                                <Input placeholder="Address or landmark" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="issueType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Issue *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select issue type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Illegal Dumping">Illegal Dumping</SelectItem>
                                <SelectItem value="Water Pollution">Water Pollution</SelectItem>
                                <SelectItem value="Air Pollution">Air Pollution</SelectItem>
                                <SelectItem value="Deforestation">Deforestation</SelectItem>
                                <SelectItem value="Soil Erosion">Soil Erosion</SelectItem>
                                <SelectItem value="Flooding">Flooding</SelectItem>
                                <SelectItem value="Industrial Pollution">Industrial Pollution</SelectItem>
                                <SelectItem value="Noise Pollution">Noise Pollution</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Describe the Issue *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide a detailed description of the environmental issue, including when you noticed it, its severity, and any immediate dangers it may pose." 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Button type="button" variant="outline" className="flex items-center gap-2" disabled>
                          <Upload size={16} />
                          Add Photos (Coming Soon)
                        </Button>
                        <FormDescription className="mt-2">
                          Photo upload functionality will be available soon. For now, please provide a detailed description.
                        </FormDescription>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-kano-primary hover:bg-kano-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting Report...
                          </>
                        ) : (
                          'Submit Report'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        What to Report
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Illegal waste dumping</li>
                        <li>Industrial pollution</li>
                        <li>Water contamination</li>
                        <li>Harmful air emissions</li>
                        <li>Deforestation activities</li>
                        <li>Soil erosion issues</li>
                        <li>Flooding concerns</li>
                        <li>Noise pollution</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Map size={18} />
                        Response Process
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">1. Report Review (24 hours)</p>
                        <p className="font-medium">2. Field Investigation (2-5 days)</p>
                        <p className="font-medium">3. Action Plan Development</p>
                        <p className="font-medium">4. Implementation & Follow-up</p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <h3 className="font-medium text-yellow-800">Emergency Hotline</h3>
                      <p className="text-yellow-700 text-sm">For immediate environmental emergencies call:</p>
                      <p className="font-bold text-yellow-800">080-KANO-ENV</p>
                      <p className="text-yellow-700 text-sm">(080-5266-368)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportIssue;
