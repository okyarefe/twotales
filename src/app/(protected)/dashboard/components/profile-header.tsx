import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Calendar } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { UserData } from "@/types";

interface ProfileHeaderProps {
  user: User;
  userDataPromise: Promise<UserData | null>;
}

export async function ProfileHeader({
  user,
  userDataPromise,
}: ProfileHeaderProps) {
  const userData = await userDataPromise;

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Learner";
  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <Card className="hover:translate-y-0">
      <CardContent className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="size-20 border-2 border-purple-200">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback className="text-xl font-semibold bg-purple-100 text-purple-700">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800">{displayName}</h1>
            {userData?.membershipType && (
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 capitalize">
                <Crown className="size-3" />
                {userData.membershipType}
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500">{user.email}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 justify-center sm:justify-start">
            <Calendar className="size-3" />
            <span>Member since {memberSince}</span>
          </div>
        </div>

        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {userData?.storiesCreated ?? 0}
            </div>
            <div className="text-xs text-slate-500">Stories</div>
          </div>
          <div className="w-px bg-slate-200" />
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {userData?.storyCredit ?? 0}
            </div>
            <div className="text-xs text-slate-500">Credits</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
