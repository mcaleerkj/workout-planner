export type ExerciseDefinition = {
  id: string;
  name: string;
  defaultSets: number;
  defaultReps: string;
  rpe?: string;
  rest?: string;
  notes?: string;
  primaryMuscleGroup?: string;
  equipment?: string;
};

export type ExerciseLog = {
  date: string; // ISO date
  weights: number[]; // one entry per set, in pounds/kg
  rpe?: number; // actual RPE achieved
  notes?: string;
};

export type WeightHistory = {
  [exerciseId: string]: ExerciseLog[];
};

export const exerciseLibrary: Record<string, ExerciseDefinition> = {
  "back-squat": {
    id: "back-squat",
    name: "Back Squat",
    defaultSets: 3,
    defaultReps: "6",
    rpe: "RPE 7",
    rest: "3-4 min",
    notes: "Focus on depth and control",
    primaryMuscleGroup: "Legs",
    equipment: "Barbell"
  },
  "barbell-bench-press": {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    defaultSets: 3,
    defaultReps: "8",
    rpe: "RPE 7",
    rest: "3-4 min",
    notes: "Control the descent, explosive press",
    primaryMuscleGroup: "Chest",
    equipment: "Barbell"
  },
  "lat-pulldown": {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Pull to chest, squeeze shoulder blades",
    primaryMuscleGroup: "Back",
    equipment: "Cable Machine"
  },
  "romanian-deadlift": {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 7",
    rest: "1-2 min",
    notes: "Hinge at hips, feel hamstring stretch",
    primaryMuscleGroup: "Hamstrings",
    equipment: "Barbell"
  },
  "assisted-dip": {
    id: "assisted-dip",
    name: "Assisted Dip",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 7",
    rest: "1-2 min",
    notes: "Lean forward slightly for chest activation",
    primaryMuscleGroup: "Triceps",
    equipment: "Dip Station"
  },
  "standing-calf-raise": {
    id: "standing-calf-raise",
    name: "Standing Calf Raise",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Full range of motion, pause at top",
    primaryMuscleGroup: "Calves",
    equipment: "Machine"
  },
  "dumbbell-supinated-curl": {
    id: "dumbbell-supinated-curl",
    name: "Dumbbell Supinated Curl",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Control the negative, squeeze at top",
    primaryMuscleGroup: "Biceps",
    equipment: "Dumbbells"
  },
  "deadlift": {
    id: "deadlift",
    name: "Deadlift",
    defaultSets: 3,
    defaultReps: "5",
    rpe: "RPE 7",
    rest: "3-4 min",
    notes: "Keep bar close to body, strong lockout",
    primaryMuscleGroup: "Posterior Chain",
    equipment: "Barbell"
  },
  "military-press": {
    id: "military-press",
    name: "Military Press",
    defaultSets: 3,
    defaultReps: "8",
    rpe: "RPE 8",
    rest: "3-4 min",
    notes: "Strict form, core tight throughout",
    primaryMuscleGroup: "Shoulders",
    equipment: "Barbell"
  },
  "chest-supported-t-bar-row": {
    id: "chest-supported-t-bar-row",
    name: "Chest Supported T-Bar Row",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Squeeze shoulder blades, control weight",
    primaryMuscleGroup: "Back",
    equipment: "T-Bar Row"
  },
  "leg-extension": {
    id: "leg-extension",
    name: "Leg Extension",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Full range of motion, squeeze at top",
    primaryMuscleGroup: "Quadriceps",
    equipment: "Machine"
  },
  "cable-flye": {
    id: "cable-flye",
    name: "Cable Flye",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Focus on chest stretch and squeeze",
    primaryMuscleGroup: "Chest",
    equipment: "Cable Machine"
  },
  "crunch": {
    id: "crunch",
    name: "Crunch",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 7",
    rest: "1-2 min",
    notes: "Control the movement, focus on abs",
    primaryMuscleGroup: "Abs",
    equipment: "Bodyweight"
  },
  "dumbbell-skull-crusher": {
    id: "dumbbell-skull-crusher",
    name: "Dumbbell Skull Crusher",
    defaultSets: 2,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Keep elbows stable, control the weight",
    primaryMuscleGroup: "Triceps",
    equipment: "Dumbbells"
  },
  "dumbbell-walking-lunge": {
    id: "dumbbell-walking-lunge",
    name: "Dumbbell Walking Lunge",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Step forward, control the descent",
    primaryMuscleGroup: "Legs",
    equipment: "Dumbbells"
  },
  "dumbbell-incline-press": {
    id: "dumbbell-incline-press",
    name: "Dumbbell Incline Press",
    defaultSets: 3,
    defaultReps: "8",
    rpe: "RPE 7",
    rest: "2-3 min",
    notes: "45-degree angle, full range of motion",
    primaryMuscleGroup: "Chest",
    equipment: "Dumbbells"
  },
  "reverse-grip-lat-pulldown": {
    id: "reverse-grip-lat-pulldown",
    name: "Reverse Grip Lat Pulldown",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Underhand grip, pull to upper chest",
    primaryMuscleGroup: "Back",
    equipment: "Cable Machine"
  },
  "seated-face-pull": {
    id: "seated-face-pull",
    name: "Seated Face Pull",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Pull to face level, squeeze rear delts",
    primaryMuscleGroup: "Rear Delts",
    equipment: "Cable Machine"
  },
  "dumbbell-lateral-raise": {
    id: "dumbbell-lateral-raise",
    name: "Dumbbell Lateral Raise",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Raise to shoulder height, control descent",
    primaryMuscleGroup: "Shoulders",
    equipment: "Dumbbells"
  },
  "lying-leg-curl": {
    id: "lying-leg-curl",
    name: "Lying Leg Curl",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Full range of motion, squeeze hamstrings",
    primaryMuscleGroup: "Hamstrings",
    equipment: "Machine"
  },
  "dumbbell-seated-shoulder-press": {
    id: "dumbbell-seated-shoulder-press",
    name: "Dumbbell Seated Shoulder Press",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 8",
    rest: "3-4 min",
    notes: "Full range of motion, controlled descent",
    primaryMuscleGroup: "Shoulders",
    equipment: "Dumbbells"
  },
  "single-arm-pulldown": {
    id: "single-arm-pulldown",
    name: "Single-Arm Pulldown",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 9",
    rest: "2-3 min",
    notes: "Focus on lat contraction, alternate arms",
    primaryMuscleGroup: "Lats",
    equipment: "Cable Machine"
  },
  "barbell-hip-thrust": {
    id: "barbell-hip-thrust",
    name: "Barbell Hip Thrust",
    defaultSets: 3,
    defaultReps: "8",
    rpe: "RPE 9",
    rest: "2-3 min",
    notes: "Pause at top, squeeze glutes hard",
    primaryMuscleGroup: "Glutes",
    equipment: "Barbell"
  },
  "pec-deck": {
    id: "pec-deck",
    name: "Pec Deck",
    defaultSets: 3,
    defaultReps: "15",
    rpe: "RPE 9",
    rest: "1-2 min",
    notes: "Focus on stretch and squeeze",
    primaryMuscleGroup: "Chest",
    equipment: "Machine"
  },
  "reverse-pec-deck": {
    id: "reverse-pec-deck",
    name: "Reverse Pec Deck",
    defaultSets: 3,
    defaultReps: "15",
    rpe: "RPE 9",
    rest: "1-2 min",
    notes: "Target rear delts, control the movement",
    primaryMuscleGroup: "Rear Delts",
    equipment: "Machine"
  },
  "cable-lateral-raise": {
    id: "cable-lateral-raise",
    name: "Cable Lateral Raise",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 9",
    rest: "1-2 min",
    notes: "Constant tension, control the weight",
    primaryMuscleGroup: "Shoulders",
    equipment: "Cable Machine"
  },
  "close-grip-bench-press": {
    id: "close-grip-bench-press",
    name: "Close-Grip Bench Press",
    defaultSets: 3,
    defaultReps: "5",
    rpe: "RPE 7",
    rest: "3-4 min",
    notes: "Target triceps, narrow grip",
    primaryMuscleGroup: "Triceps",
    equipment: "Barbell"
  },
  "dumbbell-row": {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Single arm or bent over, squeeze shoulder blades",
    primaryMuscleGroup: "Back",
    equipment: "Dumbbells"
  },
  "bicycle-crunch": {
    id: "bicycle-crunch",
    name: "Bicycle Crunch",
    defaultSets: 3,
    defaultReps: "10",
    rpe: "RPE 7",
    rest: "1-2 min",
    notes: "Slow and controlled, alternate sides",
    primaryMuscleGroup: "Abs",
    equipment: "Bodyweight"
  },
  "single-arm-cable-curl": {
    id: "single-arm-cable-curl",
    name: "Single-Arm Cable Curl",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "Focus on peak contraction",
    primaryMuscleGroup: "Biceps",
    equipment: "Cable Machine"
  },
  "neutral-grip-pulldown": {
    id: "neutral-grip-pulldown",
    name: "Neutral-Grip Pulldown",
    defaultSets: 3,
    defaultReps: "15",
    rpe: "RPE 8",
    rest: "2-3 min",
    notes: "Higher reps, squeeze at bottom",
    primaryMuscleGroup: "Back",
    equipment: "Cable Machine"
  },
  "single-arm-tricep-rope-extension": {
    id: "single-arm-tricep-rope-extension",
    name: "Single-Arm Tricep Rope Extension",
    defaultSets: 3,
    defaultReps: "12",
    rpe: "RPE 8",
    rest: "1-2 min",
    notes: "One arm at a time, full extension",
    primaryMuscleGroup: "Triceps",
    equipment: "Cable Machine"
  }
};

// Helper functions
export const getExerciseById = (id: string): ExerciseDefinition | undefined => {
  return exerciseLibrary[id];
};

export const getAllExercises = (): ExerciseDefinition[] => {
  return Object.values(exerciseLibrary);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): ExerciseDefinition[] => {
  return Object.values(exerciseLibrary).filter(
    exercise => exercise.primaryMuscleGroup === muscleGroup
  );
};