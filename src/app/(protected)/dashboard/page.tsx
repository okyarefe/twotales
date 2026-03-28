import { Suspense } from "react";
import TopicCreateForm from "@/components/stories/story-create-form";
import { BookOpen, Coins } from "lucide-react";

import { getUserData } from "@/actions/user-data";
import { getUser } from "@/utils/supabase/auth-server";
import { CardSkeleton } from "./components/card-skeleton";
import { DashboardCard } from "./components/dashboard-card";

export default async function DashboardPage() {
  const user = await getUser();
  const userDataPromise = getUserData(user.id);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
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
            <Suspense fallback={<CardSkeleton title="Role & Membership" icon={<BookOpen className="h-4 w-4 text-purple-600" />} />}>
              <DashboardCard
                title="Role & Membership"
                icon={<BookOpen className="h-4 w-4 text-purple-600" />}
                userDataPromise={userDataPromise}
                renderContent={(userData) => (
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-bold capitalize">{userData.role}</div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {userData.membershipType} membership
                    </p>
                  </div>
                )}
              />
            </Suspense>

            <Suspense fallback={<CardSkeleton title="Story Credits" icon={<Coins className="h-4 w-4 text-yellow-600" />} />}>
              <DashboardCard
                title="Story Credits"
                icon={<Coins className="h-4 w-4 text-yellow-600" />}
                userDataPromise={userDataPromise}
                renderContent={(userData) => (
                  <div className="text-2xl font-bold">{userData.storyCredit}</div>
                )}
              />
            </Suspense>

            <Suspense fallback={<CardSkeleton title="TTS Credits" icon={<Coins className="h-4 w-4 text-blue-600" />} />}>
              <DashboardCard
                title="TTS Credits"
                icon={<Coins className="h-4 w-4 text-blue-600" />}
                userDataPromise={userDataPromise}
                renderContent={(userData) => (
                  <div className="text-2xl font-bold">{userData.ttsCredit}</div>
                )}
              />
            </Suspense>

            <Suspense fallback={<CardSkeleton title="Stories Created" icon={<BookOpen className="h-4 w-4 text-green-600" />} />}>
              <DashboardCard
                title="Stories Created"
                icon={<BookOpen className="h-4 w-4 text-green-600" />}
                userDataPromise={userDataPromise}
                renderContent={(userData) => (
                  <div className="text-2xl font-bold">{userData.storiesCreated}</div>
                )}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
