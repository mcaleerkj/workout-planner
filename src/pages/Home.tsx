import React from 'react';
import { useNavigate } from 'react-router-dom';
import { programWeeks, type ProgramWeek, type WorkoutDay } from '../data/program';
import { getWorkoutProgress, isWorkoutCompleted, getCompletedCount } from '../lib/storage';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleDayClick = (weekId: string, dayId: string) => {
    navigate(`/workout/${weekId}/${dayId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💪 Workout Planner</h1>
          <p className="text-gray-600">8-week full-body program</p>
        </header>

        <div className="space-y-6">
          {programWeeks.map((week: ProgramWeek) => (
            <WeekCard
              key={week.id}
              week={week}
              onDayClick={handleDayClick}
            />
          ))}
        </div>

        {/* Add placeholder for remaining weeks */}
        {Array.from({ length: 7 }, (_, i) => i + 2).map(weekNum => (
          <div key={`placeholder-week-${weekNum}`} className="card mb-6 opacity-50">
            <h2 className="text-xl font-bold text-gray-400 mb-4">Week {weekNum}</h2>
            <p className="text-gray-400 text-center py-8">Coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface WeekCardProps {
  week: ProgramWeek;
  onDayClick: (weekId: string, dayId: string) => void;
}

const WeekCard: React.FC<WeekCardProps> = ({ week, onDayClick }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{week.label}</h2>
      <div className="grid gap-3">
        {week.days.map((day: WorkoutDay) => (
          <DayCard
            key={day.id}
            day={day}
            weekId={week.id}
            onClick={() => onDayClick(week.id, day.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface DayCardProps {
  day: WorkoutDay;
  weekId: string;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onClick }) => {
  const totalExercises = day.exercises.length;
  const completedCount = getCompletedCount(day.id);
  const progress = getWorkoutProgress(day.id, totalExercises);
  const isCompleted = isWorkoutCompleted(day.id);

  const getStatusIcon = () => {
    if (isCompleted) return '✅';
    if (completedCount > 0) return '🔄';
    return '⭕';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (completedCount > 0) return `${completedCount}/${totalExercises} done`;
    return 'Not started';
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200 active:scale-98 text-left"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-lg">{getStatusIcon()}</span>
            <h3 className="font-semibold text-gray-900">{day.label}</h3>
          </div>
          {day.focus && (
            <p className="text-sm text-gray-600 mb-2">{day.focus}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{getStatusText()}</span>
            {progress > 0 && (
              <>
                <span>•</span>
                <span>{progress}% complete</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">
            {totalExercises} exercises
          </div>
          {progress > 0 && (
            <div className="w-16 h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default Home;