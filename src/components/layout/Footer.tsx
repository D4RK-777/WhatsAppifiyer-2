import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} WhatsAppifiyer. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-whatsapp transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-whatsapp transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
