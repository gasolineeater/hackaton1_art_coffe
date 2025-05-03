import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CustomOrderPage from './pages/CustomOrderPage';
import LoyaltyPage from './pages/LoyaltyPage';
import GiftCardPage from './pages/GiftCardPage';
import ScanOrderPage from './pages/ScanOrderPage';

// Context
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/custom-order" element={<CustomOrderPage />} />
              <Route path="/loyalty" element={<LoyaltyPage />} />
              <Route path="/gift-cards" element={<GiftCardPage />} />
              <Route path="/scan" element={<ScanOrderPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
