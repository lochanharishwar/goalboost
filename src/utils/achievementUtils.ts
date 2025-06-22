
import { Task, UserStats, Achievement } from '@/types/task';
import { format, differenceInDays, parseISO } from 'date-fns';

export const checkForNewAchievements = (
  tasks: Task[],
  currentStats: UserStats
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  const completedTasks = tasks.filter(task => task.completed);
  const now = new Date().toISOString();

  // Check streak achievements
  if (currentStats.currentStreak === 7 && !hasAchievement(currentStats, 'first-week')) {
    newAchievements.push({
      id: 'first-week',
      title: 'Week Warrior',
      description: '7 day streak!',
      icon: '🏆',
      unlockedAt: now,
      type: 'streak'
    });
  }

  if (currentStats.currentStreak === 30 && !hasAchievement(currentStats, 'month-master')) {
    newAchievements.push({
      id: 'month-master',
      title: 'Month Master',
      description: '30 day streak!',
      icon: '👑',
      unlockedAt: now,
      type: 'streak'
    });
  }

  // Check completion achievements
  if (currentStats.totalCompleted === 10 && !hasAchievement(currentStats, 'ten-goals')) {
    newAchievements.push({
      id: 'ten-goals',
      title: 'Goal Getter',
      description: 'Completed 10 goals!',
      icon: '🎯',
      unlockedAt: now,
      type: 'completion'
    });
  }

  if (currentStats.totalCompleted === 50 && !hasAchievement(currentStats, 'fifty-goals')) {
    newAchievements.push({
      id: 'fifty-goals',
      title: 'Goal Crusher',
      description: 'Completed 50 goals!',
      icon: '💪',
      unlockedAt: now,
      type: 'completion'
    });
  }

  if (currentStats.totalCompleted === 100 && !hasAchievement(currentStats, 'hundred-goals')) {
    newAchievements.push({
      id: 'hundred-goals',
      title: 'Centurion',
      description: 'Completed 100 goals!',
      icon: '🌟',
      unlockedAt: now,
      type: 'completion'
    });
  }

  // Check category achievements
  const categoryGoals = completedTasks.reduce((acc, task) => {
    if (task.category) {
      acc[task.category] = (acc[task.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  Object.entries(categoryGoals).forEach(([category, count]) => {
    if (count >= 5 && !hasAchievement(currentStats, `${category}-specialist`)) {
      const categoryInfo = getCategoryInfo(category);
      newAchievements.push({
        id: `${category}-specialist`,
        title: `${categoryInfo.name} Specialist`,
        description: `Completed 5 ${category} goals!`,
        icon: categoryInfo.icon,
        unlockedAt: now,
        type: 'category'
      });
    }
  });

  return newAchievements;
};

export const calculateStreak = (tasks: Task[]): { current: number; longest: number; lastDate?: string } => {
  const completedTasks = tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (completedTasks.length === 0) {
    return { current: 0, longest: 0 };
  }

  const today = new Date();
  const uniqueDates = [...new Set(completedTasks.map(task => task.date))].sort().reverse();
  
  // Calculate current streak
  let currentStreak = 0;
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterdayStr = format(new Date(today.getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
  
  // Check if today or yesterday has completed tasks
  if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
    currentStreak = 1;
    let checkDate = new Date(uniqueDates[0]);
    
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i]);
      if (differenceInDays(checkDate, prevDate) === 1) {
        currentStreak++;
        checkDate = prevDate;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 1;
  
  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i - 1]);
    const nextDate = new Date(uniqueDates[i]);
    
    if (differenceInDays(currentDate, nextDate) === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    current: currentStreak,
    longest: longestStreak,
    lastDate: completedTasks.length > 0 ? completedTasks[0].date : undefined
  };
};

const hasAchievement = (stats: UserStats, achievementId: string): boolean => {
  return stats.achievements.some(achievement => achievement.id === achievementId);
};

const getCategoryInfo = (category: string) => {
  const categoryMap: Record<string, { name: string; icon: string }> = {
    work: { name: 'Work', icon: '💼' },
    personal: { name: 'Personal', icon: '👤' },
    health: { name: 'Health', icon: '🏥' },
    learning: { name: 'Learning', icon: '📚' },
    finance: { name: 'Finance', icon: '💰' }
  };
  
  return categoryMap[category] || { name: category, icon: '📌' };
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'work': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'personal': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    case 'health': return 'bg-green-500/20 text-green-300 border-green-400/30';
    case 'learning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
    case 'finance': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'work': return '💼';
    case 'personal': return '👤';
    case 'health': return '🏥';
    case 'learning': return '📚';
    case 'finance': return '💰';
    default: return '📌';
  }
};
