import { getStoryById } from "@/lib/supabase/queries";
import Link from "next/link";
import type { Story } from "@/types";
import { Button } from "@/components/ui/button";
import { DreamJournalForm } from "./dream-journal-form";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DreamJournalDetailPage({ params }: Props) {
  const props = await params;
  const storyId = props.id;

  let story: Story | null = null;
  try {
    story = await getStoryById(storyId);
  } catch {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="text-2xl font-semibold mb-4">Dream Journal</h1>
        <p className="text-sm text-red-600">Failed to load story.</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dream-journal">Back</Link>
        </Button>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="text-2xl font-semibold mb-4">Dream Journal</h1>
        <p className="text-sm">Story not found.</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/stories">Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dream Journal</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/stories">Back</Link>
        </Button>
      </div>

      {/* Original Story Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{story.title ?? "Untitled"}</h2>
        <div className="text-xs text-muted-foreground">
          Created {new Date(story.created_at).toLocaleDateString()}
        </div>
        <article className="prose max-w-none whitespace-pre-wrap bg-muted/30 p-6 rounded-lg border text-sm sm:text-base">
          {story.english_version}
        </article>
      </section>

      {/* User Input Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Your Turn</h2>
        <p className="text-sm text-muted-foreground">
          After reading or listening to the story, write it in{" "}
          {story.translate_to}. You will receive feedback on your writing.
        </p>
        <DreamJournalForm
          targetLanguage={story.translate_to}
          storyCheckReference={story.translated_version}
        />
      </section>
    </div>
  );
}
