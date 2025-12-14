import React, { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import type { Exercise } from '../data/program';

interface ExerciseCardProps {
  exercise: Exercise;
  currentIndex: number;
  totalCount: number;
  onSwipeComplete: () => void;
  onSwipeSkip: () => void;
  isActive?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentIndex,
  totalCount,
  onSwipeComplete,
  onSwipeSkip,
  isActive = true,
}) => {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (_: Event, info: PanInfo) => {
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
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);

    if (info.offset.x > threshold || velocity > 500) {
      // Swiped right - complete
      onSwipeComplete();
    } else if (info.offset.x < -threshold || (info.offset.x < 0 && velocity > 500)) {
      // Swiped left - skip
      onSwipeSkip();
    }

    setIsDragging(false);
    setDragDirection(null);
  };

  const getRotation = (offset: number) => {
    return offset / 10;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-sm mx-auto"
        drag={isActive ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }}
        style={{
          rotate: isDragging ? getRotation((dragDirection === 'right' ? 50 : dragDirection === 'left' ? -50 : 0)) : 0,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Exercise Card */}
        <div className="card min-h-[500px] flex flex-col relative bg-white">
          {/* Progress indicator */}
          <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>

          {/* Exercise content */}
          <div className="flex-1 pt-16 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
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

          {/* Swipe instructions */}
          <div className="text-center pb-4">
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
          </div>

          {/* Swipe overlays */}
          {isDragging && dragDirection === 'right' && (
            <motion.div
              className="swipe-overlay complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
            >
              ✅
            </motion.div>
          )}

          {isDragging && dragDirection === 'left' && (
            <motion.div
              className="swipe-overlay skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
            >
              ⏭️
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
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