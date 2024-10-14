import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Gift } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
}

const rewards: Reward[] = [
  { id: '1', name: 'Extra Break', description: 'Take an extra 15-minute break', cost: 100, icon: <Gift size={24} /> },
  { id: '2', name: 'Movie Night', description: 'Enjoy a movie of your choice', cost: 200, icon: <Gift size={24} /> },
  { id: '3', name: 'Fancy Dinner', description: 'Treat yourself to a fancy dinner', cost: 500, icon: <Gift size={24} /> },
];

const RewardsPage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  const handleClaimReward = (reward: Reward) => {
    if (user && user.coins >= reward.cost && !claimedRewards.includes(reward.id)) {
      updateUser({ ...user, coins: user.coins - reward.cost });
      setClaimedRewards([...claimedRewards, reward.id]);
      alert(`Congratulations! You've claimed the "${reward.name}" reward.`);
    } else if (claimedRewards.includes(reward.id)) {
      alert('You have already claimed this reward.');
    } else {
      alert('Not enough coins to claim this reward.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rewards</h1>
      <p className="mb-4">Earn rewards for completing your habits! Your current balance: {user?.coins} coins</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-2">
              {reward.icon}
              <h3 className="text-lg font-semibold ml-2">{reward.name}</h3>
            </div>
            <p className="text-gray-600 mb-2">{reward.description}</p>
            <p className="text-blue-600 font-semibold mb-2">{reward.cost} coins</p>
            <button
              onClick={() => handleClaimReward(reward)}
              className={`w-full py-2 px-4 rounded-md ${
                claimedRewards.includes(reward.id)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={claimedRewards.includes(reward.id)}
            >
              {claimedRewards.includes(reward.id) ? 'Claimed' : 'Claim Reward'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;