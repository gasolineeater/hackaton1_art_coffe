import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = getItemCount();

  return (
    <>
      <nav className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-secondary">
            Art Coffee
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/menu" className="hover:text-secondary transition-colors">
              Menu
            </Link>
            <Link to="/custom-order" className="hover:text-secondary transition-colors">
              Custom Order
            </Link>
            <Link to="/loyalty" className="hover:text-secondary transition-colors">
              Loyalty
            </Link>
            <Link to="/gift-cards" className="hover:text-secondary transition-colors">
              Gift Cards
            </Link>
            <Link to="/scan" className="hover:text-secondary transition-colors">
              Scan & Order
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 rounded-full hover:bg-primary-dark transition-colors"
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
