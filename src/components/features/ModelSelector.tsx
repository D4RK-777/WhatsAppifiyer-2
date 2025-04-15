import React from 'react';
import { Model } from '../../types/models';
import Card from '../common/Card';
import GlowingCard from '../common/GlowingCard';

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
    <div>
      <h3 className="text-lg font-medium mb-3">AI Model</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
        {models.map((model) => (
          <div
            key={model.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedModel?.id === model.id
                ? 'ring-2 ring-whatsapp'
                : ''
            }`}
            onClick={() => onSelectModel(model)}
          >
            <GlowingCard
              className="h-full p-3"
              type="model"
              disabled={false}
              glow={selectedModel?.id === model.id}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{model.name}</h4>
                <div className="flex space-x-1">
                  {model.isFree && (
                    <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full text-[10px]">
                      Free
                    </span>
                  )}
                  <span className="text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-full text-[10px]">
                    {model.provider}
                  </span>
                </div>
              </div>
              {model.description && (
                <p className="text-gray-600 text-xs dark:text-gray-300 line-clamp-2">{model.description}</p>
              )}
            </GlowingCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
