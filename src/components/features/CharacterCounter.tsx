import React from 'react';

interface CharacterCounterProps {
  text: string;
  maxLength?: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({
  text,
  maxLength = 1024, // WhatsApp has a limit of around 65,536 characters, but we'll use a smaller default
}) => {
  const charCount = text.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  return (
    <div className={`text-xs mt-1 text-right ${
      isOverLimit 
        ? 'text-red-600 font-medium' 
        : isNearLimit 
          ? 'text-amber-600' 
          : 'text-gray-500'
    }`}>
      {charCount} / {maxLength} characters
      {isOverLimit && (
        <span className="ml-1">
          (Message too long for WhatsApp)
        </span>
      )}
    </div>
  );
};

export default CharacterCounter;
