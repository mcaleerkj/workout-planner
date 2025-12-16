import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDayById } from '../data/program';
import { markCompleted, markSkipped, markWorkoutCompleted, useProgress, isCompleted, isSkipped } from '../lib/storage';
import { getLastWeights, useWeightHistory } from '../lib/weightStorage';
import ExerciseCard from '../components/ExerciseCard';

const Workout: React.FC = () => {
  const { weekId, dayId } = useParams<{ weekId: string; dayId: string }>();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const { updateHistory } = useWeightHistory();

  const [exerciseStates, setExerciseStates] = useState<Record<string, 'completed' | 'skipped' | undefined>>({});
  const [isComplete, setIsComplete] = useState(false);

  const workoutDay = getDayById(weekId!, dayId!);

  useEffect(() => {
    if (!workoutDay) {
      navigate('/');
      return;
    }

    const initialStates: Record<string, 'completed' | 'skipped' | undefined> = {};
    workoutDay.exercises.forEach(exercise => {
      if (isCompleted(dayId!, exercise.id)) {
        initialStates[exercise.id] = 'completed';
      } else if (isSkipped(dayId!, exercise.id)) {
        initialStates[exercise.id] = 'skipped';
      }
    });
    setExerciseStates(initialStates);
  }, [workoutDay, navigate, dayId]);

  if (!workoutDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Workout not found</h1>
          <button
            onClick={() => navigate('/')}
            className="btn-primary mt-4"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const totalExercises = workoutDay.exercises.length;
  const completedCount = Object.values(exerciseStates).filter(state => state === 'completed').length;
  const skippedCount = Object.values(exerciseStates).filter(state => state === 'skipped').length;
  const allExercisesCompleted = completedCount + skippedCount === totalExercises;

  const handleComplete = (exerciseId: string) => {
    markCompleted(dayId!, exerciseId);
    setExerciseStates(prev => ({ ...prev, [exerciseId]: 'completed' }));
    updateProgress();
    updateHistory(); // Update weight history state

    checkWorkoutCompletion();
  };

  const handleSkip = (exerciseId: string) => {
    markSkipped(dayId!, exerciseId);
    setExerciseStates(prev => ({ ...prev, [exerciseId]: 'skipped' }));
    updateProgress();

    checkWorkoutCompletion();
  };

  const checkWorkoutCompletion = () => {
    const currentCompleted = Object.values(exerciseStates).filter(state => state === 'completed').length;
    const currentSkipped = Object.values(exerciseStates).filter(state => state === 'skipped').length;

    if (currentCompleted + currentSkipped + 1 >= totalExercises) {
      markWorkoutCompleted(dayId!);
      updateProgress();
      setTimeout(() => setIsComplete(true), 500);
    }
  };

  const handleRestart = () => {
    setIsComplete(false);
    setExerciseStates({});
    workoutDay?.exercises.forEach(exercise => {
      localStorage.removeItem(`exercise-${dayId}-${exercise.id}`);
    });
  };

  const handleFinish = () => {
    navigate('/');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card text-center max-w-sm mx-auto"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Workout Complete!</h1>
          <p className="text-gray-600 mb-6">{workoutDay.label} - {workoutDay.focus}</p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  {completedCount}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">
                  {skippedCount}
                </div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleFinish} className="btn-primary w-full">
              Back to Home
            </button>
            <button onClick={handleRestart} className="btn-secondary w-full">
              Restart Workout
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center">
          <h1 className="font-bold text-gray-900">{workoutDay.label}</h1>
          <p className="text-sm text-gray-600">{workoutDay.focus}</p>
        </div>

        <div className="w-16" /> {/* Spacer */}
      </header>

      {/* Progress bar */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-sm">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${((completedCount + skippedCount) / totalExercises) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          {completedCount + skippedCount} of {totalExercises} exercises
        </div>
      </div>

      {/* Exercise cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 workout-scroll-container">
        <div className="space-y-4 max-w-sm mx-auto">
          {workoutDay.exercises.map((exercise, index) => {
            // Simple name to ID mapping for weight tracking
            const getExerciseIdForWeights = (exerciseName: string): string => {
              const nameToId: Record<string, string> = {
                'Back Squat': 'back-squat',
                'Barbell Bench Press': 'barbell-bench-press',
                'Lat Pulldown': 'lat-pulldown',
                'Romanian Deadlift': 'romanian-deadlift',
                'Deadlift': 'deadlift',
                'Military Press': 'military-press',
                'Dumbbell Incline Press': 'dumbbell-incline-press',
                'Dumbbell Walking Lunge': 'dumbbell-walking-lunge',
                'Dumbbell Lateral Raise': 'dumbbell-lateral-raise',
                'Dumbbell Supinated Curl': 'dumbbell-supinated-curl',
                'Dumbbell Skull Crusher': 'dumbbell-skull-crusher',
                'Chest Supported T-Bar Row': 'chest-supported-t-bar-row',
                'Leg Extension': 'leg-extension',
                'Cable Flye': 'cable-flye',
                'Reverse Grip Lat Pulldown': 'reverse-grip-lat-pulldown',
                'Seated Face Pull': 'seated-face-pull',
                'Lying Leg Curl': 'lying-leg-curl',
                'Standing Calf Raise': 'standing-calf-raise'
              };
              return nameToId[exerciseName] || exerciseName.toLowerCase().replace(/\s+/g, '-');
            };

            const exerciseLibraryId = getExerciseIdForWeights(exercise.name);
            const loggedWeights = getLastWeights(exerciseLibraryId);

            return (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                currentIndex={index}
                totalCount={totalExercises}
                onSwipeComplete={() => handleComplete(exercise.id)}
                onSwipeSkip={() => handleSkip(exercise.id)}
                swipeState={exerciseStates[exercise.id]}
                loggedWeights={exerciseStates[exercise.id] === 'completed' ? loggedWeights : undefined}
              />
            );
          })}
        </div>
      </div>

      {/* Finish workout button */}
      {allExercisesCompleted && (
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <button
            onClick={() => setIsComplete(true)}
            className="w-full max-w-sm mx-auto block py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all duration-200 active:scale-95"
          >
            🎉 Finish Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default Workout;