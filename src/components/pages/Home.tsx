import React from 'react';
import MessageGenerator from '../features/MessageGenerator';

const Home: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Create Perfect WhatsApp Messages
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Input your content in any format, select your use case, and let our AI generate the perfect WhatsApp message for you.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <MessageGenerator />
      </div>
    </div>
  );
};

export default Home;
