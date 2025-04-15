import React from 'react';
import { Model } from '../../types/models';
import Card from '../common/Card';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: Model | null;
  onSelectModel: (model: Model) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select AI Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              selectedModel?.id === model.id
                ? 'ring-2 ring-whatsapp scale-105'
                : ''
            }`}
            onClick={() => onSelectModel(model)}
          >
            <Card className="h-full">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-lg">{model.name}</h4>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                  {model.provider}
                </span>
              </div>
              {model.description && (
                <p className="text-gray-600 text-sm">{model.description}</p>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
