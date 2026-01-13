import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState<string>('12');
  const [selectedMinute, setSelectedMinute] = React.useState<string>('00');
  const [selectedPeriod, setSelectedPeriod] = React.useState<'AM' | 'PM'>('AM');

  // Parse initial value
  React.useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':');
      const h = parseInt(hours);
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h % 12 || 12;
      setSelectedHour(displayHour.toString().padStart(2, '0'));
      setSelectedMinute(minutes || '00');
      setSelectedPeriod(period);
    }
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleTimeChange = (hour: string, minute: string, period: 'AM' | 'PM') => {
    let h = parseInt(hour);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    const timeString = `${h.toString().padStart(2, '0')}:${minute}`;
    onChange(timeString);
  };

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
    handleTimeChange(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
    handleTimeChange(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodSelect = (period: 'AM' | 'PM') => {
    setSelectedPeriod(period);
    handleTimeChange(selectedHour, selectedMinute, period);
  };

  const displayValue = value 
    ? `${selectedHour}:${selectedMinute} ${selectedPeriod}`
    : 'Select time';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-12 w-40 justify-start text-left font-bold rounded-xl border-2 border-primary/30 hover:border-primary bg-background",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4 text-primary" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover/95 backdrop-blur-xl border-2 border-border" align="start">
        <div className="flex p-3 gap-2">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Hour</span>
            <ScrollArea className="h-48 w-14 rounded-lg border border-border bg-background/50">
              <div className="p-1">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full font-bold rounded-lg transition-all",
                      selectedHour === hour && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                    onClick={() => handleHourSelect(hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Min</span>
            <ScrollArea className="h-48 w-14 rounded-lg border border-border bg-background/50">
              <div className="p-1">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full font-bold rounded-lg transition-all",
                      selectedMinute === minute && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* AM/PM */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Period</span>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "w-14 h-[5.5rem] font-black text-lg rounded-lg transition-all",
                  selectedPeriod === 'AM' && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => handlePeriodSelect('AM')}
              >
                AM
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "w-14 h-[5.5rem] font-black text-lg rounded-lg transition-all",
                  selectedPeriod === 'PM' && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => handlePeriodSelect('PM')}
              >
                PM
              </Button>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="p-3 pt-0">
          <Button 
            className="w-full font-bold rounded-xl gradient-primary text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
