import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, TrendingUp, Trophy, Zap } from 'lucide-react';

// Mock streak data — replace with real data when backend is ready
const MOCK_STREAK = {
  currentStreak: 7,
  longestStreak: 14,
  totalActiveDays: 32,
  weeklyActivity: [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: false },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
    { day: 'Sun', active: false },
  ],
  monthlyActivity: [
    [true, true, false, true, true, true, false],
    [true, false, true, true, true, false, false],
    [true, true, true, true, false, true, true],
    [false, true, true, false, true, true, true],
  ],
};

export function StreakDisplay() {
  const streak = MOCK_STREAK;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="size-5 text-orange-500" />
          Learning Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 p-6 border border-orange-100">
          <Flame className="size-10 text-orange-500" />
          <div>
            <div className="text-4xl font-bold text-orange-600">
              {streak.currentStreak}
            </div>
            <div className="text-sm text-orange-500 font-medium">
              Day streak
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
            <Trophy className="size-4 text-amber-500" />
            <div>
              <div className="text-lg font-semibold text-slate-800">
                {streak.longestStreak}
              </div>
              <div className="text-xs text-slate-500">Best streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
            <TrendingUp className="size-4 text-green-500" />
            <div>
              <div className="text-lg font-semibold text-slate-800">
                {streak.totalActiveDays}
              </div>
              <div className="text-xs text-slate-500">Total days</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Zap className="size-3.5 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">
              This week
            </span>
          </div>
          <div className="flex justify-between gap-1.5">
            {streak.weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1.5">
                <div
                  className={`size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    day.active
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {day.active ? (
                    <Flame className="size-4" />
                  ) : (
                    <span className="text-xs">{day.day[0]}</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-slate-600">
            Last 4 weeks
          </span>
          <div className="mt-2 flex flex-col gap-1">
            {streak.monthlyActivity.map((week, weekIdx) => (
              <div key={weekIdx} className="flex gap-1">
                {week.map((active, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`size-5 rounded-sm transition-colors ${
                      active ? 'bg-orange-400' : 'bg-slate-100'
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
            <span>Less</span>
            <div className="size-3 rounded-sm bg-slate-100" />
            <div className="size-3 rounded-sm bg-orange-200" />
            <div className="size-3 rounded-sm bg-orange-400" />
            <div className="size-3 rounded-sm bg-orange-600" />
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
