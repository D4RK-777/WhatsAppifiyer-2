import React from 'react';

interface WhatsAppPreviewProps {
  message: string;
  messageCategory?: string;
}

const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ message, messageCategory }) => {
  if (!message) return null;

  // Get the appropriate title based on message category
  const getPreviewTitle = () => {
    if (!messageCategory) return 'WhatsApp Preview';

    switch (messageCategory) {
      case 'utility':
        return 'WhatsApp Business Utility Template Preview';
      case 'authentication':
        return 'WhatsApp Business Authentication Template Preview';
      case 'marketing':
        return 'WhatsApp Business Marketing Template Preview';
      case 'service':
        return 'WhatsApp Business Service Message Preview';
      default:
        return 'WhatsApp Preview';
    }
  };

  // Determine if we should show a template header
  const showTemplateHeader = messageCategory && messageCategory !== 'service';

  return (
    <div className="mt-6 mb-8">
      <h3 className="text-lg font-medium mb-3">{getPreviewTitle()}</h3>
      <div className="max-w-md mx-auto whatsapp-chat-bg p-4 rounded-lg shadow-md transition-colors duration-200 min-h-[500px]">
        {/* WhatsApp header */}
        <div className="bg-whatsapp dark:bg-whatsapp-dark p-2 rounded-t-lg flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <svg className="w-5 h-5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div className="text-white">
            <div className="font-medium">Your Business</div>
            <div className="text-xs opacity-80">Business Account</div>
          </div>
        </div>

        {/* Template header if applicable */}
        {showTemplateHeader && (
          <div className="bg-gray-100 dark:bg-gray-800 p-2 text-xs text-center text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            {messageCategory === 'utility' && 'This is a utility message from a business'}
            {messageCategory === 'authentication' && 'This is an authentication message from a business'}
            {messageCategory === 'marketing' && 'This is a marketing message from a business'}
          </div>
        )}

        {/* Message bubble */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm relative transition-colors duration-200 mt-2 min-h-[400px]">
          {/* Message bubble tail */}
          <div className="absolute top-0 left-[-10px] w-0 h-0
                         border-t-[10px] border-t-transparent
                         border-r-[10px] border-r-white dark:border-r-gray-700
                         border-b-[10px] border-b-transparent transition-colors duration-200">
          </div>

          <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 transition-colors duration-200 break-words overflow-hidden min-h-[350px]">
            <span className="inline-block">{message}</span>
          </div>

          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {' '}
              <svg className="inline-block w-4 h-4 text-[#4FC3F7]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 7l-8 8-4-4-1.5 1.5L9 17l9.5-9.5z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
