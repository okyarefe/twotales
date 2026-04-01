import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, Brain, Headphones } from "lucide-react";
import type { UserData } from "@/types";

// Mock stats — replace with real data when backend is ready
const MOCK_STATS = {
  quizzesCompleted: 18,
  quizAccuracy: 76,
  ttsUsed: 12,
  languagesPracticed: ["Spanish", "French"],
};

interface StatsOverviewProps {
  userDataPromise: Promise<UserData | null>;
}

export async function StatsOverview({ userDataPromise }: StatsOverviewProps) {
  const userData = await userDataPromise;
  const stats = MOCK_STATS;

  const statCards = [
    {
      label: "Stories Created",
      value: userData?.storiesCreated ?? 0,
      icon: <BookOpen className="size-4 text-green-500" />,
      color: "bg-green-50 border-green-100",
    },
    {
      label: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon: <Brain className="size-4 text-blue-500" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      label: "Quiz Accuracy",
      value: `${stats.quizAccuracy}%`,
      icon: <BarChart3 className="size-4 text-purple-500" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      label: "TTS Listens",
      value: stats.ttsUsed,
      icon: <Headphones className="size-4 text-orange-500" />,
      color: "bg-orange-50 border-orange-100",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="size-5 text-purple-500" />
          Learning Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg border p-3 ${stat.color}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {stat.icon}
                <span className="text-xs text-slate-500">{stat.label}</span>
              </div>
              <div className="text-xl font-bold text-slate-800">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {stats.languagesPracticed.length > 0 && (
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
            <span className="text-xs text-slate-500">
              Languages practiced
            </span>
            <div className="flex gap-2 mt-1.5">
              {stats.languagesPracticed.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
