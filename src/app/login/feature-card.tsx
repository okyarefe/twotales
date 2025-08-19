import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  bgColor,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
