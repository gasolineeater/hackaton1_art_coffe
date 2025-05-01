const Footer = () => {
  return (
    <footer className="bg-primary text-white p-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Art Coffee</h3>
            <p className="text-sm">
              Enhancing your coffee experience through technology.
              Customize your orders, earn rewards, and enjoy seamless service.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Hours</h3>
            <ul className="text-sm">
              <li className="mb-2">Monday - Friday: 7:00 AM - 8:00 PM</li>
              <li className="mb-2">Saturday: 8:00 AM - 8:00 PM</li>
              <li className="mb-2">Sunday: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Contact</h3>
            <ul className="text-sm">
              <li className="mb-2">123 Coffee Street</li>
              <li className="mb-2">Tirana, Albania</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Email: info@artcoffee.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Art Coffee. All rights reserved.</p>
          <p className="mt-2">Created for Junction Hackathon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
