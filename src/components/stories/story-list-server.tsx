import { Story } from "@/types";
import { getUserStories, searchUserStories } from "@/lib/supabase/queries";
import { StoryCard } from "@/components/stories/story-card";
import StoryEmpty from "./story-empty";

interface StoryListServerProps {
  userId: string;
  query: string;
}

export default async function StoryListServer({
  userId,
  query,
}: StoryListServerProps) {
  const limit = query ? 50 : 24;
  
  const stories: Story[] = query
    ? await searchUserStories(userId, query, limit)
    : await getUserStories(userId, limit);

  if (stories.length === 0) {
    return <StoryEmpty isSearch={!!query} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} index={index} />
      ))}
    </div>
  );
}
