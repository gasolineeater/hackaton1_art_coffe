import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { coffeeOptions } from '../data/coffeeData';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Featured products data
  const featuredProducts = [
    {
      id: "specialty-latte",
      name: "Specialty Latte",
      description: "Our signature latte with house-made syrups and premium espresso.",
      price: 4.50,
      image: "/coffee/latte.jpg"
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      description: "Smooth, low-acidity coffee brewed for 24 hours for a perfect refreshment.",
      price: 4.00,
      image: "/coffee/cold-brew.jpg"
    },
    {
      id: "mocha-frappe",
      name: "Mocha Frappé",
      description: "Blended iced coffee with chocolate, topped with whipped cream.",
      price: 5.00,
      image: "/coffee/frappe.jpg"
    }
  ];

  // Handle adding a featured product to cart
  const handleAddToCart = (product: any) => {
    // Find the corresponding product in coffeeOptions if it exists
    const coffeeProduct = coffeeOptions.find(coffee =>
      coffee.id === product.id || coffee.name.toLowerCase() === product.name.toLowerCase()
    );

    if (coffeeProduct) {
      addToCart(coffeeProduct);
    } else {
      // If not found in coffeeOptions, add the featured product directly
      addToCart(product);
    }

    // Show confirmation
    alert(`${product.name} added to cart!`);
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Art Coffee</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enhancing your coffee experience through technology.
            Customize your orders, earn rewards, and enjoy seamless service.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/custom-order')}
              className="bg-secondary text-primary px-6 py-3 rounded-md font-bold hover:bg-secondary/80 transition-colors"
            >
              Order Now
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="border-2 border-white px-6 py-3 rounded-md font-bold hover:bg-white/10 transition-colors"
            >
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Digital Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Ordering</h3>
              <p className="text-gray-600">
                Customize your coffee exactly how you like it and place orders through our app.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Gift Cards</h3>
              <p className="text-gray-600">
                Send digital gift cards to friends and family for any occasion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Loyalty Program</h3>
              <p className="text-gray-600">
                Earn points with every purchase and redeem them for free items.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan & Order</h3>
              <p className="text-gray-600">
                Scan a QR code at your table and order directly from your seat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Coffees</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                    {product.name}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mt-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-accent font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate('/menu')}
                        className="border border-primary text-primary px-4 py-2 rounded-md text-sm hover:bg-primary/5 transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
