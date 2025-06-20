
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Plus, Target } from 'lucide-react';
import { SoundButton } from '@/components/SoundButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useClickSound } from '@/utils/soundUtils';

interface Habit {
  id: string;
  name: string;
  icon: string;
  totalDays: number;
  completedDates: string[];
  createdAt: string;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('🎯');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  // Get current week dates
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push(date.toISOString().split('T')[0]);
    }
    return week;
  };

  const weekDates = getCurrentWeek();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const savedHabits = localStorage.getItem('aspiraHabits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aspiraHabits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim()) {
      playClickSound();
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: newHabitName.trim(),
        icon: newHabitIcon,
        totalDays: 0,
        completedDates: [],
        createdAt: new Date().toISOString()
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      toast({
        title: "🎯 New Habit Added!",
        description: "Your habit has been added to ASPIRA tracking system.",
      });
    }
  };

  const toggleHabit = (habitId: string, date: string) => {
    playClickSound();
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        
        return {
          ...habit,
          completedDates,
          totalDays: completedDates.length
        };
      }
      return habit;
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  const toggleTheme = () => {
    playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" 
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100"
    )}>
      {/* Premium animated background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isDarkMode 
          ? "bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10"
          : "bg-gradient-to-br from-blue-200/20 via-transparent to-indigo-200/20"
      )}></div>

      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Habit Tracker</h1>
          <p className="text-gray-300">Discipline equals freedom</p>
        </div>

        {/* Add New Habit */}
        <Card className="mb-8 shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Add New Habit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <select 
                value={newHabitIcon} 
                onChange={(e) => setNewHabitIcon(e.target.value)}
                className="bg-black/30 border-blue-400/30 text-white rounded-md px-3 py-2"
              >
                <option value="🎯">🎯</option>
                <option value="💪">💪</option>
                <option value="📚">📚</option>
                <option value="🧘">🧘</option>
                <option value="🏃">🏃</option>
                <option value="💧">💧</option>
                <option value="🥗">🥗</option>
                <option value="😴">😴</option>
              </select>
              <Input
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter habit name..."
                className="flex-1 bg-black/30 border-blue-400/30 text-white placeholder:text-gray-400"
              />
              <SoundButton 
                onClick={addHabit}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                <Plus className="h-5 w-5" />
              </SoundButton>
            </div>
          </CardContent>
        </Card>

        {/* Habits List */}
        <div className="space-y-6">
          {habits.length === 0 ? (
            <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-blue-500/20">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-white text-lg font-medium">No habits tracked yet.</p>
                <p className="text-gray-400 text-sm">Add your first habit above to start building discipline.</p>
              </CardContent>
            </Card>
          ) : (
            habits.map((habit) => (
              <Card key={habit.id} className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{habit.name}</h3>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                          {habit.totalDays} Total Days
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {weekDates.map((date, index) => {
                      const isCompleted = habit.completedDates.includes(date);
                      const isToday = date === today;
                      
                      return (
                        <div key={date} className="text-center">
                          <div className="text-xs text-gray-400 mb-1">{weekDays[index]}</div>
                          <div className="text-xs text-gray-400 mb-2">{new Date(date).getDate()}</div>
                          <button
                            onClick={() => toggleHabit(habit.id, date)}
                            className={cn(
                              "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110",
                              isCompleted 
                                ? "bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/30"
                                : "border-gray-500 hover:border-blue-400",
                              isToday && "ring-2 ring-white/50"
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Habits;
