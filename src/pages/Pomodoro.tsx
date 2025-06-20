
import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { SoundButton } from '@/components/SoundButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useClickSound } from '@/utils/soundUtils';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();
  const { playClickSound } = useClickSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      if (mode === 'work') {
        toast({
          title: "🎉 Work Session Complete!",
          description: "Time for a well-deserved break!",
        });
        setMode('break');
        setTimeLeft(breakTime * 60);
      } else {
        toast({
          title: "✨ Break Complete!",
          description: "Ready for another focused work session?",
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
  }, [isActive, timeLeft, mode, workTime, breakTime, toast]);

  const toggleTimer = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    playClickSound();
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workTime * 60 : breakTime * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    playClickSound();
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? workTime * 60 : breakTime * 60);
  };

  const toggleTheme = () => {
    playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((workTime * 60 - timeLeft) / (workTime * 60)) * 100
    : ((breakTime * 60 - timeLeft) / (breakTime * 60)) * 100;

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-green-900 to-teal-900" 
        : "bg-gradient-to-br from-green-50 via-teal-50 to-slate-100"
    )}>
      {/* Premium animated background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isDarkMode 
          ? "bg-gradient-to-br from-green-600/10 via-transparent to-teal-600/10"
          : "bg-gradient-to-br from-green-200/20 via-transparent to-teal-200/20"
      )}></div>

      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Pomodoro</h1>
          <p className="text-gray-300">More concentrated, More efficient</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black/40 rounded-lg p-1 backdrop-blur-xl border border-green-500/20">
            <SoundButton
              onClick={() => switchMode('work')}
              className={cn(
                "px-6 py-2 rounded-md transition-all duration-300",
                mode === 'work' 
                  ? "bg-green-500 text-white shadow-lg" 
                  : "bg-transparent text-gray-300 hover:text-white"
              )}
            >
              Focus
            </SoundButton>
            <SoundButton
              onClick={() => switchMode('break')}
              className={cn(
                "px-6 py-2 rounded-md transition-all duration-300",
                mode === 'break' 
                  ? "bg-teal-500 text-white shadow-lg" 
                  : "bg-transparent text-gray-300 hover:text-white"
              )}
            >
              Break
            </SoundButton>
          </div>
        </div>

        {/* Timer Display */}
        <Card className="shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-green-500/20 max-w-md mx-auto">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              {/* Circular Progress */}
              <svg className="w-64 h-64 transform -rotate-90 mx-auto" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={mode === 'work' ? "#10b981" : "#14b8a6"}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-lg text-gray-300 capitalize">
                    {mode === 'work' ? 'Focus Time' : 'Break Time'}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <SoundButton
                onClick={toggleTimer}
                size="lg"
                className={cn(
                  "rounded-full w-16 h-16 shadow-xl transition-all duration-300 hover:scale-110",
                  mode === 'work' 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                )}
              >
                {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </SoundButton>
              
              <SoundButton
                onClick={resetTimer}
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 border-gray-500 text-gray-300 hover:text-white hover:border-white transition-all duration-300 hover:scale-110"
              >
                <RotateCcw className="h-6 w-6" />
              </SoundButton>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mt-8 shadow-2xl border-0 bg-black/40 backdrop-blur-xl border border-green-500/20 max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-white" />
              <h3 className="text-white font-semibold">Timer Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Work Duration (minutes)</label>
                <input
                  type="number"
                  value={workTime}
                  onChange={(e) => setWorkTime(parseInt(e.target.value) || 25)}
                  className="w-full bg-black/30 border border-green-400/30 rounded-md px-3 py-2 text-white"
                  min="1"
                  max="60"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Break Duration (minutes)</label>
                <input
                  type="number"
                  value={breakTime}
                  onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                  className="w-full bg-black/30 border border-green-400/30 rounded-md px-3 py-2 text-white"
                  min="1"
                  max="30"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pomodoro;
