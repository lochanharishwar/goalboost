
import { Button } from '@/components/ui/button';
import { Moon, Sun, User, Trophy, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { SoundButton } from '@/components/SoundButton';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const Header = ({ isDarkMode, onToggleTheme, selectedDate, onDateSelect }: HeaderProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Updated to blue and white */}
          <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
            <div className="relative">
              <Trophy className="h-8 w-8 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-30 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-white bg-clip-text text-transparent tracking-wide">
                ASPIRA
              </h1>
              <p className="text-xs text-white font-medium tracking-wider">
                PREMIUM PRODUCTIVITY SUITE
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <SoundButton 
              variant="ghost" 
              className={cn(
                "text-white hover:text-blue-400 transition-colors",
                isActive('/') && "text-blue-400 bg-blue-500/20"
              )}
              onClick={() => navigate('/')}
            >
              Dashboard
            </SoundButton>
            <SoundButton 
              variant="ghost" 
              className={cn(
                "text-white hover:text-blue-400 transition-colors",
                isActive('/analytics') && "text-blue-400 bg-blue-500/20"
              )}
              onClick={() => navigate('/analytics')}
            >
              Analytics
            </SoundButton>
            <SoundButton 
              variant="ghost" 
              className={cn(
                "text-white hover:text-blue-400 transition-colors",
                isActive('/habits') && "text-blue-400 bg-blue-500/20"
              )}
              onClick={() => navigate('/habits')}
            >
              Habits
            </SoundButton>
            <SoundButton 
              variant="ghost" 
              className={cn(
                "text-white hover:text-blue-400 transition-colors",
                isActive('/pomodoro') && "text-blue-400 bg-blue-500/20"
              )}
              onClick={() => navigate('/pomodoro')}
            >
              Pomodoro
            </SoundButton>
            <SoundButton 
              variant="ghost" 
              className={cn(
                "text-white hover:text-blue-400 transition-colors",
                isActive('/reminders') && "text-blue-400 bg-blue-500/20"
              )}
              onClick={() => navigate('/reminders')}
            >
              Reminders
            </SoundButton>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Calendar Selector - Only show on dashboard */}
            {selectedDate && onDateSelect && (
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <SoundButton 
                    variant="outline" 
                    className="gap-2 bg-gradient-to-r from-blue-500/20 to-white/20 border-blue-400/30 text-white hover:from-blue-500/30 hover:to-white/30 backdrop-blur-sm shadow-xl"
                  >
                    <Calendar className="h-4 w-4" />
                    {format(selectedDate, 'MMM dd')}
                  </SoundButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black/90 border-blue-500/30 backdrop-blur-xl shadow-2xl" align="center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        onDateSelect(date);
                        setIsCalendarOpen(false);
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto bg-black/50 text-white"
                  />
                </PopoverContent>
              </Popover>
            )}

            <SoundButton
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="bg-black/20 border-blue-400/30 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </SoundButton>
            <SoundButton
              variant="outline"
              size="icon"
              className="bg-black/20 border-blue-400/30 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <User className="h-4 w-4" />
            </SoundButton>
          </div>
        </div>
      </div>
    </header>
  );
};
