
-- Function to verify admin login credentials
CREATE OR REPLACE FUNCTION verify_admin_login(
  admin_email TEXT,
  admin_password TEXT
)
RETURNS TABLE (
  id TEXT,
  email TEXT,
  full_name TEXT,
  role admin_role,
  is_active BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.is_active
  FROM public.admin_users au
  WHERE au.email = admin_email
    AND au.password_hash = crypt(admin_password, au.password_hash)
    AND au.is_active = true;
END;
$$;
