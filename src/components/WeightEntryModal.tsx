import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '../data/program';
import { getLastExerciseLog } from '../lib/weightStorage';
import { getExerciseIdFromExercise } from '../data/program';

interface WeightEntryModalProps {
  isOpen: boolean;
  exercise: Exercise;
  onComplete: (weights: number[]) => void;
  onCancel: () => void;
}

interface WeightButtonProps {
  weight: number;
  isSelected: boolean;
  isLastUsed?: boolean;
  onSelect: () => void;
}

const WeightButton: React.FC<WeightButtonProps> = ({ weight, isSelected, isLastUsed, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
        ${isSelected
          ? 'bg-primary-600 text-white shadow-lg scale-105'
          : isLastUsed
            ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
        active:scale-95 min-w-[60px]
      `}
    >
      {weight}
    </button>
  );
};

const WeightEntryModal: React.FC<WeightEntryModalProps> = ({
  isOpen,
  exercise,
  onComplete,
  onCancel
}) => {
  const [selectedWeights, setSelectedWeights] = useState<number[]>([]);
  const [lastWeights, setLastWeights] = useState<number[]>([]);
  const [, setCurrentSet] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const exerciseId = getExerciseIdFromExercise(exercise);
      const lastLog = getLastExerciseLog(exerciseId);

      if (lastLog) {
        setLastWeights(lastLog.weights);
        // Pre-fill with last weights as default
        setSelectedWeights([...lastLog.weights]);
      } else {
        setLastWeights([]);
        setSelectedWeights(new Array(exercise.sets).fill(135)); // Default starting weight
      }
      setCurrentSet(0);
    }
  }, [isOpen, exercise]);

  const generateWeightOptions = (centerWeight: number) => {
    const options = [];
    for (let i = -20; i <= 20; i += 5) {
      const weight = centerWeight + i;
      if (weight >= 45) { // Minimum weight (empty barbell)
        options.push(weight);
      }
    }
    return options;
  };

  const handleWeightSelect = (setIndex: number, weight: number) => {
    const newWeights = [...selectedWeights];
    newWeights[setIndex] = weight;
    setSelectedWeights(newWeights);
  };

  const handleComplete = () => {
    onComplete(selectedWeights);
  };

  const formatLastSession = () => {
    if (lastWeights.length === 0) return null;

    const lastLog = getLastExerciseLog(getExerciseIdFromExercise(exercise));
    const dateStr = lastLog ? new Date(lastLog.date).toLocaleDateString() : '';

    return (
      <div className="text-sm text-gray-600 mb-4">
        <div className="font-medium">Last session ({dateStr}):</div>
        <div className="text-primary-600 font-semibold">
          {lastWeights.join(' / ')} lbs
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="bg-white rounded-t-3xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Log Weights</h2>
              <p className="text-sm text-gray-600">{exercise.name}</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Last session info */}
          {formatLastSession()}

          {/* Weight entry for each set */}
          <div className="space-y-6">
            {Array.from({ length: exercise.sets }, (_, setIndex) => {
              const currentWeight = selectedWeights[setIndex] || 135;
              const lastWeight = lastWeights[setIndex];
              const weightOptions = generateWeightOptions(currentWeight);

              return (
                <div key={setIndex} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Set {setIndex + 1}
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {currentWeight} lbs
                    </span>
                  </div>

                  {/* Weight selection buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {weightOptions.map(weight => (
                      <WeightButton
                        key={weight}
                        weight={weight}
                        isSelected={currentWeight === weight}
                        isLastUsed={lastWeight === weight}
                        onSelect={() => handleWeightSelect(setIndex, weight)}
                      />
                    ))}
                  </div>

                  {/* Custom weight input */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleWeightSelect(setIndex, currentWeight - 2.5)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={currentWeight}
                      onChange={(e) => handleWeightSelect(setIndex, parseFloat(e.target.value) || 0)}
                      className="w-20 text-center py-1 px-2 border border-gray-300 rounded-lg font-medium"
                      step="2.5"
                      min="45"
                    />
                    <button
                      onClick={() => handleWeightSelect(setIndex, currentWeight + 2.5)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
            >
              Save & Complete ✅
            </button>
          </div>

          {/* Quick copy from last session */}
          {lastWeights.length > 0 && (
            <button
              onClick={() => setSelectedWeights([...lastWeights])}
              className="w-full mt-3 py-2 px-4 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
            >
              📋 Copy from last session
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WeightEntryModal;