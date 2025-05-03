import { useState, useEffect } from 'react';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import { getPersonalizedRecommendations, mockUserPreference } from '../utils/recommendationEngine';

interface CustomizationOption {
  name: string;
  value: string;
}

interface CustomizedCoffee {
  base: CoffeeOption;
  options: CustomizationOption[];
}

const CustomOrderPage = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeOption | null>(null);
  const [customizationStep, setCustomizationStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CustomizationOption[]>([]);
  const [customizedCoffees, setCustomizedCoffees] = useState<CustomizedCoffee[]>([]);
  const [recommendations, setRecommendations] = useState<CoffeeOption[]>([]);

  // Filter only customizable coffees
  const customizableCoffees = coffeeOptions.filter(coffee => coffee.customizable);

  // Generate AI recommendations based on order history and preferences
  useEffect(() => {
    // Create a modified user preference based on current order
    const userPref = { ...mockUserPreference };

    // Add any selected options to user preferences
    if (customizedCoffees.length > 0) {
      // Extract flavor preferences from orders
      const flavorPreferences = customizedCoffees
        .flatMap(coffee => coffee.options)
        .filter(option => option.name === 'Flavor' || option.name === 'Extras')
        .map(option => option.value);

      // Extract milk preferences from orders
      const milkPreferences = customizedCoffees
        .flatMap(coffee => coffee.options)
        .filter(option => option.name === 'Milk')
        .map(option => option.value);

      // Update user preferences if we found any
      if (flavorPreferences.length > 0) {
        userPref.flavors = [...new Set([...userPref.flavors, ...flavorPreferences])];
      }

      if (milkPreferences.length > 0) {
        userPref.milkTypes = [...new Set([...userPref.milkTypes, ...milkPreferences])];
      }

      // Add ordered coffee IDs to lastOrdered
      const orderedCoffeeIds = customizedCoffees.map(coffee => coffee.base.id);
      userPref.lastOrdered = [...new Set([...userPref.lastOrdered, ...orderedCoffeeIds])];
    }

    // Get personalized recommendations
    const aiRecommendations = getPersonalizedRecommendations(
      customizableCoffees,
      userPref,
      selectedCoffee?.id,
      3
    );

    setRecommendations(aiRecommendations);
  }, [customizedCoffees, selectedCoffee]);

  const handleCoffeeSelect = (coffee: CoffeeOption) => {
    setSelectedCoffee(coffee);
    setCustomizationStep(1);
    setSelectedOptions([]);
  };

  const handleOptionSelect = (optionName: string, value: string) => {
    // Check if this option type is already selected
    const existingOptionIndex = selectedOptions.findIndex(
      option => option.name === optionName
    );

    if (existingOptionIndex >= 0) {
      // Replace existing option
      const updatedOptions = [...selectedOptions];
      updatedOptions[existingOptionIndex] = { name: optionName, value };
      setSelectedOptions(updatedOptions);
    } else {
      // Add new option
      setSelectedOptions([...selectedOptions, { name: optionName, value }]);
    }
  };

  const handleNextStep = () => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionKeys = Object.keys(selectedCoffee.options);
      if (customizationStep < optionKeys.length) {
        setCustomizationStep(customizationStep + 1);
      } else {
        // Final step, add to cart
        if (selectedCoffee) {
          setCustomizedCoffees([
            ...customizedCoffees,
            { base: selectedCoffee, options: selectedOptions }
          ]);
          setSelectedCoffee(null);
          setCustomizationStep(1);
          setSelectedOptions([]);
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (customizationStep > 1) {
      setCustomizationStep(customizationStep - 1);
    }
  };

  const getCurrentOptionName = (): string => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionKeys = Object.keys(selectedCoffee.options);
      if (customizationStep <= optionKeys.length) {
        return optionKeys[customizationStep - 1];
      }
    }
    return '';
  };

  const getCurrentOptionValues = (): string[] => {
    if (selectedCoffee && selectedCoffee.options) {
      const optionName = getCurrentOptionName();
      return selectedCoffee.options[optionName] || [];
    }
    return [];
  };

  const getSelectedValueForOption = (optionName: string): string => {
    const option = selectedOptions.find(opt => opt.name === optionName);
    return option ? option.value : '';
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...customizedCoffees];
    updatedCart.splice(index, 1);
    setCustomizedCoffees(updatedCart);
  };

  const calculateTotal = () => {
    return customizedCoffees.reduce((total, item) => total + item.base.price, 0);
  };

  const handlePlaceOrder = () => {
    // In a real app, this would send the order to a backend
    alert('Your custom order has been placed!');
    setCustomizedCoffees([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Customize Your Coffee</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {selectedCoffee ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{selectedCoffee.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedCoffee.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCoffee(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <div className="flex mb-4">
                  {selectedCoffee.options && Object.keys(selectedCoffee.options).map((optionName, index) => (
                    <div
                      key={optionName}
                      className={`flex-1 text-center py-2 ${
                        index + 1 === customizationStep
                          ? 'border-b-2 border-primary text-primary font-medium'
                          : index + 1 < customizationStep
                            ? 'border-b-2 border-green-500 text-green-500'
                            : 'border-b border-gray-200 text-gray-500'
                      }`}
                    >
                      {optionName}
                      {index + 1 < customizationStep && getSelectedValueForOption(optionName) && (
                        <span className="ml-1 text-xs">
                          ({getSelectedValueForOption(optionName)})
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-3">
                  Select {getCurrentOptionName()}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {getCurrentOptionValues().map(value => (
                    <label
                      key={value}
                      className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                        getSelectedValueForOption(getCurrentOptionName()) === value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={getCurrentOptionName()}
                        value={value}
                        checked={getSelectedValueForOption(getCurrentOptionName()) === value}
                        onChange={() => handleOptionSelect(getCurrentOptionName(), value)}
                        className="mr-2"
                      />
                      {value}
                    </label>
                  ))}
                </div>

                <div className="flex justify-between">
                  {customizationStep > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}

                  <button
                    onClick={handleNextStep}
                    disabled={!getSelectedValueForOption(getCurrentOptionName())}
                    className={`px-6 py-2 rounded-md ${
                      getSelectedValueForOption(getCurrentOptionName())
                        ? 'bg-primary text-white hover:bg-accent'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {customizationStep < Object.keys(selectedCoffee.options || {}).length
                      ? 'Next'
                      : 'Add to Order'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a Coffee to Customize</h2>

              {/* AI Recommendations */}
              {recommendations.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Recommended For You</h3>
                    <div className="ml-3 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      AI Powered
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendations.map(coffee => (
                      <div
                        key={coffee.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleCoffeeSelect(coffee)}
                      >
                        <div className="h-24 bg-gray-200 relative">
                          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                            Coffee Image
                          </div>
                        </div>

                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-primary text-sm">{coffee.name}</h3>
                            <span className="text-accent font-bold text-sm">${coffee.price.toFixed(2)}</span>
                          </div>

                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">{coffee.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-4">All Customizable Coffees</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {customizableCoffees.map(coffee => (
                  <div
                    key={coffee.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCoffeeSelect(coffee)}
                  >
                    <div className="h-32 bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                        Coffee Image
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-primary">{coffee.name}</h3>
                        <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
                      </div>

                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{coffee.description}</p>

                      <div className="mt-3">
                        <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                          Customizable
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Your Custom Order</h2>

            {customizedCoffees.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                Your order is empty. Customize a coffee to add it here.
              </p>
            ) : (
              <div>
                <div className="space-y-4 mb-6">
                  {customizedCoffees.map((coffee, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{coffee.base.name}</h3>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          ✕
                        </button>
                      </div>

                      <ul className="mt-1 text-sm text-gray-600">
                        {coffee.options.map((option, optIndex) => (
                          <li key={optIndex}>
                            {option.name}: <span className="font-medium">{option.value}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-2 text-accent font-bold">
                        ${coffee.base.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-accent"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderPage;
