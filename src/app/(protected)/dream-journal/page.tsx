import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DreamJournalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="text-2xl font-semibold mb-4">Dream Journal</h1>
        <p className="text-sm">Please sign in to view your dream journal.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-semibold mb-4">Dream Journal</h1>
    </div>
  );
}
