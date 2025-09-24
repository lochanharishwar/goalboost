
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Target, Award, Clock, CheckCircle } from 'lucide-react';
import { Task } from '@/types/task';
import { format, subDays, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useClickSound } from '@/utils/soundUtils';

const Analytics = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { playClickSound } = useClickSound();

  useEffect(() => {
    const savedTasks = localStorage.getItem('goalflow-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Listen for localStorage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'goalflow-tasks' && e.newValue) {
        setTasks(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for changes within the same tab
    const handleLocalUpdate = () => {
      const updatedTasks = localStorage.getItem('goalflow-tasks');
      if (updatedTasks) {
        setTasks(JSON.parse(updatedTasks));
      }
    };

    // Check for updates every second (for same-tab updates)
    const interval = setInterval(handleLocalUpdate, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const cancelledTasks = tasks.filter(task => task.cancelled).length;
  
  // Priority distribution
  const urgentTasks = tasks.filter(task => task.priority === 'urgent').length;
  const dailyTasks = tasks.filter(task => task.priority === 'daily').length;
  const longTermTasks = tasks.filter(task => task.priority === 'long-term').length;

  // Weekly data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
    const dayTasks = tasks.filter(task => task.date === date);
    const dayCompleted = dayTasks.filter(task => task.completed).length;
    
    return {
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      tasks: dayTasks.length,
      completed: dayCompleted,
      completionRate: dayTasks.length > 0 ? Math.round((dayCompleted / dayTasks.length) * 100) : 0
    };
  });

  // Priority pie chart data
  const priorityData = [
    { name: 'Urgent', value: urgentTasks, color: '#ffffff' },
    { name: 'Daily', value: dailyTasks, color: '#3b82f6' },
    { name: 'Long-term', value: longTermTasks, color: '#8b5cf6' },
  ].filter(item => item.value > 0);

  const chartConfig = {
    tasks: { label: "Total Tasks", color: "#3b82f6" },
    completed: { label: "Completed", color: "#10b981" },
    completionRate: { label: "Completion Rate %", color: "#f59e0b" }
  };

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900" 
        : "bg-gradient-to-br from-purple-50 via-blue-50 to-slate-100"
    )}>
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Track your productivity and goal completion trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/30 backdrop-blur-xl border-blue-500/20 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Goals</p>
                  <p className="text-2xl font-bold text-white">{totalTasks}</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-xl border-green-500/20 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedTasks}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-xl border-purple-500/20 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">{completionRate}%</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-xl border-yellow-500/20 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Urgent Goals</p>
                  <p className="text-2xl font-bold text-white">{urgentTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Progress Chart */}
          <Card className="bg-black/30 backdrop-blur-xl border-blue-500/20 border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={last7Days}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Priority Distribution */}
          <Card className="bg-black/30 backdrop-blur-xl border-purple-500/20 border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goal Priority Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {priorityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-400">
                    <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No goals data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Rate Trend */}
        <Card className="bg-black/30 backdrop-blur-xl border-green-500/20 border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Completion Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="completionRate" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Summary Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/30 backdrop-blur-xl border-blue-500/20 border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">📊 Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm">
                {completionRate >= 80 
                  ? "🎉 Excellent! You're maintaining a high completion rate."
                  : completionRate >= 60
                    ? "👍 Good progress! Consider focusing on fewer, high-priority tasks."
                    : "💡 Try setting more achievable daily goals to build momentum."
                }
              </p>
              <p className="text-gray-300 text-sm">
                {urgentTasks > 0 
                  ? `⚡ You have ${urgentTasks} urgent task${urgentTasks > 1 ? 's' : ''} that need immediate attention.`
                  : "✅ Great! No urgent tasks pending. Focus on long-term goals."
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-xl border-purple-500/20 border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">🎯 Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm">
                • {completionRate < 50 ? "Try the Pomodoro technique to improve focus" : "Consider setting stretch goals to challenge yourself"}
              </p>
              <p className="text-gray-300 text-sm">
                • {urgentTasks > dailyTasks ? "Balance urgent tasks with regular daily goals" : "Good balance between urgent and daily tasks"}
              </p>
              <p className="text-gray-300 text-sm">
                • Review and adjust your goal priorities weekly for better results
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
