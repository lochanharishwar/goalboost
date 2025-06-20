
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Plus, Clock, X, Calendar } from 'lucide-react';
import { SoundButton } from '@/components/SoundButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useClickSound } from '@/utils/soundUtils';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  repeat: 'none' | 'daily' | 'weekly' | 'monthly';
  createdAt: string;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('12:00');
  const [newReminderPriority, setNewReminderPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newReminderRepeat, setNewReminderRepeat] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  useEffect(() => {
    const savedReminders = localStorage.getItem('aspiraReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setNewReminderDate(today);
  }, []);

  useEffect(() => {
    localStorage.setItem('aspiraReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (newReminderTitle.trim() && newReminderDate) {
      playClickSound();
      const newReminder: Reminder = {
        id: crypto.randomUUID(),
        title: newReminderTitle.trim(),
        date: newReminderDate,
        time: newReminderTime,
        priority: newReminderPriority,
        repeat: newReminderRepeat,
        createdAt: new Date().toISOString()
      };
      setReminders([...reminders, newReminder]);
      setNewReminderTitle('');
      setNewReminderPriority('medium');
      setNewReminderRepeat('none');
      toast({
        title: "⏰ Reminder Set!",
        description: "Your reminder has been added to ASPIRA.",
      });
    }
  };

  const deleteReminder = (reminderId: string) => {
    playClickSound();
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    toast({
      title: "Reminder Deleted",
      description: "Reminder has been removed from your schedule.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addReminder();
    }
  };

  const toggleTheme = () => {
    playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-400/30';
    }
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingReminders = sortedReminders.filter(reminder => {
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    return reminderDateTime >= new Date();
  });

  const pastReminders = sortedReminders.filter(reminder => {
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    return reminderDateTime < new Date();
  });

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-orange-900 to-red-900" 
        : "bg-gradient-to-br from-orange-50 via-red-50 to-slate-100"
    )}>
      {/* Premium animated background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isDarkMode 
          ? "bg-gradient-to-br from-orange-600/10 via-transparent to-red-600/10"
          : "bg-gradient-to-br from-orange-200/20 via-transparent to-red-200/20"
      )}></div>

      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Reminder</h1>
          <p className="text-gray-300">Set to never miss a thing</p>
        </div>

        {/* Add New Reminder */}
        <Card className="mb-8 shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Create New Reminder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <Input
                value={newReminderTitle}
                onChange={(e) => setNewReminderTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Reminder title..."
                className="bg-black/30 border-orange-400/30 text-white placeholder:text-gray-400"
              />
              
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newReminderDate}
                  onChange={(e) => setNewReminderDate(e.target.value)}
                  className="bg-black/30 border-orange-400/30 text-white flex-1"
                />
                <Input
                  type="time"
                  value={newReminderTime}
                  onChange={(e) => setNewReminderTime(e.target.value)}
                  className="bg-black/30 border-orange-400/30 text-white flex-1"
                />
              </div>

              <div className="flex gap-2">
                <Select value={newReminderPriority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewReminderPriority(value)}>
                  <SelectTrigger className="bg-black/30 border-orange-400/30 text-white flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-orange-500/30 text-white">
                    <SelectItem value="high" className="text-red-300">High Priority</SelectItem>
                    <SelectItem value="medium" className="text-yellow-300">Medium Priority</SelectItem>
                    <SelectItem value="low" className="text-green-300">Low Priority</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={newReminderRepeat} onValueChange={(value: 'none' | 'daily' | 'weekly' | 'monthly') => setNewReminderRepeat(value)}>
                  <SelectTrigger className="bg-black/30 border-orange-400/30 text-white flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-orange-500/30 text-white">
                    <SelectItem value="none">No Repeat</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SoundButton 
              onClick={addReminder}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Plus className="h-5 w-5 mr-2" />
              Set Reminder
            </SoundButton>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Reminders */}
          <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {upcomingReminders.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming reminders</p>
                  </div>
                ) : (
                  upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="p-4 bg-black/30 rounded-xl border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">{reminder.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(reminder.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {reminder.time}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={cn("text-xs px-2 py-1 font-medium border", getPriorityColor(reminder.priority))}>
                              {reminder.priority.toUpperCase()}
                            </Badge>
                            {reminder.repeat !== 'none' && (
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs px-2 py-1">
                                {reminder.repeat.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <SoundButton
                          onClick={() => deleteReminder(reminder.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-400 hover:text-red-300 border-red-400/30 hover:bg-red-500/10"
                        >
                          <X className="h-3 w-3" />
                        </SoundButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Past Reminders */}
          <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-gray-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Past Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {pastReminders.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No past reminders</p>
                  </div>
                ) : (
                  pastReminders.map((reminder) => (
                    <div key={reminder.id} className="p-4 bg-gray-800/30 rounded-xl border border-gray-500/20 opacity-75">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-gray-300 font-semibold mb-2">{reminder.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(reminder.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {reminder.time}
                            </div>
                          </div>
                        </div>
                        <SoundButton
                          onClick={() => deleteReminder(reminder.id)}
                          size="sm"
                          variant="outline"
                          className="text-gray-400 hover:text-gray-300 border-gray-500/30 hover:bg-gray-500/10"
                        >
                          <X className="h-3 w-3" />
                        </SoundButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
