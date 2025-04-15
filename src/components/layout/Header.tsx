import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import UserMenu from '../auth/UserMenu';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

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
        <div className="flex items-center space-x-6">
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
          <ThemeToggle />
          <UserMenu onLogin={handleOpenAuthModal} />
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </header>
  );
};

export default Header;
