-- Trigger to auto-create public.users row when a new auth user signs up
-- This exists on production but lives in the auth schema, so it's not captured by schema dumps
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Seed plans
INSERT INTO "public"."plan" ("id", "productid", "productname", "variantid", "name", "description", "price", "isusagebased", "interval", "intervalcount", "trialinterval", "trialintervalcount", "sort", "story_credits", "image_url") VALUES
  (1, 740183, 'Bookworm', 1165097, 'Default', '<p>Package grants user 10 story with quizzes and feedback.</p>', '250', false, 'year', 1, null, null, 1, 10, 'https://tdjsddgztzdvsttljtkf.supabase.co/storage/v1/object/public/twotales_images/bookworm.png'),
  (2, 746537, 'Wanderer', 1174927, 'Default', '<p>Package grants user 40 stories</p>', '399', false, 'year', 1, null, null, 1, 25, 'https://tdjsddgztzdvsttljtkf.supabase.co/storage/v1/object/public/twotales_images/wanderer.png'),
  (3, 746538, 'Legend Explorer', 1174928, 'Default', '<p>Package that grants user 100 stories</p>', '599', false, 'year', 1, null, null, 1, 60, 'https://tdjsddgztzdvsttljtkf.supabase.co/storage/v1/object/public/twotales_images/explorer.png');
