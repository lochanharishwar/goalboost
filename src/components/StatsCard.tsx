
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Award } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  suffix: string;
  description: string;
  isDarkMode: boolean;
}

export const StatsCard = ({ title, value, suffix, description, isDarkMode }: StatsCardProps) => {
  const getIcon = () => {
    if (title.includes('Progress')) return <Target className="h-5 w-5" />;
    if (title.includes('Week')) return <TrendingUp className="h-5 w-5" />;
    if (title.includes('Total')) return <Award className="h-5 w-5" />;
    return <Target className="h-5 w-5" />;
  };

  return (
    <Card className={`shadow-2xl border-0 backdrop-blur-xl border transform hover:scale-[1.02] transition-all duration-500 font-inter ${
      isDarkMode 
        ? 'bg-black/20 border-blue-500/20 hover:shadow-blue-500/20' 
        : 'bg-white/40 border-blue-200/40 hover:shadow-blue-200/20'
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg font-bold flex items-center gap-2 font-inter ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {getIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-3 font-inter ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {value}{suffix}
          </div>
          <div className={`text-sm font-inter ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
