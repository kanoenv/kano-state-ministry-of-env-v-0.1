
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FAQs = () => {
  const faqCategories = [
    {
      category: "Environmental Permits",
      faqs: [
        {
          question: "How do I apply for an environmental permit?",
          answer: "Submit your application through our online portal with required documents including project description, environmental impact assessment, and site plans. Processing typically takes 30-45 days."
        },
        {
          question: "What types of projects require environmental permits?",
          answer: "Industrial facilities, construction projects over 5,000 sqm, waste treatment facilities, and any project that may impact water bodies or forest reserves require environmental permits."
        }
      ]
    },
    {
      category: "Waste Management",
      faqs: [
        {
          question: "What are the penalties for illegal waste dumping?",
          answer: "Illegal waste dumping carries fines ranging from ₦50,000 to ₦500,000 depending on the type and quantity of waste. Repeat offenders may face imprisonment."
        },
        {
          question: "How can I report illegal dumping?",
          answer: "Report illegal dumping through our hotline (080-XXXX-XXXX), mobile app, or online reporting form. Include location details and photos if possible."
        }
      ]
    },
    {
      category: "Air Quality",
      faqs: [
        {
          question: "How often is air quality monitored?",
          answer: "Air quality is monitored continuously at our 10 monitoring stations across Kano State. Data is updated hourly and available on our website and mobile app."
        },
        {
          question: "What should I do during poor air quality days?",
          answer: "Limit outdoor activities, keep windows closed, use air purifiers if available, and avoid exercising outdoors. Those with respiratory conditions should follow medical advice."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-12 md:py-16">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">Frequently Asked Questions</h1>
            </div>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              Find answers to common questions about environmental policies, procedures, and services.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container-custom max-w-4xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 md:mb-12">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-700">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left text-sm md:text-base">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-sm md:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQs;
