
import React, { useState } from 'react';
import { BookOpen, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Guidelines = () => {
  const [openGuidelines, setOpenGuidelines] = useState<number[]>([]);

  const toggleGuideline = (index: number) => {
    setOpenGuidelines(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const guidelines = [
    {
      title: "Environmental Impact Assessment Guidelines",
      category: "Assessment Procedures",
      description: "Comprehensive guide for conducting environmental impact assessments for development projects.",
      content: `
CHAPTER 1: INTRODUCTION TO EIA

Environmental Impact Assessment (EIA) is a systematic process used to identify, predict, and evaluate the environmental effects of proposed development projects.

Purpose of EIA:
• Identify potential environmental impacts
• Propose mitigation measures
• Ensure sustainable development
• Facilitate informed decision-making

CHAPTER 2: EIA PROCESS STEPS

Step 1: Screening
- Determine if EIA is required
- Assess project significance
- Consider environmental sensitivity

Step 2: Scoping
- Identify key environmental issues
- Define study boundaries
- Establish terms of reference

Step 3: Impact Assessment
- Baseline environmental conditions
- Impact prediction and evaluation
- Significance assessment

Step 4: Mitigation
- Develop mitigation measures
- Design monitoring programs
- Prepare management plans

Step 5: Reporting
- Prepare EIA report
- Include non-technical summary
- Submit to regulatory authorities

CHAPTER 3: REQUIRED DOCUMENTATION

All EIA submissions must include:
1. Project description and alternatives
2. Baseline environmental conditions
3. Impact assessment methodology
4. Mitigation and monitoring plans
5. Public consultation summary

CHAPTER 4: REVIEW AND APPROVAL

The review process involves:
• Technical review by experts
• Public participation period
• Decision-making by authorities
• Monitoring and compliance
`
    },
    {
      title: "Industrial Emission Standards",
      category: "Compliance",
      description: "Standards and procedures for industrial emissions monitoring and compliance reporting.",
      content: `
STANDARD 1: EMISSION LIMITS

Air Emission Limits (mg/Nm³):
• Particulate Matter: 50
• Sulfur Dioxide: 400
• Nitrogen Oxides: 500
• Carbon Monoxide: 300

Water Discharge Limits (mg/L):
• BOD: 30
• COD: 150
• TSS: 50
• pH: 6.0-9.0

STANDARD 2: MONITORING REQUIREMENTS

Continuous Monitoring:
- Large industrial facilities (>50MW)
- Chemical processing plants
- Cement and steel industries

Periodic Monitoring:
- Medium industries (monthly)
- Small industries (quarterly)
- Service industries (annually)

STANDARD 3: REPORTING PROCEDURES

Monthly Reports Must Include:
1. Emission measurement data
2. Process operational parameters
3. Maintenance activities
4. Deviation explanations
5. Corrective actions taken

STANDARD 4: COMPLIANCE ACTIONS

Non-compliance triggers:
• Warning notices for minor violations
• Improvement notices for moderate violations
• Closure orders for severe violations
• Legal action for repeated violations

Quality Assurance Requirements:
- Calibrated monitoring equipment
- Certified laboratory analysis
- Trained personnel
- Standard operating procedures
`
    },
    {
      title: "Community Tree Planting Manual",
      category: "Conservation",
      description: "Step-by-step guide for organizing community tree planting initiatives and maintenance.",
      content: `
SECTION 1: PLANNING YOUR TREE PLANTING PROJECT

Pre-Planning Checklist:
✓ Identify suitable planting sites
✓ Select appropriate tree species
✓ Secure necessary permits
✓ Organize community volunteers
✓ Arrange tools and materials

Site Selection Criteria:
• Available space and accessibility
• Soil quality and drainage
• Water availability
• Protection from grazing animals
• Community acceptance

SECTION 2: TREE SPECIES SELECTION

Recommended Native Species:

Fast-Growing Species:
- Neem (Azadirachta indica)
- Eucalyptus (Eucalyptus species)
- Cassia (Cassia siamea)

Fruit Trees:
- Mango (Mangifera indica)
- Cashew (Anacardium occidentale)
- Guava (Psidium guajava)

Shade Trees:
- Mahogany (Khaya senegalensis)
- Silk Cotton (Ceiba pentandra)
- Baobab (Adansonia digitata)

SECTION 3: PLANTING PROCEDURES

Best Planting Practices:
1. Dig holes 60cm x 60cm x 60cm
2. Mix topsoil with organic matter
3. Plant during rainy season (May-September)
4. Water immediately after planting
5. Mulch around base to retain moisture

Spacing Guidelines:
• Large trees: 8-10 meters apart
• Medium trees: 5-6 meters apart
• Small trees: 3-4 meters apart

SECTION 4: MAINTENANCE AND CARE

First Year Care:
- Weekly watering (if no rain)
- Monthly weeding around trees
- Quarterly inspection for pests
- Annual pruning for shape

Long-term Maintenance:
• Establish community care groups
• Train local tree wardens
• Monitor survival rates
• Replace failed plantings
`
    },
    {
      title: "Waste Segregation and Recycling Guide",
      category: "Waste Management",
      description: "Best practices for household and commercial waste segregation and recycling programs.",
      content: `
GUIDE 1: WASTE SEGREGATION AT SOURCE

Waste Categories:

Organic Waste (Green Container):
• Food scraps and leftovers
• Garden waste and leaves
• Paper towels and napkins
• Natural fiber clothing

Recyclable Waste (Blue Container):
• Plastic bottles and containers
• Glass bottles and jars
• Metal cans and containers
• Paper and cardboard

Non-Recyclable Waste (Black Container):
• Diapers and sanitary items
• Cigarette butts
• Broken ceramics
• Mixed material items

GUIDE 2: HOUSEHOLD RECYCLING

Setting Up Home Recycling:
1. Provide separate containers
2. Label containers clearly
3. Rinse containers before disposal
4. Remove caps and labels where possible
5. Flatten cardboard boxes

Do's and Don'ts:
✓ Clean containers before recycling
✓ Separate different materials
✓ Follow collection schedule
✗ Mix different waste types
✗ Include contaminated items
✗ Put hazardous materials in regular waste

GUIDE 3: COMMERCIAL RECYCLING

Business Requirements:
• Implement waste management plans
• Train staff on segregation
• Maintain recycling records
• Use licensed waste collectors

Special Waste Streams:
- Electronic waste (E-waste)
- Medical waste
- Hazardous chemicals
- Confidential documents

GUIDE 4: COMMUNITY PROGRAMS

Neighborhood Initiatives:
• Organize collection drives
• Set up neighborhood recycling centers
• Educate residents about benefits
• Partner with recycling companies

Benefits of Recycling:
- Reduces landfill waste
- Conserves natural resources
- Creates employment opportunities
- Reduces pollution
- Saves energy
`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 py-12 md:py-16">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">Guidelines & Procedures</h1>
            </div>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              Practical guides and procedures to help individuals and organizations comply with environmental standards.
            </p>
          </div>
        </section>

        {/* Guidelines List */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {guidelines.map((guideline, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-xs md:text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mb-2 inline-block">
                          {guideline.category}
                        </span>
                        <CardTitle className="text-lg md:text-xl mb-2">{guideline.title}</CardTitle>
                        <CardDescription className="text-sm md:text-base">{guideline.description}</CardDescription>
                      </div>
                      <Collapsible open={openGuidelines.includes(index)} onOpenChange={() => toggleGuideline(index)}>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-4">
                            <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                            <span className="text-xs md:text-sm">Read Guide</span>
                            {openGuidelines.includes(index) ? 
                              <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1" /> : 
                              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                            }
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </div>
                  </CardHeader>
                  <Collapsible open={openGuidelines.includes(index)} onOpenChange={() => toggleGuideline(index)}>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="bg-green-50 p-4 md:p-6 rounded-lg border-l-4 border-green-500">
                          <pre className="whitespace-pre-wrap text-xs md:text-sm text-gray-700 font-mono leading-relaxed">
                            {guideline.content}
                          </pre>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
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

export default Guidelines;
