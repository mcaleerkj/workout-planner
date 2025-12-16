import type { ExerciseLog, WeightHistory } from '../data/exerciseLibrary';

const WEIGHT_STORAGE_KEY = 'workout-planner-weights';

export const loadWeightHistory = (): WeightHistory => {
  try {
    const stored = localStorage.getItem(WEIGHT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load weight history from localStorage:', error);
    return {};
  }
};

export const saveWeightHistory = (history: WeightHistory): void => {
  try {
    localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save weight history to localStorage:', error);
  }
};

export const saveExerciseWeights = (
  exerciseId: string,
  weights: number[],
  rpe?: number,
  notes?: string
): void => {
  const history = loadWeightHistory();

  if (!history[exerciseId]) {
    history[exerciseId] = [];
  }

  const newLog: ExerciseLog = {
    date: new Date().toISOString(),
    weights: [...weights],
    rpe,
    notes
  };

  history[exerciseId].push(newLog);

  // Keep only last 50 sessions per exercise to prevent storage bloat
  if (history[exerciseId].length > 50) {
    history[exerciseId] = history[exerciseId].slice(-50);
  }

  saveWeightHistory(history);
};

export const getLastWeights = (exerciseId: string): number[] => {
  const history = loadWeightHistory();
  const exerciseHistory = history[exerciseId];

  if (!exerciseHistory || exerciseHistory.length === 0) {
    return [];
  }

  // Get the most recent log
  const lastLog = exerciseHistory[exerciseHistory.length - 1];
  return lastLog.weights;
};

export const getLastExerciseLog = (exerciseId: string): ExerciseLog | null => {
  const history = loadWeightHistory();
  const exerciseHistory = history[exerciseId];

  if (!exerciseHistory || exerciseHistory.length === 0) {
    return null;
  }

  return exerciseHistory[exerciseHistory.length - 1];
};

export const getExerciseHistory = (exerciseId: string, limit = 10): ExerciseLog[] => {
  const history = loadWeightHistory();
  const exerciseHistory = history[exerciseId] || [];

  return exerciseHistory.slice(-limit);
};

export const getProgressData = (exerciseId: string): {
  sessions: number;
  maxWeight: number;
  averageWeight: number;
  trend: 'up' | 'down' | 'stable';
} => {
  const history = getExerciseHistory(exerciseId, 20);

  if (history.length === 0) {
    return {
      sessions: 0,
      maxWeight: 0,
      averageWeight: 0,
      trend: 'stable'
    };
  }

  const allWeights = history.flatMap(log => log.weights);
  const maxWeight = Math.max(...allWeights);
  const averageWeight = allWeights.reduce((sum, w) => sum + w, 0) / allWeights.length;

  // Calculate trend based on last 5 vs previous 5 sessions
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (history.length >= 10) {
    const recent5 = history.slice(-5).flatMap(log => log.weights);
    const previous5 = history.slice(-10, -5).flatMap(log => log.weights);

    const recentAvg = recent5.reduce((sum, w) => sum + w, 0) / recent5.length;
    const previousAvg = previous5.reduce((sum, w) => sum + w, 0) / previous5.length;

    const difference = recentAvg - previousAvg;
    if (difference > 2.5) trend = 'up';
    else if (difference < -2.5) trend = 'down';
  }

  return {
    sessions: history.length,
    maxWeight: Math.round(maxWeight * 10) / 10,
    averageWeight: Math.round(averageWeight * 10) / 10,
    trend
  };
};

export const deleteExerciseHistory = (exerciseId: string): void => {
  const history = loadWeightHistory();
  delete history[exerciseId];
  saveWeightHistory(history);
};

export const resetAllWeightHistory = (): void => {
  try {
    localStorage.removeItem(WEIGHT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset weight history:', error);
  }
};

// Export hook for React components
import { useState, useEffect } from 'react';

export const useWeightHistory = () => {
  const [history, setHistory] = useState<WeightHistory>(loadWeightHistory());

  useEffect(() => {
    const handleStorageChange = () => {
      setHistory(loadWeightHistory());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateHistory = () => {
    setHistory(loadWeightHistory());
  };

  return { history, updateHistory };
};