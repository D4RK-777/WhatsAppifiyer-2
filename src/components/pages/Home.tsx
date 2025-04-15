import React from 'react';
import MessageGenerator from '../features/MessageGenerator';
import { LogoCarousel } from '../ui/logo-carousel';
import { logoData } from '../ui/logos';

const Home: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Create Perfect WhatsApp Messages
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Input your content in any format, select your use case, and let our AI generate the perfect WhatsApp message for you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <MessageGenerator />
      </div>

      {/* Logo Carousel */}
      <div className="mt-16 py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Powered by Leading AI Models
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Our platform integrates with the most advanced AI models to deliver high-quality WhatsApp Business messages
          </p>
          <div className="flex justify-center py-4">
            <LogoCarousel logos={logoData} columnCount={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
