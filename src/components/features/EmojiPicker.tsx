import React, { useState } from 'react';

// Common emojis for WhatsApp messages
const COMMON_EMOJIS = [
  '😊', '😂', '❤️', '👍', '🙏', '😍',
  '😘', '🤔', '😭', '😎', '👋', '🎉',
  '🔥', '💯', '🙌', '✅', '⭐', '💪',
  '🤣', '😁', '🥰', '😉', '🤗', '👏'
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Insert emoji"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-8 left-0 z-10 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
          <div className="grid grid-cols-6 gap-1">
            {COMMON_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
