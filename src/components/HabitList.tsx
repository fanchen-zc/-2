import React from 'react';
import { Habit } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface HabitListProps {
  habits: Habit[];
  onCheckIn: (habit: Habit, completed: boolean) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onCheckIn }) => {
  const { user } = useUser();

  const handleCheckIn = (habit: Habit, completed: boolean) => {
    onCheckIn(habit, completed);
  };

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <div key={habit.id} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="mr-4 flex space-x-2">
            <button
              onClick={() => handleCheckIn(habit, true)}
              className="text-gray-400 hover:text-green-500 focus:outline-none"
            >
              <CheckCircle2 size={24} />
            </button>
            <button
              onClick={() => handleCheckIn(habit, false)}
              className="text-gray-400 hover:text-red-500 focus:outline-none"
            >
              <XCircle size={24} />
            </button>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{habit.name}</h3>
            <p className="text-sm text-gray-600">
              {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{habit.streak} day streak</p>
            <p className="text-xs text-gray-600">
              {habit.completedToday ? 'Completed' : 'Not completed'}
            </p>
            <p className="text-xs text-blue-600">{habit.coinCost} coins</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;