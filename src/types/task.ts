
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  cancelled?: boolean;
  date: string;
  createdAt: string;
  priority?: 'urgent' | 'daily' | 'long-term';
}
