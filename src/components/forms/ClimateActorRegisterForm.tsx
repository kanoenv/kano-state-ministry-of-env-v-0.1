import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, ChevronLeft, ChevronRight, Check, Building2, Contact, Shield, FileText, Info, Phone, Mail, Globe, MapPin, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from 'bcryptjs';
import { nigerianStates } from "@/data/nigerianStates";

const focusAreas = [
  "Renewable Energy",
  "Climate-Smart Agriculture", 
  "Waste Management",
  "Water & Sanitation",
  "Air-Quality Monitoring",
  "Biodiversity Conservation",
  "Green Finance",
  "Climate Education & Advocacy",
  "Disaster Risk Reduction",
  "Clean Cooking Solutions"
];

interface FormData {
  actorType: string;
  organizationName: string;
  focusAreas: string[];
  yearEstablished: string;
  lgaOperations: string[];
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  logoFile: File | null;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

const ClimateActorRegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    actorType: '',
    organizationName: '',
    focusAreas: [],
    yearEstablished: '',
    lgaOperations: [],
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    logoFile: null,
    password: '',
    confirmPassword: '',
    consent: false
  });

  const selectedState = nigerianStates.find(state => state.name === "Kano");
  const kanoLGAs = selectedState?.lgas || [];

  const steps = [
    { 
      id: 1, 
      title: "Organization Details", 
      icon: Building2, 
      description: "Basic organization information",
      color: "from-blue-500 to-blue-600"
    },
    { 
      id: 2, 
      title: "Focus & Operations", 
      icon: Target, 
      description: "Areas of focus and locations",
      color: "from-green-500 to-green-600"
    },
    { 
      id: 3, 
      title: "Contact Information", 
      icon: Contact, 
      description: "Contact person details",
      color: "from-purple-500 to-purple-600"
    },
    { 
      id: 4, 
      title: "Security & Consent", 
      icon: Shield, 
      description: "Account setup and agreements",
      color: "from-orange-500 to-orange-600"
    },
  ];

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: checked 
        ? [...prev.focusAreas, area]
        : prev.focusAreas.filter(item => item !== area)
    }));
  };

  const handleLGAChange = (lga: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      lgaOperations: checked 
        ? [...prev.lgaOperations, lga]
        : prev.lgaOperations.filter(item => item !== lga)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) {
      setFormData(prev => ({ ...prev, logoFile: file }));
    } else {
      toast({
        title: "File too large",
        description: "Logo must be under 1MB",
        variant: "destructive"
      });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.actorType && formData.organizationName);
      case 2:
        return !!(formData.focusAreas.length > 0 && formData.lgaOperations.length > 0 && formData.description);
      case 3:
        return !!(formData.contactName && formData.contactEmail && formData.contactPhone);
      case 4:
        return !!(formData.password && formData.confirmPassword && formData.consent && 
                 formData.password === formData.confirmPassword && formData.password.length >= 6);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Incomplete Section",
        description: "Please fill in all required fields in this section.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const uploadLogo = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('climate_actors')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data } = supabase.storage
        .from('climate_actors')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Form Incomplete",
        description: "Please complete all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Check for existing email or phone
      const { data: existingActor, error: checkError } = await supabase
        .from('climate_actors')
        .select('contact_email, contact_phone, organization_name')
        .or(`contact_email.eq.${formData.contactEmail},contact_phone.eq.${formData.contactPhone}`)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingActor) {
        toast({
          title: "You have already registered",
          description: `An organization with this ${existingActor.contact_email === formData.contactEmail ? 'email' : 'phone number'} is already registered. Please use the login page to access your dashboard.`,
          variant: "default"
        });
        return;
      }

      let logoUrl = null;
      if (formData.logoFile) {
        logoUrl = await uploadLogo(formData.logoFile);
      }

      const passwordHash = await bcrypt.hash(formData.password, 10);

      const { error } = await supabase
        .from('climate_actors')
        .insert({
          actor_type: formData.actorType,
          organization_name: formData.organizationName,
          focus_areas: formData.focusAreas,
          year_established: formData.yearEstablished ? parseInt(formData.yearEstablished) : null,
          lga_operations: formData.lgaOperations,
          description: formData.description,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          website_url: formData.websiteUrl || null,
          logo_url: logoUrl,
          password_hash: passwordHash
        });

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully!",
        description: "Your registration is under review. You will be contacted within 5 working days.",
      });

      navigate('/climate-actor-registry');
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Actor Type Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Organization Type</Label>
                  <p className="text-sm text-muted-foreground">Select the category that best describes your organization</p>
                </div>
              </div>
              
              <RadioGroup 
                value={formData.actorType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, actorType: value }))}
                className="grid grid-cols-1 gap-4"
              >
                <div className="relative border-2 rounded-xl p-5 hover:border-blue-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value="state_actor" id="state_actor" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="state_actor" className="font-semibold text-base cursor-pointer">State Actor</Label>
                        <Badge variant="outline" className="text-xs">Government</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Government ministries, departments, agencies, local government councils, 
                        or other state institutions involved in climate action
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative border-2 rounded-xl p-5 hover:border-green-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value="non_state_actor" id="non_state_actor" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="non_state_actor" className="font-semibold text-base cursor-pointer">Non-State Actor</Label>
                        <Badge variant="outline" className="text-xs">Private/NGO</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        NGOs, private sector companies, community organizations, academic institutions, 
                        or civil society groups working on climate issues
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Separator className="my-6" />

            {/* Organization Name Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-green-600" />
                </div>
                <Label htmlFor="organizationName" className="text-lg font-semibold text-foreground">Organization Name</Label>
              </div>
              
              <div className="space-y-3">
                <Input 
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                  placeholder="Enter your official organization name"
                  className="text-base h-12 border-2 focus:border-primary"
                  required
                />
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-blue-500" />
                    Please enter the official registered name as it appears on your legal documents
                  </p>
                </div>
              </div>
            </div>

            {/* Year Established Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Badge className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="yearEstablished" className="text-lg font-semibold text-foreground">Year Established</Label>
                  <Badge variant="secondary" className="text-xs">Optional</Badge>
                </div>
              </div>
              
              <Input 
                id="yearEstablished"
                value={formData.yearEstablished}
                onChange={(e) => setFormData(prev => ({ ...prev, yearEstablished: e.target.value }))}
                placeholder="YYYY (e.g., 2010)"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                className="text-base h-12 border-2 focus:border-primary max-w-xs"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Focus Areas Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Primary Focus Areas</Label>
                  <p className="text-sm text-muted-foreground">Select all areas that apply to your organization's work</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {focusAreas.map((area) => (
                  <div 
                    key={area} 
                    className="relative border-2 rounded-xl p-4 hover:border-green-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={area}
                        checked={formData.focusAreas.includes(area)}
                        onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                        className="border-2"
                      />
                      <Label htmlFor={area} className="text-sm font-medium cursor-pointer flex-1">{area}</Label>
                    </div>
                  </div>
                ))}
              </div>
              
              {formData.focusAreas.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    <strong>{formData.focusAreas.length}</strong> focus area{formData.focusAreas.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* LGA Operations Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Areas of Operation</Label>
                  <p className="text-sm text-muted-foreground">Select all Local Government Areas where your organization operates</p>
                </div>
              </div>
              
              <div className="border-2 rounded-xl p-4 bg-muted/20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                  {kanoLGAs.map((lga) => (
                    <div key={lga} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-background transition-colors">
                      <Checkbox 
                        id={lga}
                        checked={formData.lgaOperations.includes(lga)}
                        onCheckedChange={(checked) => handleLGAChange(lga, checked as boolean)}
                        className="border-2"
                      />
                      <Label htmlFor={lga} className="text-sm cursor-pointer">{lga}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {formData.lgaOperations.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    Operating in <strong>{formData.lgaOperations.length}</strong> LGA{formData.lgaOperations.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Description Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <Label htmlFor="description" className="text-lg font-semibold text-foreground">Organization Description</Label>
              </div>
              
              <div className="space-y-3">
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your organization's mission, key projects, and climate-related activities. Include information about your impact, partnerships, and future goals (50-300 words recommended)."
                  className="min-h-32 text-base border-2 focus:border-primary resize-none"
                  required
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Minimum 50 words recommended</span>
                  <span>{formData.description.split(' ').filter(word => word.length > 0).length} words</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Contact Person Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Contact className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Contact Person Details</Label>
                  <p className="text-sm text-muted-foreground">Primary contact for this registration and future communications</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Contact className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="contactName" className="font-medium">Full Name</Label>
                  </div>
                  <Input 
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Enter full name of contact person"
                    className="text-base h-12 border-2 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="contactEmail" className="font-medium">Official Email Address</Label>
                  </div>
                  <Input 
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@organization.org"
                    className="text-base h-12 border-2 focus:border-primary"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Use your organization's official email address</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="contactPhone" className="font-medium">Phone / WhatsApp Number</Label>
                  </div>
                  <Input 
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+234 801 234 5678"
                    className="text-base h-12 border-2 focus:border-primary"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Include country code (+234 for Nigeria)</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="websiteUrl" className="font-medium">Website or Social Media</Label>
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </div>
                  <Input 
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    placeholder="https://example.org or social media link"
                    type="url"
                    className="text-base h-12 border-2 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">Website, Facebook, LinkedIn, or other professional profiles</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Logo Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <Label htmlFor="logo" className="text-lg font-semibold text-foreground">Organization Logo</Label>
                  <Badge variant="secondary" className="text-xs ml-2">Optional</Badge>
                  <p className="text-sm text-muted-foreground">Upload your organization's official logo for display in the registry</p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-300 bg-muted/20 hover:bg-muted/30">
                <Input
                  id="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => document.getElementById('logo')?.click()}
                      className="px-6"
                    >
                      {formData.logoFile ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                    {formData.logoFile && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-green-700 font-medium">✓ {formData.logoFile.name}</p>
                        <p className="text-xs text-green-600">File uploaded successfully</p>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Accepted formats: PNG, JPG, JPEG</p>
                    <p>Maximum file size: 1MB</p>
                    <p>Recommended dimensions: 200x200 pixels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            {/* Account Security Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Account Security</Label>
                  <p className="text-sm text-muted-foreground">Create a secure password for your organization's registry account</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="password" className="font-medium">Create Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter a secure password"
                    className="text-base h-12 border-2 focus:border-primary"
                    required
                    minLength={6}
                  />
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Minimum 6 characters</p>
                    <p>• Use a combination of letters, numbers, and symbols</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="font-medium">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Re-enter your password"
                    className="text-base h-12 border-2 focus:border-primary"
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <p className="text-xs text-red-600">❌ Passwords do not match</p>
                    </div>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs text-green-600">✅ Passwords match</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Consent and Terms Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-foreground">Consent & Terms</Label>
                  <p className="text-sm text-muted-foreground">Please review and agree to the terms below</p>
                </div>
              </div>
              
              <div className="border-2 rounded-xl p-6 bg-gradient-to-br from-muted/30 to-muted/10">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Checkbox 
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                      required
                      className="mt-1 border-2"
                    />
                    <div className="flex-1">
                      <Label htmlFor="consent" className="text-sm font-medium cursor-pointer mb-2 block">
                        I agree to the registration terms and conditions
                      </Label>
                      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          <strong>By checking this box, I confirm that:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>All information provided is accurate and complete</li>
                          <li>I consent to the publication of this information on the Kano State Climate-Actor Registry</li>
                          <li>I understand the registry will be publicly accessible</li>
                          <li>This registration is subject to approval by relevant authorities</li>
                          <li>I will update information if there are significant changes to our organization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {formData.consent && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Thank you for agreeing to the terms. You're ready to submit your application!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Step {currentStep} of {totalSteps}
            </h2>
            <p className="text-muted-foreground mt-1">
              {steps[currentStep - 1].description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {Math.round(progress)}% Complete
            </Badge>
            <div className="text-sm text-muted-foreground">
              {currentStep}/{totalSteps}
            </div>
          </div>
        </div>
        
        <Progress value={progress} className="h-3 mb-8 bg-muted/50" />
        
        {/* Enhanced Step Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 border-2 ${
                  isCurrent 
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105' 
                    : isCompleted 
                    ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' 
                    : 'bg-muted/30 text-muted-foreground border-muted hover:bg-muted/50'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl mb-3 transition-colors ${
                  isCurrent 
                    ? 'bg-primary-foreground text-primary' 
                    : isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-background text-muted-foreground'
                }`}>
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1">{step.title}</h3>
                <p className="text-xs opacity-90 hidden md:block leading-relaxed">{step.description}</p>
                
                {/* Progress connector line */}
                {step.id < totalSteps && (
                  <div className={`hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 -translate-y-1/2 ${
                    isCompleted || currentStep > step.id ? 'bg-green-300' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <Card className="border-2 shadow-xl bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-6 bg-gradient-to-r from-muted/30 to-transparent rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${steps[currentStep - 1].color}`}>
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5 text-white" })}
            </div>
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 lg:p-8">
          {renderStep()}
          
          {/* Enhanced Navigation */}
          <div className="flex flex-col md:flex-row justify-between pt-8 mt-8 border-t-2 border-muted/50 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              size="lg"
              onClick={currentStep === 1 ? () => navigate('/climate-actor-registry') : prevStep}
              className="flex items-center gap-2 px-6 order-2 md:order-1"
            >
              <ChevronLeft className="h-4 w-4" />
              {currentStep === 1 ? 'Back to Registry' : 'Previous Step'}
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep}
                size="lg"
                className="flex items-center gap-2 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 order-1 md:order-2"
                disabled={!validateStep(currentStep)}
              >
                Continue to Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                size="lg"
                disabled={loading || !validateStep(currentStep)}
                className="flex items-center gap-2 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 order-1 md:order-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClimateActorRegisterForm;
