import { LoyaltyReward } from '../data/loyaltyData';

interface LoyaltyCardProps {
  reward: LoyaltyReward;
  userPoints: number;
  onRedeem: (reward: LoyaltyReward) => void;
}

const LoyaltyCard = ({ reward, userPoints, onRedeem }: LoyaltyCardProps) => {
  const canRedeem = userPoints >= reward.pointsRequired;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
          {/* Placeholder for image */}
          <span>Reward Image</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{reward.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{reward.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-accent">
            {reward.pointsRequired} points
          </span>
          
          <button
            onClick={() => onRedeem(reward)}
            disabled={!canRedeem}
            className={`px-3 py-1 rounded text-sm ${
              canRedeem 
                ? 'bg-primary text-white hover:bg-accent' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canRedeem ? 'Redeem' : 'Not Enough Points'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
