import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Header } from '@/components/Header';
import { GoalCard } from '@/components/GoalCard';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/types/task';
import { useClickSound } from '@/utils/soundUtils';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'urgent' | 'daily' | 'long-term'>('daily');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  // Load tasks and theme from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('aspiraTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    const savedTheme = localStorage.getItem('aspiraTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('aspiraTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('aspiraTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');

  const addTask = () => {
    if (newTaskText.trim()) {
      playClickSound();
      const newTask: Task = {
        id: crypto.randomUUID(),
        text: newTaskText.trim(),
        completed: false,
        date: selectedDateString,
        createdAt: new Date().toISOString(),
        priority: newTaskPriority
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskPriority('daily');
      toast({
        title: "✅ Goal Added!",
        description: "Your goal has been added successfully.",
      });
    }
  };

  const toggleTask = (taskId: string) => {
    playClickSound();
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast({
        title: "🎉 Goal Completed!",
        description: "Great job! Keep up the excellent work.",
      });
    }
  };

  const deleteTask = (taskId: string) => {
    playClickSound();
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Goal Deleted",
      description: "Goal has been removed from your list.",
    });
  };

  const postponeTask = (taskId: string) => {
    playClickSound();
    const nextDay = format(addDays(selectedDate, 1), 'yyyy-MM-dd');
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, date: nextDay }
        : task
    ));
    toast({
      title: "📅 Goal Postponed",
      description: "Goal moved to tomorrow.",
    });
  };

  const cancelTask = (taskId: string) => {
    playClickSound();
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: false, cancelled: true }
        : task
    ));
    toast({
      title: "❌ Goal Cancelled",
      description: "Goal marked as cancelled.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTheme = () => {
    playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  const todayTasks = tasks.filter(task => task.date === selectedDateString);
  const completedTasks = todayTasks.filter(task => task.completed);
  const progressPercentage = todayTasks.length > 0 
    ? Math.round((completedTasks.length / todayTasks.length) * 100)
    : 0;

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" 
        : "bg-gradient-to-br from-blue-50 via-white to-slate-50"
    )}>
      {/* Simple background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isDarkMode 
          ? "bg-gradient-to-br from-blue-600/5 via-transparent to-slate-600/5"
          : "bg-gradient-to-br from-blue-200/10 via-transparent to-slate-200/10"
      )}></div>

      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-300">
            {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <GoalCard
            tasks={tasks}
            newTaskText={newTaskText}
            newTaskPriority={newTaskPriority}
            selectedDate={selectedDateString}
            onNewTaskChange={setNewTaskText}
            onNewTaskPriorityChange={setNewTaskPriority}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onPostponeTask={postponeTask}
            onCancelTask={cancelTask}
            onKeyPress={handleKeyPress}
          />

          <div className="space-y-6">
            <StatsCard tasks={tasks} selectedDate={selectedDateString} />

            <Card className="shadow-lg border-0 bg-black/30 backdrop-blur-xl border border-blue-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">
                    {progressPercentage === 100 ? '🏆' : 
                     progressPercentage >= 50 ? '⭐' : '🎯'}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">
                    {progressPercentage === 100 ? 'Perfect Day!' :
                     progressPercentage >= 50 ? 'Great Progress!' :
                     'Keep Going!'}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {progressPercentage === 100 
                      ? 'You\'ve completed all your goals for today!' :
                      progressPercentage >= 50
                        ? 'You\'re doing great! Keep up the momentum.' :
                        'Every step counts. You\'ve got this!'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
