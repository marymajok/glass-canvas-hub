-- Add unique constraint on user_id in user_roles table
-- This prevents duplicate roles per user and enables ON CONFLICT updates
ALTER TABLE public.user_roles 
ADD CONSTRAINT user_roles_user_id_key UNIQUE (user_id);