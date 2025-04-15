import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import WhatsAppPreview from './WhatsAppPreview';
import TypingAnimation from './TypingAnimation';
import CharacterCounter from './CharacterCounter';
import MessageCustomizer from './MessageCustomizer';

interface GeneratedMessageProps {
  message: string;
  isLoading: boolean;
  onSaveMessage?: () => void;
  onUpdateMessage?: (updatedMessage: string) => void;
  maxLength?: number;
  messageCategory?: string;
}

const GeneratedMessage: React.FC<GeneratedMessageProps> = ({
  message,
  isLoading,
  onSaveMessage,
  onUpdateMessage,
  maxLength = 1024,
  messageCategory,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Generating your message...</h3>
        <TypingAnimation />
      </div>
    );
  }

  if (!message) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3">Your Perfect WhatsApp Message</h3>
      <Card className={`${messageCategory === 'marketing' ? 'bg-green-50 border border-green-100' :
                       messageCategory === 'utility' ? 'bg-blue-50 border border-blue-100' :
                       messageCategory === 'authentication' ? 'bg-purple-50 border border-purple-100' :
                       messageCategory === 'service' ? 'bg-amber-50 border border-amber-100' :
                       'bg-green-50 border border-green-100'}`}>
        <div className="whitespace-pre-wrap mb-4">{message}</div>
        <CharacterCounter text={message} maxLength={maxLength} />
        <div className="flex justify-between mt-4">
          {onSaveMessage && (
            <Button
              variant="secondary"
              onClick={onSaveMessage}
            >
              Save Message
            </Button>
          )}
          <Button onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </div>
      </Card>

      {onUpdateMessage && (
        <MessageCustomizer
          message={message}
          onApplyCustomization={onUpdateMessage}
        />
      )}

      <WhatsAppPreview message={message} messageCategory={messageCategory} />
    </div>
  );
};

export default GeneratedMessage;
