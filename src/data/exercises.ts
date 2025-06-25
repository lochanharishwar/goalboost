
import { Exercise, ExerciseCategory } from '@/types/exercise';

export const exerciseCategories: ExerciseCategory[] = [
  {
    id: 'upper-body',
    name: 'Upper Body',
    description: 'Strengthen your arms, chest, shoulders, and back',
    icon: '💪',
    color: 'bg-red-500/20 border-red-400/30 text-red-400'
  },
  {
    id: 'lower-body',
    name: 'Lower Body',
    description: 'Build powerful legs and glutes',
    icon: '🦵',
    color: 'bg-blue-500/20 border-blue-400/30 text-blue-400'
  },
  {
    id: 'core',
    name: 'Core',
    description: 'Strengthen your abs and core muscles',
    icon: '🔥',
    color: 'bg-orange-500/20 border-orange-400/30 text-orange-400'
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Improve cardiovascular health and endurance',
    icon: '❤️',
    color: 'bg-pink-500/20 border-pink-400/30 text-pink-400'
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Complete workouts targeting multiple muscle groups',
    icon: '🏃',
    color: 'bg-green-500/20 border-green-400/30 text-green-400'
  },
  {
    id: 'flexibility',
    name: 'Flexibility',
    description: 'Improve flexibility and mobility',
    icon: '🧘',
    color: 'bg-purple-500/20 border-purple-400/30 text-purple-400'
  }
];

export const exercises: Exercise[] = [
  // Upper Body Exercises (25 exercises)
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['None'],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
    steps: [
      'Start in a plank position with hands slightly wider than shoulder-width apart',
      'Keep your body in a straight line from head to heels, engaging your core',
      'Lower your chest toward the ground by bending your elbows at a 45-degree angle',
      'Push back up to the starting position by extending your arms',
      'Keep your core engaged and avoid letting your hips sag throughout the movement'
    ],
    benefits: ['Builds upper body strength', 'Improves core stability', 'No equipment needed', 'Functional movement'],
    tips: ['Keep your body straight like a plank', 'Control the movement - don\'t rush', 'Breathe out as you push up', 'Start with knee push-ups if regular ones are too difficult']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 5-10 reps',
    equipment: ['Pull-up bar'],
    targetMuscles: ['Latissimus dorsi', 'Biceps', 'Rhomboids', 'Middle trapezius'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Hang from a pull-up bar with palms facing away from you (overhand grip)',
      'Keep your arms shoulder-width apart and let your body hang fully extended',
      'Pull yourself up by engaging your back muscles until your chin clears the bar',
      'Lower yourself back down with control to the starting position',
      'Keep your core engaged and avoid swinging or using momentum'
    ],
    benefits: ['Builds back and arm strength', 'Improves grip strength', 'Functional pulling movement', 'Works multiple muscle groups'],
    tips: ['Start with assisted pull-ups or negatives if needed', 'Focus on form over quantity', 'Engage your lats by pulling your shoulder blades down', 'Don\'t swing your body']
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 6-10 reps',
    equipment: ['Barbell', 'Bench', 'Weight plates'],
    targetMuscles: ['Chest', 'Triceps', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e3d?w=500&h=400&fit=crop',
    steps: [
      'Lie flat on the bench with your eyes under the barbell',
      'Grip the bar with hands slightly wider than shoulder-width apart',
      'Plant your feet firmly on the ground and arch your back slightly',
      'Lower the bar to your chest with control, touching lightly at nipple level',
      'Press the bar back up to the starting position, fully extending your arms'
    ],
    benefits: ['Maximum chest development', 'Builds pressing strength', 'Improves upper body power'],
    tips: ['Always use a spotter for safety', 'Keep your shoulder blades retracted', 'Don\'t bounce the bar off your chest', 'Maintain tension throughout the movement']
  },
  {
    id: 'dumbbell-rows',
    name: 'Dumbbell Rows',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 8-12 reps per arm',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Latissimus dorsi', 'Rhomboids', 'Rear deltoids', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=400&fit=crop',
    steps: [
      'Place one knee and hand on a bench for support',
      'Hold a dumbbell in your opposite hand with your arm extended',
      'Keep your back straight and core engaged',
      'Pull the dumbbell up to your ribcage, squeezing your shoulder blade',
      'Lower the weight back down with control'
    ],
    benefits: ['Strengthens back muscles', 'Improves posture', 'Unilateral training', 'Core stability'],
    tips: ['Keep your torso parallel to the ground', 'Lead with your elbow, not your hand', 'Squeeze your shoulder blade at the top', 'Don\'t rotate your torso']
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 6-8 reps',
    equipment: ['Barbell', 'Weight plates'],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper chest', 'Core'],
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart, holding the barbell at shoulder level',
      'Grip the bar with hands slightly wider than shoulder-width',
      'Keep your core tight and maintain a neutral spine',
      'Press the bar straight up overhead until your arms are fully extended',
      'Lower the bar back to shoulder level with control'
    ],
    benefits: ['Builds shoulder strength', 'Improves core stability', 'Functional pressing movement'],
    tips: ['Keep your core engaged throughout', 'Don\'t arch your back excessively', 'Press the bar in a straight line', 'Squeeze your glutes for stability']
  },
  {
    id: 'dips',
    name: 'Parallel Bar Dips',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['Parallel bars', 'Dip station'],
    targetMuscles: ['Triceps', 'Lower chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=500&h=400&fit=crop',
    steps: [
      'Grip the parallel bars and support your body weight with arms extended',
      'Keep your body upright with a slight forward lean',
      'Lower your body by bending your elbows until your shoulders are below your elbows',
      'Push yourself back up to the starting position',
      'Keep your legs slightly bent and avoid swinging'
    ],
    benefits: ['Builds tricep strength', 'Chest development', 'Functional pushing movement'],
    tips: ['Don\'t go too low if you feel shoulder pain', 'Keep your elbows close to your body', 'Lean forward slightly for more chest activation', 'Use assistance if needed']
  },
  {
    id: 'bicep-curls',
    name: 'Dumbbell Bicep Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Biceps', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart, holding dumbbells at your sides',
      'Keep your elbows close to your torso and shoulders back',
      'Curl the weights up by flexing your biceps',
      'Squeeze at the top of the movement',
      'Lower the weights back down with control'
    ],
    benefits: ['Builds arm strength', 'Improves grip strength', 'Simple isolation exercise'],
    tips: ['Don\'t swing the weights', 'Keep your elbows stationary', 'Control both the up and down phases', 'Don\'t use your back to help lift']
  },
  {
    id: 'tricep-extensions',
    name: 'Overhead Tricep Extensions',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbell'],
    targetMuscles: ['Triceps'],
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=500&h=400&fit=crop',
    steps: [
      'Hold a dumbbell with both hands above your head',
      'Keep your elbows close to your head',
      'Lower the weight behind your head by bending your elbows',
      'Extend your arms back to the starting position',
      'Keep your upper arms stationary throughout the movement'
    ],
    benefits: ['Isolates triceps', 'Improves arm definition', 'Increases pressing strength'],
    tips: ['Keep your elbows pointing forward', 'Don\'t let your elbows flare out', 'Control the weight on the way down', 'Start with lighter weight']
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Cable machine', 'Lat pulldown bar'],
    targetMuscles: ['Latissimus dorsi', 'Rhomboids', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&h=400&fit=crop',
    steps: [
      'Sit at the lat pulldown machine with your thighs secured under the pads',
      'Grip the bar with a wide overhand grip',
      'Pull the bar down to your upper chest',
      'Squeeze your shoulder blades together at the bottom',
      'Slowly return the bar to the starting position'
    ],
    benefits: ['Builds back width', 'Improves pulling strength', 'Good alternative to pull-ups'],
    tips: ['Don\'t pull the bar behind your neck', 'Lean back slightly', 'Focus on using your back, not your arms', 'Keep your chest up']
  },
  {
    id: 'chest-flyes',
    name: 'Dumbbell Chest Flyes',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=400&fit=crop',
    steps: [
      'Lie on a bench holding dumbbells above your chest with arms extended',
      'Keep a slight bend in your elbows throughout the movement',
      'Lower the weights out to the sides in a wide arc',
      'Feel a stretch in your chest, then bring the weights back together',
      'Squeeze your chest muscles at the top of the movement'
    ],
    benefits: ['Isolates chest muscles', 'Improves chest definition', 'Increases range of motion'],
    tips: ['Don\'t go too heavy', 'Keep the arc motion smooth', 'Don\'t lower weights too far', 'Maintain the elbow bend']
  },
  {
    id: 'shoulder-raises',
    name: 'Lateral Shoulder Raises',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Deltoids', 'Trapezius'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart, holding dumbbells at your sides',
      'Keep a slight bend in your elbows',
      'Raise the weights out to your sides until they reach shoulder height',
      'Hold for a moment at the top',
      'Lower the weights back down with control'
    ],
    benefits: ['Builds shoulder width', 'Improves shoulder stability', 'Defines deltoids'],
    tips: ['Don\'t lift above shoulder height', 'Control the movement', 'Don\'t use momentum', 'Keep your core engaged']
  },
  {
    id: 'face-pulls',
    name: 'Cable Face Pulls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine', 'Rope attachment'],
    targetMuscles: ['Rear deltoids', 'Rhomboids', 'Middle trapezius'],
    image: 'https://images.unsplash.com/photo-1566241477457-fa9280d17ba3?w=500&h=400&fit=crop',
    steps: [
      'Set the cable at face height with a rope attachment',
      'Grab the rope with both hands, palms facing down',
      'Step back to create tension in the cable',
      'Pull the rope toward your face, separating your hands',
      'Squeeze your shoulder blades together at the end'
    ],
    benefits: ['Improves posture', 'Strengthens rear delts', 'Balances pressing movements'],
    tips: ['Keep your elbows high', 'Focus on squeezing shoulder blades', 'Don\'t use too much weight', 'Control the return']
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=400&fit=crop',
    steps: [
      'Stand with dumbbells at your sides, palms facing your body',
      'Keep your elbows close to your torso',
      'Curl the weights up while maintaining the neutral grip',
      'Squeeze your biceps at the top',
      'Lower the weights back down with control'
    ],
    benefits: ['Targets different part of biceps', 'Builds forearm strength', 'Improves grip strength'],
    tips: ['Keep your wrists straight', 'Don\'t swing the weights', 'Control both phases of movement', 'Keep elbows stationary']
  },
  {
    id: 'incline-press',
    name: 'Incline Dumbbell Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-10 reps',
    equipment: ['Dumbbells', 'Incline bench'],
    targetMuscles: ['Upper chest', 'Front deltoids', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Set the bench to a 30-45 degree incline',
      'Hold dumbbells at chest level with palms facing forward',
      'Press the weights up and slightly forward',
      'Squeeze your chest at the top',
      'Lower the weights back to chest level with control'
    ],
    benefits: ['Targets upper chest', 'Builds pressing strength', 'Improves shoulder stability'],
    tips: ['Don\'t set the incline too steep', 'Keep your back against the bench', 'Control the descent', 'Don\'t let weights drift apart']
  },
  {
    id: 'cable-crossovers',
    name: 'Cable Crossovers',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine'],
    targetMuscles: ['Chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=400&fit=crop',
    steps: [
      'Set the cables at shoulder height or above',
      'Grab the handles and step forward to create tension',
      'Keep a slight bend in your elbows',
      'Bring your hands together in front of your chest',
      'Slowly return to the starting position'
    ],
    benefits: ['Isolates chest muscles', 'Constant tension', 'Great for definition'],
    tips: ['Keep the movement smooth', 'Focus on the squeeze', 'Don\'t use excessive weight', 'Maintain elbow position']
  },

  // Lower Body Exercises (25+ exercises)
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 15-20 reps',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart, toes slightly pointed out',
      'Keep your chest up and core engaged',
      'Lower your body by bending at hips and knees as if sitting back into a chair',
      'Go down until your thighs are parallel to the floor',
      'Push through your heels to return to the starting position'
    ],
    benefits: ['Builds leg strength', 'Improves mobility', 'Functional movement for daily activities', 'No equipment needed'],
    tips: ['Keep your knees aligned with your toes', 'Don\'t let knees cave inward', 'Keep weight on your heels', 'Imagine sitting back into a chair']
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps per leg',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Stand tall with feet hip-width apart',
      'Take a large step forward with one leg',
      'Lower your hips until both knees are bent at 90-degree angles',
      'Push off your front foot to return to the starting position',
      'Repeat with the other leg'
    ],
    benefits: ['Improves balance and coordination', 'Builds unilateral strength', 'Targets glutes effectively', 'Functional movement'],
    tips: ['Keep your front knee over your ankle', 'Don\'t let your back knee touch the ground', 'Keep your torso upright', 'Step far enough forward']
  },
  {
    id: 'deadlifts',
    name: 'Romanian Deadlifts',
    category: 'lower-body',
    difficulty: 'intermediate',
    duration: '4 sets of 6-8 reps',
    equipment: ['Barbell', 'Weight plates'],
    targetMuscles: ['Hamstrings', 'Glutes', 'Lower back', 'Core'],
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart, holding a barbell with an overhand grip',
      'Keep your knees slightly bent and back straight',
      'Hinge at the hips, pushing your hips back as you lower the bar',
      'Lower until you feel a stretch in your hamstrings',
      'Drive your hips forward to return to the starting position'
    ],
    benefits: ['Strengthens posterior chain', 'Improves hip mobility', 'Builds functional strength'],
    tips: ['Keep the bar close to your body', 'Don\'t round your back', 'Push your hips back, not down', 'Feel the stretch in your hamstrings']
  },
  {
    id: 'calf-raises',
    name: 'Standing Calf Raises',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 15-20 reps',
    equipment: ['None'],
    targetMuscles: ['Calves', 'Achilles tendon'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart, toes pointing forward',
      'Rise up onto your toes by contracting your calf muscles',
      'Hold the top position for a moment',
      'Lower back down with control',
      'Repeat for the desired number of repetitions'
    ],
    benefits: ['Strengthens calves', 'Improves ankle stability', 'Enhances jumping ability'],
    tips: ['Go up on your toes as high as possible', 'Control the descent', 'Keep your body straight', 'Add weight for more challenge']
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['None'],
    targetMuscles: ['Glutes', 'Hamstrings', 'Core'],
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place your arms at your sides for stability',
      'Squeeze your glutes and push your hips up toward the ceiling',
      'Create a straight line from your knees to your shoulders',
      'Lower back down with control'
    ],
    benefits: ['Activates glutes', 'Improves hip mobility', 'Strengthens posterior chain'],
    tips: ['Squeeze your glutes at the top', 'Don\'t arch your back', 'Keep your core engaged', 'Push through your heels']
  },
  {
    id: 'step-ups',
    name: 'Step-ups',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps per leg',
    equipment: ['Step', 'Box', 'Bench'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Stand in front of a step or box',
      'Place one foot completely on the step',
      'Push through your heel to step up onto the box',
      'Step back down with control',
      'Repeat with the same leg before switching'
    ],
    benefits: ['Builds leg strength', 'Improves balance', 'Unilateral training'],
    tips: ['Use your legs, not momentum', 'Step down with control', 'Keep your torso upright', 'Choose appropriate height']
  },
  {
    id: 'wall-sits',
    name: 'Wall Sits',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 30-60 seconds',
    equipment: ['Wall'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Core'],
    image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&h=400&fit=crop',
    steps: [
      'Stand with your back against a wall',
      'Slide down until your thighs are parallel to the floor',
      'Keep your knees at 90 degrees and feet shoulder-width apart',
      'Hold this position while breathing normally',
      'Stand back up when you can no longer maintain the position'
    ],
    benefits: ['Builds quad endurance', 'Improves mental toughness', 'No equipment needed'],
    tips: ['Keep your back flat against the wall', 'Don\'t let your knees go past your toes', 'Breathe steadily', 'Start with shorter holds']
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    category: 'lower-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-15 reps',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    image: 'https://images.unsplash.com/photo-1520877880798-5ee002af2c65?w=500&h=400&fit=crop',
    steps: [
      'Start in a squat position with feet shoulder-width apart',
      'Lower into a squat by bending your knees and hips',
      'Explosively jump up as high as you can',
      'Land softly back into the squat position',
      'Immediately go into the next repetition'
    ],
    benefits: ['Builds explosive power', 'Improves cardiovascular fitness', 'Plyometric training'],
    tips: ['Land softly to protect your joints', 'Use your arms for momentum', 'Keep your chest up', 'Focus on quality over quantity']
  },
  {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    category: 'lower-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps per leg',
    equipment: ['Bench', 'Chair'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&h=400&fit=crop',
    steps: [
      'Stand 2-3 feet in front of a bench or chair',
      'Place the top of one foot behind you on the bench',
      'Lower your body until your front thigh is parallel to the floor',
      'Push through your front heel to return to the starting position',
      'Complete all reps before switching legs'
    ],
    benefits: ['Unilateral leg strength', 'Improves balance', 'Targets glutes effectively'],
    tips: ['Keep most of your weight on your front leg', 'Don\'t push off your back foot', 'Keep your torso upright', 'Control the movement']
  },
  {
    id: 'pistol-squats',
    name: 'Pistol Squats',
    category: 'lower-body',
    difficulty: 'advanced',
    duration: '3 sets of 3-8 reps per leg',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Core', 'Balance'],
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&h=400&fit=crop',
    steps: [
      'Stand on one leg with the other leg extended straight out in front',
      'Keep your extended leg parallel to the ground',
      'Lower your body by bending your standing leg',
      'Go as low as you can while keeping your extended leg straight',
      'Push through your heel to return to the starting position'
    ],
    benefits: ['Advanced unilateral strength', 'Improves balance and flexibility', 'Functional movement'],
    tips: ['Start with assisted versions', 'Work on flexibility first', 'Keep your core engaged', 'Practice on each leg equally']
  },
  {
    id: 'goblet-squats',
    name: 'Goblet Squats',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['Dumbbell', 'Kettlebell'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Core'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=400&fit=crop',
    steps: [
      'Hold a dumbbell or kettlebell at chest level',
      'Stand with feet slightly wider than shoulder-width',
      'Lower into a squat while keeping the weight at chest level',
      'Keep your elbows pointing down',
      'Drive through your heels to return to standing'
    ],
    benefits: ['Teaches proper squat form', 'Builds leg strength', 'Core engagement'],
    tips: ['Keep your chest up', 'Don\'t let your knees cave in', 'Go as deep as comfortable', 'Control the movement']
  },
  {
    id: 'reverse-lunges',
    name: 'Reverse Lunges',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps per leg',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    image: 'https://images.unsplash.com/photo-1609013489669-4b23b4fc9e25?w=500&h=400&fit=crop',
    steps: [
      'Stand tall with feet hip-width apart',
      'Step backward with one leg',
      'Lower your hips until both knees are at 90 degrees',
      'Push off your back foot to return to starting position',
      'Alternate legs or complete all reps on one side first'
    ],
    benefits: ['Easier on knees than forward lunges', 'Builds unilateral strength', 'Improves balance'],
    tips: ['Step straight back', 'Don\'t let your front knee drift forward', 'Keep your torso upright', 'Control the descent']
  },
  {
    id: 'single-leg-deadlifts',
    name: 'Single Leg Deadlifts',
    category: 'lower-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-10 reps per leg',
    equipment: ['None', 'Dumbbells (optional)'],
    targetMuscles: ['Hamstrings', 'Glutes', 'Core', 'Balance'],
    image: 'https://images.unsplash.com/photo-1566241522760-7c87c8e0e2e9?w=500&h=400&fit=crop',
    steps: [
      'Stand on one leg with a slight bend in the knee',
      'Hinge at the hip and lower your torso',
      'Extend your free leg behind you for balance',
      'Keep your back straight throughout the movement',
      'Return to the starting position and repeat'
    ],
    benefits: ['Improves balance', 'Strengthens hamstrings and glutes', 'Core stability'],
    tips: ['Start without weight', 'Keep your hips square', 'Don\'t rush the movement', 'Use a wall for balance if needed']
  },
  {
    id: 'sumo-squats',
    name: 'Sumo Squats',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['None', 'Dumbbell (optional)'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Inner thighs', 'Calves'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet wider than shoulder-width, toes pointed out',
      'Keep your chest up and core engaged',
      'Lower by bending your knees and pushing hips back',
      'Go down until thighs are parallel to the floor',
      'Push through your heels to return to starting position'
    ],
    benefits: ['Targets inner thighs', 'Different squat variation', 'Improves hip mobility'],
    tips: ['Keep your knees in line with your toes', 'Don\'t let knees cave inward', 'Squeeze glutes at the top', 'Hold a weight for added resistance']
  },
  {
    id: 'lateral-lunges',
    name: 'Lateral Lunges',
    category: 'lower-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps per side',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Inner thighs', 'Outer thighs'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart',
      'Take a large step to one side',
      'Lower your body toward the stepping leg',
      'Keep the other leg straight',
      'Push off the stepping leg to return to center'
    ],
    benefits: ['Works in different plane of motion', 'Targets inner and outer thighs', 'Improves hip mobility'],
    tips: ['Keep your chest up', 'Don\'t let your knee cave inward', 'Keep the straight leg extended', 'Shift your weight to the stepping leg']
  },

  // Core Exercises (15+ exercises)
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    difficulty: 'beginner',
    duration: '3 sets of 30-60 seconds',
    equipment: ['None'],
    targetMuscles: ['Core', 'Shoulders', 'Glutes'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=400&fit=crop',
    steps: [
      'Start in a push-up position on your forearms',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes to maintain position',
      'Hold the position while breathing normally',
      'Don\'t let your hips sag or pike up'
    ],
    benefits: ['Builds core stability', 'Improves posture', 'Strengthens entire core', 'No equipment needed'],
    tips: ['Focus on breathing steadily', 'Keep your head in neutral position', 'Start with shorter holds and build up', 'Engage your entire core']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 30 seconds',
    equipment: ['None'],
    targetMuscles: ['Core', 'Shoulders', 'Hip flexors', 'Legs'],
    image: 'https://images.unsplash.com/photo-1520877880798-5ee002af2c65?w=500&h=400&fit=crop',
    steps: [
      'Start in a plank position with hands under shoulders',
      'Bring one knee toward your chest',
      'Quickly switch legs, bringing the other knee forward',
      'Continue alternating legs in a running motion',
      'Keep your core engaged and hips level throughout'
    ],
    benefits: ['Cardio and strength combination', 'Improves coordination', 'Burns calories', 'Full-body engagement'],
    tips: ['Keep your hips level', 'Land softly on your feet', 'Maintain plank position', 'Don\'t let your butt rise up']
  },
  {
    id: 'crunches',
    name: 'Basic Crunches',
    category: 'core',
    difficulty: 'beginner',
    duration: '3 sets of 15-20 reps',
    equipment: ['None'],
    targetMuscles: ['Rectus abdominis', 'Core'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place your hands behind your head or crossed over your chest',
      'Lift your shoulder blades off the ground by contracting your abs',
      'Hold for a moment at the top',
      'Lower back down with control'
    ],
    benefits: ['Targets abs directly', 'Simple and effective', 'Good for beginners'],
    tips: ['Don\'t pull on your neck', 'Focus on lifting with your abs', 'Keep your lower back on the ground', 'Quality over quantity']
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 20 reps per side',
    equipment: ['None'],
    targetMuscles: ['Obliques', 'Rectus abdominis', 'Hip flexors'],
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with hands behind your head',
      'Lift your shoulder blades off the ground',
      'Bring your right elbow toward your left knee while extending your right leg',
      'Switch sides, bringing your left elbow toward your right knee',
      'Continue alternating in a pedaling motion'
    ],
    benefits: ['Targets obliques', 'Improves coordination', 'Works multiple core muscles'],
    tips: ['Don\'t rush the movement', 'Focus on the twist', 'Keep your elbows wide', 'Fully extend the leg']
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 20 reps per side',
    equipment: ['None'],
    targetMuscles: ['Obliques', 'Core', 'Hip flexors'],
    image: 'https://images.unsplash.com/photo-1616279969376-6e8d8b4b6e3c?w=500&h=400&fit=crop',
    steps: [
      'Sit on the ground with knees bent and feet slightly lifted',
      'Lean back to create a V-shape with your torso and thighs',
      'Hold your hands together in front of your chest',
      'Rotate your torso to the right, then to the left',
      'Keep your core engaged throughout the movement'
    ],
    benefits: ['Targets obliques', 'Improves rotational strength', 'Core stability'],
    tips: ['Keep your chest up', 'Don\'t use momentum', 'Control the rotation', 'Keep your feet off the ground']
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 10-15 reps',
    equipment: ['None'],
    targetMuscles: ['Lower abs', 'Hip flexors', 'Core'],
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e5?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with legs straight and arms at your sides',
      'Keep your lower back pressed against the ground',
      'Lift your legs up until they\'re perpendicular to the floor',
      'Lower your legs back down with control',
      'Stop just before your feet touch the ground'
    ],
    benefits: ['Targets lower abs', 'Improves core strength', 'Challenges stability'],
    tips: ['Don\'t let your back arch', 'Control the descent', 'Keep your legs straight', 'Use your abs, not momentum']
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    duration: '3 sets of 10 reps per side',
    equipment: ['None'],
    targetMuscles: ['Core', 'Hip flexors', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with arms extended toward the ceiling',
      'Bend your hips and knees to 90 degrees',
      'Extend your right arm overhead while extending your left leg',
      'Return to the starting position',
      'Repeat with the opposite arm and leg'
    ],
    benefits: ['Core stability', 'Coordination', 'Spine health', 'Beginner-friendly'],
    tips: ['Keep your core engaged', 'Don\'t let your back arch', 'Move slowly and controlled', 'Breathe normally']
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 20-45 seconds per side',
    equipment: ['None'],
    targetMuscles: ['Obliques', 'Core', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
    steps: [
      'Lie on your side with your forearm on the ground',
      'Stack your feet and lift your hips off the ground',
      'Create a straight line from your head to your feet',
      'Hold the position while breathing normally',
      'Repeat on the other side'
    ],
    benefits: ['Targets obliques', 'Improves lateral stability', 'Core strength'],
    tips: ['Keep your body straight', 'Don\'t let your hips sag', 'Breathe steadily', 'Start with shorter holds']
  },
  {
    id: 'hollow-hold',
    name: 'Hollow Hold',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 15-30 seconds',
    equipment: ['None'],
    targetMuscles: ['Core', 'Hip flexors'],
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with arms extended overhead',
      'Press your lower back into the ground',
      'Lift your shoulders and legs off the ground',
      'Create a hollow shape with your body',
      'Hold the position while breathing'
    ],
    benefits: ['Core strength', 'Body awareness', 'Functional strength'],
    tips: ['Keep your lower back down', 'Start with knees bent if too difficult', 'Breathe steadily', 'Maintain the hollow shape']
  },
  {
    id: 'v-ups',
    name: 'V-ups',
    category: 'core',
    difficulty: 'advanced',
    duration: '3 sets of 8-12 reps',
    equipment: ['None'],
    targetMuscles: ['Core', 'Hip flexors', 'Rectus abdominis'],
    image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with arms extended overhead',
      'Simultaneously lift your legs and torso',
      'Reach your hands toward your feet, creating a V-shape',
      'Lower back down with control',
      'Keep your core engaged throughout'
    ],
    benefits: ['Full core workout', 'Challenges coordination', 'Advanced core strength'],
    tips: ['Don\'t use momentum', 'Focus on using your abs', 'Keep your legs straight', 'Control both phases']
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 30 seconds',
    equipment: ['None'],
    targetMuscles: ['Core', 'Shoulders', 'Arms', 'Legs'],
    image: 'https://images.unsplash.com/photo-1520877880798-5ee002af2c65?w=500&h=400&fit=crop',
    steps: [
      'Start on hands and knees with knees slightly off the ground',
      'Keep your back straight and core engaged',
      'Move forward by stepping opposite hand and foot',
      'Keep your knees close to the ground',
      'Continue crawling forward, then reverse'
    ],
    benefits: ['Full-body stability', 'Coordination', 'Core strength', 'Functional movement'],
    tips: ['Keep your knees low', 'Move slowly and controlled', 'Keep your back straight', 'Engage your core']
  },
  {
    id: 'flutter-kicks',
    name: 'Flutter Kicks',
    category: 'core',
    difficulty: 'beginner',
    duration: '3 sets of 30 seconds',
    equipment: ['None'],
    targetMuscles: ['Lower abs', 'Hip flexors', 'Core'],
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e5?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with legs extended',
      'Place your hands under your lower back for support',
      'Lift your legs slightly off the ground',
      'Alternate lifting each leg in small, quick movements',
      'Keep your core engaged throughout'
    ],
    benefits: ['Targets lower abs', 'Improves endurance', 'Simple and effective'],
    tips: ['Keep movements small and controlled', 'Don\'t let your back arch', 'Breathe steadily', 'Keep legs low']
  },
  {
    id: 'wood-chops',
    name: 'Wood Chops',
    category: 'core',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps per side',
    equipment: ['Medicine ball', 'Dumbbell'],
    targetMuscles: ['Obliques', 'Core', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart, holding a weight',
      'Start with the weight at one shoulder',
      'Rotate your torso and bring the weight down across your body',
      'End with the weight at the opposite hip',
      'Control the movement back to the starting position'
    ],
    benefits: ['Rotational core strength', 'Functional movement', 'Improves athletic performance'],
    tips: ['Use your core to rotate', 'Keep your arms extended', 'Control both directions', 'Don\'t use just your arms']
  },
  {
    id: 'reverse-crunches',
    name: 'Reverse Crunches',
    category: 'core',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['None'],
    targetMuscles: ['Lower abs', 'Core'],
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop',
    steps: [
      'Lie on your back with knees bent at 90 degrees',
      'Place your hands at your sides or behind your head',
      'Lift your hips off the ground by contracting your lower abs',
      'Bring your knees toward your chest',
      'Lower back down with control'
    ],
    benefits: ['Targets lower abs', 'Less strain on neck', 'Good for beginners'],
    tips: ['Focus on lifting with your abs', 'Don\'t use momentum', 'Keep movements controlled', 'Breathe out as you lift']
  },
  {
    id: 'hanging-knee-raises',
    name: 'Hanging Knee Raises',
    category: 'core',
    difficulty: 'advanced',
    duration: '3 sets of 8-12 reps',
    equipment: ['Pull-up bar'],
    targetMuscles: ['Lower abs', 'Hip flexors', 'Grip strength'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Hang from a pull-up bar with arms extended',
      'Keep your shoulders engaged and core tight',
      'Lift your knees toward your chest',
      'Control the movement at the top',
      'Lower your legs back down with control'
    ],
    benefits: ['Advanced core exercise', 'Builds grip strength', 'Targets lower abs effectively'],
    tips: ['Don\'t swing your body', 'Control the movement', 'Engage your lats', 'Start with bent knees']
  },

  // Cardio Exercises (12+ exercises)
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 30-45 seconds',
    equipment: ['None'],
    targetMuscles: ['Full body', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1520877880798-5ee002af2c65?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet together and arms at your sides',
      'Jump while spreading your legs shoulder-width apart',
      'Simultaneously raise your arms overhead',
      'Jump back to the starting position',
      'Repeat in a rhythmic, continuous motion'
    ],
    benefits: ['Improves cardiovascular health', 'Full-body warm-up', 'Burns calories quickly', 'Coordination'],
    tips: ['Land softly on your feet', 'Keep a steady rhythm', 'Engage your core', 'Start slowly and build speed']
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 30 seconds',
    equipment: ['None'],
    targetMuscles: ['Hip flexors', 'Quadriceps', 'Calves', 'Core'],
    image: 'https://images.unsplash.com/photo-1616279969376-6e8d8b4b6e3c?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart',
      'Run in place while lifting your knees as high as possible',
      'Aim to bring your knees up to hip level',
      'Pump your arms as if you\'re running',
      'Maintain a quick pace throughout'
    ],
    benefits: ['Improves cardiovascular fitness', 'Strengthens hip flexors', 'Burns calories', 'Improves running form'],
    tips: ['Lift your knees as high as possible', 'Stay on the balls of your feet', 'Keep your core engaged', 'Maintain good posture']
  },
  {
    id: 'butt-kicks',
    name: 'Butt Kicks',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 30 seconds',
    equipment: ['None'],
    targetMuscles: ['Hamstrings', 'Glutes', 'Calves', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e5?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet hip-width apart',
      'Run in place while kicking your heels toward your glutes',
      'Try to touch your glutes with your heels',
      'Keep your thighs pointing down',
      'Maintain a quick, rhythmic pace'
    ],
    benefits: ['Warms up hamstrings', 'Improves cardiovascular fitness', 'Dynamic stretching'],
    tips: ['Kick your heels up behind you', 'Keep your knees pointing down', 'Stay light on your feet', 'Pump your arms']
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'full-body',
    difficulty: 'advanced',
    duration: '3 sets of 5-10 reps',
    equipment: ['None'],
    targetMuscles: ['Full body', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500&h=400&fit=crop',
    steps: [
      'Start standing with feet shoulder-width apart',
      'Squat down and place hands on the floor',
      'Jump feet back into a plank position',
      'Perform a push-up (optional for beginners)',
      'Jump feet back to squat position',
      'Jump up with arms overhead'
    ],
    benefits: ['Full-body workout', 'High calorie burn', 'Improves explosive power', 'Cardiovascular conditioning'],
    tips: ['Modify by stepping instead of jumping', 'Focus on form over speed', 'Take breaks as needed', 'Land softly']
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 60 seconds',
    equipment: ['Jump rope'],
    targetMuscles: ['Calves', 'Shoulders', 'Core', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Hold the rope handles with a relaxed grip',
      'Keep your elbows close to your sides',
      'Jump with both feet, landing on the balls of your feet',
      'Turn the rope with your wrists, not your arms',
      'Maintain a steady rhythm'
    ],
    benefits: ['Excellent cardio workout', 'Improves coordination', 'Portable exercise', 'Burns calories efficiently'],
    tips: ['Start slowly and build rhythm', 'Keep jumps small', 'Land softly', 'Practice without the rope first']
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    category: 'cardio',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['Plyo box', 'Bench', 'Step'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    image: 'https://images.unsplash.com/photo-1566241477457-fa9280d17ba3?w=500&h=400&fit=crop',
    steps: [
      'Stand facing a sturdy box or platform',
      'Bend your knees and swing your arms back',
      'Jump explosively onto the box, landing softly',
      'Stand fully upright on the box',
      'Step back down carefully'
    ],
    benefits: ['Builds explosive power', 'Improves jumping ability', 'Plyometric training'],
    tips: ['Start with a lower box', 'Land softly with bent knees', 'Step down, don\'t jump down', 'Focus on landing technique']
  },
  {
    id: 'sprint-intervals',
    name: 'Sprint Intervals',
    category: 'cardio',
    difficulty: 'intermediate',
    duration: '8 rounds of 30 seconds sprint, 30 seconds rest',
    equipment: ['None'],
    targetMuscles: ['Full body', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=400&fit=crop',
    steps: [
      'Warm up with light jogging for 5 minutes',
      'Sprint at maximum effort for 30 seconds',
      'Rest or walk slowly for 30 seconds',
      'Repeat for 8 total rounds',
      'Cool down with walking and stretching'
    ],
    benefits: ['Improves cardiovascular fitness', 'Burns calories efficiently', 'Builds speed', 'Time-efficient'],
    tips: ['Warm up properly', 'Give maximum effort during sprints', 'Use rest periods to recover', 'Gradually increase intensity']
  },
  {
    id: 'star-jumps',
    name: 'Star Jumps',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 15-20 reps',
    equipment: ['None'],
    targetMuscles: ['Full body', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=400&fit=crop',
    steps: [
      'Start in a crouched position with knees bent',
      'Jump up explosively, spreading your arms and legs wide',
      'Form a star shape at the peak of your jump',
      'Land softly back in the crouched position',
      'Immediately go into the next repetition'
    ],
    benefits: ['Full-body cardio', 'Improves explosive power', 'Burns calories', 'Fun variation'],
    tips: ['Land softly to protect joints', 'Use your arms for momentum', 'Keep your core engaged', 'Start with smaller jumps']
  },
  {
    id: 'skater-hops',
    name: 'Skater Hops',
    category: 'cardio',
    difficulty: 'intermediate',
    duration: '3 sets of 20 reps per side',
    equipment: ['None'],
    targetMuscles: ['Glutes', 'Quadriceps', 'Core', 'Calves'],
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&h=400&fit=crop',
    steps: [
      'Start standing on your right leg with left leg behind you',
      'Leap to the left, landing on your left leg',
      'Let your right leg cross behind your left leg',
      'Immediately leap back to the right',
      'Continue alternating sides in a skating motion'
    ],
    benefits: ['Improves lateral movement', 'Builds single-leg strength', 'Cardiovascular conditioning'],
    tips: ['Land softly on one foot', 'Use your arms for balance', 'Keep your chest up', 'Control the landing']
  },
  {
    id: 'tuck-jumps',
    name: 'Tuck Jumps',
    category: 'cardio',
    difficulty: 'advanced',
    duration: '3 sets of 8-12 reps',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Core', 'Hip flexors'],
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart',
      'Jump up as high as possible',
      'Bring your knees up toward your chest',
      'Try to touch your knees with your hands',
      'Land softly and immediately go into the next jump'
    ],
    benefits: ['Builds explosive power', 'Improves jumping ability', 'High-intensity cardio'],
    tips: ['Jump as high as possible', 'Pull your knees up quickly', 'Land softly', 'Rest between sets if needed']
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    category: 'cardio',
    difficulty: 'intermediate',
    duration: '3 sets of 30 seconds',
    equipment: ['Battle ropes'],
    targetMuscles: ['Arms', 'Shoulders', 'Core', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=400&fit=crop',
    steps: [
      'Hold the rope ends with both hands',
      'Stand with feet shoulder-width apart',
      'Create waves by moving your arms up and down alternately',
      'Keep your core engaged throughout',
      'Maintain a steady, intense pace'
    ],
    benefits: ['High-intensity cardio', 'Upper body strength', 'Core engagement', 'Burns calories fast'],
    tips: ['Keep your knees slightly bent', 'Use your whole body', 'Don\'t let the intensity drop', 'Breathe steadily']
  },
  {
    id: 'stair-climbing',
    name: 'Stair Climbing',
    category: 'cardio',
    difficulty: 'beginner',
    duration: '3 sets of 2-3 minutes',
    equipment: ['Stairs', 'Step platform'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Cardiovascular system'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Find a set of stairs or use a step platform',
      'Step up with one foot, then the other',
      'Step down with control',
      'Maintain a steady pace throughout',
      'Use the handrail for balance if needed'
    ],
    benefits: ['Great cardio workout', 'Builds leg strength', 'Accessible exercise', 'Functional movement'],
    tips: ['Keep your posture upright', 'Step with your whole foot', 'Control your descent', 'Start slowly and build intensity']
  },

  // Flexibility Exercises (10+ exercises)
  {
    id: 'child-pose',
    name: 'Child\'s Pose',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-60 seconds',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Back', 'Hips', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop',
    steps: [
      'Kneel on the floor with big toes touching',
      'Separate your knees about hip-width apart',
      'Sit back on your heels',
      'Fold forward and extend your arms in front of you',
      'Rest your forehead on the ground and breathe deeply'
    ],
    benefits: ['Stretches back and hips', 'Promotes relaxation', 'Relieves stress', 'Improves flexibility'],
    tips: ['Use a pillow under your forehead if needed', 'Keep breathing deeply', 'Don\'t force the stretch', 'Relax your shoulders']
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-60 seconds',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Hamstrings', 'Calves', 'Shoulders', 'Back'],
    image: 'https://images.unsplash.com/photo-1506629905260-f424dab3c758?w=500&h=400&fit=crop',
    steps: [
      'Start on hands and knees in a tabletop position',
      'Tuck your toes under and lift your hips up and back',
      'Straighten your legs and form an inverted V shape',
      'Press your hands firmly into the ground',
      'Pedal your feet to stretch your calves'
    ],
    benefits: ['Stretches entire posterior chain', 'Strengthens arms and shoulders', 'Improves circulation', 'Full-body stretch'],
    tips: ['Bend your knees if hamstrings are tight', 'Keep your spine straight', 'Distribute weight evenly', 'Press through your palms']
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose',
    category: 'flexibility',
    difficulty: 'intermediate',
    duration: 'Hold for 30-60 seconds per side',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Hip flexors', 'Glutes', 'Piriformis'],
    image: 'https://images.unsplash.com/photo-1506629905260-f424dab3c758?w=500&h=400&fit=crop',
    steps: [
      'Start in a downward dog position',
      'Bring your right knee forward behind your right wrist',
      'Extend your left leg straight back',
      'Lower your hips toward the ground',
      'Fold forward over your front leg if comfortable'
    ],
    benefits: ['Deep hip stretch', 'Releases tight hip flexors', 'Improves hip mobility'],
    tips: ['Use props under your hip if needed', 'Don\'t force the stretch', 'Keep your back leg straight', 'Breathe deeply']
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: '10-15 repetitions',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Spine', 'Core', 'Neck'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop',
    steps: [
      'Start on hands and knees in tabletop position',
      'Arch your back and lift your head (Cow pose)',
      'Round your spine toward the ceiling (Cat pose)',
      'Tuck your chin toward your chest',
      'Flow smoothly between the two positions'
    ],
    benefits: ['Improves spinal mobility', 'Relieves back tension', 'Warms up the spine'],
    tips: ['Move slowly and controlled', 'Coordinate with your breathing', 'Don\'t force the movement', 'Keep your arms straight']
  },
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-45 seconds per side',
    equipment: ['None'],
    targetMuscles: ['Hip flexors', 'Quadriceps'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Start in a lunge position with your right foot forward',
      'Lower your left knee to the ground',
      'Push your hips forward to feel the stretch',
      'Keep your torso upright',
      'Switch sides and repeat'
    ],
    benefits: ['Stretches tight hip flexors', 'Improves hip mobility', 'Reduces lower back tension'],
    tips: ['Don\'t lean forward', 'Keep your front knee over your ankle', 'Breathe deeply', 'Use a cushion under your knee']
  },
  {
    id: 'hamstring-stretch',
    name: 'Seated Hamstring Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-45 seconds per leg',
    equipment: ['None'],
    targetMuscles: ['Hamstrings', 'Calves'],
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=400&fit=crop',
    steps: [
      'Sit on the ground with one leg extended straight',
      'Bend your other leg with foot against your inner thigh',
      'Reach toward your extended foot',
      'Keep your back straight as you lean forward',
      'Feel the stretch in your hamstring'
    ],
    benefits: ['Improves hamstring flexibility', 'Reduces risk of injury', 'Improves posture'],
    tips: ['Don\'t round your back', 'Reach from your hips', 'Don\'t bounce', 'Keep the extended leg straight']
  },
  {
    id: 'shoulder-stretch',
    name: 'Cross-Body Shoulder Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 20-30 seconds per arm',
    equipment: ['None'],
    targetMuscles: ['Shoulders', 'Upper back'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
    steps: [
      'Stand or sit with good posture',
      'Bring your right arm across your body',
      'Use your left hand to gently pull your right arm closer',
      'Feel the stretch in your right shoulder',
      'Switch arms and repeat'
    ],
    benefits: ['Improves shoulder flexibility', 'Relieves shoulder tension', 'Simple and effective'],
    tips: ['Don\'t pull too hard', 'Keep your shoulders relaxed', 'Hold the stretch gently', 'Don\'t lift your shoulder']
  },
  {
    id: 'spinal-twist',
    name: 'Seated Spinal Twist',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 20-30 seconds per side',
    equipment: ['None'],
    targetMuscles: ['Spine', 'Obliques', 'Hips'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop',
    steps: [
      'Sit with your legs extended in front of you',
      'Bend your right knee and place your foot outside your left thigh',
      'Place your left elbow against your right knee',
      'Twist your torso to the right',
      'Look over your right shoulder'
    ],
    benefits: ['Improves spinal mobility', 'Releases lower back tension', 'Aids digestion'],
    tips: ['Sit up tall', 'Twist from your core', 'Don\'t force the rotation', 'Keep both hips on the ground']
  },
  {
    id: 'cobra-pose',
    name: 'Cobra Pose',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 15-30 seconds',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Back extensors', 'Hip flexors', 'Core'],
    image: 'https://images.unsplash.com/photo-1506629905260-f424dab3c758?w=500&h=400&fit=crop',
    steps: [
      'Lie face down with palms under your shoulders',
      'Press your palms into the ground',
      'Lift your chest and head off the ground',
      'Keep your hips on the ground',
      'Hold the position while breathing'
    ],
    benefits: ['Strengthens back muscles', 'Stretches hip flexors', 'Improves posture', 'Counteracts sitting'],
    tips: ['Don\'t lift too high', 'Keep your shoulders away from your ears', 'Use your back muscles', 'Don\'t strain your neck']
  },
  {
    id: 'butterfly-stretch',
    name: 'Butterfly Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-60 seconds',
    equipment: ['None'],
    targetMuscles: ['Inner thighs', 'Hips', 'Groin'],
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=400&fit=crop',
    steps: [
      'Sit with the soles of your feet together',
      'Hold your feet with your hands',
      'Gently pull your heels toward your body',
      'Sit up tall and lean forward slightly',
      'Feel the stretch in your inner thighs'
    ],
    benefits: ['Improves hip flexibility', 'Stretches inner thighs', 'Improves posture when sitting'],
    tips: ['Don\'t push your knees down forcefully', 'Keep your back straight', 'Breathe deeply', 'Be patient with the stretch']
  },
  {
    id: 'warrior-pose',
    name: 'Warrior I Pose',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 'Hold for 30-45 seconds per side',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Hip flexors', 'Quadriceps', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1506629905260-f424dab3c758?w=500&h=400&fit=crop',
    steps: [
      'Start in a lunge position with your right foot forward',
      'Turn your left foot out at a 45-degree angle',
      'Raise your arms overhead',
      'Square your hips toward the front',
      'Hold the position and breathe deeply'
    ],
    benefits: ['Stretches hip flexors', 'Builds leg strength', 'Improves balance', 'Opens chest and shoulders'],
    tips: ['Keep your front knee over your ankle', 'Ground through both feet', 'Lift through your arms', 'Don\'t let your front knee cave in']
  },
  {
    id: 'triangle-pose',
    name: 'Triangle Pose',
    category: 'flexibility',
    difficulty: 'intermediate',
    duration: 'Hold for 30-45 seconds per side',
    equipment: ['Yoga mat (optional)'],
    targetMuscles: ['Hamstrings', 'Hip flexors', 'Sides of torso'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop',
    steps: [
      'Stand with feet wide apart',
      'Turn your right foot out 90 degrees',
      'Reach toward your right foot with your right hand',
      'Place your hand on your shin, ankle, or the floor',
      'Extend your left arm toward the ceiling'
    ],
    benefits: ['Stretches hamstrings and sides', 'Improves balance', 'Opens chest and shoulders'],
    tips: ['Don\'t force the reach', 'Keep both legs straight', 'Look up at your top hand if comfortable', 'Use a block under your hand if needed']
  }
];
