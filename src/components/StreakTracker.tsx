
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Target } from 'lucide-react';
import { UserStats } from '@/types/task';

interface StreakTrackerProps {
  stats: UserStats;
  isDarkMode: boolean;
}

export const StreakTracker = ({ stats, isDarkMode }: StreakTrackerProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-black/20 backdrop-blur-xl border border-orange-500/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" />
          Streak Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-orange-400">{stats.currentStreak}</div>
            <div className="text-xs text-gray-300">Current</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">{stats.longestStreak}</div>
            <div className="text-xs text-gray-300">Best</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.totalCompleted}</div>
            <div className="text-xs text-gray-300">Total</div>
          </div>
        </div>

        {stats.currentStreak > 0 && (
          <div className="text-center p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
              🔥 {stats.currentStreak} day streak!
            </Badge>
          </div>
        )}

        {stats.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Recent Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {stats.achievements.slice(-3).map((achievement) => (
                <Badge
                  key={achievement.id}
                  className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs"
                >
                  {achievement.icon} {achievement.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
