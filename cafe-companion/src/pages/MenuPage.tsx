import { useState, useEffect } from 'react';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import CoffeeCard from '../components/CoffeeCard';
import RecommendationSection from '../components/RecommendationSection';
import { useCart } from '../context/CartContext';
import {
  getPersonalizedRecommendations,
  getRelatedRecommendations,
  mockUserPreference
} from '../utils/recommendationEngine';

const MenuPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeOption | null>(null);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<CoffeeOption[]>([]);
  const [relatedRecommendations, setRelatedRecommendations] = useState<CoffeeOption[]>([]);
  const [viewedCoffees, setViewedCoffees] = useState<string[]>([]);
  const [selectedCustomizations, setSelectedCustomizations] = useState<{[key: string]: string}>({});

  // Get unique categories
  const categories = Array.from(new Set(coffeeOptions.map(coffee => coffee.category)));

  // Filter coffees by selected category
  const filteredCoffees = selectedCategory
    ? coffeeOptions.filter(coffee => coffee.category === selectedCategory)
    : coffeeOptions;

  // Generate personalized recommendations when component mounts
  useEffect(() => {
    // Create a modified user preference that includes viewed coffees
    const userPref = {
      ...mockUserPreference,
      lastOrdered: [...mockUserPreference.lastOrdered, ...viewedCoffees]
    };

    const recommendations = getPersonalizedRecommendations(
      coffeeOptions,
      userPref,
      undefined,
      3
    );

    setPersonalizedRecommendations(recommendations);
  }, [viewedCoffees]);

  // Generate related recommendations when a coffee is selected
  useEffect(() => {
    if (selectedCoffee) {
      const recommendations = getRelatedRecommendations(
        coffeeOptions,
        selectedCoffee,
        3
      );

      setRelatedRecommendations(recommendations);

      // Add to viewed coffees if not already there
      if (!viewedCoffees.includes(selectedCoffee.id)) {
        setViewedCoffees(prev => [...prev, selectedCoffee.id]);
      }
    } else {
      setRelatedRecommendations([]);
    }
  }, [selectedCoffee]);

  const handleCoffeeClick = (coffee: CoffeeOption) => {
    setSelectedCoffee(coffee);
  };

  const handleCloseModal = () => {
    setSelectedCoffee(null);
    setSelectedCustomizations({});
  };

  // Handle customization selection
  const handleCustomizationChange = (optionName: string, value: string) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  // Add the selected coffee to cart
  const handleAddToCart = () => {
    if (selectedCoffee) {
      addToCart(
        selectedCoffee,
        1,
        Object.keys(selectedCustomizations).length > 0 ? selectedCustomizations : undefined
      );

      // Show success message
      alert(`${selectedCoffee.name} added to cart!`);

      // Close the modal
      handleCloseModal();
    }
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

      {/* Personalized Recommendations */}
      {personalizedRecommendations.length > 0 && !selectedCategory && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold">Recommended For You</h2>
            <div className="ml-3 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              AI Powered
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {personalizedRecommendations.map(coffee => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onClick={handleCoffeeClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Coffee Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {selectedCategory ? `${selectedCategory} Coffees` : 'All Coffees'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoffees.map(coffee => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onClick={handleCoffeeClick}
            />
          ))}
        </div>
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
                              checked={selectedCustomizations[optionName] === value}
                              onChange={() => handleCustomizationChange(optionName, value)}
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
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-3 rounded-md font-medium hover:bg-accent transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleCloseModal}
                  className="flex-1 border border-primary text-primary py-3 rounded-md font-medium hover:bg-primary/5 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Related Recommendations */}
              {relatedRecommendations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold">Customers Also Tried</h3>
                    <div className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      AI Powered
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedRecommendations.map(coffee => (
                      <div
                        key={coffee.id}
                        className="bg-gray-50 rounded-md p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleCloseModal();
                          setTimeout(() => handleCoffeeClick(coffee), 100);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                          <div className="ml-3">
                            <h4 className="font-medium text-sm">{coffee.name}</h4>
                            <p className="text-xs text-gray-500">${coffee.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
