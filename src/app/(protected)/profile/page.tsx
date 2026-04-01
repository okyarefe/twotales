import { Suspense } from "react";
import { getUser } from "@/utils/supabase/auth-server";
import { getUserData } from "@/actions/user-data";
import { ProfileHeader } from "./components/profile-header";
import { StreakDisplay } from "./components/streak-display";
import { StatsOverview } from "./components/stats-overview";
import { ProfileHeaderSkeleton } from "./components/profile-header-skeleton";
import { CardSkeleton } from "./components/card-skeleton";

export default async function ProfilePage() {
  const user = await getUser();
  const userDataPromise = getUserData(user.id);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 font-sans min-h-full">
      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader user={user} userDataPromise={userDataPromise} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<CardSkeleton />}>
            <StreakDisplay />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <StatsOverview userDataPromise={userDataPromise} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
