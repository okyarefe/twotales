import UserDashboard from "@/app/dashboard/user-dashboard";
import TopicCreateForm from "@/components/stories/story-create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Coins } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/actions/user-data";
import { getUserStoriesCount } from "@/lib/supabase/queries";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    return <p>You need to login</p>;
  }

  const userId = user.id;
  const [userData, numberOfStories] = await Promise.all([
    getUserData(userId),
    getUserStoriesCount(userId),
  ]);

  if (!userData) {
    return <p>User data not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
              Welcome back!
            </h2>
            <TopicCreateForm />
          </div>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Your personalized dashboard for tracking your language learning
            progress
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Role & Membership
                </CardTitle>
                <BookOpen className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <UserDashboard userData={userData} type="role" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Story Credits
                </CardTitle>
                <Coins className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <UserDashboard userData={userData} type="storyCredit" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  TTS Credits
                </CardTitle>
                <Coins className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <UserDashboard userData={userData} type="ttsCredit" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Stories Created
                </CardTitle>
                <BookOpen className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <UserDashboard
                  userData={userData}
                  numberOfStories={numberOfStories}
                  type="storiesCreated"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
