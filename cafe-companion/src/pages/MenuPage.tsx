import { useState } from 'react';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import CoffeeCard from '../components/CoffeeCard';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeOption | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(coffeeOptions.map(coffee => coffee.category)));
  
  // Filter coffees by selected category
  const filteredCoffees = selectedCategory 
    ? coffeeOptions.filter(coffee => coffee.category === selectedCategory)
    : coffeeOptions;
  
  const handleCoffeeClick = (coffee: CoffeeOption) => {
    setSelectedCoffee(coffee);
  };
  
  const handleCloseModal = () => {
    setSelectedCoffee(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Coffee Menu</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Coffee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCoffees.map(coffee => (
          <CoffeeCard 
            key={coffee.id} 
            coffee={coffee} 
            onClick={handleCoffeeClick} 
          />
        ))}
      </div>
      
      {/* Coffee Detail Modal */}
      {selectedCoffee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-primary">{selectedCoffee.name}</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="h-64 bg-gray-200 my-4 rounded-lg flex items-center justify-center text-gray-500">
                Coffee Image
              </div>
              
              <p className="text-gray-700 mb-4">{selectedCoffee.description}</p>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-accent text-xl font-bold">${selectedCoffee.price.toFixed(2)}</span>
                <span className="text-sm px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                  {selectedCoffee.category}
                </span>
              </div>
              
              {selectedCoffee.customizable && selectedCoffee.options && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Customize Your Order</h3>
                  
                  {Object.entries(selectedCoffee.options).map(([optionName, values]) => (
                    <div key={optionName} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {optionName}
                      </label>
                      
                      <div className="flex flex-wrap gap-2">
                        {values.map(value => (
                          <label 
                            key={value} 
                            className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                          >
                            <input 
                              type="radio" 
                              name={optionName} 
                              value={value} 
                              className="mr-2"
                            />
                            {value}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-white py-3 rounded-md font-medium hover:bg-accent transition-colors">
                  Add to Order
                </button>
                
                <button className="flex-1 border border-primary text-primary py-3 rounded-md font-medium hover:bg-primary/5 transition-colors">
                  Customize More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
