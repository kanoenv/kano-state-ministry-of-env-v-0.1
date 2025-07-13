
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, User, MapPin, GraduationCap, Shield } from 'lucide-react';
import { nigerianStates } from '@/data/nigerianStates';

const ForestGuardApply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'Nigerian',
    stateOfOrigin: '',
    lgaOfOrigin: '',
    stateOfResidence: '',
    lgaOfResidence: '',
    contactAddress: '',
    phoneNumber: '',
    email: '',
    
    // Education
    highestQualification: '',
    examinationNumber: '',
    examYear: '',
    graduationYear: '',
    subjects: [] as string[],
    diplomaGrade: '',
    degreeClass: '',
    
    // Fitness and Experience
    canCompleteTrek: false,
    hasPriorTraining: false,
    priorTrainingDetails: '',
    
    // File uploads
    photoFile: null as File | null,
    birthCertificateFile: null as File | null,
    educationCertificateFile: null as File | null,
    lgaLetterFile: null as File | null,
  });

  // Handle file uploads
  const handleFileUpload = async (file: File, folder: string): Promise<string | null> => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('recruitment_documents')
      .upload(filePath, file);
    
    if (error) {
      console.error('File upload error:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from('recruitment_documents')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  };

  // Generate reference number
  const generateReferenceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `FG${year}${month}${day}${random}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload files
      const photoUrl = formData.photoFile ? await handleFileUpload(formData.photoFile, 'photos') : null;
      const birthCertificateUrl = formData.birthCertificateFile ? await handleFileUpload(formData.birthCertificateFile, 'certificates') : null;
      const educationCertificateUrl = formData.educationCertificateFile ? await handleFileUpload(formData.educationCertificateFile, 'education') : null;
      const lgaLetterUrl = formData.lgaLetterFile ? await handleFileUpload(formData.lgaLetterFile, 'lga_letters') : null;

      // Prepare application data
      const applicationData = {
        reference_number: generateReferenceNumber(),
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        state_of_origin: formData.stateOfOrigin,
        lga_of_origin: formData.lgaOfOrigin,
        state_of_residence: formData.stateOfResidence,
        lga_of_residence: formData.lgaOfResidence,
        contact_address: formData.contactAddress,
        phone_number: formData.phoneNumber,
        email: formData.email,
        highest_qualification: formData.highestQualification,
        examination_number: formData.examinationNumber,
        exam_year: formData.examYear,
        graduation_year: formData.graduationYear,
        subjects: formData.subjects,
        diploma_grade: formData.diplomaGrade,
        degree_class: formData.degreeClass,
        can_complete_trek: formData.canCompleteTrek,
        has_prior_training: formData.hasPriorTraining,
        prior_training_details: formData.priorTrainingDetails,
        photo_url: photoUrl,
        birth_certificate_url: birthCertificateUrl,
        education_certificate_url: educationCertificateUrl,
        lga_letter_url: lgaLetterUrl,
        status: 'Pending'
      };

      // Submit application
      const { data, error } = await supabase
        .from('recruitment_applications')
        .insert([applicationData])
        .select();

      if (error) throw error;

      toast({
        title: 'Application Submitted Successfully!',
        description: `Your reference number is: ${applicationData.reference_number}`,
      });

      navigate('/careers/forest-guard/success', { 
        state: { referenceNumber: applicationData.reference_number } 
      });

    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Application Failed',
        description: 'There was an error submitting your application. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forest Guard Application</h1>
          <p className="text-gray-600">Join Kano State's environmental protection team</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Education & Qualifications' :
                currentStep === 3 ? 'Fitness & Experience' :
                'Document Upload'
              }
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stateOfOrigin">State of Origin *</Label>
                    <Select 
                      value={formData.stateOfOrigin} 
                      onValueChange={(value) => setFormData({...formData, stateOfOrigin: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lgaOfOrigin">LGA of Origin *</Label>
                    <Input
                      id="lgaOfOrigin"
                      value={formData.lgaOfOrigin}
                      onChange={(e) => setFormData({...formData, lgaOfOrigin: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stateOfResidence">State of Residence *</Label>
                    <Select 
                      value={formData.stateOfResidence} 
                      onValueChange={(value) => setFormData({...formData, stateOfResidence: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lgaOfResidence">LGA of Residence *</Label>
                    <Input
                      id="lgaOfResidence"
                      value={formData.lgaOfResidence}
                      onChange={(e) => setFormData({...formData, lgaOfResidence: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactAddress">Contact Address *</Label>
                  <Textarea
                    id="contactAddress"
                    value={formData.contactAddress}
                    onChange={(e) => setFormData({...formData, contactAddress: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Education & Qualifications */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="highestQualification">Highest Qualification *</Label>
                  <Select 
                    value={formData.highestQualification} 
                    onValueChange={(value) => setFormData({...formData, highestQualification: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SSCE/WAEC/NECO">SSCE/WAEC/NECO</SelectItem>
                      <SelectItem value="National Diploma">National Diploma (ND)</SelectItem>
                      <SelectItem value="Higher National Diploma">Higher National Diploma (HND)</SelectItem>
                      <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                      <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="examinationNumber">Examination Number</Label>
                    <Input
                      id="examinationNumber"
                      value={formData.examinationNumber}
                      onChange={(e) => setFormData({...formData, examinationNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examYear">Examination Year</Label>
                    <Input
                      id="examYear"
                      value={formData.examYear}
                      onChange={(e) => setFormData({...formData, examYear: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                    required
                  />
                </div>

                {(formData.highestQualification === 'National Diploma' || formData.highestQualification === 'Higher National Diploma') && (
                  <div>
                    <Label htmlFor="diplomaGrade">Diploma Grade</Label>
                    <Select 
                      value={formData.diplomaGrade} 
                      onValueChange={(value) => setFormData({...formData, diplomaGrade: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Distinction">Distinction</SelectItem>
                        <SelectItem value="Upper Credit">Upper Credit</SelectItem>
                        <SelectItem value="Lower Credit">Lower Credit</SelectItem>
                        <SelectItem value="Pass">Pass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(formData.highestQualification === "Bachelor's Degree" || formData.highestQualification === "Master's Degree" || formData.highestQualification === 'PhD') && (
                  <div>
                    <Label htmlFor="degreeClass">Degree Class</Label>
                    <Select 
                      value={formData.degreeClass} 
                      onValueChange={(value) => setFormData({...formData, degreeClass: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First Class">First Class</SelectItem>
                        <SelectItem value="Second Class Upper">Second Class Upper</SelectItem>
                        <SelectItem value="Second Class Lower">Second Class Lower</SelectItem>
                        <SelectItem value="Third Class">Third Class</SelectItem>
                        <SelectItem value="Pass">Pass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Fitness & Experience */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Fitness & Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="canCompleteTrek"
                      checked={formData.canCompleteTrek}
                      onCheckedChange={(checked) => setFormData({...formData, canCompleteTrek: !!checked})}
                    />
                    <Label htmlFor="canCompleteTrek">
                      I can complete a 5km trek in forest terrain
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPriorTraining"
                      checked={formData.hasPriorTraining}
                      onCheckedChange={(checked) => setFormData({...formData, hasPriorTraining: !!checked})}
                    />
                    <Label htmlFor="hasPriorTraining">
                      I have prior training in environmental protection or forestry
                    </Label>
                  </div>
                </div>

                {formData.hasPriorTraining && (
                  <div>
                    <Label htmlFor="priorTrainingDetails">Prior Training Details</Label>
                    <Textarea
                      id="priorTrainingDetails"
                      value={formData.priorTrainingDetails}
                      onChange={(e) => setFormData({...formData, priorTrainingDetails: e.target.value})}
                      placeholder="Please describe your prior training and experience..."
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="photoFile">Passport Photograph *</Label>
                    <Input
                      id="photoFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({...formData, photoFile: e.target.files?.[0] || null})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthCertificateFile">Birth Certificate / National ID *</Label>
                    <Input
                      id="birthCertificateFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({...formData, birthCertificateFile: e.target.files?.[0] || null})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="educationCertificateFile">Education Certificate *</Label>
                    <Input
                      id="educationCertificateFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({...formData, educationCertificateFile: e.target.files?.[0] || null})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lgaLetterFile">LGA Letter of Recommendation</Label>
                    <Input
                      id="lgaLetterFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({...formData, lgaLetterFile: e.target.files?.[0] || null})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForestGuardApply;
