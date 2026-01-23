import UserDashboard from "@/app/dashboard/user-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Coins } from "lucide-react";
import type { UserData } from "@/types";
import { CardError } from "./card-error";

// Async component for Role & Membership card
export async function RoleMembershipCard({ 
  userDataPromise 
}: { 
  userDataPromise: Promise<UserData | null> 
}) {
  // Await the promise inside the component
  const userData = await userDataPromise;

  if (!userData) {
    return <CardError title="Role & Membership" icon={<BookOpen className="h-4 w-4 text-purple-600" />} />;
  }

  return (
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
  );
}

// Async component for Story Credits card
export async function StoryCreditsCard({ 
  userDataPromise 
}: { 
  userDataPromise: Promise<UserData | null> 
}) {
  const userData = await userDataPromise;

  if (!userData) {
    return <CardError title="Story Credits" icon={<Coins className="h-4 w-4 text-yellow-600" />} />;
  }

  return (
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
  );
}

// Async component for TTS Credits card
export async function TTSCreditsCard({ 
  userDataPromise 
}: { 
  userDataPromise: Promise<UserData | null> 
}) {
  const userData = await userDataPromise;

  if (!userData) {
    return <CardError title="TTS Credits" icon={<Coins className="h-4 w-4 text-blue-600" />} />;
  }

  return (
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
  );
}

// Async component for Stories Created card
export async function StoriesCreatedCard({ 
  userDataPromise 
}: { 
  userDataPromise: Promise<UserData | null> 
}) {
  const userData = await userDataPromise;

  if (!userData) {
    return <CardError title="Stories Created" icon={<BookOpen className="h-4 w-4 text-green-600" />} />;
  }

  return (
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
          numberOfStories={userData.storiesCreated}
          type="storiesCreated"
        />
      </CardContent>
    </Card>
  );
}
