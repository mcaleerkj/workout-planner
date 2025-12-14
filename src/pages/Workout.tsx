import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getDayById } from '../data/program';
import { markCompleted, markSkipped, markWorkoutCompleted, useProgress } from '../lib/storage';
import ExerciseCard from '../components/ExerciseCard';

const Workout: React.FC = () => {
  const { weekId, dayId } = useParams<{ weekId: string; dayId: string }>();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [skippedExercises, setSkippedExercises] = useState<string[]>([]);

  const workoutDay = getDayById(weekId!, dayId!);

  useEffect(() => {
    if (!workoutDay) {
      navigate('/');
    }
  }, [workoutDay, navigate]);

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

  const currentExercise = workoutDay.exercises[currentExerciseIndex];
  const totalExercises = workoutDay.exercises.length;

  const handleComplete = () => {
    if (!currentExercise) return;

    markCompleted(dayId!, currentExercise.id);
    setCompletedExercises(prev => [...prev, currentExercise.id]);
    updateProgress();
    nextExercise();
  };

  const handleSkip = () => {
    if (!currentExercise) return;

    markSkipped(dayId!, currentExercise.id);
    setSkippedExercises(prev => [...prev, currentExercise.id]);
    updateProgress();
    nextExercise();
  };

  const nextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Mark workout as completed
      markWorkoutCompleted(dayId!);
      updateProgress();
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setIsComplete(false);
    setCompletedExercises([]);
    setSkippedExercises([]);
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
                  {completedExercises.length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">
                  {skippedExercises.length}
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
            animate={{ width: `${((currentExerciseIndex) / totalExercises) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Exercise cards */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <ExerciseCard
              exercise={currentExercise}
              currentIndex={currentExerciseIndex}
              totalCount={totalExercises}
              onSwipeComplete={handleComplete}
              onSwipeSkip={handleSkip}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action buttons (fallback for non-swipe interaction) */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex gap-4 max-w-sm mx-auto">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 px-4 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-semibold rounded-2xl transition-all duration-200 active:scale-95"
          >
            Skip ⏭️
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95"
          >
            Complete ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workout;