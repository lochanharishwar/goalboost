import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Input validation helpers
const MAX_EXERCISE_NAME_LENGTH = 100;
const MAX_EXERCISE_ID_LENGTH = 100;
const MAX_STEP_LENGTH = 300;
const MAX_STEPS_COUNT = 20;

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

function sanitizeString(input: unknown, maxLength: number): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== 'string') return null;
  return input.trim().slice(0, maxLength).replace(/[<>{}[\]\\]/g, '');
}

function sanitizeStepsArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item): item is string => typeof item === 'string')
    .slice(0, MAX_STEPS_COUNT)
    .map(item => item.trim().slice(0, MAX_STEP_LENGTH).replace(/[<>{}[\]\\]/g, ''))
    .filter(item => item.length > 0);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { imageData } = rawBody;

    // Validate and sanitize inputs
    const exerciseId = sanitizeString(rawBody.exerciseId, MAX_EXERCISE_ID_LENGTH);
    const exerciseName = sanitizeString(rawBody.exerciseName, MAX_EXERCISE_NAME_LENGTH);
    const exerciseSteps = sanitizeStepsArray(rawBody.exerciseSteps);

    if (!imageData || !exerciseId || !exerciseName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for prompt injection attempts
    if (detectPromptInjection(exerciseName) || exerciseSteps.some(step => detectPromptInjection(step))) {
      console.warn('Potential prompt injection attempt detected in analyze-exercise');
      return new Response(
        JSON.stringify({ error: "Invalid input detected. Please use appropriate fitness-related terms." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an enthusiastic, warm, and supportive personal fitness coach named Coach AI. You genuinely care about the person's progress and safety. Analyze their exercise form from images with detailed body part tracking.

For the exercise "${exerciseName}", the proper steps are:
${exerciseSteps?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || 'Standard exercise form applies'}

Analyze the image and respond with a JSON object containing:
{
  "repCompleted": boolean,
  "formQuality": "good" | "warning" | "bad",
  "bodyTracking": {
    "leftArm": "status description (Good/Adjust needed/Incorrect)",
    "rightArm": "status description",
    "leftLeg": "status description",
    "rightLeg": "status description",
    "spine": "posture status (Straight/Curved/Needs adjustment)",
    "overall": "overall body alignment status"
  },
  "feedback": [
    { "type": "correct" | "warning" | "error", "message": "specific feedback" }
  ]
}

COACHING STYLE:
- Be WARM, HUMAN, and ENCOURAGING — like a real personal trainer
- Use casual, motivating language: "Love the depth on that squat!" not "Squat depth is adequate"
- For corrections, be kind but clear: "Try widening your stance a bit" not "Stance width incorrect"
- Mix in brief encouragements with corrections: "Great energy! Just tuck those elbows in"
- Keep messages SHORT (under 12 words) so they sound natural when spoken aloud

CRITICAL TRACKING POINTS:
1. ARMS: Check elbow angles, wrist alignment, shoulder position, arm extension
2. LEGS: Check knee tracking over toes, hip alignment, ankle position, leg spacing
3. SPINE/POSTURE: Check for neutral spine, avoid rounding, core engagement, head position
4. MOVEMENT: Track the full range of motion for the exercise

If you cannot see the person clearly:
- Set formQuality to null
- Set bodyTracking values to "Not visible"
- Give friendly positioning guidance like "Step back a bit so I can see you!"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: [
              {
                type: "text",
                text: `Analyze this frame from a video of someone performing "${exerciseName}". 
Track all visible body parts (arms, legs, spine) and their positions.
Provide form feedback and determine if a rep was completed.
Keep feedback messages very short for voice output.`
              },
              {
                type: "image_url",
                image_url: { url: imageData }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    let analysisResult;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
        if (!analysisResult.bodyTracking) {
          analysisResult.bodyTracking = {
            leftArm: "Analyzing...",
            rightArm: "Analyzing...",
            leftLeg: "Analyzing...",
            rightLeg: "Analyzing...",
            spine: "Analyzing...",
            overall: "Analyzing..."
          };
        }
      } else {
        analysisResult = {
          repCompleted: false,
          formQuality: "warning",
          bodyTracking: {
            leftArm: "Position yourself in frame",
            rightArm: "Position yourself in frame",
            leftLeg: "Position yourself in frame",
            rightLeg: "Position yourself in frame",
            spine: "Position yourself in frame",
            overall: "Ensure full body is visible"
          },
          feedback: [{ type: "warning", message: "Position yourself in frame" }]
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      analysisResult = {
        repCompleted: false,
        formQuality: "warning",
        bodyTracking: {
          leftArm: "Processing...",
          rightArm: "Processing...",
          leftLeg: "Processing...",
          rightLeg: "Processing...",
          spine: "Processing...",
          overall: "Continue your exercise"
        },
        feedback: [{ type: "warning", message: "Continue your exercise" }]
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-exercise:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        repCompleted: false,
        formQuality: null,
        bodyTracking: null,
        feedback: []
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
