"use client";
import { useUser } from "@/contexts/user-context";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

export default function UserDashboard({ type }: { type: string }) {
  const { userData, isLoading, refreshUserData } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!userData) {
    return <span className="text-gray-500">No data</span>;
  }

  let value;
  switch (type) {
    case "role":
      value = (
        <>
          <div className="text-lg font-bold capitalize">{userData.role}</div>
          <p className="text-sm text-muted-foreground capitalize">
            {userData.membershipType} membership
          </p>
        </>
      );
      break;
    case "storyCredit":
      value = <div className="text-2xl font-bold">{userData.storyCredit}</div>;
      break;
    case "ttsCredit":
      value = <div className="text-2xl font-bold">{userData.ttsCredit}</div>;
      break;
    case "storiesCreated":
      value = (
        <div className="text-2xl font-bold">{userData.storiesCreated}</div>
      );
      break;
    default:
      value = <span>Unknown</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {value}
      <Button
        onClick={refreshUserData}
        variant="outline"
        size="sm"
        className="ml-2"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
