import React, { useState } from 'react';
import Card from '../common/Card';

interface MessageCustomizerProps {
  message: string;
  onApplyCustomization: (customizedMessage: string) => void;
}

interface CustomizationOptions {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  monospace: boolean;
  fontSize: 'small' | 'medium' | 'large';
  addEmoji: string;
}

const MessageCustomizer: React.FC<MessageCustomizerProps> = ({
  message,
  onApplyCustomization,
}) => {
  const [options, setOptions] = useState<CustomizationOptions>({
    bold: false,
    italic: false,
    strikethrough: false,
    monospace: false,
    fontSize: 'medium',
    addEmoji: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: keyof CustomizationOptions, value?: any) => {
    setOptions(prev => ({
      ...prev,
      [option]: value !== undefined ? value : !prev[option],
    }));
  };

  const applyCustomization = () => {
    let customizedMessage = message;

    // Apply text formatting
    if (options.bold) {
      customizedMessage = `*${customizedMessage}*`;
    }
    if (options.italic) {
      customizedMessage = `_${customizedMessage}_`;
    }
    if (options.strikethrough) {
      customizedMessage = `~${customizedMessage}~`;
    }
    if (options.monospace) {
      customizedMessage = `\`\`\`${customizedMessage}\`\`\``;
    }

    // Add emoji if specified
    if (options.addEmoji) {
      customizedMessage = `${options.addEmoji} ${customizedMessage}`;
    }

    onApplyCustomization(customizedMessage);
  };

  if (!message) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-whatsapp hover:text-whatsapp-dark dark:text-whatsapp-light dark:hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        {isOpen ? 'Hide Customization Options' : 'Customize Message'}
      </button>

      {isOpen && (
        <Card className="mt-3 bg-gray-50 dark:bg-gray-800">
          <h4 className="font-medium mb-3">Customize Your Message</h4>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bold"
                checked={options.bold}
                onChange={() => toggleOption('bold')}
                className="mr-2"
              />
              <label htmlFor="bold" className="font-bold">Bold</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="italic"
                checked={options.italic}
                onChange={() => toggleOption('italic')}
                className="mr-2"
              />
              <label htmlFor="italic" className="italic">Italic</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="strikethrough"
                checked={options.strikethrough}
                onChange={() => toggleOption('strikethrough')}
                className="mr-2"
              />
              <label htmlFor="strikethrough" className="line-through">Strikethrough</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="monospace"
                checked={options.monospace}
                onChange={() => toggleOption('monospace')}
                className="mr-2"
              />
              <label htmlFor="monospace" className="font-mono">Monospace</label>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="emoji" className="block text-sm font-medium mb-1">
              Add Emoji Prefix
            </label>
            <input
              type="text"
              id="emoji"
              value={options.addEmoji}
              onChange={(e) => toggleOption('addEmoji', e.target.value)}
              placeholder="Add emoji at the beginning"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={applyCustomization}
              className="px-4 py-2 bg-whatsapp text-white rounded-md hover:bg-whatsapp-dark transition-colors"
            >
              Apply Formatting
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MessageCustomizer;
