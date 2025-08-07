import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  storeSecureSession, 
  getSecureSession, 
  clearSecureSession, 
  validateSessionWithDatabase,
  validatePassword,
  validateEmail 
} from '@/utils/secureAuth';

type AdminRole = 'super_admin' | 'content_admin' | 'reports_admin';

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
};

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: AdminRole) => Promise<void>;
  logout: () => Promise<void>;
  canCreateAdmins: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-logout after 2 hours of inactivity (more secure)
  const AUTO_LOGOUT_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  const resetSessionTimer = () => {
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    const timer = setTimeout(() => {
      handleAutoLogout();
    }, AUTO_LOGOUT_TIME);

    setSessionTimer(timer);
  };

  const handleAutoLogout = async () => {
    console.log('Auto-logout triggered after 2 hours of inactivity');
    await logout();
    toast({
      title: "Session Expired",
      description: "You have been logged out due to inactivity (2 hours)",
      variant: "destructive"
    });
  };

  // Activity detection for session renewal
  useEffect(() => {
    if (!adminUser) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => {
      resetSessionTimer();
    };

    // Add event listeners for user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Start the initial timer
    resetSessionTimer();

    return () => {
      // Cleanup event listeners
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
      
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [adminUser]);

  // Validate secure session on app start
  useEffect(() => {
    const validateSession = async () => {
      const session = getSecureSession();
      
      if (session) {
        // Validate session with database
        const adminData = await validateSessionWithDatabase(session);
        if (adminData) {
          console.log('Secure session validated successfully');
          setAdminUser({
            id: adminData.id,
            email: adminData.email,
            full_name: adminData.full_name,
            role: adminData.role as AdminRole,
            is_active: adminData.is_active
          });
        }
      }
      
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting secure admin login for:', email);
      
      // Validate input
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Use the secure RPC function for password verification
      const { data: rpcData, error: rpcError } = await supabase.rpc('verify_admin_login', {
        admin_email: email,
        admin_password: password
      });

      if (rpcError) {
        console.error('Login error:', rpcError);
        throw new Error('Invalid email or password');
      }

      if (!rpcData || rpcData.length === 0) {
        throw new Error('Invalid email or password');
      }

      const adminData = rpcData[0];
      
      if (!adminData.is_active) {
        throw new Error('Account is inactive. Please contact administrator.');
      }

      const adminUser: AdminUser = {
        id: adminData.id,
        email: adminData.email,
        full_name: adminData.full_name,
        role: adminData.role as AdminRole,
        is_active: adminData.is_active
      };

      // Store secure session
      storeSecureSession(adminUser);
      setAdminUser(adminUser);

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      toast({
        title: "Login Successful",
        description: "Welcome back to the admin portal",
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, role: AdminRole) => {
    setIsLoading(true);
    try {
      console.log('Creating secure admin user:', { email, role, fullName });
      
      // Validate input
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }
      
      if (!fullName || fullName.trim().length < 2) {
        throw new Error('Full name must be at least 2 characters long');
      }
      
      // Check if user already exists first
      const { data: existingUser, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing user:', checkError);
        throw new Error('Failed to check existing user');
      }

      if (existingUser) {
        throw new Error('Admin user with this email already exists');
      }

      // Create admin user using the secure database function
      const { data, error } = await supabase.rpc('create_admin_user', {
        admin_email: email,
        admin_password: password,
        admin_name: fullName.trim(),
        admin_role_param: role
      });

      if (error) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'Failed to create admin account');
      }

      toast({
        title: "Account Created",
        description: "Secure admin account created successfully",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create admin account",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear session timer
      if (sessionTimer) {
        clearTimeout(sessionTimer);
        setSessionTimer(null);
      }

      // Clear secure session data
      clearSecureSession();
      setAdminUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been securely logged out",
      });
      
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const canCreateAdmins = () => {
    return adminUser?.role === 'super_admin';
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        isLoading,
        login,
        register,
        logout,
        canCreateAdmins
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
