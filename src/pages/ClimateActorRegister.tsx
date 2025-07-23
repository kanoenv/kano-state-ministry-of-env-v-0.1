import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from 'bcryptjs';
import { nigerianStates } from "@/data/nigerianStates";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

const ClimateActorRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    actorType: '',
    organizationName: '',
    focusAreas: [] as string[],
    yearEstablished: '',
    lgaOperations: [] as string[],
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    logoFile: null as File | null,
    password: '',
    confirmPassword: '',
    consent: false
  });

  const selectedState = nigerianStates.find(state => state.name === "Kano");
  const kanoLGAs = selectedState?.lgas || [];

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
    if (file && file.size <= 1024 * 1024) { // 1MB limit
      setFormData(prev => ({ ...prev, logoFile: file }));
    } else {
      toast({
        title: "File too large",
        description: "Logo must be under 1MB",
        variant: "destructive"
      });
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.actorType || !formData.organizationName || !formData.contactName || 
          !formData.contactEmail || !formData.contactPhone || !formData.description ||
          formData.focusAreas.length === 0 || formData.lgaOperations.length === 0 ||
          !formData.password || !formData.consent) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Upload logo if provided
      let logoUrl = null;
      if (formData.logoFile) {
        logoUrl = await uploadLogo(formData.logoFile);
      }

      // Hash password
      const passwordHash = await bcrypt.hash(formData.password, 10);

      // Insert into database
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Register Your Organisation
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Join the Kano State Climate-Actor Registry
            </p>
            <p className="text-sm text-muted-foreground">
              (All fields are required unless specified "optional")
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>
                Complete this form to register your organization in the Kano State Climate-Actor Registry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Actor Type */}
                <div className="space-y-3">
                  <Label>1. Actor Type</Label>
                  <RadioGroup 
                    value={formData.actorType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, actorType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="state_actor" id="state_actor" />
                      <Label htmlFor="state_actor">State Actor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non_state_actor" id="non_state_actor" />
                      <Label htmlFor="non_state_actor">Non-State Actor</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">
                    Select "State Actor" if you are a ministry, department, agency, or local council. Everyone else chooses "Non-State Actor".
                  </p>
                </div>

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">2. Official Organisation Name</Label>
                  <Input 
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    placeholder="e.g., GreenGrowth Initiative"
                    required
                  />
                </div>

                {/* Focus Areas */}
                <div className="space-y-3">
                  <Label>3. Primary Focus Areas (choose at least one)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {focusAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox 
                          id={area}
                          checked={formData.focusAreas.includes(area)}
                          onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                        />
                        <Label htmlFor={area} className="text-sm">{area}</Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tick all that apply; these tags power the public filters.
                  </p>
                </div>

                {/* Year Established */}
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">4. Year Established <small>(optional)</small></Label>
                  <Input 
                    id="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearEstablished: e.target.value }))}
                    placeholder="YYYY"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                {/* LGA Operations */}
                <div className="space-y-3">
                  <Label>5. Local Government Area(s) of Operation</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                    {kanoLGAs.map((lga) => (
                      <div key={lga} className="flex items-center space-x-2">
                        <Checkbox 
                          id={lga}
                          checked={formData.lgaOperations.includes(lga)}
                          onCheckedChange={(checked) => handleLGAChange(lga, checked as boolean)}
                        />
                        <Label htmlFor={lga} className="text-sm">{lga}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">6. Organisation Description</Label>
                  <Textarea 
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Summarise your mission, flagship projects, and climate relevance (50-300 words)"
                    className="min-h-32"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Summarise your mission, flagship projects, and climate relevance.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">7. Contact Person</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Full Name</Label>
                      <Input 
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Official Email</Label>
                      <Input 
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone / WhatsApp <small>(include country code)</small></Label>
                      <Input 
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="+234 801 234 5678"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">8. Website or Social Link <small>(optional)</small></Label>
                      <Input 
                        id="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                        placeholder="https://example.org"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="logo">9. Upload Logo <small>(optional, PNG/JPG ≤ 1 MB)</small></Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('logo')?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {formData.logoFile ? formData.logoFile.name : 'Choose File'}
                    </Button>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Account Security</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-2">
                  <Label>10. Consent & Terms</Label>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                      required
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I confirm the information provided is accurate, and I consent to its publication 
                      on the Kano State Climate-Actor Registry.
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/climate-actor-registry')}
                    className="flex-1"
                  >
                    Back to Registry
                  </Button>
                  <Button type="submit" className="flex-1" size="lg" disabled={loading}>
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClimateActorRegister;
