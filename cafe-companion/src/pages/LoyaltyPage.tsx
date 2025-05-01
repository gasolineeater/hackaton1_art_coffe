import { useState } from 'react';
import { loyaltyRewards, LoyaltyReward } from '../data/loyaltyData';
import LoyaltyCard from '../components/LoyaltyCard';

const LoyaltyPage = () => {
  // Mock user data
  const [userPoints, setUserPoints] = useState(120);
  const [redeemHistory, setRedeemHistory] = useState<LoyaltyReward[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState<LoyaltyReward | null>(null);
  
  const handleRedeem = (reward: LoyaltyReward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };
  
  const confirmRedeem = () => {
    if (selectedReward && userPoints >= selectedReward.pointsRequired) {
      setUserPoints(userPoints - selectedReward.pointsRequired);
      setRedeemHistory([...redeemHistory, selectedReward]);
      setShowConfirmation(false);
      setSelectedReward(null);
    }
  };
  
  const cancelRedeem = () => {
    setShowConfirmation(false);
    setSelectedReward(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Loyalty Program</h1>
      
      {/* User Points Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Your Loyalty Points</h2>
            <p className="text-gray-600 mt-1">Earn points with every purchase and redeem them for rewards.</p>
          </div>
          
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-4xl font-bold text-accent">{userPoints}</div>
            <div className="text-sm text-gray-500">Available Points</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">How to Earn Points</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>1 point for every $1 spent</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>5 bonus points for trying new items</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>10 bonus points on your birthday</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Available Rewards */}
      <h2 className="text-2xl font-semibold mb-6">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {loyaltyRewards.map(reward => (
          <LoyaltyCard 
            key={reward.id} 
            reward={reward} 
            userPoints={userPoints} 
            onRedeem={handleRedeem} 
          />
        ))}
      </div>
      
      {/* Redemption History */}
      {redeemHistory.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Redemption History</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Reward</th>
                  <th className="py-3 px-4 text-left">Points Used</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {redeemHistory.map((reward, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-3 px-4">{reward.name}</td>
                    <td className="py-3 px-4">{reward.pointsRequired}</td>
                    <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Redemption</h3>
            <p className="mb-6">
              Are you sure you want to redeem <span className="font-semibold">{selectedReward.name}</span> for {selectedReward.pointsRequired} points?
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={confirmRedeem}
                className="flex-1 bg-primary text-white py-2 rounded-md font-medium hover:bg-accent transition-colors"
              >
                Confirm
              </button>
              
              <button 
                onClick={cancelRedeem}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPage;
