import { UserData } from "@/types";

export default function UserDashboard({
  userData,
  type,
}: {
  userData: UserData;
  type: string;
}) {
  //const { userData, isLoading, refreshUserData } = useUser();

  if (!userData) {
    return <span className="text-gray-500">You need to login</span>;
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

  return <div className="flex items-center gap-2">{value}</div>;
}
