import React from 'react';
import { useUser } from '../context/UserContext';
import { User, Trophy, TrendingUp } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <User size={64} className="text-blue-500 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">User ID: {user?.id}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Trophy size={24} className="text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold">Total Coins</h3>
            </div>
            <p className="text-2xl font-bold">{user?.coins}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp size={24} className="text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">Habits Completed</h3>
            </div>
            <p className="text-2xl font-bold">0</p> {/* TODO: Implement habit completion tracking */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;