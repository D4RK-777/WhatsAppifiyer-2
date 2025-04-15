import React from 'react';
import { UseCase } from '../../types/models';
import Card from '../common/Card';

interface UseCaseSelectorProps {
  useCases: UseCase[];
  selectedUseCase: UseCase | null;
  onSelectUseCase: (useCase: UseCase) => void;
}

const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({
  useCases,
  selectedUseCase,
  onSelectUseCase,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select Message Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((useCase) => (
          <div
            key={useCase.id}
            className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              selectedUseCase?.id === useCase.id
                ? 'ring-2 ring-whatsapp scale-105'
                : ''
            }`}
            onClick={() => onSelectUseCase(useCase)}
          >
            <Card className="h-full">
              <h4 className="font-medium text-lg mb-2">{useCase.name}</h4>
              <p className="text-gray-600 text-sm">{useCase.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCaseSelector;
