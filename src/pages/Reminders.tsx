import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from '@/components/ui/time-picker';
import { Bell, Plus, Trash2, Clock, BellRing, Volume2, VolumeX, CheckCircle2, AlertCircle, Tag, Flame, Star, Zap, Repeat, Sparkles, Search, Filter, AlarmClock, Timer, Droplets, Coffee, Dumbbell as DumbbellIcon, BookOpen, Pill, Moon, Sun, Pause, RotateCcw, ChevronDown, ChevronUp, Trash, ToggleLeft, ToggleRight, Copy, Edit2, Check, X } from 'lucide-react';
import { SoundButton } from '@/components/SoundButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useClickSound } from '@/utils/soundUtils';
import { useTheme } from '@/contexts/ThemeContext';

interface Reminder {
  id: string;
  text: string;
  time: string;
  isActive: boolean;
  createdAt: string;
  hasDeviceAlarm: boolean;
  repeatDays: string[];
  priority: 'low' | 'medium' | 'high';
  category: string;
  notes: string;
  snoozedUntil?: string;
  completedCount?: number;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CATEGORIES = ['general', 'work', 'health', 'personal', 'study', 'fitness'];
const PRIORITIES = [
  { value: 'low', label: 'Low', icon: Star },
  { value: 'medium', label: 'Medium', icon: Zap },
  { value: 'high', label: 'High', icon: Flame }
];

const QUICK_PRESETS = [
  { text: 'Drink Water', icon: '💧', time: '', category: 'health', priority: 'low' as const },
  { text: 'Take a Break', icon: '☕', time: '', category: 'work', priority: 'medium' as const },
  { text: 'Stretch & Move', icon: '🧘', time: '', category: 'fitness', priority: 'medium' as const },
  { text: 'Take Medication', icon: '💊', time: '', category: 'health', priority: 'high' as const },
  { text: 'Study Session', icon: '📚', time: '', category: 'study', priority: 'medium' as const },
  { text: 'Go for a Walk', icon: '🚶', time: '', category: 'fitness', priority: 'low' as const },
  { text: 'Eye Rest (20-20-20)', icon: '👁️', time: '', category: 'health', priority: 'low' as const },
  { text: 'Journal / Reflect', icon: '📝', time: '', category: 'personal', priority: 'low' as const },
];

const SNOOZE_OPTIONS = [
  { label: '5 min', minutes: 5 },
  { label: '10 min', minutes: 10 },
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
];

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminderText, setNewReminderText] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [newReminderPriority, setNewReminderPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newReminderCategory, setNewReminderCategory] = useState('general');
  const [newReminderNotes, setNewReminderNotes] = useState('');
  const [newReminderRepeatDays, setNewReminderRepeatDays] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [ringingReminderId, setRingingReminderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [nextReminderCountdown, setNextReminderCountdown] = useState<string>('');
  const [nextReminderText, setNextReminderText] = useState<string>('');
  const { toast } = useToast();
  const { playClickSound } = useClickSound();

  const alarmContextRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load reminders from localStorage
  useEffect(() => {
    try {
      const savedReminders = localStorage.getItem('goalflow-reminders');
      if (savedReminders) {
        const parsedReminders = JSON.parse(savedReminders);
        setReminders(parsedReminders.map((r: any) => ({
          ...r,
          repeatDays: r.repeatDays || [],
          priority: r.priority || 'medium',
          category: r.category || 'general',
          notes: r.notes || '',
          completedCount: r.completedCount || 0,
        })));
      }
    } catch (error) {
      console.warn('Failed to load saved reminders:', error);
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('goalflow-reminders', JSON.stringify(reminders));
    } catch (error) {
      console.warn('Failed to save reminders:', error);
    }
  }, [reminders]);

  // Next reminder countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const activeReminders = reminders.filter(r => r.isActive);
      if (activeReminders.length === 0) {
        setNextReminderCountdown('');
        setNextReminderText('');
        return;
      }

      let closestDiff = Infinity;
      let closestText = '';

      for (const r of activeReminders) {
        const [h, m] = r.time.split(':').map(Number);
        const reminderDate = new Date(now);
        reminderDate.setHours(h, m, 0, 0);

        let diff = reminderDate.getTime() - now.getTime();
        if (diff < 0) diff += 24 * 60 * 60 * 1000; // next day

        if (diff < closestDiff) {
          closestDiff = diff;
          closestText = r.text;
        }
      }

      const totalSeconds = Math.floor(closestDiff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      setNextReminderCountdown(
        hours > 0
          ? `${hours}h ${mins}m ${secs}s`
          : mins > 0
          ? `${mins}m ${secs}s`
          : `${secs}s`
      );
      setNextReminderText(closestText);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [reminders]);

  const playAlarmSound = useCallback(() => {
    try {
      if (!alarmContextRef.current) {
        alarmContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = alarmContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const sampleRate = ctx.sampleRate;
      const duration = 1.0;
      const length = sampleRate * duration;
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const cycle = Math.floor(t * 4) % 2;
        const frequency = cycle === 0 ? 800 : 1000;
        const envelope = Math.sin(Math.PI * (t % 0.25) / 0.25);
        data[i] = envelope * Math.sin(2 * Math.PI * frequency * t) * 0.6;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (error) {
      console.log('Error playing alarm:', error);
    }
  }, []);

  const stopAlarm = useCallback(() => {
    setRingingReminderId(null);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  }, []);

  const startAlarm = useCallback((reminderId: string) => {
    setRingingReminderId(reminderId);
    playAlarmSound();
    alarmIntervalRef.current = setInterval(() => {
      playAlarmSound();
    }, 1200);
  }, [playAlarmSound]);

  const snoozeReminder = useCallback((reminderId: string, minutes: number) => {
    stopAlarm();
    const snoozeUntil = new Date(Date.now() + minutes * 60 * 1000);
    const newTime = snoozeUntil.toTimeString().slice(0, 5);

    setReminders(prev => prev.map(r =>
      r.id === reminderId
        ? { ...r, snoozedUntil: snoozeUntil.toISOString(), time: newTime }
        : r
    ));

    toast({
      title: `⏸️ Snoozed for ${minutes} minutes`,
      description: `Will ring again at ${newTime}`,
    });
  }, [stopAlarm, toast]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const currentDay = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1];

      reminders.forEach(reminder => {
        const shouldRing = reminder.repeatDays.length === 0 || reminder.repeatDays.includes(currentDay);

        // Check snooze
        if (reminder.snoozedUntil) {
          const snoozeEnd = new Date(reminder.snoozedUntil);
          if (now < snoozeEnd) return;
        }

        if (reminder.isActive && reminder.time === currentTime && ringingReminderId !== reminder.id && shouldRing) {
          if (reminder.hasDeviceAlarm && notificationPermission === 'granted') {
            showNativeNotification(reminder);
          }

          startAlarm(reminder.id);

          toast({
            title: `🔔 ${reminder.priority === 'high' ? '🔥 URGENT: ' : ''}Reminder!`,
            description: reminder.text,
            duration: 10000,
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);
  }, [reminders, toast, notificationPermission, ringingReminderId, startAlarm]);

  const showNativeNotification = (reminder: Reminder) => {
    if ('Notification' in window && notificationPermission === 'granted') {
      const notification = new Notification(`🔔 ${reminder.priority === 'high' ? '🔥 URGENT: ' : ''}GoalBoost Reminder`, {
        body: `${reminder.text}${reminder.notes ? `\n📝 ${reminder.notes}` : ''}`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: reminder.id,
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        stopAlarm();
        notification.close();
      };
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
        hasDeviceAlarm: notificationPermission === 'granted',
        repeatDays: newReminderRepeatDays,
        priority: newReminderPriority,
        category: newReminderCategory,
        notes: newReminderNotes.trim(),
        completedCount: 0,
      };

      setReminders([newReminder, ...reminders]);

      setNewReminderText('');
      setNewReminderTime('');
      setNewReminderPriority('medium');
      setNewReminderCategory('general');
      setNewReminderNotes('');
      setNewReminderRepeatDays([]);
      setShowAdvanced(false);

      toast({
        title: "⏰ Reminder Set!",
        description: `Reminder set for ${newReminderTime}${newReminderRepeatDays.length > 0 ? ` on ${newReminderRepeatDays.join(', ')}` : ''}`,
      });
    }
  };

  const addPresetReminder = (preset: typeof QUICK_PRESETS[0]) => {
    playClickSound();
    setNewReminderText(preset.text);
    setNewReminderCategory(preset.category);
    setNewReminderPriority(preset.priority);
    setShowPresets(false);
    toast({ title: `${preset.icon} Preset loaded`, description: `Set a time for "${preset.text}"` });
  };

  const duplicateReminder = (reminder: Reminder) => {
    playClickSound();
    const dup: Reminder = {
      ...reminder,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedCount: 0,
    };
    setReminders(prev => [dup, ...prev]);
    toast({ title: "📋 Reminder Duplicated", description: `"${reminder.text}" has been duplicated.` });
  };

  const startEdit = (reminder: Reminder) => {
    setEditingId(reminder.id);
    setEditText(reminder.text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setReminders(prev => prev.map(r => r.id === id ? { ...r, text: editText.trim() } : r));
      toast({ title: "✏️ Updated", description: "Reminder text updated." });
    }
    setEditingId(null);
    setEditText('');
  };

  const markCompleted = (reminderId: string) => {
    playClickSound();
    stopAlarm();
    setReminders(prev => prev.map(r =>
      r.id === reminderId
        ? { ...r, isActive: false, completedCount: (r.completedCount || 0) + 1 }
        : r
    ));
    toast({ title: "✅ Done!", description: "Great job completing this reminder!" });
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
    if (ringingReminderId === reminderId) {
      stopAlarm();
    }
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    toast({ title: "🗑️ Reminder Deleted", description: "Reminder has been removed." });
  };

  const toggleRepeatDay = (day: string) => {
    setNewReminderRepeatDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      addReminder();
    }
  };

  // Bulk actions
  const activateAll = () => {
    playClickSound();
    setReminders(prev => prev.map(r => ({ ...r, isActive: true })));
    toast({ title: "✅ All Activated", description: "All reminders are now active." });
  };

  const deactivateAll = () => {
    playClickSound();
    setReminders(prev => prev.map(r => ({ ...r, isActive: false })));
    toast({ title: "⏸️ All Paused", description: "All reminders are paused." });
  };

  const deleteInactive = () => {
    playClickSound();
    const count = reminders.filter(r => !r.isActive).length;
    setReminders(prev => prev.filter(r => r.isActive));
    toast({ title: "🗑️ Cleared", description: `Removed ${count} inactive reminders.` });
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { className: 'bg-destructive/20 text-destructive border-destructive/40' };
      case 'medium':
        return { className: 'bg-warning/20 text-warning border-warning/40' };
      default:
        return { className: 'bg-success/20 text-success border-success/40' };
    }
  };

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, { icon: string }> = {
      general: { icon: '📌' },
      work: { icon: '💼' },
      health: { icon: '💊' },
      personal: { icon: '👤' },
      study: { icon: '📚' },
      fitness: { icon: '🏋️' }
    };
    return configs[category] || configs.general;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return { displayHour: displayHour.toString().padStart(2, '0'), minutes, ampm };
  };

  // Filtered reminders
  const filteredReminders = useMemo(() => {
    return reminders.filter(r => {
      if (searchQuery && !r.text.toLowerCase().includes(searchQuery.toLowerCase()) && !r.notes.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterCategory !== 'all' && r.category !== filterCategory) return false;
      if (filterPriority !== 'all' && r.priority !== filterPriority) return false;
      return true;
    });
  }, [reminders, searchQuery, filterCategory, filterPriority]);

  const activeReminders = reminders.filter(r => r.isActive).length;
  const totalReminders = reminders.length;
  const highPriorityCount = reminders.filter(r => r.priority === 'high' && r.isActive).length;

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500 bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-success/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Header />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl gradient-primary glow-primary">
                <Bell className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-gradient tracking-tight">
                Reminders
              </h1>
              <p className="text-muted-foreground text-lg font-semibold">
                Never miss what matters
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Badge className="px-4 py-2 text-sm font-bold rounded-xl bg-primary/20 text-primary border border-primary/30">
              {activeReminders} of {totalReminders} active
            </Badge>
            {highPriorityCount > 0 && (
              <Badge className="px-4 py-2 text-sm font-bold rounded-xl animate-pulse bg-destructive/20 text-destructive border border-destructive/30">
                <Flame className="h-4 w-4 mr-1" />
                {highPriorityCount} urgent
              </Badge>
            )}
          </div>
        </div>

        {/* Next Reminder Countdown */}
        {nextReminderCountdown && (
          <Card className="glass-bold border-2 border-accent/30 mb-6 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-accent via-primary to-success" />
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/20 shrink-0">
                  <Timer className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Reminder</p>
                  <p className="font-bold text-foreground truncate">{nextReminderText}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-black text-accent tabular-nums">{nextReminderCountdown}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Permission Banner */}
        {notificationPermission !== 'granted' && (
          <Card className="glass-bold border-2 border-warning/30 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/20 shrink-0">
                  <AlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Enable Device Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get reminded even when the app is in the background
                  </p>
                </div>
                <Button
                  onClick={() => {
                    playClickSound();
                    if ('Notification' in window) {
                      Notification.requestPermission().then(permission => {
                        setNotificationPermission(permission);
                        if (permission === 'granted') {
                          toast({ title: "🔔 Notifications Enabled!", description: "You'll now receive device alarms." });
                        }
                      });
                    }
                  }}
                  className="shrink-0 font-bold rounded-xl bg-warning text-warning-foreground hover:bg-warning/90"
                >
                  Enable Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Presets */}
        <Card className="glass-bold border-2 border-primary/10 mb-6 overflow-hidden">
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground">Quick Presets</span>
              <span className="text-xs text-muted-foreground">Tap to auto-fill a reminder</span>
            </div>
            {showPresets ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </button>
          {showPresets && (
            <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fade-in">
              {QUICK_PRESETS.map((preset) => (
                <Button
                  key={preset.text}
                  variant="outline"
                  onClick={() => addPresetReminder(preset)}
                  className="h-auto py-3 flex flex-col items-center gap-1 rounded-xl hover:bg-primary/10 hover:border-primary/40 transition-all"
                >
                  <span className="text-xl">{preset.icon}</span>
                  <span className="text-xs font-semibold text-center leading-tight">{preset.text}</span>
                </Button>
              ))}
            </div>
          )}
        </Card>

        {/* Add New Reminder */}
        <Card className="glass-bold border-2 border-primary/20 mb-6 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-success" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">New Reminder</CardTitle>
              {notificationPermission === 'granted' && (
                <Badge className="ml-auto text-xs font-bold bg-success/20 text-success border-success/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Alarms Enabled
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 items-center">
              <Input
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What should I remind you about?"
                className="flex-1 h-12 text-base font-medium rounded-xl bg-background border-2 border-input focus:border-primary"
              />
              <TimePicker
                value={newReminderTime}
                onChange={setNewReminderTime}
              />
            </div>

            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full font-semibold rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {showAdvanced ? 'Hide Options' : 'More Options'}
            </Button>

            {showAdvanced && (
              <div className="space-y-6 animate-fade-in">
                {/* Priority */}
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
                  <div className="flex gap-3">
                    {PRIORITIES.map(p => (
                      <Button
                        key={p.value}
                        variant={newReminderPriority === p.value ? 'default' : 'outline'}
                        size="lg"
                        onClick={() => setNewReminderPriority(p.value as 'low' | 'medium' | 'high')}
                        className={cn(
                          "flex-1 font-bold rounded-xl transition-all",
                          newReminderPriority === p.value && "gradient-primary text-primary-foreground"
                        )}
                      >
                        <p.icon className="h-4 w-4 mr-2" />
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <Button
                        key={cat}
                        variant={newReminderCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewReminderCategory(cat)}
                        className={cn(
                          "font-bold rounded-xl capitalize transition-all",
                          newReminderCategory === cat && "gradient-primary text-primary-foreground"
                        )}
                      >
                        {getCategoryConfig(cat).icon} {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Repeat Days */}
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Repeat className="h-4 w-4" />
                    Repeat On
                  </label>
                  <div className="flex gap-2">
                    {DAYS.map(day => (
                      <Button
                        key={day}
                        variant={newReminderRepeatDays.includes(day) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleRepeatDay(day)}
                        className={cn(
                          "flex-1 font-bold rounded-xl transition-all px-2",
                          newReminderRepeatDays.includes(day) && "gradient-accent text-accent-foreground"
                        )}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Notes</label>
                  <Textarea
                    value={newReminderNotes}
                    onChange={(e) => setNewReminderNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    className="rounded-xl font-medium resize-none bg-background border-2 border-input focus:border-primary"
                    rows={2}
                  />
                </div>
              </div>
            )}

            <SoundButton
              onClick={addReminder}
              disabled={!newReminderText.trim() || !newReminderTime}
              className="w-full h-14 font-bold text-lg rounded-xl gradient-primary text-primary-foreground shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bell className="h-5 w-5 mr-2" />
              Set Reminder
            </SoundButton>
          </CardContent>
        </Card>

        {/* Search, Filter & Bulk Actions */}
        {reminders.length > 0 && (
          <div className="mb-6 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reminders..."
                className="pl-11 h-12 rounded-xl bg-background border-2 border-input focus:border-primary font-medium"
              />
            </div>

            {/* Filters Toggle + Bulk Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn("rounded-xl font-semibold", showFilters && "bg-primary/10 border-primary/40 text-primary")}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" size="sm" onClick={activateAll} className="rounded-xl text-xs font-semibold text-success hover:bg-success/10">
                <ToggleRight className="h-3.5 w-3.5 mr-1" />
                Activate All
              </Button>
              <Button variant="ghost" size="sm" onClick={deactivateAll} className="rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted">
                <ToggleLeft className="h-3.5 w-3.5 mr-1" />
                Pause All
              </Button>
              {reminders.some(r => !r.isActive) && (
                <Button variant="ghost" size="sm" onClick={deleteInactive} className="rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10">
                  <Trash className="h-3.5 w-3.5 mr-1" />
                  Clear Inactive
                </Button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-muted/30 border border-border animate-fade-in">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Category:</span>
                  <Badge
                    onClick={() => setFilterCategory('all')}
                    className={cn("cursor-pointer text-xs rounded-full", filterCategory === 'all' ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border")}
                  >
                    All
                  </Badge>
                  {CATEGORIES.map(cat => (
                    <Badge
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={cn("cursor-pointer text-xs rounded-full capitalize", filterCategory === cat ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border")}
                    >
                      {getCategoryConfig(cat).icon} {cat}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Priority:</span>
                  <Badge
                    onClick={() => setFilterPriority('all')}
                    className={cn("cursor-pointer text-xs rounded-full", filterPriority === 'all' ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border")}
                  >
                    All
                  </Badge>
                  {PRIORITIES.map(p => (
                    <Badge
                      key={p.value}
                      onClick={() => setFilterPriority(p.value)}
                      className={cn("cursor-pointer text-xs rounded-full capitalize", filterPriority === p.value ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border")}
                    >
                      {p.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reminders List */}
        <div className="space-y-4">
          {filteredReminders.map((reminder) => {
            const priorityConfig = getPriorityConfig(reminder.priority);
            const categoryConfig = getCategoryConfig(reminder.category);
            const timeDisplay = formatTime(reminder.time);
            const isRinging = ringingReminderId === reminder.id;
            const isEditing = editingId === reminder.id;

            return (
              <Card
                key={reminder.id}
                className={cn(
                  "glass-bold border-2 transition-all duration-300 overflow-hidden",
                  isRinging && "border-destructive animate-pulse shadow-lg shadow-destructive/30",
                  !reminder.isActive && "opacity-60",
                  reminder.isActive && !isRinging && "border-border hover:border-primary/50"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Time Display */}
                    <div className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl min-w-[100px]",
                      reminder.isActive ? "bg-primary/10 border-2 border-primary/30" : "bg-muted border-2 border-border"
                    )}>
                      <span className={cn(
                        "text-3xl font-black",
                        reminder.isActive ? "text-primary" : "text-muted-foreground"
                      )}>
                        {timeDisplay.displayHour}:{timeDisplay.minutes}
                      </span>
                      <span className={cn(
                        "text-xs font-bold",
                        reminder.isActive ? "text-primary" : "text-muted-foreground"
                      )}>
                        {timeDisplay.ampm}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        {isEditing ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit(reminder.id)}
                              className="h-8 text-sm font-bold rounded-lg"
                              autoFocus
                            />
                            <Button variant="ghost" size="icon" onClick={() => saveEdit(reminder.id)} className="h-8 w-8 text-success">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingId(null)} className="h-8 w-8 text-destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <p className={cn(
                            "font-bold text-lg",
                            reminder.isActive ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {reminder.text}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={cn("text-xs font-bold rounded-full border", priorityConfig.className)}>
                          {reminder.priority === 'high' ? <Flame className="h-3 w-3 mr-1" /> :
                           reminder.priority === 'medium' ? <Zap className="h-3 w-3 mr-1" /> :
                           <Star className="h-3 w-3 mr-1" />}
                          {reminder.priority}
                        </Badge>
                        <Badge className="text-xs font-bold rounded-full bg-muted text-muted-foreground border border-border">
                          {categoryConfig.icon} {reminder.category}
                        </Badge>
                        {reminder.repeatDays.length > 0 && (
                          <Badge className="text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">
                            <Repeat className="h-3 w-3 mr-1" />
                            {reminder.repeatDays.join(', ')}
                          </Badge>
                        )}
                        {(reminder.completedCount || 0) > 0 && (
                          <Badge className="text-xs font-semibold rounded-full bg-success/20 text-success border border-success/30">
                            ✅ {reminder.completedCount}x done
                          </Badge>
                        )}
                      </div>

                      {reminder.notes && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          📝 {reminder.notes}
                        </p>
                      )}

                      {/* Snooze options when ringing */}
                      {isRinging && (
                        <div className="flex flex-wrap gap-2 mt-3 animate-fade-in">
                          <span className="text-xs font-bold text-muted-foreground self-center mr-1">Snooze:</span>
                          {SNOOZE_OPTIONS.map(opt => (
                            <Button
                              key={opt.minutes}
                              variant="outline"
                              size="sm"
                              onClick={() => snoozeReminder(reminder.id, opt.minutes)}
                              className="rounded-xl text-xs font-bold hover:bg-warning/10 hover:border-warning/40 hover:text-warning"
                            >
                              <Pause className="h-3 w-3 mr-1" />
                              {opt.label}
                            </Button>
                          ))}
                          <Button
                            size="sm"
                            onClick={() => markCompleted(reminder.id)}
                            className="rounded-xl text-xs font-bold bg-success/20 text-success border border-success/30 hover:bg-success/30"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Done
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      {isRinging && (
                        <Button
                          onClick={() => stopAlarm()}
                          size="sm"
                          className="font-bold rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse mb-1"
                        >
                          <VolumeX className="h-4 w-4 mr-1" />
                          Stop
                        </Button>
                      )}

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(reminder)}
                          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => duplicateReminder(reminder)}
                          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleReminder(reminder.id)}
                          className={cn(
                            "h-9 w-9 rounded-xl",
                            reminder.isActive ? "text-success hover:bg-success/20" : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {reminder.isActive ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleDeviceAlarm(reminder.id)}
                          className={cn(
                            "h-9 w-9 rounded-xl",
                            reminder.hasDeviceAlarm ? "text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {reminder.hasDeviceAlarm ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReminder(reminder.id)}
                        className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results from filter */}
        {reminders.length > 0 && filteredReminders.length === 0 && (
          <Card className="glass-bold border-2 border-muted/30 text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-foreground">No matching reminders</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {reminders.length === 0 && (
          <Card className="glass-bold border-2 border-muted/30 text-center py-16">
            <CardContent>
              <div className="p-6 rounded-3xl bg-primary/10 inline-block mb-6">
                <Clock className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">No reminders yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first reminder to stay on track with your goals!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reminders;
