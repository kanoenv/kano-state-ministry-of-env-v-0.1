
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import orgLoginBg from "@/assets/org-login-bg.jpg";

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Attempting login with:', { email: formData.email });

    try {
      // First check if organization exists and is approved
      const { data: orgData, error: orgError } = await supabase
        .from('climate_actors')
        .select('*')
        .eq('contact_email', formData.email)
        .eq('status', 'approved')
        .maybeSingle();

      if (orgError || !orgData) {
        console.log('Organization not found or not approved:', orgError);
        throw new Error('Organization not found or not yet approved');
      }

      // Use the proper verify_organization_login function
      const { data: authData, error: authError } = await supabase.rpc('verify_organization_login', {
        org_email: formData.email,
        org_password: formData.password
      });

      console.log('Auth response:', { authData, authError });

      if (authError) {
        console.log('Authentication error:', authError);
        throw new Error('Invalid email or password');
      }

      if (authData && authData.length > 0) {
        const loginData = authData[0];
        console.log('Login successful, storing data:', loginData);
        
        // Store the complete organization data for dashboard access
        const dashboardData = {
          id: loginData.id,
          organization_name: loginData.organization_name,
          contact_email: loginData.contact_email,
          status: loginData.status,
          approved_at: loginData.approved_at
        };
        
        localStorage.setItem('organizationAuth', JSON.stringify(dashboardData));
        
        navigate('/organization-dashboard');
        toast({
          title: "Login Successful",
          description: `Welcome back, ${loginData.organization_name}!`,
        });
      } else {
        console.log('No auth data returned');
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || 'An error occurred during login',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${orgLoginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-6 inline-block">
              <img 
                src="/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png" 
                alt="Kano State Ministry of Environment" 
                className="h-12 w-auto mx-auto"
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Organization Portal
            </h1>
            <p className="text-white/90 text-lg">
              Climate-Actor Dashboard Access
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your organization dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@organization.com"
                    required
                    className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg transition-all duration-300" 
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Access Dashboard'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                    onClick={() => navigate('/climate-actor-register')}
                  >
                    Register your organization
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-white/70">
              © {new Date().getFullYear()} Kano State Ministry of Environment. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationLogin;
