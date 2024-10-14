import React, { useState } from 'react';
import { Dumbbell, PlusCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import CoinPurchaseModal from './CoinPurchaseModal';

const Header: React.FC = () => {
  const { user } = useUser();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Dumbbell className="text-blue-500 mr-2" size={32} />
          <h1 className="text-xl font-bold">HabitForge</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2">{user?.coins}</span>
          <span className="text-yellow-500 mr-2">●</span>
          <button
            onClick={() => setIsPurchaseModalOpen(true)}
            className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center text-sm"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Coins
          </button>
        </div>
      </div>
      {isPurchaseModalOpen && <CoinPurchaseModal onClose={() => setIsPurchaseModalOpen(false)} />}
    </header>
  );
};

export default Header;