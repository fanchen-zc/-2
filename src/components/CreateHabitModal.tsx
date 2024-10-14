import React, { useState } from 'react';
import { Habit } from '../types';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface CreateHabitModalProps {
  onClose: () => void;
  onAdd: (habit: Habit) => void;
}

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [coinCost, setCoinCost] = useState(10);
  const { user, updateUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.coins >= coinCost) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name,
        frequency,
        coinCost,
        streak: 0,
        completedToday: false,
        lastCompletedDate: null,
      };
      onAdd(newHabit);
      updateUser({ ...user, coins: user.coins - coinCost });
      onClose();
    } else {
      alert("You don't have enough coins to create this habit.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Habit</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="coinCost" className="block text-sm font-medium text-gray-700 mb-1">
              Coin Cost
            </label>
            <input
              type="number"
              id="coinCost"
              value={coinCost}
              onChange={(e) => setCoinCost(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Habit ({coinCost} coins)
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;