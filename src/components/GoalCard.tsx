
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Circle, Trash2, Plus, Target, Flag, X, SkipForward, XCircle } from 'lucide-react';
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

  return (
    <Card className="shadow-xl border-0 bg-black/30 backdrop-blur-xl border border-blue-500/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-xl text-white font-semibold">
              Daily Goals
            </CardTitle>
          </div>
          {todayTasks.length > 0 && (
            <Badge 
              variant="secondary" 
              className={cn(
                "px-3 py-1 text-sm font-medium",
                progressPercentage === 100 
                  ? "bg-green-500/20 text-green-300 border-green-400/30"
                  : "bg-blue-500/20 text-blue-300 border-blue-400/30"
              )}
            >
              {completedTasks.length}/{todayTasks.length}
            </Badge>
          )}
        </div>
        
        {/* Progress Bar */}
        {todayTasks.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  progressPercentage === 100 
                    ? "bg-gradient-to-r from-green-400 to-green-500"
                    : "bg-gradient-to-r from-blue-400 to-blue-500"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Goal Input */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newTaskText}
              onChange={(e) => onNewTaskChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Add a new goal..."
              className="flex-1 bg-black/20 border-blue-400/30 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
            <SoundButton 
              onClick={onAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="h-4 w-4" />
            </SoundButton>
          </div>

          <Select value={newTaskPriority} onValueChange={onNewTaskPriorityChange}>
            <SelectTrigger className="bg-black/20 border-blue-400/30 text-white">
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-blue-500/30 text-white">
              <SelectItem value="urgent" className="text-white hover:bg-white/10">
                🚨 Urgent
              </SelectItem>
              <SelectItem value="daily" className="text-blue-300 hover:bg-blue-500/10">
                📅 Daily
              </SelectItem>
              <SelectItem value="long-term" className="text-purple-300 hover:bg-purple-500/10">
                🎯 Long-term
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Goals List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {todayTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-3">🎯</div>
              <p className="font-medium">No goals set for this day.</p>
              <p className="text-sm opacity-70">Add your first goal above.</p>
            </div>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md group",
                  task.completed 
                    ? "bg-green-500/10 border-green-400/30" 
                    : task.cancelled
                      ? "bg-red-500/10 border-red-400/30 opacity-60"
                      : "bg-black/20 border-blue-400/20 hover:border-blue-400/40",
                  getTaskGlow(task.priority || 'daily')
                )}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="text-white hover:scale-110 transition-transform"
                  disabled={task.cancelled}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : task.cancelled ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                
                <div className="flex-1 space-y-1">
                  <span
                    className={cn(
                      "block transition-all duration-200",
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
                        "text-xs px-2 py-0.5 border",
                        getPriorityColor(task.priority)
                      )}
                    >
                      <Flag className="h-2 w-2 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                {!task.completed && !task.cancelled && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <SoundButton
                      onClick={() => onPostponeTask(task.id)}
                      size="sm"
                      variant="outline"
                      className="text-yellow-400 hover:text-yellow-300 border-yellow-400/30 hover:bg-yellow-500/10"
                      title="Move to tomorrow"
                    >
                      <SkipForward className="h-3 w-3" />
                    </SoundButton>
                    {onCancelTask && (
                      <SoundButton
                        onClick={() => onCancelTask(task.id)}
                        size="sm"
                        variant="outline"
                        className="text-orange-400 hover:text-orange-300 border-orange-400/30 hover:bg-orange-500/10"
                        title="Cancel/Didn't happen"
                      >
                        <XCircle className="h-3 w-3" />
                      </SoundButton>
                    )}
                    <SoundButton
                      onClick={() => onDeleteTask(task.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-400 hover:text-red-300 border-red-400/30 hover:bg-red-500/10"
                      title="Delete"
                    >
                      <X className="h-3 w-3" />
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
