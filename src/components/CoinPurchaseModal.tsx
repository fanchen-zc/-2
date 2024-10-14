import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface CoinPurchaseModalProps {
  onClose: () => void;
}

const coinPackages = [
  { amount: 100, price: 0.99 },
  { amount: 500, price: 4.99 },
  { amount: 1000, price: 9.99 },
];

const CoinPurchaseModal: React.FC<CoinPurchaseModalProps> = ({ onClose }) => {
  const { user, updateUser } = useUser();
  const [selectedPackage, setSelectedPackage] = useState(coinPackages[0]);

  const handlePurchase = () => {
    // TODO: Implement actual payment processing
    if (user) {
      updateUser({ ...user, coins: user.coins + selectedPackage.amount });
      alert(`Successfully purchased ${selectedPackage.amount} coins!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Purchase Coins</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 mb-6">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.amount}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedPackage === pkg ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{pkg.amount} Coins</span>
                <span>${pkg.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePurchase}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Purchase {selectedPackage.amount} Coins for ${selectedPackage.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default CoinPurchaseModal;