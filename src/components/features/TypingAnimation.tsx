import React from 'react';

const TypingAnimation: React.FC = () => {
  return (
    <div className="max-w-md mx-auto whatsapp-chat-bg p-4 rounded-lg shadow-md transition-colors duration-200">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm relative w-24 transition-colors duration-200">
        {/* Message bubble tail */}
        <div className="absolute top-0 left-[-10px] w-0 h-0
                       border-t-[10px] border-t-transparent
                       border-r-[10px] border-r-white dark:border-r-gray-700
                       border-b-[10px] border-b-transparent transition-colors duration-200">
        </div>

        <div className="flex space-x-1 justify-center items-center h-5">
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce transition-colors duration-200" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce transition-colors duration-200" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce transition-colors duration-200" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;
