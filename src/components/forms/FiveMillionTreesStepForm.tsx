
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TreePine, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface FormData {
  organizationName: string;
  address: string;
  dateEstablished: string;
  organizationType: string;
  otherType: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
  plantingSites: string;
  seedlingsRequested: string;
  locations: string;
  volunteers: string;
  previousExperience: string;
  survivalRateCommitment: string;
  trainingCommitment: boolean;
  trackingToolCommitment: boolean;
  coordinatorCommitment: boolean;
  representativeName: string;
  representativePosition: string;
  submissionDate: string;
}

const FiveMillionTreesStepForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSteps, setSavedSteps] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    address: '',
    dateEstablished: '',
    organizationType: '',
    otherType: '',
    contactName: '',
    contactPosition: '',
    contactPhone: '',
    contactEmail: '',
    plantingSites: '',
    seedlingsRequested: '',
    locations: '',
    volunteers: '',
    previousExperience: '',
    survivalRateCommitment: '',
    trainingCommitment: false,
    trackingToolCommitment: false,
    coordinatorCommitment: false,
    representativeName: '',
    representativePosition: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCurrentStep = async () => {
    if (!savedSteps.includes(currentStep)) {
      setSavedSteps(prev => [...prev, currentStep]);
      toast({
        title: "Step Saved",
        description: `Step ${currentStep} has been saved successfully.`,
      });
    }
  };

  const handleNext = async () => {
    await saveCurrentStep();
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('five_million_trees_applications')
        .insert({
          organization_name: formData.organizationName,
          address: formData.address,
          date_established: formData.dateEstablished,
          organization_type: formData.organizationType,
          other_type: formData.otherType || null,
          contact_name: formData.contactName,
          contact_position: formData.contactPosition,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          planting_sites: parseInt(formData.plantingSites),
          seedlings_requested: parseInt(formData.seedlingsRequested),
          locations: formData.locations,
          volunteers: parseInt(formData.volunteers),
          previous_experience: formData.previousExperience || null,
          survival_rate_commitment: formData.survivalRateCommitment,
          training_commitment: formData.trainingCommitment,
          tracking_tool_commitment: formData.trackingToolCommitment,
          coordinator_commitment: formData.coordinatorCommitment,
          representative_name: formData.representativeName,
          representative_position: formData.representativePosition,
          submission_date: formData.submissionDate
        });

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your interest in the Five Million Trees Campaign.",
      });

      navigate('/programs/five-million-trees/success');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                <TreePine className="w-6 h-6" />
                1. Organization Information / Bayanin Ƙungiya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name (Sunan Ƙungiya) *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateEstablished">Date Established (Ranar Ƙirƙira) *</Label>
                  <Input
                    id="dateEstablished"
                    type="date"
                    value={formData.dateEstablished}
                    onChange={(e) => handleInputChange('dateEstablished', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address (Adireshi) *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Type of Organization (Nau'in Ƙungiya) *</Label>
                <RadioGroup 
                  value={formData.organizationType} 
                  onValueChange={(value) => handleInputChange('organizationType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="government" id="government" />
                    <Label htmlFor="government">Government Agency / Hukuma</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ngo" id="ngo" />
                    <Label htmlFor="ngo">Non-Governmental Organization (NGO) / Ƙungiyar Ba-Hukuma</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="community" id="community" />
                    <Label htmlFor="community">Community-Based Group / Ƙungiyar Al'umma</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="school" id="school" />
                    <Label htmlFor="school">School / Makaranta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate" />
                    <Label htmlFor="corporate">Corporate Entity / Kamfani</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other / Sauran</Label>
                  </div>
                </RadioGroup>
                
                {formData.organizationType === 'other' && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="otherType">Please specify:</Label>
                    <Input
                      id="otherType"
                      value={formData.otherType}
                      onChange={(e) => handleInputChange('otherType', e.target.value)}
                      placeholder="Specify organization type"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">2. Primary Contact Person / Mutumin Da Aka Tuntuɓa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Name (Suna) *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPosition">Position/Title (Matsayi) *</Label>
                  <Input
                    id="contactPosition"
                    value={formData.contactPosition}
                    onChange={(e) => handleInputChange('contactPosition', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number (Lambar Wayar Salula) *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address (Imel) *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">3. Proposed Planting Plan / Shirin Shuka Bishiyoyi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="plantingSites">Number of Planting Sites (Yawan Filayen da Za a Shuka) *</Label>
                  <Input
                    id="plantingSites"
                    type="number"
                    min="1"
                    value={formData.plantingSites}
                    onChange={(e) => handleInputChange('plantingSites', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seedlingsRequested">Approximate Total Seedlings Requested (Adadin Itatuwan Da Ake Bukata) *</Label>
                  <Input
                    id="seedlingsRequested"
                    type="number"
                    min="1"
                    value={formData.seedlingsRequested}
                    onChange={(e) => handleInputChange('seedlingsRequested', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="locations">General Locations (LGAs/Communities) (Gundumomi/Al'ummomi) *</Label>
                <Textarea
                  id="locations"
                  value={formData.locations}
                  onChange={(e) => handleInputChange('locations', e.target.value)}
                  placeholder="List the local government areas and communities where you plan to plant trees"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volunteers">Number of Volunteers/Staff (Yawan Masu Sa Kai ko Ma'aikata) *</Label>
                <Input
                  id="volunteers"
                  type="number"
                  min="1"
                  value={formData.volunteers}
                  onChange={(e) => handleInputChange('volunteers', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">4. Experience & Capacity / Kwarewa da Ƙarfin Ƙungiya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="previousExperience">Previous Tree-Planting or Environmental Projects (Idan Akwai)</Label>
                <Textarea
                  id="previousExperience"
                  value={formData.previousExperience}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                  placeholder="Short description: Ƙaramin bayani на ayyukan da kuka yi a baya, shekara/s, da sakamakon su"
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Will your organization commit to achieving at least 90% survival rate for planted trees? / Za ku iya tabbatar da aƙalla kashi 90% na bishiyoyin da aka shuka za su rayu? *</Label>
                <RadioGroup 
                  value={formData.survivalRateCommitment} 
                  onValueChange={(value) => handleInputChange('survivalRateCommitment', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="survival-yes" />
                    <Label htmlFor="survival-yes">Yes / Ee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="survival-no" />
                    <Label htmlFor="survival-no">No / A'a</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">5. Tracking & Maintenance Commitment / Yarjejeniyar Bibiyar Itatuwa da Kulawa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="trainingCommitment"
                    checked={formData.trainingCommitment}
                    onCheckedChange={(checked) => handleInputChange('trainingCommitment', checked as boolean)}
                  />
                  <div className="space-y-1 leading-tight">
                    <Label htmlFor="trainingCommitment" className="text-base">
                      I hereby confirm that my organization will attend all Ministry-led training sessions.
                    </Label>
                    <p className="text-sm text-gray-600">
                      Ina tabbatar da cewa ƙungiyata za ta halarci dukkan horo da Ma'aikata za su shirya.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="trackingToolCommitment"
                    checked={formData.trackingToolCommitment}
                    onCheckedChange={(checked) => handleInputChange('trackingToolCommitment', checked as boolean)}
                  />
                  <div className="space-y-1 leading-tight">
                    <Label htmlFor="trackingToolCommitment" className="text-base">
                      I hereby confirm that my organization will use the Ministry's digital Tracking Tool to record every tree planted.
                    </Label>
                    <p className="text-sm text-gray-600">
                      Ina tabbatar da cewa ƙungiyata za ta yi amfani da kayan aikin bibiyar dijital na Ma'aikata don rubuta kowace bishiya da aka shuka, tare da bayanan GPS, nau'in bishiyar, da ranakun shuka.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="coordinatorCommitment"
                    checked={formData.coordinatorCommitment}
                    onCheckedChange={(checked) => handleInputChange('coordinatorCommitment', checked as boolean)}
                  />
                  <div className="space-y-1 leading-tight">
                    <Label htmlFor="coordinatorCommitment" className="text-base">
                      I hereby confirm that my organization will assign a dedicated Tree-Care Coordinator.
                    </Label>
                    <p className="text-sm text-gray-600">
                      Ina tabbatar da cewa ƙungiyata za ta nada Mai Kula da Bishiyoyi wanda zai kasance ɗan sa kai na kula da bishiyoyi sau ɗaya a wata da kuma shigar da bayanai.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">6. Declaration / Bayyanawa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                I, the undersigned, certify that the information provided is accurate and that our organization commits 
                the necessary resources (volunteers, time, and attention) to ensure the success of the Five Million Trees Campaign.
              </p>
              <p className="text-sm text-gray-600 italic">
                Ni, wanda aka sanya hannu a ƙasa, na tabbatar da cewa duk bayanan da aka bayar gaskiya ne, kuma ƙungiyar mu 
                za ta sadaukar da dukkan albarkatu (masu sa kai, lokaci, da kulawa) don tabbatar da nasarar wannan shiri na shuka bishiyoyi miliyan biyar.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="representativeName">Authorized Representative's Name (Sunan Wakili) *</Label>
                  <Input
                    id="representativeName"
                    value={formData.representativeName}
                    onChange={(e) => handleInputChange('representativeName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representativePosition">Position/Title (Matsayi) *</Label>
                  <Input
                    id="representativePosition"
                    value={formData.representativePosition}
                    onChange={(e) => handleInputChange('representativePosition', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="submissionDate">Date (Rana) *</Label>
                <Input
                  id="submissionDate"
                  type="date"
                  value={formData.submissionDate}
                  onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep === step 
                  ? 'bg-green-600 text-white' 
                  : savedSteps.includes(step) 
                    ? 'bg-green-100 text-green-600 border-2 border-green-600' 
                    : currentStep > step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
              }`}>
                {savedSteps.includes(step) ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 6 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Step {currentStep} of 6
          </h2>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < 6 ? (
          <Button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save and Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinalSubmit}
            disabled={isSubmitting || !formData.trainingCommitment || !formData.trackingToolCommitment || !formData.coordinatorCommitment}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
            <Check className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Application deadline: June 30, 2025
        </p>
      </div>
    </div>
  );
};

export default FiveMillionTreesStepForm;
