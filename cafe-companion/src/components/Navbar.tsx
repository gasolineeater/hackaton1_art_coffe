import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-secondary">
          Art Coffee
        </Link>
        
        <div className="flex space-x-6">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
