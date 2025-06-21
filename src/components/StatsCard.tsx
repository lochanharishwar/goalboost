
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, Award, Target } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  suffix: string;
  description: string;
  isDarkMode: boolean;
}

export const StatsCard = ({ title, value, suffix, description, isDarkMode }: StatsCardProps) => {
  return (
    <Card className={`shadow-xl border-0 backdrop-blur-xl border transform hover:scale-[1.02] transition-all duration-500 ${
      isDarkMode 
        ? 'bg-black/40 border-blue-500/20 hover:shadow-blue-500/20' 
        : 'bg-white/40 border-blue-200/40 hover:shadow-blue-200/20'
    }`}>
      <CardHeader>
        <CardTitle className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {value}{suffix}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
