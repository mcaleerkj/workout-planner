export type ProgramExercise = {
  exerciseId: string; // References exerciseLibrary
  overrideSets?: number;
  overrideReps?: string;
  overrideRpe?: string;
  overrideRest?: string;
  overrideNotes?: string;
  id: string; // Unique ID for this instance in the program
};

// Legacy type for backward compatibility during transition
export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rpe: string;
  rest: string;
  notes?: string;
};

export type WorkoutDay = {
  id: string; // e.g. "week1-day1"
  label: string; // e.g. "Day 1"
  focus?: string;
  exercises: Exercise[];
};

export type ProgramWeek = {
  id: string; // e.g. "week1"
  label: string; // "Week 1"
  days: WorkoutDay[];
};

export const programWeeks: ProgramWeek[] = [
  {
    id: "week1",
    label: "Week 1",
    days: [
      {
        id: "week1-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex1-1",
            name: "Back Squat",
            sets: 3,
            reps: "6",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Focus on depth and control"
          },
          {
            id: "ex1-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Control the descent, explosive press"
          },
          {
            id: "ex1-3",
            name: "Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Pull to chest, squeeze shoulder blades"
          },
          {
            id: "ex1-4",
            name: "Romanian Deadlift",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Hinge at hips, feel hamstring stretch"
          },
          {
            id: "ex1-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Lean forward slightly for chest activation"
          },
          {
            id: "ex1-6",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, pause at top"
          },
          {
            id: "ex1-7",
            name: "Dumbbell Supinated Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Control the negative, squeeze at top"
          }
        ]
      },
      {
        id: "week1-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex2-1",
            name: "Deadlift",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Keep bar close to body, strong lockout"
          },
          {
            id: "ex2-2",
            name: "Military Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Strict form, core tight throughout"
          },
          {
            id: "ex2-3",
            name: "Chest Supported T-Bar Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Squeeze shoulder blades, control weight"
          },
          {
            id: "ex2-4",
            name: "Leg Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze at top"
          },
          {
            id: "ex2-5",
            name: "Cable Flye",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on chest stretch and squeeze"
          },
          {
            id: "ex2-6",
            name: "Crunch",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Control the movement, focus on abs"
          },
          {
            id: "ex2-7",
            name: "Dumbbell Skull Crusher",
            sets: 2,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Keep elbows stable, control the weight"
          }
        ]
      },
      {
        id: "week1-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex3-1",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Step forward, control the descent"
          },
          {
            id: "ex3-2",
            name: "Dumbbell Incline Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "2-3 min",
            notes: "45-degree angle, full range of motion"
          },
          {
            id: "ex3-3",
            name: "Reverse Grip Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Underhand grip, pull to upper chest"
          },
          {
            id: "ex3-4",
            name: "Seated Face Pull",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pull to face level, squeeze rear delts"
          },
          {
            id: "ex3-5",
            name: "Dumbbell Lateral Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Raise to shoulder height, control descent"
          },
          {
            id: "ex3-6",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze hamstrings"
          }
        ]
      }
    ]
  },
  {
    id: "week2",
    label: "Week 2",
    days: [
      {
        id: "week2-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex2-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "6",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Focus on depth and control"
          },
          {
            id: "ex2-1-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Control the descent, explosive press"
          },
          {
            id: "ex2-1-3",
            name: "Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Pull to chest, squeeze shoulder blades"
          },
          {
            id: "ex2-1-4",
            name: "Romanian Deadlift",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Hinge at hips, feel hamstring stretch"
          },
          {
            id: "ex2-1-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Lean forward slightly for chest activation"
          },
          {
            id: "ex2-1-6",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, pause at top"
          },
          {
            id: "ex2-1-7",
            name: "Dumbbell Supinated Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Control the negative, squeeze at top"
          }
        ]
      },
      {
        id: "week2-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex2-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Keep bar close to body, strong lockout"
          },
          {
            id: "ex2-2-2",
            name: "Military Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Strict form, core tight throughout"
          },
          {
            id: "ex2-2-3",
            name: "Chest Supported T-Bar Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Squeeze shoulder blades, control weight"
          },
          {
            id: "ex2-2-4",
            name: "Leg Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze at top"
          },
          {
            id: "ex2-2-5",
            name: "Cable Flye",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on chest stretch and squeeze"
          },
          {
            id: "ex2-2-6",
            name: "Crunch",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Control the movement, focus on abs"
          },
          {
            id: "ex2-2-7",
            name: "Dumbbell Skull Crusher",
            sets: 2,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Keep elbows stable, control the weight"
          }
        ]
      },
      {
        id: "week2-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex2-3-1",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Step forward, control the descent"
          },
          {
            id: "ex2-3-2",
            name: "Dumbbell Incline Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "2-3 min",
            notes: "45-degree angle, full range of motion"
          },
          {
            id: "ex2-3-3",
            name: "Reverse Grip Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Underhand grip, pull to upper chest"
          },
          {
            id: "ex2-3-4",
            name: "Seated Face Pull",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pull to face level, squeeze rear delts"
          },
          {
            id: "ex2-3-5",
            name: "Dumbbell Lateral Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Raise to shoulder height, control descent"
          },
          {
            id: "ex2-3-6",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze hamstrings"
          }
        ]
      }
    ]
  },
  {
    id: "week3",
    label: "Week 3",
    days: [
      {
        id: "week3-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex3-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "6",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Focus on depth and control"
          },
          {
            id: "ex3-1-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Control the descent, explosive press"
          },
          {
            id: "ex3-1-3",
            name: "Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Pull to chest, squeeze shoulder blades"
          },
          {
            id: "ex3-1-4",
            name: "Romanian Deadlift",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Hinge at hips, feel hamstring stretch"
          },
          {
            id: "ex3-1-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Lean forward slightly for chest activation"
          },
          {
            id: "ex3-1-6",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, pause at top"
          },
          {
            id: "ex3-1-7",
            name: "Dumbbell Supinated Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Control the negative, squeeze at top"
          }
        ]
      },
      {
        id: "week3-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex3-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Keep bar close to body, strong lockout"
          },
          {
            id: "ex3-2-2",
            name: "Military Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Strict form, core tight throughout"
          },
          {
            id: "ex3-2-3",
            name: "Chest Supported T-Bar Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Squeeze shoulder blades, control weight"
          },
          {
            id: "ex3-2-4",
            name: "Leg Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze at top"
          },
          {
            id: "ex3-2-5",
            name: "Cable Flye",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on chest stretch and squeeze"
          },
          {
            id: "ex3-2-6",
            name: "Crunch",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Control the movement, focus on abs"
          },
          {
            id: "ex3-2-7",
            name: "Dumbbell Skull Crusher",
            sets: 2,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Keep elbows stable, control the weight"
          }
        ]
      },
      {
        id: "week3-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex3-3-1",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Step forward, control the descent"
          },
          {
            id: "ex3-3-2",
            name: "Dumbbell Incline Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "2-3 min",
            notes: "45-degree angle, full range of motion"
          },
          {
            id: "ex3-3-3",
            name: "Reverse Grip Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Underhand grip, pull to upper chest"
          },
          {
            id: "ex3-3-4",
            name: "Seated Face Pull",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pull to face level, squeeze rear delts"
          },
          {
            id: "ex3-3-5",
            name: "Dumbbell Lateral Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Raise to shoulder height, control descent"
          },
          {
            id: "ex3-3-6",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze hamstrings"
          }
        ]
      }
    ]
  },
  {
    id: "week4",
    label: "Week 4",
    days: [
      {
        id: "week4-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex4-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "6",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Focus on depth and control"
          },
          {
            id: "ex4-1-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Control the descent, explosive press"
          },
          {
            id: "ex4-1-3",
            name: "Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Pull to chest, squeeze shoulder blades"
          },
          {
            id: "ex4-1-4",
            name: "Romanian Deadlift",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Hinge at hips, feel hamstring stretch"
          },
          {
            id: "ex4-1-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Lean forward slightly for chest activation"
          },
          {
            id: "ex4-1-6",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, pause at top"
          },
          {
            id: "ex4-1-7",
            name: "Dumbbell Supinated Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Control the negative, squeeze at top"
          }
        ]
      },
      {
        id: "week4-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex4-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Keep bar close to body, strong lockout"
          },
          {
            id: "ex4-2-2",
            name: "Military Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Strict form, core tight throughout"
          },
          {
            id: "ex4-2-3",
            name: "Chest Supported T-Bar Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Squeeze shoulder blades, control weight"
          },
          {
            id: "ex4-2-4",
            name: "Leg Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze at top"
          },
          {
            id: "ex4-2-5",
            name: "Cable Flye",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on chest stretch and squeeze"
          },
          {
            id: "ex4-2-6",
            name: "Crunch",
            sets: 3,
            reps: "12",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Control the movement, focus on abs"
          },
          {
            id: "ex4-2-7",
            name: "Dumbbell Skull Crusher",
            sets: 2,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Keep elbows stable, control the weight"
          }
        ]
      },
      {
        id: "week4-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex4-3-1",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Step forward, control the descent"
          },
          {
            id: "ex4-3-2",
            name: "Dumbbell Incline Press",
            sets: 3,
            reps: "8",
            rpe: "RPE 7",
            rest: "2-3 min",
            notes: "45-degree angle, full range of motion"
          },
          {
            id: "ex4-3-3",
            name: "Reverse Grip Lat Pulldown",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Underhand grip, pull to upper chest"
          },
          {
            id: "ex4-3-4",
            name: "Seated Face Pull",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pull to face level, squeeze rear delts"
          },
          {
            id: "ex4-3-5",
            name: "Dumbbell Lateral Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Raise to shoulder height, control descent"
          },
          {
            id: "ex4-3-6",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Full range of motion, squeeze hamstrings"
          }
        ]
      }
    ]
  },
  {
    id: "week5",
    label: "Week 5",
    days: [
      {
        id: "week5-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex5-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Increased volume - focus on form"
          },
          {
            id: "ex5-1-2",
            name: "Dumbbell Seated Shoulder Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Full range of motion, controlled descent"
          },
          {
            id: "ex5-1-3",
            name: "Single-Arm Pulldown",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Focus on lat contraction, alternate arms"
          },
          {
            id: "ex5-1-4",
            name: "Barbell Hip Thrust",
            sets: 3,
            reps: "8",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Pause at top, squeeze glutes hard"
          },
          {
            id: "ex5-1-5",
            name: "Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Focus on stretch and squeeze"
          },
          {
            id: "ex5-1-6",
            name: "Reverse Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Target rear delts, control the movement"
          },
          {
            id: "ex5-1-7",
            name: "Cable Lateral Raise",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Constant tension, control the weight"
          }
        ]
      },
      {
        id: "week5-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex5-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "3",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Heavy triples - focus on technique"
          },
          {
            id: "ex5-2-2",
            name: "Close-Grip Bench Press",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Target triceps, narrow grip"
          },
          {
            id: "ex5-2-3",
            name: "Dumbbell Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Single arm or bent over, squeeze shoulder blades"
          },
          {
            id: "ex5-2-4",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Controlled tempo, full range of motion"
          },
          {
            id: "ex5-2-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Lean forward for chest emphasis"
          },
          {
            id: "ex5-2-6",
            name: "Bicycle Crunch",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Slow and controlled, alternate sides"
          },
          {
            id: "ex5-2-7",
            name: "Single-Arm Cable Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on peak contraction"
          }
        ]
      },
      {
        id: "week5-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex5-3-1",
            name: "Back Squat",
            sets: 3,
            reps: "5",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Heavy fives - maintain depth"
          },
          {
            id: "ex5-3-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher volume day, focus on tempo"
          },
          {
            id: "ex5-3-3",
            name: "Neutral-Grip Pulldown",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher reps, squeeze at bottom"
          },
          {
            id: "ex5-3-4",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Full range of motion, squeeze hamstrings"
          },
          {
            id: "ex5-3-5",
            name: "Seated Face Pull",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "High reps, focus on rear delts"
          },
          {
            id: "ex5-3-6",
            name: "Single-Arm Tricep Rope Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "One arm at a time, full extension"
          },
          {
            id: "ex5-3-7",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pause at top, control the descent"
          }
        ]
      }
    ]
  },
  {
    id: "week6",
    label: "Week 6",
    days: [
      {
        id: "week6-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex6-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Increased volume - focus on form"
          },
          {
            id: "ex6-1-2",
            name: "Dumbbell Seated Shoulder Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Full range of motion, controlled descent"
          },
          {
            id: "ex6-1-3",
            name: "Single-Arm Pulldown",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Focus on lat contraction, alternate arms"
          },
          {
            id: "ex6-1-4",
            name: "Barbell Hip Thrust",
            sets: 3,
            reps: "8",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Pause at top, squeeze glutes hard"
          },
          {
            id: "ex6-1-5",
            name: "Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Focus on stretch and squeeze"
          },
          {
            id: "ex6-1-6",
            name: "Reverse Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Target rear delts, control the movement"
          },
          {
            id: "ex6-1-7",
            name: "Cable Lateral Raise",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Constant tension, control the weight"
          }
        ]
      },
      {
        id: "week6-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex6-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "3",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Heavy triples - focus on technique"
          },
          {
            id: "ex6-2-2",
            name: "Close-Grip Bench Press",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Target triceps, narrow grip"
          },
          {
            id: "ex6-2-3",
            name: "Dumbbell Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Single arm or bent over, squeeze shoulder blades"
          },
          {
            id: "ex6-2-4",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Controlled tempo, full range of motion"
          },
          {
            id: "ex6-2-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Lean forward for chest emphasis"
          },
          {
            id: "ex6-2-6",
            name: "Bicycle Crunch",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Slow and controlled, alternate sides"
          },
          {
            id: "ex6-2-7",
            name: "Single-Arm Cable Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on peak contraction"
          }
        ]
      },
      {
        id: "week6-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex6-3-1",
            name: "Back Squat",
            sets: 3,
            reps: "5",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Heavy fives - maintain depth"
          },
          {
            id: "ex6-3-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher volume day, focus on tempo"
          },
          {
            id: "ex6-3-3",
            name: "Neutral-Grip Pulldown",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher reps, squeeze at bottom"
          },
          {
            id: "ex6-3-4",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Full range of motion, squeeze hamstrings"
          },
          {
            id: "ex6-3-5",
            name: "Seated Face Pull",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "High reps, focus on rear delts"
          },
          {
            id: "ex6-3-6",
            name: "Single-Arm Tricep Rope Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "One arm at a time, full extension"
          },
          {
            id: "ex6-3-7",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pause at top, control the descent"
          }
        ]
      }
    ]
  },
  {
    id: "week7",
    label: "Week 7",
    days: [
      {
        id: "week7-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex7-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Increased volume - focus on form"
          },
          {
            id: "ex7-1-2",
            name: "Dumbbell Seated Shoulder Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Full range of motion, controlled descent"
          },
          {
            id: "ex7-1-3",
            name: "Single-Arm Pulldown",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Focus on lat contraction, alternate arms"
          },
          {
            id: "ex7-1-4",
            name: "Barbell Hip Thrust",
            sets: 3,
            reps: "8",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Pause at top, squeeze glutes hard"
          },
          {
            id: "ex7-1-5",
            name: "Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Focus on stretch and squeeze"
          },
          {
            id: "ex7-1-6",
            name: "Reverse Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Target rear delts, control the movement"
          },
          {
            id: "ex7-1-7",
            name: "Cable Lateral Raise",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Constant tension, control the weight"
          }
        ]
      },
      {
        id: "week7-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex7-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "3",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Heavy triples - focus on technique"
          },
          {
            id: "ex7-2-2",
            name: "Close-Grip Bench Press",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Target triceps, narrow grip"
          },
          {
            id: "ex7-2-3",
            name: "Dumbbell Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Single arm or bent over, squeeze shoulder blades"
          },
          {
            id: "ex7-2-4",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Controlled tempo, full range of motion"
          },
          {
            id: "ex7-2-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Lean forward for chest emphasis"
          },
          {
            id: "ex7-2-6",
            name: "Bicycle Crunch",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Slow and controlled, alternate sides"
          },
          {
            id: "ex7-2-7",
            name: "Single-Arm Cable Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on peak contraction"
          }
        ]
      },
      {
        id: "week7-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex7-3-1",
            name: "Back Squat",
            sets: 3,
            reps: "5",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Heavy fives - maintain depth"
          },
          {
            id: "ex7-3-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher volume day, focus on tempo"
          },
          {
            id: "ex7-3-3",
            name: "Neutral-Grip Pulldown",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher reps, squeeze at bottom"
          },
          {
            id: "ex7-3-4",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Full range of motion, squeeze hamstrings"
          },
          {
            id: "ex7-3-5",
            name: "Seated Face Pull",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "High reps, focus on rear delts"
          },
          {
            id: "ex7-3-6",
            name: "Single-Arm Tricep Rope Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "One arm at a time, full extension"
          },
          {
            id: "ex7-3-7",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Pause at top, control the descent"
          }
        ]
      }
    ]
  },
  {
    id: "week8",
    label: "Week 8",
    days: [
      {
        id: "week8-day1",
        label: "Day 1",
        focus: "Full Body #1",
        exercises: [
          {
            id: "ex8-1-1",
            name: "Back Squat",
            sets: 3,
            reps: "8",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Final week - push yourself!"
          },
          {
            id: "ex8-1-2",
            name: "Dumbbell Seated Shoulder Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Full range of motion, controlled descent"
          },
          {
            id: "ex8-1-3",
            name: "Single-Arm Pulldown",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Focus on lat contraction, alternate arms"
          },
          {
            id: "ex8-1-4",
            name: "Barbell Hip Thrust",
            sets: 3,
            reps: "8",
            rpe: "RPE 9",
            rest: "2-3 min",
            notes: "Pause at top, squeeze glutes hard"
          },
          {
            id: "ex8-1-5",
            name: "Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Focus on stretch and squeeze"
          },
          {
            id: "ex8-1-6",
            name: "Reverse Pec Deck",
            sets: 3,
            reps: "15",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Target rear delts, control the movement"
          },
          {
            id: "ex8-1-7",
            name: "Cable Lateral Raise",
            sets: 3,
            reps: "12",
            rpe: "RPE 9",
            rest: "1-2 min",
            notes: "Constant tension, control the weight"
          }
        ]
      },
      {
        id: "week8-day2",
        label: "Day 2",
        focus: "Full Body #2",
        exercises: [
          {
            id: "ex8-2-1",
            name: "Deadlift",
            sets: 3,
            reps: "3",
            rpe: "RPE 8",
            rest: "3-4 min",
            notes: "Final week heavy triples - perfect form"
          },
          {
            id: "ex8-2-2",
            name: "Close-Grip Bench Press",
            sets: 3,
            reps: "5",
            rpe: "RPE 7",
            rest: "3-4 min",
            notes: "Target triceps, narrow grip"
          },
          {
            id: "ex8-2-3",
            name: "Dumbbell Row",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Single arm or bent over, squeeze shoulder blades"
          },
          {
            id: "ex8-2-4",
            name: "Dumbbell Walking Lunge",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Controlled tempo, full range of motion"
          },
          {
            id: "ex8-2-5",
            name: "Assisted Dip",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Lean forward for chest emphasis"
          },
          {
            id: "ex8-2-6",
            name: "Bicycle Crunch",
            sets: 3,
            reps: "10",
            rpe: "RPE 7",
            rest: "1-2 min",
            notes: "Slow and controlled, alternate sides"
          },
          {
            id: "ex8-2-7",
            name: "Single-Arm Cable Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Focus on peak contraction"
          }
        ]
      },
      {
        id: "week8-day3",
        label: "Day 3",
        focus: "Full Body #3",
        exercises: [
          {
            id: "ex8-3-1",
            name: "Back Squat",
            sets: 3,
            reps: "5",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Final week - show your progress!"
          },
          {
            id: "ex8-3-2",
            name: "Barbell Bench Press",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher volume day, focus on tempo"
          },
          {
            id: "ex8-3-3",
            name: "Neutral-Grip Pulldown",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Higher reps, squeeze at bottom"
          },
          {
            id: "ex8-3-4",
            name: "Lying Leg Curl",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "2-3 min",
            notes: "Full range of motion, squeeze hamstrings"
          },
          {
            id: "ex8-3-5",
            name: "Seated Face Pull",
            sets: 3,
            reps: "15",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "High reps, focus on rear delts"
          },
          {
            id: "ex8-3-6",
            name: "Single-Arm Tricep Rope Extension",
            sets: 3,
            reps: "12",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "One arm at a time, full extension"
          },
          {
            id: "ex8-3-7",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "10",
            rpe: "RPE 8",
            rest: "1-2 min",
            notes: "Final week - finish strong!"
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getWeekById = (weekId: string): ProgramWeek | undefined => {
  return programWeeks.find(week => week.id === weekId);
};

export const getDayById = (weekId: string, dayId: string): WorkoutDay | undefined => {
  const week = getWeekById(weekId);
  return week?.days.find(day => day.id === dayId);
};

export const getTotalExercises = (): number => {
  return programWeeks.reduce((total, week) =>
    total + week.days.reduce((dayTotal, day) =>
      dayTotal + day.exercises.length, 0), 0);
};

export const getTotalWeeks = (): number => {
  return programWeeks.length;
};

export const getTotalDaysPerWeek = (): number => {
  return programWeeks[0]?.days.length || 0;
};

// Import exercise library for lookups
import { getExerciseById } from './exerciseLibrary';

// Helper function to resolve a ProgramExercise to its full definition
export const resolveExercise = (programExercise: ProgramExercise): Exercise => {
  const definition = getExerciseById(programExercise.exerciseId);

  if (!definition) {
    throw new Error(`Exercise not found in library: ${programExercise.exerciseId}`);
  }

  return {
    id: programExercise.id,
    name: definition.name,
    sets: programExercise.overrideSets ?? definition.defaultSets,
    reps: programExercise.overrideReps ?? definition.defaultReps,
    rpe: programExercise.overrideRpe ?? definition.rpe ?? '',
    rest: programExercise.overrideRest ?? definition.rest ?? '',
    notes: programExercise.overrideNotes ?? definition.notes ?? ''
  };
};

// Helper function to get all exercises for a day as resolved Exercise objects
export const getDayExercises = (weekId: string, dayId: string): Exercise[] => {
  const day = getDayById(weekId, dayId);
  if (!day) return [];

  return day.exercises;
};

// Helper function to get exercise ID from current exercise structure
export const getExerciseIdFromExercise = (exercise: Exercise): string => {
  // For now, we'll create IDs based on exercise names
  // This is a temporary solution until full migration
  const nameToId: Record<string, string> = {
    'Back Squat': 'back-squat',
    'Barbell Bench Press': 'barbell-bench-press',
    'Lat Pulldown': 'lat-pulldown',
    'Romanian Deadlift': 'romanian-deadlift',
    'Assisted Dip': 'assisted-dip',
    'Standing Calf Raise': 'standing-calf-raise',
    'Dumbbell Supinated Curl': 'dumbbell-supinated-curl',
    'Deadlift': 'deadlift',
    'Military Press': 'military-press',
    'Chest Supported T-Bar Row': 'chest-supported-t-bar-row',
    'Leg Extension': 'leg-extension',
    'Cable Flye': 'cable-flye',
    'Crunch': 'crunch',
    'Dumbbell Skull Crusher': 'dumbbell-skull-crusher',
    'Dumbbell Walking Lunge': 'dumbbell-walking-lunge',
    'Dumbbell Incline Press': 'dumbbell-incline-press',
    'Reverse Grip Lat Pulldown': 'reverse-grip-lat-pulldown',
    'Seated Face Pull': 'seated-face-pull',
    'Dumbbell Lateral Raise': 'dumbbell-lateral-raise',
    'Lying Leg Curl': 'lying-leg-curl'
  };

  return nameToId[exercise.name] || exercise.name.toLowerCase().replace(/\s+/g, '-');
};