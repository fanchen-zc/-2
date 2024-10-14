import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import HabitList from '../components/HabitList';
import CreateHabitModal from '../components/CreateHabitModal';
import { Habit } from '../types';
import { useUser } from '../context/UserContext';

const HabitsPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, updateUser } = useUser();

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    // Save habits to localStorage
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
  };

  const handleCheckIn = (checkedHabit: Habit, completed: boolean) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === checkedHabit.id) {
        const today = new Date().toISOString().split('T')[0];
        const isNewDay = habit.lastCompletedDate !== today;

        if (completed && isNewDay) {
          // Increase streak and update user coins
          const newStreak = habit.streak + 1;
          const earnedCoins = habit.coinCost * (1 + Math.floor(newStreak / 7) * 0.1);
          updateUser({ ...user!, coins: user!.coins + earnedCoins });

          return {
            ...habit,
            completedToday: true,
            streak: newStreak,
            lastCompletedDate: today,
          };
        } else if (!completed) {
          // Reset streak and deduct coins
          updateUser({ ...user!, coins: user!.coins - habit.coinCost });

          return {
            ...habit,
            completedToday: false,
            streak: 0,
            lastCompletedDate: today,
          };
        }
      }
      return habit;
    });

    setHabits(updatedHabits);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Habits</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Create Habit
        </button>
      </div>
      <HabitList habits={habits} onCheckIn={handleCheckIn} />
      {isCreateModalOpen && (
        <CreateHabitModal onClose={() => setIsCreateModalOpen(false)} onAdd={addHabit} />
      )}
    </div>
  );
};

export default HabitsPage;