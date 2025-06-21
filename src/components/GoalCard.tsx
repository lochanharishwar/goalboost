
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Circle, Trash2, Plus, Target, Flag, X, SkipForward, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';
import { SoundButton } from '@/components/SoundButton';

interface GoalCardProps {
  tasks: Task[];
  newTaskText: string;
  newTaskPriority: 'urgent' | 'daily' | 'long-term';
  selectedDate: string;
  onNewTaskChange: (text: string) => void;
  onNewTaskPriorityChange: (priority: 'urgent' | 'daily' | 'long-term') => void;
  onAddTask: () => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onPostponeTask: (taskId: string) => void;
  onCancelTask?: (taskId: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const GoalCard = ({
  tasks,
  newTaskText,
  newTaskPriority,
  selectedDate,
  onNewTaskChange,
  onNewTaskPriorityChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onPostponeTask,
  onCancelTask,
  onKeyPress
}: GoalCardProps) => {
  const todayTasks = tasks.filter(task => task.date === selectedDate);
  const completedTasks = todayTasks.filter(task => task.completed);
  const progressPercentage = todayTasks.length > 0 
    ? Math.round((completedTasks.length / todayTasks.length) * 100)
    : 0;

  const getPriorityColor = (priority: 'urgent' | 'daily' | 'long-term') => {
    switch (priority) {
      case 'urgent': return 'bg-white text-black border-white shadow-white/50 animate-pulse font-bold';
      case 'daily': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'long-term': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getTaskGlow = (priority: 'urgent' | 'daily' | 'long-term') => {
    if (priority === 'urgent') {
      return 'shadow-xl shadow-white/30 ring-2 ring-white/50 bg-gradient-to-r from-white/10 to-white/5';
    }
    return '';
  };

  // Sort tasks by priority (urgent first)
  const sortedTasks = [...todayTasks].sort((a, b) => {
    const priorityOrder = { urgent: 0, daily: 1, 'long-term': 2 };
    return priorityOrder[a.priority || 'daily'] - priorityOrder[b.priority || 'daily'];
  });

  const suggestionGoals = [
    "💪 Exercise for 30 minutes",
    "📚 Read for 20 minutes",
    "💧 Drink 8 glasses of water",
    "🧘 Meditate for 10 minutes",
    "📝 Write in journal",
    "🎯 Complete top 3 work tasks"
  ];

  return (
    <Card className="shadow-2xl border-0 bg-black/20 backdrop-blur-xl border border-blue-500/20 font-inter">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Target className="h-6 w-6 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400 blur-md opacity-30 animate-pulse"></div>
            </div>
            <CardTitle className="text-xl text-white font-semibold font-inter">
              Today's Goals
            </CardTitle>
          </div>
          {todayTasks.length > 0 && (
            <Badge 
              variant="secondary" 
              className={cn(
                "px-3 py-1 text-sm font-medium font-inter",
                progressPercentage === 100 
                  ? "bg-green-500/20 text-green-300 border-green-400/30 animate-celebrate"
                  : "bg-blue-500/20 text-blue-300 border-blue-400/30"
              )}
            >
              {completedTasks.length}/{todayTasks.length}
            </Badge>
          )}
        </div>
        
        {/* Progress Bar */}
        {todayTasks.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-300 mb-3 font-inter">
              <span>Daily Progress</span>
              <span className="font-semibold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className={cn(
                  "h-3 rounded-full transition-all duration-700 ease-out",
                  progressPercentage === 100 
                    ? "bg-gradient-to-r from-green-400 to-green-500 animate-celebrate"
                    : "bg-gradient-to-r from-blue-400 to-blue-500"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Add Goal Input */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={newTaskText}
              onChange={(e) => onNewTaskChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="What do you want to achieve today?"
              className="flex-1 bg-black/30 border-blue-400/30 text-white placeholder:text-gray-400 focus:border-blue-400 h-12 px-4 font-inter"
            />
            <SoundButton 
              onClick={onAddTask}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 px-6 font-inter font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Goal
            </SoundButton>
          </div>

          <Select value={newTaskPriority} onValueChange={onNewTaskPriorityChange}>
            <SelectTrigger className="bg-black/30 border-blue-400/30 text-white font-inter h-12">
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-blue-500/30 text-white font-inter">
              <SelectItem value="urgent" className="text-white hover:bg-white/10 font-inter">
                🚨 Urgent - Do First
              </SelectItem>
              <SelectItem value="daily" className="text-blue-300 hover:bg-blue-500/10 font-inter">
                📅 Daily - Regular Task
              </SelectItem>
              <SelectItem value="long-term" className="text-purple-300 hover:bg-purple-500/10 font-inter">
                🎯 Long-term - Future Focus
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Goals List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {todayTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-inter">
              <div className="relative mb-6">
                <Sparkles className="h-16 w-16 mx-auto text-blue-400/50" />
                <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse"></div>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-white">Ready to achieve something great?</h3>
              <p className="text-sm opacity-70 mb-6">Start by adding your first goal above.</p>
              
              <div className="text-left max-w-sm mx-auto">
                <p className="text-xs text-blue-300/70 mb-3 font-medium">Need inspiration? Try these:</p>
                <div className="space-y-2">
                  {suggestionGoals.slice(0, 4).map((goal, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-300/60 hover:text-gray-300 transition-colors cursor-pointer p-2 rounded hover:bg-blue-500/5"
                      onClick={() => onNewTaskChange(goal)}
                    >
                      <ArrowRight className="h-3 w-3 text-blue-400/50" />
                      {goal}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            sortedTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group animate-slide-in-from-bottom font-inter",
                  task.completed 
                    ? "bg-green-500/10 border-green-400/30 animate-celebrate" 
                    : task.cancelled
                      ? "bg-red-500/10 border-red-400/30 opacity-60"
                      : "bg-black/30 border-blue-400/20 hover:border-blue-400/40 hover:bg-black/40",
                  getTaskGlow(task.priority || 'daily')
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="text-white hover:scale-110 transition-transform duration-200"
                  disabled={task.cancelled}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  ) : task.cancelled ? (
                    <XCircle className="h-6 w-6 text-red-400" />
                  ) : (
                    <Circle className="h-6 w-6 hover:text-blue-400" />
                  )}
                </button>
                
                <div className="flex-1 space-y-2">
                  <span
                    className={cn(
                      "block transition-all duration-200 text-base",
                      task.completed
                        ? "text-green-300 line-through opacity-75"
                        : task.cancelled
                          ? "text-red-300 line-through opacity-60"
                          : task.priority === 'urgent' 
                            ? "text-white font-semibold"
                            : "text-white"
                    )}
                  >
                    {task.text}
                  </span>
                  
                  {task.priority && (
                    <Badge 
                      className={cn(
                        "text-xs px-2 py-1 border font-inter",
                        getPriorityColor(task.priority)
                      )}
                    >
                      <Flag className="h-2 w-2 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                {!task.completed && !task.cancelled && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <SoundButton
                      onClick={() => onPostponeTask(task.id)}
                      size="sm"
                      variant="outline"
                      className="text-yellow-400 hover:text-yellow-300 border-yellow-400/30 hover:bg-yellow-500/10 font-inter"
                      title="Move to tomorrow"
                    >
                      <SkipForward className="h-4 w-4" />
                    </SoundButton>
                    {onCancelTask && (
                      <SoundButton
                        onClick={() => onCancelTask(task.id)}
                        size="sm"
                        variant="outline"
                        className="text-orange-400 hover:text-orange-300 border-orange-400/30 hover:bg-orange-500/10 font-inter"
                        title="Cancel/Didn't happen"
                      >
                        <XCircle className="h-4 w-4" />
                      </SoundButton>
                    )}
                    <SoundButton
                      onClick={() => onDeleteTask(task.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-400 hover:text-red-300 border-red-400/30 hover:bg-red-500/10 font-inter"
                      title="Delete"
                    >
                      <X className="h-4 w-4" />
                    </SoundButton>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
