export type ProgressState = {
  [dayId: string]: {
    completedExerciseIds: string[];
    completedAt?: string;
    skippedExerciseIds?: string[];
  };
};

const STORAGE_KEY = 'workout-planner-progress';

export const loadProgress = (): ProgressState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error);
    return {};
  }
};

export const saveProgress = (progress: ProgressState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
  }
};

export const markCompleted = (dayId: string, exerciseId: string): void => {
  const progress = loadProgress();

  if (!progress[dayId]) {
    progress[dayId] = { completedExerciseIds: [] };
  }

  // Remove from completed if already there (toggle behavior)
  const completedIndex = progress[dayId].completedExerciseIds.indexOf(exerciseId);
  if (completedIndex > -1) {
    progress[dayId].completedExerciseIds.splice(completedIndex, 1);
  } else {
    // Add to completed and remove from skipped if there
    progress[dayId].completedExerciseIds.push(exerciseId);
    if (progress[dayId].skippedExerciseIds) {
      const skippedIndex = progress[dayId].skippedExerciseIds.indexOf(exerciseId);
      if (skippedIndex > -1) {
        progress[dayId].skippedExerciseIds.splice(skippedIndex, 1);
      }
    }
  }

  saveProgress(progress);
};

export const markSkipped = (dayId: string, exerciseId: string): void => {
  const progress = loadProgress();

  if (!progress[dayId]) {
    progress[dayId] = { completedExerciseIds: [], skippedExerciseIds: [] };
  }

  if (!progress[dayId].skippedExerciseIds) {
    progress[dayId].skippedExerciseIds = [];
  }

  // Remove from skipped if already there (toggle behavior)
  const skippedIndex = progress[dayId].skippedExerciseIds.indexOf(exerciseId);
  if (skippedIndex > -1) {
    progress[dayId].skippedExerciseIds.splice(skippedIndex, 1);
  } else {
    // Add to skipped and remove from completed if there
    progress[dayId].skippedExerciseIds.push(exerciseId);
    const completedIndex = progress[dayId].completedExerciseIds.indexOf(exerciseId);
    if (completedIndex > -1) {
      progress[dayId].completedExerciseIds.splice(completedIndex, 1);
    }
  }

  saveProgress(progress);
};

export const isCompleted = (dayId: string, exerciseId: string): boolean => {
  const progress = loadProgress();
  return progress[dayId]?.completedExerciseIds.includes(exerciseId) || false;
};

export const isSkipped = (dayId: string, exerciseId: string): boolean => {
  const progress = loadProgress();
  return progress[dayId]?.skippedExerciseIds?.includes(exerciseId) || false;
};

export const getCompletedCount = (dayId: string): number => {
  const progress = loadProgress();
  return progress[dayId]?.completedExerciseIds.length || 0;
};

export const getSkippedCount = (dayId: string): number => {
  const progress = loadProgress();
  return progress[dayId]?.skippedExerciseIds?.length || 0;
};

export const markWorkoutCompleted = (dayId: string): void => {
  const progress = loadProgress();

  if (!progress[dayId]) {
    progress[dayId] = { completedExerciseIds: [] };
  }

  progress[dayId].completedAt = new Date().toISOString();
  saveProgress(progress);
};

export const isWorkoutCompleted = (dayId: string): boolean => {
  const progress = loadProgress();
  return Boolean(progress[dayId]?.completedAt);
};

export const getWorkoutProgress = (dayId: string, totalExercises: number): number => {
  const completed = getCompletedCount(dayId);
  const skipped = getSkippedCount(dayId);
  return Math.round(((completed + skipped) / totalExercises) * 100);
};

export const resetProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset progress:', error);
  }
};

export const resetDayProgress = (dayId: string): void => {
  const progress = loadProgress();
  delete progress[dayId];
  saveProgress(progress);
};

// Export hook for React components
import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(loadProgress());

  useEffect(() => {
    const handleStorageChange = () => {
      setProgress(loadProgress());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateProgress = () => {
    setProgress(loadProgress());
  };

  return { progress, updateProgress };
};