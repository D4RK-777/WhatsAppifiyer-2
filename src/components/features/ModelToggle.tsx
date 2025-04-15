import React, { useState } from 'react';
import { Model } from '../../types/models';
import ModelSelector from './ModelSelector';

interface ModelToggleProps {
  models: Model[];
  selectedModel: Model | null;
  onSelectModel: (model: Model) => void;
}

const ModelToggle: React.FC<ModelToggleProps> = ({
  models,
  selectedModel,
  onSelectModel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-24 z-20 bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full p-2 shadow-lg transition-all duration-200"
        title="AI Model Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed right-4 top-36 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-80 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">AI Model Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onSelectModel={(model) => {
              onSelectModel(model);
              setIsOpen(false);
            }}
          />
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-25"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ModelToggle;
