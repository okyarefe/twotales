import { getStoryById } from "@/lib/supabase/queries";

export default async function StoryShowPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: Fetch the story.

  try {
    const story = await getStoryById(params.id);
    console.log("Individual Story Fetched ", story);
    if (!story) {
      return <div>Story does not exist.</div>;
    }
    return <div>Story - {story?.english_version}</div>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return <div>Something went wrong..</div>;
  }
}
