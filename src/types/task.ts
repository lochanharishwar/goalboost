
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  cancelled?: boolean;
  date: string;
  createdAt: string;
  priority?: 'urgent' | 'daily' | 'long-term';
  category?: 'work' | 'personal' | 'health' | 'learning' | 'finance';
  dueTime?: string;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
  lastCompletionDate?: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  type: 'streak' | 'completion' | 'category' | 'special';
}
