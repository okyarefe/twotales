import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserData } from "@/types";
import { CardError } from "./card-error";

export async function DashboardCard({
  title,
  icon,
  userDataPromise,
  renderContent,
}: {
  title: string;
  icon: React.ReactNode;
  userDataPromise: Promise<UserData | null>;
  renderContent: (userData: UserData) => React.ReactNode;
}) {
  const userData = await userDataPromise;

  if (!userData) {
    return <CardError title={title} icon={icon} />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{renderContent(userData)}</CardContent>
    </Card>
  );
}
