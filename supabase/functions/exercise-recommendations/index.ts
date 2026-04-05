import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ALLOWED_FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'];
const MAX_STRING_LENGTH = 200;
const MAX_ARRAY_LENGTH = 20;
const MAX_ARRAY_ITEM_LENGTH = 50;

const SUSPICIOUS_PATTERNS = [
  /ignore.*previous.*instruction/i,
  /system\s*:/i,
  /you\s+are\s+now/i,
  /admin.*mode/i,
  /bypass.*safety/i,
  /disregard.*guideline/i,
  /forget.*everything/i,
  /new\s+instruction/i,
  /override.*prompt/i,
  /pretend\s+to\s+be/i,
  /act\s+as\s+if/i,
  /jailbreak/i,
];

function detectPromptInjection(text: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(text));
}

function sanitizeString(input: unknown, maxLength: number = MAX_STRING_LENGTH): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== 'string') return null;
  return input.trim().slice(0, maxLength).replace(/[<>{}[\]\\]/g, '');
}

function validateStringArray(input: unknown, maxItems: number = MAX_ARRAY_LENGTH, maxItemLength: number = MAX_ARRAY_ITEM_LENGTH): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item): item is string => typeof item === 'string')
    .slice(0, maxItems)
    .map(item => item.trim().slice(0, maxItemLength).replace(/[<>{}[\]\\]/g, ''))
    .filter(item => item.length > 0);
}

function validateFitnessLevel(input: unknown): string {
  if (typeof input !== 'string') return 'beginner';
  const normalized = input.toLowerCase().trim();
  return ALLOWED_FITNESS_LEVELS.includes(normalized) ? normalized : 'beginner';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fitnessLevel = validateFitnessLevel(rawBody.fitnessLevel);
    const goals = sanitizeString(rawBody.goals, MAX_STRING_LENGTH) || 'General fitness';
    const preferences = sanitizeString(rawBody.preferences, 500) || 'None';
    const availableEquipment = validateStringArray(rawBody.availableEquipment);
    const targetMuscles = validateStringArray(rawBody.targetMuscles, 10);

    if (detectPromptInjection(goals) || detectPromptInjection(preferences)) {
      console.warn('Potential prompt injection attempt detected');
      return new Response(
        JSON.stringify({ error: 'Invalid input detected. Please use appropriate fitness-related terms.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an elite certified personal trainer and sports scientist. Create detailed, science-backed workout plans. Return ONLY valid JSON with no markdown.

Return this EXACT structure:
{
  "summary": "2-3 sentence personalized overview explaining WHY this plan suits the user",
  "estimatedDuration": "35-45 min",
  "estimatedCalories": "250-350 kcal",
  "difficulty": "beginner|intermediate|advanced",
  "warmUp": [
    { "name": "Exercise Name", "duration": "2 min", "purpose": "Brief why" }
  ],
  "exercises": [
    {
      "name": "Exercise Name",
      "category": "upper-body|lower-body|core|cardio|full-body|flexibility",
      "sets": 3,
      "reps": "10-12",
      "restBetweenSets": "60 sec",
      "tempo": "2-1-2",
      "benefit": "One specific benefit sentence",
      "technique": "One key form cue to remember",
      "matchId": "exercise-id-from-library-if-exists",
      "intensity": "low|moderate|high"
    }
  ],
  "coolDown": [
    { "name": "Stretch Name", "duration": "2 min", "purpose": "Brief why" }
  ],
  "focusAreas": [
    { "area": "Strength", "percentage": 40 },
    { "area": "Cardio", "percentage": 30 },
    { "area": "Flexibility", "percentage": 30 }
  ],
  "weeklySchedule": {
    "daysPerWeek": 3,
    "suggestion": "Brief schedule like Mon/Wed/Fri with rest days in between"
  },
  "progressionPlan": "1-2 sentences on how to progress over next 4 weeks",
  "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "safetyNotes": ["Important safety consideration 1", "Safety note 2"]
}

Exercise library IDs to match: push-ups, pull-ups, bench-press, dumbbell-rows, overhead-press, dips, bicep-curls, tricep-extensions, lat-pulldowns, squats, lunges, deadlifts, leg-press, calf-raises, plank, crunches, leg-raises, russian-twists, mountain-climbers, burpees, jumping-jacks, high-knees, box-jumps, stretching, yoga-poses.

RULES:
- Return 5-7 main exercises (not including warm-up/cool-down)
- Include 2-3 warm-up exercises and 2-3 cool-down stretches
- Tailor rest periods to fitness level (beginner: 90s, intermediate: 60s, advanced: 30-45s)
- Include tempo notation (eccentric-pause-concentric in seconds)
- Make tips actionable and specific, not generic
- matchId ONLY if exercise matches library. Otherwise omit matchId.
- Calorie estimates should be realistic for the workout type and duration`;

    const userPrompt = `Create a personalized workout plan:
- Fitness Level: ${fitnessLevel}
- Primary Goals: ${goals}
- Available Equipment: ${availableEquipment.length > 0 ? availableEquipment.join(', ') : 'Bodyweight only (no equipment)'}
- Target Muscle Groups: ${targetMuscles.length > 0 ? targetMuscles.join(', ') : 'Full body balanced'}
- Additional Notes: ${preferences}

Design the best possible plan for this person. Be specific and scientific.`;

    console.log('Generating exercise recommendations', { fitnessLevel, goals });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add more credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '';
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsedPlan;
    try {
      parsedPlan = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse recommendations');
    }

    console.log('Successfully generated structured recommendations');

    return new Response(
      JSON.stringify({ plan: parsedPlan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in exercise-recommendations function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
