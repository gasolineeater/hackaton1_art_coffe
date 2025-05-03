import { useState } from 'react';
import { coffeeOptions, CoffeeOption } from '../data/coffeeData';
import { useCart } from '../context/CartContext';

const ScanOrderPage = () => {
  const { addToCart } = useCart();
  const [tableNumber, setTableNumber] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [localCart, setLocalCart] = useState<{ item: CoffeeOption; quantity: number }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Mock function to simulate QR code scanning
  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      setTableNumber('12'); // Mock table number from QR code
    }, 2000);
  };

  const handleAddToCart = (coffee: CoffeeOption) => {
    const existingItemIndex = localCart.findIndex(item => item.item.id === coffee.id);

    if (existingItemIndex >= 0) {
      // Item already in cart, increase quantity
      const updatedCart = [...localCart];
      updatedCart[existingItemIndex].quantity += 1;
      setLocalCart(updatedCart);
    } else {
      // Add new item to cart
      setLocalCart([...localCart, { item: coffee, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (coffeeId: string) => {
    const existingItemIndex = localCart.findIndex(item => item.item.id === coffeeId);

    if (existingItemIndex >= 0) {
      const updatedCart = [...localCart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        // Decrease quantity
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        // Remove item from cart
        updatedCart.splice(existingItemIndex, 1);
      }
      setLocalCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    // Add all items to the global cart
    localCart.forEach(item => {
      // Add table number as a special instruction
      const tableInfo = `Table #${tableNumber}`;
      const instructions = specialInstructions
        ? `${tableInfo} - ${specialInstructions}`
        : tableInfo;

      addToCart(item.item, item.quantity, undefined, instructions);
    });

    // Show order confirmation
    setOrderPlaced(true);
  };

  const handleNewOrder = () => {
    setLocalCart([]);
    setOrderPlaced(false);
    setIsScanned(false);
    setTableNumber('');
    setSpecialInstructions('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Scan & Order</h1>

      {!isScanned ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code at Your Table</h2>
          <p className="text-gray-600 mb-6">
            Scan the QR code on your table to place an order directly from your seat.
            No need to wait in line!
          </p>

          <div className="mb-6">
            {isScanning ? (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse text-primary text-4xl mb-2">
                    ⟳
                  </div>
                  <p>Scanning...</p>
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p>Ready to scan</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full py-3 rounded-md font-medium ${
              isScanning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-accent'
            }`}
          >
            {isScanning ? 'Scanning...' : 'Scan QR Code'}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            Or enter your table number manually:
          </p>

          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Table Number"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button
              onClick={() => setIsScanned(true)}
              disabled={!tableNumber}
              className={`px-4 py-2 rounded-r-md ${
                tableNumber
                  ? 'bg-primary text-white hover:bg-accent'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!orderPlaced ? (
            <div>
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Table #{tableNumber}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Ready to Order
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Menu</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coffeeOptions.map(coffee => (
                      <div
                        key={coffee.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex"
                      >
                        <div className="w-24 bg-gray-200 flex-shrink-0"></div>
                        <div className="p-3 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{coffee.name}</h3>
                            <span className="text-accent font-bold">${coffee.price.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{coffee.description}</p>
                          <button
                            onClick={() => handleAddToCart(coffee)}
                            className="mt-2 px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-accent"
                          >
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                    <h2 className="text-xl font-semibold mb-4">Your Order</h2>

                    {localCart.length === 0 ? (
                      <p className="text-gray-500 text-center py-6">
                        Your order is empty. Add items from the menu.
                      </p>
                    ) : (
                      <div>
                        <div className="space-y-3 mb-4">
                          {localCart.map((item) => (
                            <div key={item.item.id} className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{item.item.name}</h4>
                                <p className="text-sm text-gray-500">${item.item.price.toFixed(2)} each</p>
                              </div>

                              <div className="flex items-center">
                                <button
                                  onClick={() => handleRemoveFromCart(item.item.id)}
                                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  onClick={() => handleAddToCart(item.item)}
                                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Special Instructions
                          </label>
                          <textarea
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            placeholder="Any special requests for your order?"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            rows={2}
                          />
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4 mb-4">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          onClick={handlePlaceOrder}
                          className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-accent"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-6xl mb-4 text-green-500">✓</div>
              <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been sent to the kitchen. We'll bring it to Table #{tableNumber} shortly.
              </p>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                {localCart.map((item) => (
                  <div key={item.item.id} className="flex justify-between text-sm mb-1">
                    <span>{item.quantity}x {item.item.name}</span>
                    <span>${(item.item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2 font-bold flex justify-between">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleNewOrder}
                className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-accent"
              >
                Place Another Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanOrderPage;
