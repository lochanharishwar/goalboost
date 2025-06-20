
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, Award, Target } from 'lucide-react';
import { Task } from '@/types/task';

interface StatsCardProps {
  tasks: Task[];
  selectedDate: string;
}

export const StatsCard = ({ tasks, selectedDate }: StatsCardProps) => {
  const todayTasks = tasks.filter(task => task.date === selectedDate);
  const completedTasks = todayTasks.filter(task => task.completed);
  const progressPercentage = todayTasks.length > 0 
    ? Math.round((completedTasks.length / todayTasks.length) * 100)
    : 0;

  // Calculate streak (simplified for demo)
  const streak = 5; // This would be calculated from actual data
  const totalCompleted = tasks.filter(task => task.completed).length;

  return (
    <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-blue-500/20 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-blue-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-blue-400" />
          <CardTitle className="text-xl text-white font-bold">Executive Metrics</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-400/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400 mb-1 drop-shadow-lg">
              {completedTasks.length}
            </div>
            <div className="text-xs text-blue-300 font-medium tracking-wide">ACHIEVED</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-400/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <TrendingUp className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400 mb-1 drop-shadow-lg">
              {todayTasks.length - completedTasks.length}
            </div>
            <div className="text-xs text-red-300 font-medium tracking-wide">PENDING</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-400/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400 mb-1 drop-shadow-lg">
              {streak}
            </div>
            <div className="text-xs text-purple-300 font-medium tracking-wide">STREAK</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl border border-green-400/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <Zap className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400 mb-1 drop-shadow-lg">
              {totalCompleted}
            </div>
            <div className="text-xs text-green-300 font-medium tracking-wide">TOTAL</div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="mt-6 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progressPercentage * 2.51} 251`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
