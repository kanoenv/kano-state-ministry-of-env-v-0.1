
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogIn, Shield, Eye, EyeOff, Building } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';
import adminLoginBg from "@/assets/admin-login-bg.jpg";

const AdminLogin = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { login, isLoading } = useAdminAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(loginEmail, loginPassword);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${adminLoginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-secondary/60 to-primary/80"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <img 
                src="/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png" 
                alt="Kano State Ministry of Environment" 
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/90 text-lg">Kano State Ministry of Environment</p>
          <div className="w-24 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Secure Access</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Administrative Dashboard Login
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input 
                  id="login-email"
                  type="email" 
                  placeholder="admin@environment.kn.gov.ng"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  disabled={isSubmitting || isLoading}
                  className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isSubmitting || isLoading}
                    className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-transparent"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg transition-all duration-300"
                disabled={isSubmitting || isLoading || !loginEmail || !loginPassword}
              >
                {(isSubmitting || isLoading) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In to Dashboard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm"
          >
            <Building className="h-4 w-4" />
            Return to Public Website
          </Link>
          <p className="text-xs text-white/60 mt-3">
            © {new Date().getFullYear()} Kano State Ministry of Environment. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
