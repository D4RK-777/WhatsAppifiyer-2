import React from 'react';
import MessageGenerator from '../features/MessageGenerator';
import { LogoCarousel } from '../ui/logo-carousel';
import { logoData } from '../ui/logos';

const Home: React.FC = () => {
  return (
    <div>
<div className="text-center mb-12">
  <h1 className="text-5xl font-extrabold mb-6 text-whatsapp dark:text-whatsapp-light">
    Create Perfect WhatsApp Messages
  </h1>
  <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
    Input your content in any format, select your use case, and let our AI generate the perfect WhatsApp message for you.
  </p>
</div>

<div className="max-w-6xl mx-auto mb-20">
  <div className="card">
    <MessageGenerator />
  </div>
</div>

      {/* Logo Carousel */}
<div className="mt-20 py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 border-t border-gray-200 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
      Powered by Leading AI Models
    </h2>
    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
      Our platform integrates with the most advanced AI models to deliver high-quality WhatsApp Business messages
    </p>
    <div className="flex justify-center py-6">
      <LogoCarousel logos={logoData} columnCount={4} />
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;
