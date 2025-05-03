import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match this with the CSS transition duration
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div
        ref={drawerRef}
        className={`bg-white w-full max-w-md h-full transform transition-transform duration-300 ease-in-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-primary text-white">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-accent"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.coffee.name}</h3>
                        <p className="text-sm text-gray-500">${item.coffee.price.toFixed(2)} each</p>

                        {/* Customizations */}
                        {item.customizations && Object.keys(item.customizations).length > 0 && (
                          <div className="mt-1">
                            <p className="text-xs text-gray-500">Customizations:</p>
                            <ul className="text-xs text-gray-600 ml-2">
                              {Object.entries(item.customizations).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <p className="text-xs text-gray-500 mt-1">
                            Note: {item.specialInstructions}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          ✕
                        </button>

                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-accent font-bold mt-2">
                          ${(item.coffee.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                  <span>Total:</span>
                  <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex-1"
                >
                  Clear Cart
                </button>

                <button
                  onClick={() => alert('Proceeding to checkout!')}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-accent flex-1"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
