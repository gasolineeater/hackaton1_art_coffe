import { CoffeeOption } from '../data/coffeeData';
import CoffeeCard from './CoffeeCard';

interface RecommendationSectionProps {
  title: string;
  recommendations: CoffeeOption[];
  onCoffeeClick: (coffee: CoffeeOption) => void;
}

const RecommendationSection = ({ 
  title, 
  recommendations, 
  onCoffeeClick 
}: RecommendationSectionProps) => {
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {recommendations.map(coffee => (
          <CoffeeCard 
            key={coffee.id} 
            coffee={coffee} 
            onClick={onCoffeeClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
