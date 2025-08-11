import TopicCreateForm from "@/components/stories/story-create-form";

export default async function DashboardPage() {
  // TODO: Show User Metrics

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Latest Stories</h1>
      </div>

      <TopicCreateForm></TopicCreateForm>
    </div>
  );
}
