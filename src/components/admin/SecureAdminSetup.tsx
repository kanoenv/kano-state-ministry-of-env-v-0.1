import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validatePassword, validateEmail } from '@/utils/secureAuth';
import { Shield, Lock, User, Mail } from 'lucide-react';

interface SecureAdminSetupProps {
  onAdminCreated: () => void;
}

export const SecureAdminSetup = ({ onAdminCreated }: SecureAdminSetupProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingAdmin, setHasExistingAdmin] = useState<boolean | null>(null);
  const [passwordValidation, setPasswordValidation] = useState({ isValid: false, message: '' });
  const { toast } = useToast();

  useEffect(() => {
    checkForExistingAdmin();
  }, []);

  useEffect(() => {
    if (formData.password) {
      setPasswordValidation(validatePassword(formData.password));
    }
  }, [formData.password]);

  const checkForExistingAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking for admin:', error);
        setHasExistingAdmin(false);
        return;
      }

      setHasExistingAdmin(!!data);
    } catch (error) {
      console.error('Error checking for admin:', error);
      setHasExistingAdmin(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.fullName || formData.fullName.trim().length < 2) {
        throw new Error('Full name must be at least 2 characters long');
      }

      // Create the first super admin
      const { data, error } = await supabase.rpc('create_admin_user', {
        admin_email: formData.email,
        admin_password: formData.password,
        admin_name: formData.fullName.trim(),
        admin_role_param: 'super_admin'
      });

      if (error) {
        throw new Error(error.message || 'Failed to create admin account');
      }

      toast({
        title: "Admin Account Created",
        description: "Your secure admin account has been created successfully. You can now log in.",
      });

      onAdminCreated();
    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "Setup Failed",
        description: error instanceof Error ? error.message : "Failed to create admin account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (hasExistingAdmin === null) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 animate-spin" />
            <p>Checking system status...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hasExistingAdmin) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <CardTitle>System Ready</CardTitle>
          <CardDescription>
            Admin system is already configured. Please use the login page to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onAdminCreated} 
            className="w-full"
          >
            Continue to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <CardTitle>Secure Admin Setup</CardTitle>
        <CardDescription>
          Create your first administrator account. This will be a super admin with full system access.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Notice:</strong> This is a one-time setup. Choose a strong password and keep your credentials secure.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {formData.password && (
              <p className={`text-sm ${passwordValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.isValid ? '✓ Password meets security requirements' : passwordValidation.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {formData.confirmPassword && (
              <p className={`text-sm ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <strong>Password Requirements:</strong>
            <ul className="mt-1 space-y-1">
              <li>• At least 12 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
          >
            {isLoading ? 'Creating Admin Account...' : 'Create Admin Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
