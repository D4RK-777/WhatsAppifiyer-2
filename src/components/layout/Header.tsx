import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-whatsapp text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            WhatsAppifiyer
          </Link>
          <span className="ml-2 text-xs bg-white text-whatsapp px-2 py-0.5 rounded-full">
            Beta
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-green-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-200 transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
