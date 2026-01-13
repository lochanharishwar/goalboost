import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Achievement } from '@/types/task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Sparkles } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ achievement, size = 'md' }: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'min-h-[120px]',
    md: 'min-h-[140px]',
    lg: 'min-h-[160px]'
  };

  const iconSizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  const getTypeConfig = (type: Achievement['type']) => {
    switch (type) {
      case 'streak': 
        return { 
          gradient: 'from-orange-500/30 via-amber-500/20 to-yellow-500/10',
          border: 'border-orange-400/50',
          glow: 'shadow-orange-500/20',
          accent: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-400/30'
        };
      case 'completion': 
        return { 
          gradient: 'from-emerald-500/30 via-green-500/20 to-teal-500/10',
          border: 'border-emerald-400/50',
          glow: 'shadow-emerald-500/20',
          accent: 'text-emerald-400',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        };
      case 'category': 
        return { 
          gradient: 'from-violet-500/30 via-purple-500/20 to-fuchsia-500/10',
          border: 'border-violet-400/50',
          glow: 'shadow-violet-500/20',
          accent: 'text-violet-400',
          badge: 'bg-violet-500/20 text-violet-300 border-violet-400/30'
        };
      case 'special': 
        return { 
          gradient: 'from-blue-500/30 via-cyan-500/20 to-sky-500/10',
          border: 'border-blue-400/50',
          glow: 'shadow-blue-500/20',
          accent: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
        };
      default: 
        return { 
          gradient: 'from-slate-500/30 via-gray-500/20 to-zinc-500/10',
          border: 'border-slate-400/50',
          glow: 'shadow-slate-500/20',
          accent: 'text-slate-400',
          badge: 'bg-slate-500/20 text-slate-300 border-slate-400/30'
        };
    }
  };

  const config = getTypeConfig(achievement.type);

  return (
    <Card className={cn(
      "relative overflow-hidden backdrop-blur-xl border-2 transition-all duration-500 cursor-pointer group",
      "hover:scale-105 hover:-translate-y-1",
      "bg-gradient-to-br",
      config.gradient,
      config.border,
      "shadow-lg hover:shadow-xl",
      config.glow,
      sizeClasses[size]
    )}>
      {/* Animated background elements - Chinese lantern style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Sparkle effects */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className={cn("h-4 w-4 animate-spin", config.accent)} style={{ animationDuration: '3s' }} />
        </div>
        
        {/* Rising particle effect */}
        <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-bounce" style={{ animationDuration: '1s' }} />
      </div>

      {/* Golden ribbon corner for special achievements */}
      {achievement.type === 'special' && (
        <div className="absolute -top-1 -right-1 w-16 h-16 overflow-hidden">
          <div className="absolute top-4 -right-4 w-20 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 transform rotate-45 shadow-lg flex items-center justify-center">
            <span className="text-[8px] font-black text-amber-900 tracking-wider">SPECIAL</span>
          </div>
        </div>
      )}

      <CardContent className="p-3 h-full flex flex-col relative z-10">
        {/* Icon with glow effect */}
        <div className="flex justify-center mb-2">
          <div className={cn(
            "relative transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce",
            iconSizes[size]
          )} style={{ animationDuration: '0.5s', animationIterationCount: '2' }}>
            {/* Icon glow backdrop */}
            <div className={cn(
              "absolute inset-0 blur-lg opacity-50",
              config.accent
            )} style={{ textShadow: '0 0 20px currentColor' }}>
              {achievement.icon}
            </div>
            {/* Main icon */}
            <span className="relative drop-shadow-lg">
              {achievement.icon}
            </span>
          </div>
        </div>

        {/* Title with truncation */}
        <h4 className={cn(
          "font-black text-center leading-tight text-white mb-1 line-clamp-2 transition-all duration-300",
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        )} title={achievement.title}>
          {achievement.title}
        </h4>

        {/* Description with fade effect */}
        <p className={cn(
          "text-center leading-tight opacity-80 line-clamp-2 flex-1 transition-all duration-300",
          size === 'sm' ? 'text-[10px]' : 'text-xs',
          "text-white/70"
        )} title={achievement.description}>
          {achievement.description}
        </p>

        {/* Date badge with elegant styling */}
        <div className="flex justify-center mt-2">
          <Badge 
            variant="outline" 
            className={cn(
              "text-[10px] px-2 py-0.5 font-bold border transition-all duration-300",
              "group-hover:scale-105",
              config.badge
            )}
          >
            🎉 {format(new Date(achievement.unlockedAt), 'MMM dd')}
          </Badge>
        </div>
      </CardContent>

      {/* Bottom shine effect on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};
