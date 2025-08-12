import { getStoryById } from "@/lib/supabase/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryShowPage({ params }: PageProps) {
  try {
    const story = await getStoryById((await params).id);
    if (!story) {
      return <div>Story does not exist.</div>;
    }
    return <div>Story - {story.english_version}</div>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <div>Something went wrong..</div>;
  }
}
