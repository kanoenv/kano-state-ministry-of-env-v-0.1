
import { supabase } from '@/integrations/supabase/client';

export const ensureDefaultAdminExists = async () => {
  try {
    // Check if the default admin exists in admin_users table
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@kano.gov.ng')
      .single();
    
    if (adminError && adminError.code !== 'PGRST116') {
      console.error("Error checking for default admin:", adminError);
      return false;
    }
    
    // If default admin doesn't exist in admin_users table, create it
    if (!adminData) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { email: 'admin@kano.gov.ng', password_hash: hashedPassword }
        ]);
        
      if (insertError) {
        console.error("Error creating default admin:", insertError);
        return false;
      }
      
      console.log("Default admin created successfully in admin_users table");
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring default admin exists:", error);
    return false;
  }
};
