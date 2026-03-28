import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardError({ 
  title, 
  icon 
}: { 
  title: string; 
  icon: React.ReactNode 
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-red-600">Failed to load data</p>
      </CardContent>
    </Card>
  );
}
