// Secure authentication utilities
import { supabase } from '@/integrations/supabase/client';

// Session encryption key (in production, use environment variable)
const SESSION_KEY = 'kano_env_session_2024';

// Secure session data structure
interface SecureSession {
  userId: string;
  email: string;
  role: string;
  fullName: string;
  timestamp: number;
  expiresAt: number;
}

// Encrypt session data
const encryptSession = (data: string): string => {
  // Simple encoding for now - in production, use proper encryption
  return btoa(data);
};

// Decrypt session data
const decryptSession = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch {
    return '';
  }
};

// Store secure session
export const storeSecureSession = (adminUser: any): void => {
  const session: SecureSession = {
    userId: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
    fullName: adminUser.full_name,
    timestamp: Date.now(),
    expiresAt: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
  };

  const sessionString = JSON.stringify(session);
  const encryptedSession = encryptSession(sessionString);
  
  sessionStorage.setItem(SESSION_KEY, encryptedSession);
};

// Retrieve secure session
export const getSecureSession = (): SecureSession | null => {
  try {
    const encryptedSession = sessionStorage.getItem(SESSION_KEY);
    if (!encryptedSession) return null;

    const sessionString = decryptSession(encryptedSession);
    if (!sessionString) return null;

    const session: SecureSession = JSON.parse(sessionString);
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      clearSecureSession();
      return null;
    }

    return session;
  } catch {
    clearSecureSession();
    return null;
  }
};

// Clear secure session
export const clearSecureSession = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

// Validate session with database
export const validateSessionWithDatabase = async (session: SecureSession): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, full_name, role, is_active')
      .eq('id', session.userId)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      clearSecureSession();
      return null;
    }

    return data;
  } catch {
    clearSecureSession();
    return null;
  }
};

// Password validation
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 12) {
    return { isValid: false, message: 'Password must be at least 12 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, message: '' };
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
