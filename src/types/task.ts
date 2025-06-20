
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  createdAt: string;
  priority?: 'urgent' | 'daily' | 'long-term';
  tags?: string[];
}
