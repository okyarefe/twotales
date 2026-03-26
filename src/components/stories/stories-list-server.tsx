import { Story } from "@/types";
import { getUserStories, searchUserStories } from "@/lib/supabase/queries";
import { StoryCard } from "@/components/stories/story-card";
import EmptyStoriesState from "./empty-state";

interface StoriesListServerProps {
  userId: string;
  query: string;
}

export default async function StoriesListServer({
  userId,
  query,
}: StoriesListServerProps) {
  const stories: Story[] = query
    ? await searchUserStories(userId, query, 25)
    : (await getUserStories(userId)).stories;

  if (stories.length === 0) {
    return <EmptyStoriesState isSearch={!!query} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} index={index} />
      ))}
    </div>
  );
}
