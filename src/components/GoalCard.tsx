
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Trash2, Plus, Target, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';

interface GoalCardProps {
  tasks: Task[];
  newTaskText: string;
  selectedDate: string;
  onNewTaskChange: (text: string) => void;
  onAddTask: () => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const GoalCard = ({
  tasks,
  newTaskText,
  selectedDate,
  onNewTaskChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onKeyPress
}: GoalCardProps) => {
  const todayTasks = tasks.filter(task => task.date === selectedDate);
  const completedTasks = todayTasks.filter(task => task.completed);
  const progressPercentage = todayTasks.length > 0 
    ? Math.round((completedTasks.length / todayTasks.length) * 100)
    : 0;

  const getPriorityColor = (priority: 'urgent' | 'daily' | 'long-term') => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'daily': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'long-term': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-red-500/20 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-red-500/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-red-400" />
            <CardTitle className="text-2xl text-white font-bold tracking-wide">
              Executive Objectives
            </CardTitle>
          </div>
          {todayTasks.length > 0 && (
            <Badge 
              variant="secondary" 
              className={cn(
                "px-4 py-2 text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-300",
                progressPercentage === 100 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30"
              )}
            >
              {completedTasks.length}/{todayTasks.length} Elite
            </Badge>
          )}
        </div>
        
        {/* Premium Progress Bar */}
        {todayTasks.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-300 mb-3 font-medium">
              <span>Executive Progress</span>
              <span className="font-bold">{progressPercentage}%</span>
            </div>
            <div className="relative w-full bg-gray-800/50 rounded-full h-4 shadow-inner overflow-hidden">
              <div 
                className={cn(
                  "h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
                  progressPercentage === 100 
                    ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-500/50"
                    : "bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg shadow-red-500/50"
                )}
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Premium Add Goal Input */}
        <div className="flex gap-3">
          <Input
            value={newTaskText}
            onChange={(e) => onNewTaskChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Define your executive objective..."
            className="flex-1 bg-black/30 border-red-400/30 text-white placeholder:text-gray-400 focus:border-red-400 backdrop-blur-sm shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          />
          <Button 
            onClick={onAddTask}
            className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white border-0 shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-red-500/30"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Premium Goals List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-gradient-to-b scrollbar-thumb-from-red-500 scrollbar-thumb-to-blue-600 hover:scrollbar-thumb-from-red-600 hover:scrollbar-thumb-to-blue-700">
          {todayTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg font-medium">No executive objectives defined.</p>
              <p className="text-sm opacity-70">Establish your premium goals above.</p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] backdrop-blur-sm group",
                  task.completed 
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-400/30 shadow-blue-500/20" 
                    : "bg-black/30 border-red-400/20 hover:border-red-400/40 shadow-lg"
                )}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="text-white hover:text-red-400 transition-colors transform hover:scale-110 duration-300"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-blue-400 drop-shadow-lg animate-bounce" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                
                <div className="flex-1 space-y-2">
                  <span
                    className={cn(
                      "block transition-all duration-300 font-medium",
                      task.completed
                        ? "text-blue-300 line-through opacity-75"
                        : "text-white"
                    )}
                  >
                    {task.text}
                  </span>
                  
                  {task.priority && (
                    <Badge 
                      className={cn(
                        "text-xs px-2 py-1 font-medium border animate-pulse",
                        getPriorityColor(task.priority)
                      )}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors p-2 transform hover:scale-110 duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
