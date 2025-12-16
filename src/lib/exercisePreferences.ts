// Storage for user exercise preferences
export type ExercisePreferences = {
  skipWeightTracking: string[]; // Array of exercise names to skip weight tracking
};

const PREFERENCES_STORAGE_KEY = 'workout-planner-exercise-preferences';

export const loadExercisePreferences = (): ExercisePreferences => {
  try {
    const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { skipWeightTracking: [] };
  } catch (error) {
    console.error('Failed to load exercise preferences from localStorage:', error);
    return { skipWeightTracking: [] };
  }
};

export const saveExercisePreferences = (preferences: ExercisePreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save exercise preferences to localStorage:', error);
  }
};

export const addSkipWeightTracking = (exerciseName: string): void => {
  const preferences = loadExercisePreferences();
  if (!preferences.skipWeightTracking.includes(exerciseName)) {
    preferences.skipWeightTracking.push(exerciseName);
    saveExercisePreferences(preferences);
  }
};

export const removeSkipWeightTracking = (exerciseName: string): void => {
  const preferences = loadExercisePreferences();
  preferences.skipWeightTracking = preferences.skipWeightTracking.filter(
    name => name !== exerciseName
  );
  saveExercisePreferences(preferences);
};

export const isWeightTrackingSkipped = (exerciseName: string): boolean => {
  const preferences = loadExercisePreferences();
  return preferences.skipWeightTracking.includes(exerciseName);
};

export const getSkippedExercises = (): string[] => {
  const preferences = loadExercisePreferences();
  return [...preferences.skipWeightTracking];
};

export const resetExercisePreferences = (): void => {
  try {
    localStorage.removeItem(PREFERENCES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset exercise preferences:', error);
  }
};

// React hook for exercise preferences
import { useState, useEffect } from 'react';

export const useExercisePreferences = () => {
  const [preferences, setPreferences] = useState<ExercisePreferences>(loadExercisePreferences());

  useEffect(() => {
    const handleStorageChange = () => {
      setPreferences(loadExercisePreferences());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updatePreferences = () => {
    setPreferences(loadExercisePreferences());
  };

  const addSkip = (exerciseName: string) => {
    addSkipWeightTracking(exerciseName);
    updatePreferences();
  };

  const removeSkip = (exerciseName: string) => {
    removeSkipWeightTracking(exerciseName);
    updatePreferences();
  };

  return {
    preferences,
    updatePreferences,
    addSkip,
    removeSkip,
    isSkipped: (exerciseName: string) => preferences.skipWeightTracking.includes(exerciseName)
  };
};