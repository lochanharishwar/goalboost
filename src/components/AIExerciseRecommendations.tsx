import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Loader2, Target, AlertCircle, Dumbbell, CheckCircle2, ArrowRight, Zap, Brain, WifiOff, Play, Clock, Shield, TrendingUp, Flame, Calendar, Timer, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { exercises } from '@/data/exercises';
import { fallbackWorkoutTemplates, getRecommendedTemplate, FallbackWorkoutPlan } from '@/data/fallbackWorkoutTemplates';
import { useWorkoutPlan } from '@/contexts/WorkoutPlanContext';

const fitnessLevels = ['beginner', 'intermediate', 'advanced'] as const;
const goalOptions = ['Build Muscle', 'Lose Weight', 'Flexibility', 'Endurance'];
const muscleGroups = ['Chest', 'Back', 'Arms', 'Legs', 'Core', 'Shoulders'];

interface ExercisePlan {
  summary: string;
  estimatedDuration?: string;
  estimatedCalories?: string;
  difficulty?: string;
  warmUp?: { name: string; duration: string; purpose: string }[];
  exercises: {
    name: string;
    category: string;
    sets: number;
    reps: string;
    restBetweenSets?: string;
    tempo?: string;
    benefit: string;
    technique?: string;
    matchId?: string;
    intensity?: string;
  }[];
  coolDown?: { name: string; duration: string; purpose: string }[];
  focusAreas: { area: string; percentage: number }[];
  weeklySchedule?: { daysPerWeek: number; suggestion: string };
  progressionPlan?: string;
  tips: string[];
  safetyNotes?: string[];
}

export const AIExerciseRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<ExercisePlan | null>(null);
  const [fallbackPlan, setFallbackPlan] = useState<FallbackWorkoutPlan | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryInfo, setRetryInfo] = useState<string | null>(null);
  const [fitnessLevel, setFitnessLevel] = useState<string>('beginner');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const { toast } = useToast();
  const { setUserPreferences, setCurrentPlan, startExerciseInCoach } = useWorkoutPlan();

  useEffect(() => {
    setUserPreferences({
      fitnessLevel,
      goals: selectedGoals,
      targetMuscles: selectedMuscles
    });
  }, [fitnessLevel, selectedGoals, selectedMuscles, setUserPreferences]);

  const toggleSelection = (item: string, selected: string[], setSelected: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const getMatchedExercise = (matchId?: string) => {
    if (!matchId) return null;
    return exercises.find(e => e.id === matchId);
  };

  const showOfflineFallback = () => {
    const recommended = getRecommendedTemplate(fitnessLevel, selectedGoals, selectedMuscles);
    setFallbackPlan(recommended);
    setShowFallback(true);
    setPlan(null);
    setCurrentPlan(recommended);
    toast({ title: "Offline Plan Ready!", description: `Using "${recommended.name}" template based on your preferences.` });
  };

  const handleStartExercise = (matchId?: string) => {
    if (matchId) startExerciseInCoach(matchId);
  };

  const handleGetRecommendations = async (retryCount = 0) => {
    const maxRetries = 3;
    const baseDelay = 5000;

    setIsLoading(true);
    setError(null);
    setRetryInfo(null);
    setShowFallback(false);
    if (retryCount === 0) {
      setPlan(null);
      setFallbackPlan(null);
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke('exercise-recommendations', {
        body: {
          fitnessLevel,
          goals: selectedGoals.join(', ') || 'General fitness',
          availableEquipment: [],
          targetMuscles: selectedMuscles,
          preferences: '',
        }
      });

      if (fnError) throw fnError;
      if (data?.error) {
        if (data.error.toLowerCase().includes('rate limit')) {
          if (retryCount < maxRetries) {
            const delay = baseDelay * Math.pow(2, retryCount);
            const seconds = delay / 1000;
            for (let i = seconds; i > 0; i--) {
              setRetryInfo(`High demand - waiting ${i}s before retry ${retryCount + 1}/${maxRetries}...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setRetryInfo(null);
            return handleGetRecommendations(retryCount + 1);
          }
          setIsLoading(false);
          showOfflineFallback();
          return;
        }
        throw new Error(data.error);
      }

      setPlan(data.plan);
      setCurrentPlan(data.plan);
      setRetryInfo(null);
      toast({ title: "Plan Ready!", description: "Your personalized workout plan has been generated." });
    } catch (err) {
      console.error('Error getting recommendations:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get recommendations';

      if (errorMessage.toLowerCase().includes('rate limit') && retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount);
        const seconds = delay / 1000;
        for (let i = seconds; i > 0; i--) {
          setRetryInfo(`High demand - waiting ${i}s before retry ${retryCount + 1}/${maxRetries}...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setRetryInfo(null);
        return handleGetRecommendations(retryCount + 1);
      }

      if (retryCount >= maxRetries - 1 || errorMessage.toLowerCase().includes('rate limit')) {
        setIsLoading(false);
        showOfflineFallback();
        return;
      }

      setError(errorMessage);
      setRetryInfo(null);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      if (retryCount === 0 || retryCount >= maxRetries) {
        setIsLoading(false);
      }
    }
  };

  const currentDisplayPlan: ExercisePlan | FallbackWorkoutPlan | null = showFallback && fallbackPlan ? fallbackPlan : plan;

  const intensityColor = (intensity?: string) => {
    switch (intensity) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      default: return 'bg-green-500/20 text-green-300 border-green-400/30';
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-900/40 via-black/30 to-blue-900/40 backdrop-blur-xl border border-purple-500/30 overflow-hidden animate-fade-in">
      <CardHeader className="pb-4 pt-5 px-6 border-b border-purple-500/20">
        <CardTitle className="text-white text-xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/30">
            <Brain className="h-5 w-5 text-purple-300" />
          </div>
          AI Workout Recommendations
          {showFallback && (
            <Badge className="ml-2 bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline Mode
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left Side - Input */}
          <div className="p-6 space-y-5 border-r border-purple-500/20 bg-black/20">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Configure Your Plan</span>
            </div>

            {/* Fitness Level */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">Fitness Level</Label>
              <div className="flex flex-wrap gap-2">
                {fitnessLevels.map((level) => (
                  <Badge
                    key={level}
                    onClick={() => setFitnessLevel(level)}
                    className={cn(
                      "cursor-pointer text-sm capitalize px-4 py-2 transition-all duration-300 hover:scale-105",
                      fitnessLevel === level
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                        : "bg-black/40 text-gray-400 border-gray-600/40 hover:border-purple-400/50 hover:text-purple-300"
                    )}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">Fitness Goals</Label>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map((goal) => (
                  <Badge
                    key={goal}
                    onClick={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
                    className={cn(
                      "cursor-pointer text-sm px-3 py-1.5 transition-all duration-300 hover:scale-105",
                      selectedGoals.includes(goal)
                        ? "bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white border-transparent shadow-lg shadow-green-500/20"
                        : "bg-black/40 text-gray-400 border-gray-600/40 hover:border-green-400/50 hover:text-green-300"
                    )}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Target Muscles */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">Target Muscles</Label>
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map((muscle) => (
                  <Badge
                    key={muscle}
                    onClick={() => toggleSelection(muscle, selectedMuscles, setSelectedMuscles)}
                    className={cn(
                      "cursor-pointer text-sm px-3 py-1.5 transition-all duration-300 hover:scale-105",
                      selectedMuscles.includes(muscle)
                        ? "bg-gradient-to-r from-orange-500/80 to-amber-500/80 text-white border-transparent shadow-lg shadow-orange-500/20"
                        : "bg-black/40 text-gray-400 border-gray-600/40 hover:border-orange-400/50 hover:text-orange-300"
                    )}
                  >
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={() => handleGetRecommendations()}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-6 text-base rounded-xl shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Workout Plan
                </>
              )}
            </Button>

            {/* Quick Offline Templates */}
            <div className="pt-4 border-t border-purple-500/20">
              <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                <WifiOff className="h-3 w-3" />
                Or use a pre-made template:
              </p>
              <div className="flex flex-wrap gap-2">
                {fallbackWorkoutTemplates.slice(0, 4).map((template) => (
                  <Badge
                    key={template.id}
                    onClick={() => {
                      setFallbackPlan(template);
                      setShowFallback(true);
                      setPlan(null);
                      setCurrentPlan(template);
                      toast({ title: "Template Loaded!", description: `Using "${template.name}" template.` });
                    }}
                    className="cursor-pointer text-xs px-2 py-1 bg-black/40 text-gray-400 border-gray-600/40 hover:border-purple-400/50 hover:text-purple-300 transition-all"
                  >
                    {template.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="p-6 bg-gradient-to-br from-black/30 to-purple-900/10 min-h-[400px] flex flex-col">
            {retryInfo && (
              <div className="p-4 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center gap-3 animate-fade-in mb-4">
                <Loader2 className="h-5 w-5 text-yellow-400 animate-spin shrink-0" />
                <p className="text-yellow-300 text-sm">{retryInfo}</p>
              </div>
            )}

            {error && !retryInfo && !showFallback && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center gap-3 animate-fade-in mb-4">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!currentDisplayPlan && !error && !isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
                  <Sparkles className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Generate</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Configure your preferences and click generate for a science-backed, personalized workout plan with warm-up, exercises, and cool-down.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && !retryInfo && (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                  <Loader2 className="h-16 w-16 text-purple-400 animate-spin relative" />
                </div>
                <p className="text-gray-300 mt-4">Building your personalized plan...</p>
                <p className="text-gray-500 text-xs mt-1">Analyzing goals, muscles & fitness level</p>
              </div>
            )}

            {/* Plan Display */}
            {currentDisplayPlan && !isLoading && (
              <div className="space-y-4 overflow-y-auto animate-fade-in max-h-[600px] custom-scrollbar pr-1">
                {/* Offline Banner */}
                {showFallback && fallbackPlan && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center gap-3">
                    <WifiOff className="h-5 w-5 text-yellow-400 shrink-0" />
                    <div className="flex-1">
                      <p className="text-yellow-300 text-sm font-medium">{fallbackPlan.name}</p>
                      <p className="text-yellow-300/70 text-xs flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {fallbackPlan.duration} • {fallbackPlan.difficulty}
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary + Stats Row */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 space-y-3">
                  <p className="text-gray-200 text-sm">{currentDisplayPlan.summary}</p>
                  {'estimatedDuration' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).estimatedDuration && (
                    <div className="flex flex-wrap gap-3">
                      <span className="text-xs text-gray-300 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg">
                        <Clock className="h-3 w-3 text-blue-400" />
                        {(currentDisplayPlan as ExercisePlan).estimatedDuration}
                      </span>
                      {(currentDisplayPlan as ExercisePlan).estimatedCalories && (
                        <span className="text-xs text-gray-300 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg">
                          <Flame className="h-3 w-3 text-orange-400" />
                          {(currentDisplayPlan as ExercisePlan).estimatedCalories}
                        </span>
                      )}
                      {(currentDisplayPlan as ExercisePlan).difficulty && (
                        <span className="text-xs text-gray-300 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg">
                          <Activity className="h-3 w-3 text-purple-400" />
                          {(currentDisplayPlan as ExercisePlan).difficulty}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Warm-Up */}
                {'warmUp' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).warmUp && (currentDisplayPlan as ExercisePlan).warmUp!.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="h-3 w-3 text-orange-400" />
                      Warm-Up
                    </Label>
                    <div className="space-y-1.5">
                      {(currentDisplayPlan as ExercisePlan).warmUp!.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
                          <div>
                            <span className="text-white text-xs font-medium">{item.name}</span>
                            <p className="text-gray-500 text-[10px]">{item.purpose}</p>
                          </div>
                          <Badge className="text-[10px] bg-orange-500/20 text-orange-300 border-orange-400/30">{item.duration}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Focus Areas */}
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase tracking-wider">Focus Distribution</Label>
                  <div className="space-y-2">
                    {currentDisplayPlan.focusAreas.map((area) => (
                      <div key={area.area} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-20 shrink-0">{area.area}</span>
                        <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${area.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{area.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercises List */}
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Dumbbell className="h-3 w-3 text-purple-400" />
                    Main Exercises
                  </Label>
                  <div className="space-y-2">
                    {currentDisplayPlan.exercises.map((ex, idx) => {
                      const matched = getMatchedExercise(ex.matchId);
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-black/40 border border-purple-500/20 space-y-2 hover:border-purple-500/40 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-purple-500/20">
                                <Dumbbell className="h-3.5 w-3.5 text-purple-400" />
                              </div>
                              <span className="text-white text-sm font-medium">{ex.name}</span>
                              {'intensity' in ex && ex.intensity && (
                                <Badge className={cn("text-[10px] capitalize", intensityColor(ex.intensity))}>
                                  {ex.intensity}
                                </Badge>
                              )}
                            </div>
                            <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-400/30">
                              {ex.sets}×{ex.reps}
                            </Badge>
                          </div>

                          {/* Rest & Tempo */}
                          {'restBetweenSets' in ex && (ex.restBetweenSets || ex.tempo) && (
                            <div className="flex gap-2">
                              {ex.restBetweenSets && (
                                <span className="text-[10px] text-gray-500 flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded">
                                  <Timer className="h-2.5 w-2.5" /> Rest: {ex.restBetweenSets}
                                </span>
                              )}
                              {ex.tempo && (
                                <span className="text-[10px] text-gray-500 bg-black/30 px-2 py-0.5 rounded">
                                  Tempo: {ex.tempo}
                                </span>
                              )}
                            </div>
                          )}

                          <p className="text-gray-400 text-xs flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-green-400 mt-0.5 shrink-0" />
                            {ex.benefit}
                          </p>

                          {'technique' in ex && ex.technique && (
                            <p className="text-gray-500 text-[10px] flex items-start gap-1.5 bg-blue-500/5 p-1.5 rounded-lg">
                              <Target className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                              <span><strong className="text-blue-300">Form:</strong> {ex.technique}</span>
                            </p>
                          )}

                          {matched && (
                            <div className="flex items-center gap-2">
                              <a
                                href={`#${matched.id}`}
                                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                              >
                                <ArrowRight className="h-3 w-3" />
                                View in library
                              </a>
                              <button
                                onClick={() => handleStartExercise(ex.matchId)}
                                className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors bg-green-500/10 px-2 py-1 rounded-lg hover:bg-green-500/20"
                              >
                                <Play className="h-3 w-3" />
                                Start with AI Coach
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cool-Down */}
                {'coolDown' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).coolDown && (currentDisplayPlan as ExercisePlan).coolDown!.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="h-3 w-3 text-cyan-400" />
                      Cool-Down
                    </Label>
                    <div className="space-y-1.5">
                      {(currentDisplayPlan as ExercisePlan).coolDown!.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                          <div>
                            <span className="text-white text-xs font-medium">{item.name}</span>
                            <p className="text-gray-500 text-[10px]">{item.purpose}</p>
                          </div>
                          <Badge className="text-[10px] bg-cyan-500/20 text-cyan-300 border-cyan-400/30">{item.duration}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weekly Schedule */}
                {'weeklySchedule' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).weeklySchedule && (
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="text-xs font-medium text-indigo-300">
                        {(currentDisplayPlan as ExercisePlan).weeklySchedule!.daysPerWeek} days/week
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{(currentDisplayPlan as ExercisePlan).weeklySchedule!.suggestion}</p>
                  </div>
                )}

                {/* Progression Plan */}
                {'progressionPlan' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).progressionPlan && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-300">4-Week Progression</span>
                    </div>
                    <p className="text-gray-400 text-xs">{(currentDisplayPlan as ExercisePlan).progressionPlan}</p>
                  </div>
                )}

                {/* Tips */}
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase tracking-wider">Pro Tips</Label>
                  <ul className="space-y-1.5">
                    {currentDisplayPlan.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2 p-2 rounded-lg bg-black/20">
                        <span className="text-purple-400 text-lg leading-none">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Notes */}
                {'safetyNotes' in currentDisplayPlan && (currentDisplayPlan as ExercisePlan).safetyNotes && (currentDisplayPlan as ExercisePlan).safetyNotes!.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="h-3 w-3 text-red-400" />
                      Safety Notes
                    </Label>
                    <ul className="space-y-1.5">
                      {(currentDisplayPlan as ExercisePlan).safetyNotes!.map((note, idx) => (
                        <li key={idx} className="text-xs text-red-300/80 flex items-start gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/15">
                          <AlertCircle className="h-3 w-3 text-red-400 mt-0.5 shrink-0" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
