import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { playTickSound } from '@/utils/soundUtils';

interface TimerContextType {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  mode: 'work' | 'break';
  setMode: (mode: 'work' | 'break') => void;
  workTime: number;
  setWorkTime: (time: number) => void;
  breakTime: number;
  setBreakTime: (time: number) => void;
  isPiPActive: boolean;
  setIsPiPActive: (active: boolean) => void;
  isAlarmRinging: boolean;
  stopAlarm: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchMode: (mode: 'work' | 'break') => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

const TIMER_STORAGE_KEY = 'pomodoro-timer-state';

interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: 'work' | 'break';
  workTime: number;
  breakTime: number;
  isPiPActive: boolean;
  lastUpdated: number;
}

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  // Load initial state from localStorage
  const getInitialState = (): Partial<TimerState> => {
    try {
      const saved = localStorage.getItem(TIMER_STORAGE_KEY);
      if (saved) {
        const state: TimerState = JSON.parse(saved);
        // Calculate elapsed time if timer was active
        if (state.isActive && state.lastUpdated) {
          const elapsed = Math.floor((Date.now() - state.lastUpdated) / 1000);
          const newTimeLeft = Math.max(0, state.timeLeft - elapsed);
          return { ...state, timeLeft: newTimeLeft };
        }
        return state;
      }
    } catch (error) {
      console.warn('Failed to load timer state:', error);
    }
    return {};
  };

  const initialState = getInitialState();
  
  const [timeLeft, setTimeLeft] = useState(initialState.timeLeft ?? 25 * 60);
  const [isActive, setIsActive] = useState(initialState.isActive ?? false);
  const [mode, setMode] = useState<'work' | 'break'>(initialState.mode ?? 'work');
  const [workTime, setWorkTime] = useState(initialState.workTime ?? 25);
  const [breakTime, setBreakTime] = useState(initialState.breakTime ?? 5);
  const [isPiPActive, setIsPiPActive] = useState(initialState.isPiPActive ?? false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alarmContextRef = useRef<AudioContext | null>(null);
  const alarmSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Save state to localStorage
  useEffect(() => {
    try {
      const state: TimerState = {
        timeLeft,
        isActive,
        mode,
        workTime,
        breakTime,
        isPiPActive,
        lastUpdated: Date.now()
      };
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save timer state:', error);
    }
  }, [timeLeft, isActive, mode, workTime, breakTime, isPiPActive]);

  // Continuous alarm sound
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

      // Alarm sound - alternating frequencies
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
      alarmSourceRef.current = source;
    } catch (error) {
      console.log('Error playing alarm:', error);
    }
  }, []);

  const stopAlarm = useCallback(() => {
    setIsAlarmRinging(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    if (alarmSourceRef.current) {
      try {
        alarmSourceRef.current.stop();
      } catch (e) {}
      alarmSourceRef.current = null;
    }
  }, []);

  const startAlarm = useCallback(() => {
    setIsAlarmRinging(true);
    playAlarmSound();
    alarmIntervalRef.current = setInterval(() => {
      playAlarmSound();
    }, 1200);
  }, [playAlarmSound]);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
      
      // Start continuous alarm
      startAlarm();
      
      if (mode === 'work') {
        toast({
          title: "🎉 Work Session Complete!",
          description: "Time for a well-deserved break! Click to stop alarm.",
        });
        setMode('break');
        setTimeLeft(breakTime * 60);
      } else {
        toast({
          title: "✨ Break Complete!",
          description: "Ready for another focused work session? Click to stop alarm.",
        });
        setMode('work');
        setTimeLeft(workTime * 60);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, mode, workTime, breakTime, toast, startAlarm]);

  // Handle tick sound
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      tickIntervalRef.current = setInterval(() => {
        playTickSound();
      }, 1000);
    } else {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    }

    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.code === 'Space') {
        e.preventDefault();
        if (isAlarmRinging) {
          stopAlarm();
        } else {
          setIsActive(prev => !prev);
        }
      } else if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (isAlarmRinging) {
          stopAlarm();
        }
        setIsActive(false);
        setTimeLeft(mode === 'work' ? workTime * 60 : breakTime * 60);
        if (tickIntervalRef.current) {
          clearInterval(tickIntervalRef.current);
          tickIntervalRef.current = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, workTime, breakTime, isAlarmRinging, stopAlarm]);

  const toggleTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
    }
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workTime * 60 : breakTime * 60);
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  };

  const switchMode = (newMode: 'work' | 'break') => {
    if (isAlarmRinging) {
      stopAlarm();
    }
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? workTime * 60 : breakTime * 60);
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        isActive,
        setIsActive,
        mode,
        setMode,
        workTime,
        setWorkTime,
        breakTime,
        setBreakTime,
        isPiPActive,
        setIsPiPActive,
        isAlarmRinging,
        stopAlarm,
        toggleTimer,
        resetTimer,
        switchMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
