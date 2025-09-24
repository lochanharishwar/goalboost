
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, Clock, Smartphone, BellRing } from 'lucide-react';
import { SoundButton } from '@/components/SoundButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useClickSound, playBellSound } from '@/utils/soundUtils';

interface Reminder {
  id: string;
  text: string;
  time: string;
  isActive: boolean;
  createdAt: string;
  hasDeviceAlarm: boolean;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminderText, setNewReminderText] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  // Request notification permissions and load saved data
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }

    try {
      const savedReminders = localStorage.getItem('goalflow-reminders');
      const savedTheme = localStorage.getItem('goalflow-theme');
      
      if (savedReminders) {
        const parsedReminders = JSON.parse(savedReminders);
        // Add hasDeviceAlarm property to existing reminders if missing
        const migratedReminders = parsedReminders.map((reminder: any) => ({
          ...reminder,
          hasDeviceAlarm: reminder.hasDeviceAlarm ?? false
        }));
        setReminders(Array.isArray(migratedReminders) ? migratedReminders : []);
      }
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.warn('Failed to load saved reminders:', error);
      localStorage.removeItem('goalflow-reminders');
      localStorage.removeItem('goalflow-theme');
    }
  }, []);

  // Save reminders to localStorage whenever reminders change
  useEffect(() => {
    try {
      localStorage.setItem('goalflow-reminders', JSON.stringify(reminders));
    } catch (error) {
      console.warn('Failed to save reminders:', error);
    }
  }, [reminders]);

  // Save theme preference
  useEffect(() => {
    try {
      localStorage.setItem('goalflow-theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }, [isDarkMode]);

  // Schedule device notifications for active reminders
  useEffect(() => {
    const scheduleNotifications = () => {
      reminders.forEach(reminder => {
        if (reminder.isActive && reminder.hasDeviceAlarm) {
          scheduleDeviceNotification(reminder);
        }
      });
    };

    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      reminders.forEach(reminder => {
        if (reminder.isActive && reminder.time === currentTime) {
          playBellSound();
          
          // Show toast notification
          toast({
            title: "🔔 Reminder!",
            description: reminder.text,
            duration: 5000,
          });

          // Show native notification if permitted
          if (notificationPermission === 'granted' && reminder.hasDeviceAlarm) {
            showNativeNotification(reminder);
          }
        }
      });
    };

    scheduleNotifications();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders, toast, notificationPermission]);

  // Native notification functions
  const scheduleDeviceNotification = (reminder: Reminder) => {
    if (notificationPermission !== 'granted') return;

    const [hours, minutes] = reminder.time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilReminder = scheduledTime.getTime() - now.getTime();

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        showNativeNotification(reminder);
      }, timeUntilReminder);
    }
  };

  const showNativeNotification = (reminder: Reminder) => {
    if ('Notification' in window && notificationPermission === 'granted') {
      const notification = new Notification('🔔 GoalBoost Reminder', {
        body: reminder.text,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: reminder.id,
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 30 seconds
      setTimeout(() => {
        notification.close();
      }, 30000);
    }
  };

  const addReminder = () => {
    if (newReminderText.trim() && newReminderTime) {
      playClickSound();
      const newReminder: Reminder = {
        id: crypto.randomUUID(),
        text: newReminderText.trim(),
        time: newReminderTime,
        isActive: true,
        createdAt: new Date().toISOString(),
        hasDeviceAlarm: notificationPermission === 'granted'
      };
      setReminders([...reminders, newReminder]);
      setNewReminderText('');
      setNewReminderTime('');
      
      toast({
        title: "⏰ Reminder Set!",
        description: `Reminder set for ${newReminderTime}${notificationPermission === 'granted' ? ' with device alarm' : ''}`,
      });

      // Schedule the device notification
      if (notificationPermission === 'granted') {
        scheduleDeviceNotification(newReminder);
      }
    }
  };

  const toggleReminder = (reminderId: string) => {
    playClickSound();
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const toggleDeviceAlarm = (reminderId: string) => {
    playClickSound();
    if (notificationPermission !== 'granted') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          setReminders(reminders.map(reminder =>
            reminder.id === reminderId 
              ? { ...reminder, hasDeviceAlarm: !reminder.hasDeviceAlarm }
              : reminder
          ));
        }
      });
    } else {
      setReminders(reminders.map(reminder =>
        reminder.id === reminderId 
          ? { ...reminder, hasDeviceAlarm: !reminder.hasDeviceAlarm }
          : reminder
      ));
    }
  };

  const deleteReminder = (reminderId: string) => {
    playClickSound();
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    toast({
      title: "🗑️ Reminder Deleted",
      description: "Reminder has been removed.",
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

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500 font-inter",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" 
        : "bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100"
    )}>
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-inter">
            Smart Reminders
          </h1>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-inter max-w-2xl mx-auto">
            Never miss what matters most to you
          </p>
        </div>

        {/* Notification Permission Banner */}
        {notificationPermission !== 'granted' && (
          <Card className="mb-6 shadow-2xl border-0 bg-amber-500/10 backdrop-blur-xl border border-amber-500/30 font-inter">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-200 font-medium font-inter">Enable Device Alarms</p>
                  <p className="text-amber-300/80 text-sm font-inter">
                    Allow notifications to receive reminders even when the app is closed.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    playClickSound();
                    if ('Notification' in window) {
                      Notification.requestPermission().then(permission => {
                        setNotificationPermission(permission);
                        if (permission === 'granted') {
                          toast({
                            title: "🔔 Notifications Enabled!",
                            description: "You'll now receive device alarms for your reminders.",
                          });
                        } else if (permission === 'denied') {
                          toast({
                            title: "❌ Notifications Blocked",
                            description: "Please enable notifications in your browser settings.",
                            variant: "destructive",
                          });
                        }
                      }).catch(error => {
                        console.error('Error requesting notification permission:', error);
                        toast({
                          title: "⚠️ Permission Error",
                          description: "Unable to request notification permission.",
                          variant: "destructive",
                        });
                      });
                    } else {
                      toast({
                        title: "❌ Not Supported",
                        description: "Notifications are not supported in this browser.",
                        variant: "destructive",
                      });
                    }
                  }}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-inter"
                >
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Reminder */}
        <Card className="mb-8 shadow-2xl border-0 bg-black/20 backdrop-blur-xl border border-purple-500/20 font-inter">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-2 font-inter text-lg">
              <Bell className="h-5 w-5" />
              Add New Reminder
              {notificationPermission === 'granted' && (
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 font-inter text-xs">
                  <Smartphone className="h-3 w-3 mr-1" />
                  Device Alarms Enabled
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What should I remind you about?"
                className="flex-1 bg-black/30 border-purple-400/30 text-white placeholder:text-gray-400 h-12 font-inter"
              />
              <Input
                type="time"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="bg-black/30 border-purple-400/30 text-white h-12 sm:w-auto font-inter"
              />
              <SoundButton 
                onClick={addReminder}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white h-12 px-6 font-inter"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Reminder
              </SoundButton>
            </div>
          </CardContent>
        </Card>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.length === 0 ? (
            <Card className="shadow-2xl border-0 bg-black/20 backdrop-blur-xl border border-purple-500/20 font-inter">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">⏰</div>
                <p className="text-white text-lg font-medium font-inter mb-2">No reminders set yet.</p>
                <p className="text-gray-400 text-sm font-inter">
                  Set your first reminder above to stay on top of important tasks.
                </p>
              </CardContent>
            </Card>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id} className="shadow-2xl border-0 bg-black/20 backdrop-blur-xl border border-purple-500/20 font-inter">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                          reminder.isActive 
                            ? "bg-purple-500 border-purple-400" 
                            : "border-gray-500"
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className={cn(
                          "font-medium transition-all duration-200 font-inter truncate",
                          reminder.isActive ? "text-white" : "text-gray-400 line-through"
                        )}>
                          {reminder.text}
                        </p>
                         <div className="flex items-center gap-2 mt-1 flex-wrap">
                           <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 font-inter">
                             <Clock className="h-3 w-3 mr-1" />
                             {reminder.time}
                           </Badge>
                           <Badge className={cn(
                             "font-inter",
                             reminder.isActive 
                               ? "bg-green-500/20 text-green-300 border-green-400/30"
                               : "bg-gray-500/20 text-gray-300 border-gray-400/30"
                           )}>
                             {reminder.isActive ? 'Active' : 'Paused'}
                           </Badge>
                           <Badge 
                             className={cn(
                               "cursor-pointer transition-all duration-200 font-inter",
                               reminder.hasDeviceAlarm && notificationPermission === 'granted'
                                 ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30"
                                 : "bg-gray-500/20 text-gray-400 border-gray-400/30 hover:bg-gray-500/30"
                             )}
                             onClick={() => toggleDeviceAlarm(reminder.id)}
                           >
                             {reminder.hasDeviceAlarm && notificationPermission === 'granted' ? (
                               <>
                                 <Smartphone className="h-3 w-3 mr-1" />
                                 Device Alarm
                               </>
                             ) : (
                               <>
                                 <BellRing className="h-3 w-3 mr-1" />
                                 Enable Alarm
                               </>
                             )}
                           </Badge>
                         </div>
                      </div>
                    </div>
                    
                    <SoundButton
                      onClick={() => deleteReminder(reminder.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-400 hover:text-red-300 border-red-400/30 hover:bg-red-500/10 ml-3 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </SoundButton>
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

export default Reminders;
