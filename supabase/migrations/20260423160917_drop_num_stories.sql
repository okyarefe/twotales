DROP FUNCTION IF EXISTS public.increment_num_stories(uuid);
ALTER TABLE public.users DROP COLUMN IF EXISTS num_stories;