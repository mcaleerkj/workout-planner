import React, { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import type { Exercise } from '../data/program';
import WeightEntryModal from './WeightEntryModalSimple';
import { saveExerciseWeights, getLastWeights } from '../lib/weightStorage';
import { isWeightTrackingSkipped, addSkipWeightTracking } from '../lib/exercisePreferences';

interface ExerciseCardProps {
  exercise: Exercise;
  currentIndex: number;
  totalCount: number;
  onSwipeComplete: () => void;
  onSwipeSkip: () => void;
  isActive?: boolean;
  swipeState?: 'completed' | 'skipped' | undefined;
  loggedWeights?: number[];
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentIndex,
  totalCount,
  onSwipeComplete,
  onSwipeSkip,
  isActive = true,
  swipeState,
  loggedWeights,
}) => {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragAxis, setDragAxis] = useState<'x' | 'y' | null>(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [, setPendingCompletion] = useState(false);
  const isCompleted = swipeState === 'completed';
  const isSkipped = swipeState === 'skipped';

  const handleDragStart = () => {
    setIsDragging(true);
    setDragAxis(null);
  };

  const handleDrag = (_: Event, info: PanInfo) => {
    if (swipeState) return;

    // Determine drag axis on first significant movement
    if (!dragAxis && (Math.abs(info.offset.x) > 10 || Math.abs(info.offset.y) > 10)) {
      if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
        setDragAxis('x');
      } else {
        setDragAxis('y');
        return; // Exit early for vertical movement
      }
    }

    // Only process horizontal movement if we've committed to x-axis
    if (dragAxis === 'y') return;

    setDragOffset(info.offset.x);
    const threshold = 50;
    if (info.offset.x > threshold) {
      setDragDirection('right');
    } else if (info.offset.x < -threshold) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (_: Event, info: PanInfo) => {
    if (swipeState) {
      setIsDragging(false);
      setDragDirection(null);
      setDragOffset(0);
      setDragAxis(null);
      return;
    }

    // Only trigger swipe actions if we were dragging horizontally
    if (dragAxis === 'x') {
      const threshold = 100;
      const velocity = Math.abs(info.velocity.x);

      if (info.offset.x > threshold || velocity > 500) {
        handleSwipeComplete();
      } else if (info.offset.x < -threshold || (info.offset.x < 0 && velocity > 500)) {
        onSwipeSkip();
      }
    }

    setIsDragging(false);
    setDragDirection(null);
    setDragOffset(0);
    setDragAxis(null);
  };

  const getRotation = (offset: number) => {
    if (swipeState) return 0;
    return offset / 10;
  };

  const getCardOpacity = () => {
    if (isCompleted || isSkipped) return 0.7;
    return 1;
  };

  const getCardScale = () => {
    if (isCompleted || isSkipped) return 0.98;
    return 1;
  };

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

  const handleSwipeComplete = () => {
    if (swipeState) return;

    // Check if user has opted out of weight tracking for this exercise
    const userSkippedWeightTracking = isWeightTrackingSkipped(exercise.name);
    const shouldShowWeightModal = !userSkippedWeightTracking;

    if (shouldShowWeightModal) {
      setPendingCompletion(true);
      setShowWeightModal(true);
    } else {
      onSwipeComplete();
    }
  };

  const handleWeightModalComplete = (weights: number[]) => {
    const exerciseId = getExerciseIdForWeights(exercise.name);
    saveExerciseWeights(exerciseId, weights);
    setShowWeightModal(false);
    setPendingCompletion(false);
    onSwipeComplete();
  };

  const handleWeightModalCancel = () => {
    setShowWeightModal(false);
    setPendingCompletion(false);
    // Complete without weights
    onSwipeComplete();
  };

  const handleSkipWeightTracking = () => {
    addSkipWeightTracking(exercise.name);
    setShowWeightModal(false);
    setPendingCompletion(false);
    // Complete without weights
    onSwipeComplete();
  };

  return (
    <motion.div
      className="relative w-full mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: getCardOpacity(),
        y: 0,
        scale: getCardScale()
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="relative w-full"
        drag={isActive && !swipeState && dragAxis !== 'y' ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        dragDirectionLock={true}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{
          x: swipeState ? 0 : undefined,
          rotate: isDragging && !swipeState && dragAxis === 'x' ? getRotation(dragOffset) : 0
        }}
        whileTap={!swipeState ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Exercise Card */}
        <div className={`card min-h-[400px] flex flex-col relative transition-all duration-200 ${
          isCompleted ? 'bg-green-50 border-green-200' :
          isSkipped ? 'bg-gray-50 border-gray-300' :
          'bg-white border-gray-100'
        }`}>
          {/* Progress indicator */}
          <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>

          {/* Exercise content */}
          <div className="flex-1 pt-16 pb-6">
            <h2 className={`text-2xl font-bold mb-6 text-center leading-tight transition-all duration-200 ${
              isCompleted ? 'text-green-800 line-through' :
              isSkipped ? 'text-gray-500 line-through' :
              'text-gray-900'
            }`}>
              {exercise.name}
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InfoBadge icon="💪" label="Sets" value={exercise.sets.toString()} />
                <InfoBadge icon="🔢" label="Reps" value={exercise.reps} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoBadge icon="⚡" label="Intensity" value={exercise.rpe} />
                <InfoBadge icon="⏱️" label="Rest" value={exercise.rest} />
              </div>

              {/* Exercise history */}
              {!swipeState && !isWeightTrackingSkipped(exercise.name) && (() => {
                const exerciseId = getExerciseIdForWeights(exercise.name);
                const lastWeights = getLastWeights(exerciseId);

                if (lastWeights.length > 0) {
                  return (
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                        📊 Last Session
                      </h4>
                      <p className="text-purple-800 text-sm font-medium">
                        {lastWeights.join(' / ')} lbs
                      </p>
                    </div>
                  );
                }
                return null;
              })()}

              {exercise.notes && (
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    💡 Tips
                  </h4>
                  <p className="text-blue-800 text-sm">{exercise.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status or Swipe instructions */}
          <div className="text-center pb-4">
            {swipeState ? (
              <div className={`text-sm font-semibold ${
                isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {isCompleted ? '✅ Completed' : '⏭️ Skipped'}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-secondary-500">👈</span>
                  <span>Skip</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span>Complete</span>
                  <span className="text-primary-500">👉</span>
                </div>
              </div>
            )}
          </div>

          {/* Swipe overlays */}
          {!swipeState && isDragging && dragAxis === 'x' && dragDirection === 'right' && (
            <motion.div
              className="swipe-overlay complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
            >
              ✅
            </motion.div>
          )}

          {!swipeState && isDragging && dragAxis === 'x' && dragDirection === 'left' && (
            <motion.div
              className="swipe-overlay skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
            >
              ⏭️
            </motion.div>
          )}

          {/* Permanent status overlay */}
          {swipeState && (
            <motion.div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {isCompleted ? '✅ Done' : '⏭️ Skip'}
            </motion.div>
          )}

          {/* Logged weights display */}
          {isCompleted && loggedWeights && loggedWeights.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <div className="text-xs text-green-600 font-medium mb-1">Logged Weights</div>
                <div className="text-sm font-bold text-green-800">
                  {loggedWeights.join(' / ')} lbs
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Weight Entry Modal */}
      <WeightEntryModal
        isOpen={showWeightModal}
        exercise={exercise}
        onComplete={handleWeightModalComplete}
        onCancel={handleWeightModalCancel}
        onSkipWeightTracking={handleSkipWeightTracking}
      />
    </motion.div>
  );
};

interface InfoBadgeProps {
  icon: string;
  label: string;
  value: string;
}

const InfoBadge: React.FC<InfoBadgeProps> = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-xl p-4 text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="font-semibold text-gray-900">{value}</div>
  </div>
);

export default ExerciseCard;