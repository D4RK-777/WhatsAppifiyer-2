import React from 'react';
import { SavedMessage } from '../../types/app';
import Card from '../common/Card';

interface MessageHistoryProps {
  messages: SavedMessage[];
  onSelectMessage: (message: SavedMessage) => void;
  onDeleteMessage: (id: string) => void;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({
  messages,
  onSelectMessage,
  onDeleteMessage,
}) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">History</h3>
      <div className="space-y-2">
        {messages.map((msg) => (
          <Card key={msg.id} className="bg-gray-50 hover:bg-gray-100 transition-colors p-2">
            <div className="flex justify-between">
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-medium text-gray-600 mr-2 truncate max-w-[120px]">
                    {msg.useCase}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 text-xs line-clamp-1">{msg.message}</p>
              </div>
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={() => onSelectMessage(msg)}
                  className="text-whatsapp hover:text-whatsapp-dark"
                  title="Use this message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteMessage(msg.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageHistory;
