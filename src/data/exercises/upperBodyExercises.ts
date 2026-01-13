import { Exercise } from '@/types/exercise';

export const upperBodyExercises: Exercise[] = [
  // CHEST EXERCISES
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['None'],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&h=400&fit=crop',
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
    id: 'diamond-push-ups',
    name: 'Diamond Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['None'],
    targetMuscles: ['Triceps', 'Chest', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=400&fit=crop',
    steps: [
      'Start in push-up position with hands close together forming a diamond shape',
      'Keep your elbows close to your body as you lower down',
      'Lower until your chest nearly touches your hands',
      'Push back up to starting position',
      'Maintain a straight body line throughout'
    ],
    benefits: ['Targets triceps intensely', 'Builds pushing strength', 'No equipment required'],
    tips: ['Keep elbows tucked in', 'Start with incline version if too difficult', 'Focus on tricep contraction']
  },
  {
    id: 'wide-push-ups',
    name: 'Wide Push-ups',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['None'],
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
    steps: [
      'Start in push-up position with hands wider than shoulder-width',
      'Lower your chest to the ground keeping elbows out',
      'Push back up focusing on chest contraction',
      'Keep core tight throughout the movement'
    ],
    benefits: ['Emphasizes chest muscles', 'Improves shoulder stability', 'Bodyweight only'],
    tips: ['Don\'t flare elbows too wide', 'Control the descent', 'Keep hips level']
  },
  {
    id: 'decline-push-ups',
    name: 'Decline Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['Bench', 'Box'],
    targetMuscles: ['Upper Chest', 'Shoulders', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=500&h=400&fit=crop',
    steps: [
      'Place feet on elevated surface, hands on ground',
      'Keep body in straight line from head to heels',
      'Lower chest toward the ground',
      'Push back up to starting position'
    ],
    benefits: ['Targets upper chest', 'Increases difficulty', 'Builds shoulder strength'],
    tips: ['Start with low elevation', 'Keep core engaged', 'Don\'t let hips sag']
  },
  {
    id: 'archer-push-ups',
    name: 'Archer Push-ups',
    category: 'upper-body',
    difficulty: 'advanced',
    duration: '3 sets of 6-8 reps per side',
    equipment: ['None'],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&h=400&fit=crop',
    steps: [
      'Start in wide push-up position',
      'Shift weight to one arm while extending the other',
      'Lower toward the loaded arm',
      'Push back up and alternate sides'
    ],
    benefits: ['Unilateral strength', 'Progression to one-arm push-ups', 'Core stability'],
    tips: ['Keep extended arm straight', 'Control the movement', 'Progress gradually']
  },
  {
    id: 'pike-push-ups',
    name: 'Pike Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-10 reps',
    equipment: ['None'],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop',
    steps: [
      'Start in downward dog position with hips high',
      'Bend elbows and lower head toward the ground',
      'Push back up to starting position',
      'Keep legs as straight as possible'
    ],
    benefits: ['Builds shoulder strength', 'Progression to handstand push-ups', 'No equipment needed'],
    tips: ['Keep hips elevated', 'Look at your feet', 'Control the descent']
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 6-10 reps',
    equipment: ['Barbell', 'Bench', 'Weight plates'],
    targetMuscles: ['Chest', 'Triceps', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=500&h=400&fit=crop',
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
    id: 'incline-bench-press',
    name: 'Incline Barbell Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 8-10 reps',
    equipment: ['Barbell', 'Incline Bench', 'Weight plates'],
    targetMuscles: ['Upper Chest', 'Shoulders', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=500&h=400&fit=crop',
    steps: [
      'Set bench to 30-45 degree incline',
      'Lie back and grip bar slightly wider than shoulders',
      'Unrack and lower bar to upper chest',
      'Press up to full extension'
    ],
    benefits: ['Targets upper chest', 'Builds shoulder strength', 'Balanced chest development'],
    tips: ['Don\'t set incline too steep', 'Keep shoulder blades pinched', 'Control the weight']
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Lie on bench holding dumbbells at chest level',
      'Press dumbbells up until arms are extended',
      'Lower dumbbells with control to chest level',
      'Keep feet flat on the floor'
    ],
    benefits: ['Greater range of motion', 'Unilateral training', 'Builds stabilizer muscles'],
    tips: ['Don\'t let dumbbells drift apart', 'Keep wrists neutral', 'Squeeze chest at top']
  },
  {
    id: 'chest-flyes',
    name: 'Dumbbell Chest Flyes',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Lie on bench holding dumbbells above chest with arms extended',
      'Keep a slight bend in your elbows throughout',
      'Lower weights out to sides in a wide arc',
      'Bring weights back together, squeezing chest'
    ],
    benefits: ['Isolates chest muscles', 'Improves chest definition', 'Increases range of motion'],
    tips: ['Don\'t go too heavy', 'Keep arc motion smooth', 'Maintain elbow bend']
  },
  {
    id: 'cable-crossovers',
    name: 'Cable Crossovers',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine'],
    targetMuscles: ['Chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=500&h=400&fit=crop',
    steps: [
      'Set cables at shoulder height or above',
      'Grab handles and step forward for tension',
      'Bring hands together in front of chest',
      'Slowly return to starting position'
    ],
    benefits: ['Constant tension', 'Great for definition', 'Isolates chest'],
    tips: ['Focus on the squeeze', 'Control the movement', 'Don\'t use excessive weight']
  },
  {
    id: 'chest-dips',
    name: 'Chest Dips',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['Parallel bars', 'Dip station'],
    targetMuscles: ['Lower Chest', 'Triceps', 'Shoulders'],
    image: 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=500&h=400&fit=crop',
    steps: [
      'Grip parallel bars and lift yourself up',
      'Lean forward slightly to target chest',
      'Lower until shoulders are below elbows',
      'Push back up to starting position'
    ],
    benefits: ['Compound movement', 'Builds lower chest', 'Functional strength'],
    tips: ['Lean forward for chest focus', 'Don\'t go too deep if painful', 'Control the descent']
  },

  // BACK EXERCISES
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 5-10 reps',
    equipment: ['Pull-up bar'],
    targetMuscles: ['Latissimus dorsi', 'Biceps', 'Rhomboids', 'Middle trapezius'],
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&h=400&fit=crop',
    steps: [
      'Hang from bar with overhand grip, hands shoulder-width',
      'Pull yourself up until chin clears the bar',
      'Lower with control to full arm extension',
      'Keep core engaged throughout'
    ],
    benefits: ['Builds back width', 'Improves grip strength', 'Functional pulling movement'],
    tips: ['Start with assisted versions if needed', 'Don\'t swing', 'Pull shoulder blades down']
  },
  {
    id: 'chin-ups',
    name: 'Chin-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 6-10 reps',
    equipment: ['Pull-up bar'],
    targetMuscles: ['Biceps', 'Latissimus dorsi', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=400&fit=crop',
    steps: [
      'Hang from bar with underhand grip, hands shoulder-width',
      'Pull up until chin clears the bar',
      'Lower with control',
      'Keep elbows close to body'
    ],
    benefits: ['Bicep emphasis', 'Easier than pull-ups', 'Back development'],
    tips: ['Squeeze biceps at top', 'Control the negative', 'Don\'t use momentum']
  },
  {
    id: 'neutral-grip-pull-ups',
    name: 'Neutral Grip Pull-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 6-10 reps',
    equipment: ['Pull-up bar with neutral grips'],
    targetMuscles: ['Lats', 'Biceps', 'Brachialis', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Grip parallel handles with palms facing each other',
      'Pull up until chin clears the bar',
      'Lower with control',
      'Keep core engaged'
    ],
    benefits: ['Joint-friendly grip', 'Balanced muscle activation', 'Less shoulder stress'],
    tips: ['Great for beginners', 'Keep elbows close', 'Full range of motion']
  },
  {
    id: 'dumbbell-rows',
    name: 'Dumbbell Rows',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 8-12 reps per arm',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Latissimus dorsi', 'Rhomboids', 'Rear deltoids', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=500&h=400&fit=crop',
    steps: [
      'Place one knee and hand on bench',
      'Hold dumbbell in opposite hand',
      'Pull dumbbell to ribcage',
      'Lower with control'
    ],
    benefits: ['Unilateral training', 'Improves posture', 'Core stability'],
    tips: ['Keep back flat', 'Lead with elbow', 'Don\'t rotate torso']
  },
  {
    id: 'barbell-rows',
    name: 'Barbell Bent-Over Rows',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 8-10 reps',
    equipment: ['Barbell', 'Weight plates'],
    targetMuscles: ['Lats', 'Rhomboids', 'Traps', 'Biceps', 'Lower Back'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=400&fit=crop',
    steps: [
      'Hinge forward at hips holding barbell',
      'Keep back flat, knees slightly bent',
      'Pull bar to lower chest/upper abs',
      'Lower with control'
    ],
    benefits: ['Builds thick back', 'Compound movement', 'Improves posture'],
    tips: ['Keep core braced', 'Don\'t round lower back', 'Squeeze shoulder blades']
  },
  {
    id: 't-bar-rows',
    name: 'T-Bar Rows',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 8-10 reps',
    equipment: ['T-bar machine', 'Weight plates'],
    targetMuscles: ['Middle Back', 'Lats', 'Biceps', 'Rear Delts'],
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=500&h=400&fit=crop',
    steps: [
      'Straddle the bar and grip the handles',
      'Bend at hips with flat back',
      'Pull weight to chest',
      'Lower with control'
    ],
    benefits: ['Heavy loading possible', 'Builds back thickness', 'Neutral grip option'],
    tips: ['Keep chest up', 'Don\'t use momentum', 'Full range of motion']
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Cable machine', 'Lat pulldown bar'],
    targetMuscles: ['Latissimus dorsi', 'Rhomboids', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=500&h=400&fit=crop',
    steps: [
      'Sit at machine with thighs secured',
      'Grip bar with wide overhand grip',
      'Pull bar to upper chest',
      'Slowly return to start'
    ],
    benefits: ['Builds back width', 'Good pull-up alternative', 'Adjustable resistance'],
    tips: ['Don\'t pull behind neck', 'Lean back slightly', 'Focus on lats']
  },
  {
    id: 'close-grip-pulldowns',
    name: 'Close Grip Lat Pulldowns',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Cable machine', 'V-bar attachment'],
    targetMuscles: ['Lats', 'Biceps', 'Middle Back'],
    image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=500&h=400&fit=crop',
    steps: [
      'Attach V-bar to cable machine',
      'Sit and grip the handles',
      'Pull to upper chest',
      'Control the return'
    ],
    benefits: ['Greater range of motion', 'Bicep involvement', 'Lower lat emphasis'],
    tips: ['Keep elbows close', 'Squeeze at bottom', 'Don\'t lean back too far']
  },
  {
    id: 'seated-cable-rows',
    name: 'Seated Cable Rows',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Cable machine', 'V-bar or straight bar'],
    targetMuscles: ['Middle Back', 'Lats', 'Biceps', 'Rear Delts'],
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=500&h=400&fit=crop',
    steps: [
      'Sit with feet on platform, knees slightly bent',
      'Grab handle with arms extended',
      'Pull to lower chest',
      'Return with control'
    ],
    benefits: ['Constant tension', 'Safe for beginners', 'Great for back thickness'],
    tips: ['Don\'t round your back', 'Squeeze shoulder blades', 'Keep chest up']
  },
  {
    id: 'face-pulls',
    name: 'Cable Face Pulls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine', 'Rope attachment'],
    targetMuscles: ['Rear deltoids', 'Rhomboids', 'Middle trapezius'],
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&h=400&fit=crop',
    steps: [
      'Set cable at face height with rope',
      'Pull rope toward face, separating hands',
      'Squeeze shoulder blades together',
      'Return with control'
    ],
    benefits: ['Improves posture', 'Balances pressing movements', 'Shoulder health'],
    tips: ['Keep elbows high', 'Don\'t use too much weight', 'Focus on external rotation']
  },
  {
    id: 'inverted-rows',
    name: 'Inverted Rows',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['Barbell on rack', 'Smith machine', 'TRX straps'],
    targetMuscles: ['Upper Back', 'Biceps', 'Rear Delts', 'Core'],
    image: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?w=500&h=400&fit=crop',
    steps: [
      'Set bar at waist height',
      'Hang underneath with arms extended',
      'Pull chest to bar',
      'Lower with control'
    ],
    benefits: ['Pull-up progression', 'Core activation', 'Adjustable difficulty'],
    tips: ['Keep body straight', 'Adjust bar height for difficulty', 'Squeeze at top']
  },
  {
    id: 'straight-arm-pulldowns',
    name: 'Straight Arm Pulldowns',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine', 'Straight bar'],
    targetMuscles: ['Lats', 'Teres Major', 'Triceps Long Head'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop',
    steps: [
      'Stand facing high pulley',
      'Grip bar with arms extended',
      'Pull bar down to thighs keeping arms straight',
      'Return slowly to start'
    ],
    benefits: ['Isolates lats', 'Mind-muscle connection', 'Pre-exhaust exercise'],
    tips: ['Keep slight elbow bend', 'Don\'t swing', 'Focus on lat contraction']
  },

  // SHOULDER EXERCISES
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '4 sets of 6-8 reps',
    equipment: ['Barbell', 'Weight plates'],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper chest', 'Core'],
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=500&h=400&fit=crop',
    steps: [
      'Stand with bar at shoulder level',
      'Press bar straight overhead',
      'Lock out arms at top',
      'Lower with control'
    ],
    benefits: ['Builds shoulder strength', 'Core stability', 'Functional pressing'],
    tips: ['Keep core tight', 'Don\'t arch back excessively', 'Press in straight line']
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Shoulders', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Hold dumbbells at shoulder height',
      'Press dumbbells overhead',
      'Touch dumbbells at top',
      'Lower with control'
    ],
    benefits: ['Unilateral training', 'Greater range of motion', 'Shoulder development'],
    tips: ['Don\'t lock elbows aggressively', 'Keep core engaged', 'Control the weight']
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['All three deltoid heads', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Start with dumbbells at shoulders, palms facing you',
      'Rotate wrists as you press up',
      'At top, palms face forward',
      'Reverse the motion on the way down'
    ],
    benefits: ['Full shoulder development', 'Rotational strength', 'Named after Arnold!'],
    tips: ['Smooth rotation', 'Don\'t rush the movement', 'Control throughout']
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Shoulder Raises',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Deltoids', 'Trapezius'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until shoulder height',
      'Pause briefly at top',
      'Lower with control'
    ],
    benefits: ['Builds shoulder width', 'Isolation exercise', 'Defines deltoids'],
    tips: ['Don\'t lift above shoulder height', 'Lead with elbows', 'Use controlled tempo']
  },
  {
    id: 'front-raises',
    name: 'Front Raises',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Front Deltoids', 'Upper Chest'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Stand holding dumbbells in front of thighs',
      'Raise one or both arms to shoulder height',
      'Keep arms straight or slight bend',
      'Lower with control'
    ],
    benefits: ['Front delt isolation', 'Simple technique', 'Shoulder definition'],
    tips: ['Don\'t swing', 'Stop at shoulder height', 'Alternate arms to reduce fatigue']
  },
  {
    id: 'rear-delt-flyes',
    name: 'Rear Delt Flyes',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Rear Deltoids', 'Rhomboids', 'Traps'],
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=500&h=400&fit=crop',
    steps: [
      'Bend forward at hips, back flat',
      'Hold dumbbells below chest',
      'Raise arms out to sides',
      'Lower with control'
    ],
    benefits: ['Targets rear delts', 'Improves posture', 'Balances shoulders'],
    tips: ['Keep slight bend in elbows', 'Don\'t use momentum', 'Squeeze at top']
  },
  {
    id: 'upright-rows',
    name: 'Upright Rows',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Barbell', 'Dumbbells', 'Cable'],
    targetMuscles: ['Shoulders', 'Upper Traps', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=400&fit=crop',
    steps: [
      'Hold weight with narrow grip in front of thighs',
      'Pull weight up to chest level',
      'Lead with elbows, keep weight close to body',
      'Lower with control'
    ],
    benefits: ['Shoulder and trap development', 'Compound movement', 'Upper body strength'],
    tips: ['Use wider grip if shoulders hurt', 'Don\'t pull too high', 'Keep core tight']
  },
  {
    id: 'shrugs',
    name: 'Dumbbell Shrugs',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Dumbbells', 'Barbell'],
    targetMuscles: ['Upper Trapezius', 'Levator Scapulae'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Stand holding weights at sides',
      'Shrug shoulders up toward ears',
      'Hold briefly at top',
      'Lower with control'
    ],
    benefits: ['Builds traps', 'Simple movement', 'Heavy loading possible'],
    tips: ['Don\'t roll shoulders', 'Keep arms straight', 'Full range of motion']
  },

  // TRICEP EXERCISES
  {
    id: 'dips',
    name: 'Parallel Bar Dips',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-12 reps',
    equipment: ['Parallel bars', 'Dip station'],
    targetMuscles: ['Triceps', 'Lower chest', 'Front deltoids'],
    image: 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=500&h=400&fit=crop',
    steps: [
      'Grip bars and support body weight',
      'Keep body upright for tricep focus',
      'Lower until shoulders below elbows',
      'Push back up to start'
    ],
    benefits: ['Compound pushing', 'Builds arm mass', 'Functional strength'],
    tips: ['Stay upright for triceps', 'Don\'t go too deep', 'Use assistance if needed']
  },
  {
    id: 'tricep-extensions',
    name: 'Overhead Tricep Extensions',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbell'],
    targetMuscles: ['Triceps'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Hold dumbbell with both hands above head',
      'Lower weight behind head',
      'Keep elbows close to ears',
      'Extend arms back to start'
    ],
    benefits: ['Long head emphasis', 'Arm definition', 'Simple exercise'],
    tips: ['Keep elbows stationary', 'Don\'t flare elbows', 'Control the weight']
  },
  {
    id: 'tricep-pushdowns',
    name: 'Cable Tricep Pushdowns',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine', 'Straight bar or rope'],
    targetMuscles: ['Triceps'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop',
    steps: [
      'Stand facing cable machine',
      'Grip bar with overhand grip',
      'Push bar down until arms straight',
      'Return with control'
    ],
    benefits: ['Constant tension', 'Easy to learn', 'Tricep isolation'],
    tips: ['Keep elbows at sides', 'Don\'t lean forward', 'Squeeze at bottom']
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['EZ bar', 'Dumbbells', 'Bench'],
    targetMuscles: ['Triceps'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Lie on bench holding weight above chest',
      'Lower weight toward forehead',
      'Keep upper arms stationary',
      'Extend arms back to start'
    ],
    benefits: ['Long head stretch', 'Builds arm mass', 'Heavy loading possible'],
    tips: ['Keep elbows in', 'Control the descent', 'Don\'t hit your head!']
  },
  {
    id: 'close-grip-bench',
    name: 'Close Grip Bench Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-10 reps',
    equipment: ['Barbell', 'Bench'],
    targetMuscles: ['Triceps', 'Chest', 'Front Delts'],
    image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=500&h=400&fit=crop',
    steps: [
      'Lie on bench with narrow grip on bar',
      'Lower bar to lower chest',
      'Keep elbows close to body',
      'Press back up'
    ],
    benefits: ['Heavy tricep loading', 'Compound movement', 'Builds pressing strength'],
    tips: ['Hands shoulder-width apart', 'Keep elbows tucked', 'Control the weight']
  },
  {
    id: 'tricep-kickbacks',
    name: 'Tricep Kickbacks',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps per arm',
    equipment: ['Dumbbells'],
    targetMuscles: ['Triceps'],
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=500&h=400&fit=crop',
    steps: [
      'Bend forward with one hand on bench',
      'Hold dumbbell with upper arm parallel to floor',
      'Extend arm back until straight',
      'Return with control'
    ],
    benefits: ['Peak contraction', 'Isolation exercise', 'Mind-muscle connection'],
    tips: ['Keep upper arm still', 'Squeeze at top', 'Don\'t swing the weight']
  },

  // BICEP EXERCISES
  {
    id: 'bicep-curls',
    name: 'Dumbbell Bicep Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-15 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Biceps', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Stand with dumbbells at sides',
      'Curl weights up by flexing biceps',
      'Squeeze at top',
      'Lower with control'
    ],
    benefits: ['Builds arm strength', 'Simple technique', 'Foundational exercise'],
    tips: ['Don\'t swing', 'Keep elbows stationary', 'Control both phases']
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Hold dumbbells with neutral grip (palms facing in)',
      'Curl weights up maintaining neutral grip',
      'Squeeze at top',
      'Lower with control'
    ],
    benefits: ['Forearm development', 'Brachialis targeting', 'Grip strength'],
    tips: ['Keep wrists neutral', 'Don\'t swing', 'Control the movement']
  },
  {
    id: 'barbell-curls',
    name: 'Barbell Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Barbell', 'EZ bar'],
    targetMuscles: ['Biceps'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    steps: [
      'Stand holding barbell with underhand grip',
      'Curl bar up to shoulder level',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    benefits: ['Heavy loading', 'Bilateral training', 'Mass builder'],
    tips: ['Keep elbows stationary', 'Don\'t use back', 'Full range of motion']
  },
  {
    id: 'preacher-curls',
    name: 'Preacher Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps',
    equipment: ['Preacher bench', 'EZ bar', 'Dumbbells'],
    targetMuscles: ['Biceps', 'Brachialis'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Sit at preacher bench with arms on pad',
      'Curl weight up toward shoulders',
      'Squeeze at top',
      'Lower with full extension'
    ],
    benefits: ['Eliminates cheating', 'Peak contraction', 'Isolated movement'],
    tips: ['Don\'t fully extend at bottom', 'Control the negative', 'Keep arms on pad']
  },
  {
    id: 'concentration-curls',
    name: 'Concentration Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 10-12 reps per arm',
    equipment: ['Dumbbell'],
    targetMuscles: ['Biceps Peak'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Sit with elbow braced against inner thigh',
      'Curl dumbbell toward shoulder',
      'Squeeze hard at top',
      'Lower with control'
    ],
    benefits: ['Maximum isolation', 'Peak development', 'Mind-muscle connection'],
    tips: ['Keep upper arm still', 'Focus on the squeeze', 'Slow tempo']
  },
  {
    id: 'incline-curls',
    name: 'Incline Dumbbell Curls',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells', 'Incline bench'],
    targetMuscles: ['Biceps Long Head'],
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&h=400&fit=crop',
    steps: [
      'Sit on incline bench with arms hanging',
      'Curl dumbbells up toward shoulders',
      'Squeeze at top',
      'Lower with full stretch'
    ],
    benefits: ['Long head stretch', 'Peak development', 'Full range of motion'],
    tips: ['Keep elbows back', 'Don\'t swing', 'Control the stretch']
  },
  {
    id: 'cable-curls',
    name: 'Cable Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Cable machine', 'Straight bar or EZ bar'],
    targetMuscles: ['Biceps'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop',
    steps: [
      'Stand facing low pulley',
      'Grip bar with underhand grip',
      'Curl bar toward shoulders',
      'Lower with control'
    ],
    benefits: ['Constant tension', 'Easy to adjust weight', 'Smooth resistance'],
    tips: ['Keep elbows at sides', 'Don\'t lean back', 'Squeeze at top']
  },
  {
    id: 'reverse-curls',
    name: 'Reverse Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 12-15 reps',
    equipment: ['Barbell', 'EZ bar'],
    targetMuscles: ['Brachioradialis', 'Forearms', 'Biceps'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Hold bar with overhand grip',
      'Curl bar up toward shoulders',
      'Keep wrists straight',
      'Lower with control'
    ],
    benefits: ['Forearm development', 'Grip strength', 'Arm balance'],
    tips: ['Use lighter weight', 'Keep wrists stable', 'Control the movement']
  },
  {
    id: 'zottman-curls',
    name: 'Zottman Curls',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 10-12 reps',
    equipment: ['Dumbbells'],
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop',
    steps: [
      'Curl dumbbells up with palms up',
      'At top, rotate wrists to palms down',
      'Lower with pronated grip',
      'Rotate back at bottom and repeat'
    ],
    benefits: ['Complete arm development', 'Forearm strength', 'Unique stimulus'],
    tips: ['Control the rotation', 'Don\'t rush', 'Focus on both phases']
  },
  {
    id: 'incline-press',
    name: 'Incline Dumbbell Press',
    category: 'upper-body',
    difficulty: 'intermediate',
    duration: '3 sets of 8-10 reps',
    equipment: ['Dumbbells', 'Incline bench'],
    targetMuscles: ['Upper chest', 'Front deltoids', 'Triceps'],
    image: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=500&h=400&fit=crop',
    steps: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at chest level with palms facing forward',
      'Press weights up and slightly forward',
      'Lower with control'
    ],
    benefits: ['Targets upper chest', 'Builds pressing strength', 'Improves shoulder stability'],
    tips: ['Don\'t set incline too steep', 'Keep back against bench', 'Control the descent']
  },
  {
    id: 'wrist-curls',
    name: 'Wrist Curls',
    category: 'upper-body',
    difficulty: 'beginner',
    duration: '3 sets of 15-20 reps',
    equipment: ['Dumbbells', 'Barbell'],
    targetMuscles: ['Forearm Flexors'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=400&fit=crop',
    steps: [
      'Rest forearms on thighs, wrists over knees',
      'Hold weight with palms up',
      'Curl wrists up',
      'Lower with control'
    ],
    benefits: ['Forearm development', 'Grip strength', 'Injury prevention'],
    tips: ['Use full range of motion', 'Control the weight', 'Don\'t rush']
  }
];
