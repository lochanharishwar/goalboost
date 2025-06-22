
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Achievement } from '@/types/task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ achievement, size = 'md' }: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'streak': return 'bg-orange-500/20 border-orange-400/30 text-orange-400';
      case 'completion': return 'bg-green-500/20 border-green-400/30 text-green-400';
      case 'category': return 'bg-purple-500/20 border-purple-400/30 text-purple-400';
      case 'special': return 'bg-blue-500/20 border-blue-400/30 text-blue-400';
      default: return 'bg-gray-500/20 border-gray-400/30 text-gray-400';
    }
  };

  return (
    <Card className={cn(
      "bg-black/40 backdrop-blur-xl border hover:scale-105 transition-all duration-200 cursor-pointer group",
      getTypeColor(achievement.type)
    )}>
      <CardContent className="p-3">
        <div className={cn(
          "flex flex-col items-center text-center space-y-2",
          sizeClasses[size]
        )}>
          <div className="text-2xl">{achievement.icon}</div>
          <div className="space-y-1">
            <h4 className="font-semibold text-white text-xs leading-tight">{achievement.title}</h4>
            <p className="text-xs text-gray-300 opacity-80 leading-tight">{achievement.description}</p>
            <Badge variant="outline" className="text-xs px-2 py-0 border-current/30">
              {format(new Date(achievement.unlockedAt), 'MMM dd')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
