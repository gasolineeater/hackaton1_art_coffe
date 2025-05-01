import { CoffeeOption } from '../data/coffeeData';

interface CoffeeCardProps {
  coffee: CoffeeOption;
  onClick: (coffee: CoffeeOption) => void;
}

const CoffeeCard = ({ coffee, onClick }: CoffeeCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(coffee)}
    >
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
          {/* Placeholder for image */}
          <span>Coffee Image</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-primary">{coffee.name}</h3>
          <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{coffee.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">
            {coffee.category}
          </span>
          
          {coffee.customizable && (
            <span className="text-xs text-primary">Customizable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
