import React, { useState } from 'react';
import { Calendar, Scale, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/resources/PdfViewer';

const Laws = () => {
  const [openLaws, setOpenLaws] = useState<number[]>([]);

  const toggleLaw = (index: number) => {
    setOpenLaws(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const laws = [
    {
      title: "Kano State Environmental Protection Law 2023",
      year: "2023",
      description: "Comprehensive environmental protection framework for Kano State including pollution control and conservation measures.",
      category: "Primary Legislation",
      content: `
SECTION 1: ENVIRONMENTAL PROTECTION FRAMEWORK

This law establishes a comprehensive environmental protection framework for Kano State, aimed at preserving our natural resources and ensuring sustainable development.

Key Provisions:
• Establishment of environmental standards for air, water, and soil quality
• Creation of monitoring and enforcement mechanisms
• Penalties for environmental violations
• Requirements for environmental impact assessments

SECTION 2: POLLUTION CONTROL MEASURES

The law mandates strict pollution control measures for:
- Industrial emissions and effluents
- Vehicular emissions
- Waste disposal and management
- Agricultural runoff

SECTION 3: CONSERVATION REQUIREMENTS

All development projects must:
1. Conduct environmental impact assessments
2. Implement mitigation measures
3. Maintain minimum green space requirements
4. Protect existing forest reserves and water bodies

SECTION 4: ENFORCEMENT AND PENALTIES

Violations of this law carry penalties ranging from ₦100,000 to ₦5,000,000 depending on the severity of the offense.`
    },
    {
      title: "Forest Reserve Management Regulations",
      year: "2022",
      description: "Regulations governing the management and protection of forest reserves within Kano State.",
      category: "Regulations",
      content: `
REGULATION 1: FOREST RESERVE DESIGNATION

This regulation establishes the framework for designating and managing forest reserves in Kano State.

Protected Areas Include:
• Falgore Game Reserve
• Kano River Basin forests
• Community forest reserves
• Sacred groves and traditional forests

REGULATION 2: PERMITTED ACTIVITIES

Within forest reserves, the following activities are regulated:
- Scientific research (with permits)
- Ecotourism activities
- Traditional medicine collection (sustainable quantities)
- Community-based forest management

REGULATION 3: PROHIBITED ACTIVITIES

Strictly prohibited activities include:
- Unauthorized logging or tree cutting
- Hunting of protected species
- Agricultural encroachment
- Dumping of waste materials
- Setting of fires

REGULATION 4: COMMUNITY PARTICIPATION

Local communities are encouraged to participate in forest management through:
1. Formation of Community Forest User Groups
2. Training in sustainable forest practices
3. Benefit-sharing arrangements
4. Traditional knowledge integration`
    },
    {
      title: "Air Quality Standards and Monitoring Guidelines",
      year: "2023",
      description: "Standards for air quality monitoring and pollution control measures for industrial and residential areas.",
      category: "Guidelines",
      content: `
GUIDELINE 1: AIR QUALITY STANDARDS

Kano State adopts the following air quality standards:

Particulate Matter (PM2.5): 25 μg/m³ (24-hour average)
Particulate Matter (PM10): 50 μg/m³ (24-hour average)
Nitrogen Dioxide (NO2): 40 μg/m³ (annual average)
Sulfur Dioxide (SO2): 20 μg/m³ (24-hour average)
Carbon Monoxide (CO): 10 mg/m³ (8-hour average)

GUIDELINE 2: MONITORING REQUIREMENTS

All major industrial facilities must:
- Install continuous emission monitoring systems
- Report monthly emission data
- Conduct annual stack testing
- Maintain emission control equipment

GUIDELINE 3: RESIDENTIAL AREA PROTECTION

Special measures for residential areas include:
• Buffer zones around industrial facilities
• Restrictions on diesel generator usage
• Vehicle emission testing requirements
• Public transportation promotion

GUIDELINE 4: EMERGENCY RESPONSE

During air quality emergencies:
1. Issue public health advisories
2. Implement temporary emission restrictions
3. Advise vulnerable populations
4. Coordinate with health authorities`
    },
    {
      title: "Waste Management and Disposal Act",
      year: "2021",
      description: "Legal framework for waste collection, treatment, and disposal including penalties for illegal dumping.",
      category: "Primary Legislation",
      content: `
ACT 1: WASTE CLASSIFICATION

This act classifies waste into the following categories:

Municipal Solid Waste:
- Household waste
- Commercial waste
- Street sweepings
- Market waste

Hazardous Waste:
- Medical waste
- Industrial chemicals
- Electronic waste
- Batteries and oils

ACT 2: COLLECTION AND TRANSPORT

Waste collection requirements:
• Licensed waste collectors only
• Segregation at source
• Proper storage containers
• Regular collection schedules

ACT 3: TREATMENT AND DISPOSAL

Approved disposal methods:
- Composting for organic waste
- Recycling for reusable materials
- Sanitary landfilling for residual waste
- Incineration for medical waste (licensed facilities only)

ACT 4: PENALTIES

Illegal dumping penalties:
- First offense: ₦50,000 fine
- Second offense: ₦200,000 fine
- Third offense: ₦500,000 fine + possible imprisonment
- Corporate violations: Up to ₦2,000,000`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with new banner */}
        <section className="relative h-[50vh] min-h-[400px]" style={{
          backgroundImage: "url('/lovable-uploads/0d3d1165-7047-471a-9bcb-114fda7427da.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-8 w-8 md:h-10 md:w-10 text-white" />
                <h1 className="text-white text-3xl md:text-5xl font-bold">Environmental Laws</h1>
              </div>
              <p className="text-white/90 text-base md:text-lg max-w-2xl">
                Access current environmental legislation and legal frameworks governing environmental protection in Kano State.
              </p>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documents">PDF Documents</TabsTrigger>
                <TabsTrigger value="full-text">Full Text Laws</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents" className="mt-8">
                <PdfViewer />
              </TabsContent>
              
              <TabsContent value="full-text" className="mt-8">
                <div className="space-y-4 md:space-y-6">
                  {laws.map((law, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs md:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{law.category}</span>
                              <div className="flex items-center text-gray-500 text-xs md:text-sm">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                {law.year}
                              </div>
                            </div>
                            <CardTitle className="text-lg md:text-xl mb-2">{law.title}</CardTitle>
                            <p className="text-gray-600 text-sm md:text-base">{law.description}</p>
                          </div>
                          <Collapsible open={openLaws.includes(index)} onOpenChange={() => toggleLaw(index)}>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" size="sm" className="ml-4">
                                <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                <span className="text-xs md:text-sm">Read Full Text</span>
                                {openLaws.includes(index) ? 
                                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1" /> : 
                                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                                }
                              </Button>
                            </CollapsibleTrigger>
                          </Collapsible>
                        </div>
                      </CardHeader>
                      <Collapsible open={openLaws.includes(index)} onOpenChange={() => toggleLaw(index)}>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
                              <pre className="whitespace-pre-wrap text-xs md:text-sm text-gray-700 font-mono leading-relaxed">
                                {law.content}
                              </pre>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Laws;
