import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

interface GeneratedMessageProps {
  message: string;
  isLoading: boolean;
}

const GeneratedMessage: React.FC<GeneratedMessageProps> = ({
  message,
  isLoading,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    alert('Message copied to clipboard!');
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-50 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </Card>
    );
  }

  if (!message) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3">Your Perfect WhatsApp Message</h3>
      <Card className="bg-green-50 border border-green-100">
        <div className="whitespace-pre-wrap mb-4">{message}</div>
        <div className="flex justify-end">
          <Button onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GeneratedMessage;
