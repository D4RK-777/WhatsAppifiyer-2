import { useState, useEffect } from 'react';
import { MODELS, USE_CASES, Model, UseCase } from '../types/models';

interface UseModelsResult {
  models: Model[];
  useCases: UseCase[];
  selectedModel: Model | null;
  selectedUseCase: UseCase | null;
  setSelectedModel: (model: Model) => void;
  setSelectedUseCase: (useCase: UseCase) => void;
}

export const useModels = (): UseModelsResult => {
  const [models, setModels] = useState<Model[]>(MODELS);
  const [useCases, setUseCases] = useState<UseCase[]>(USE_CASES);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  useEffect(() => {
    // Set default selections
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0]);
    }
    
    if (useCases.length > 0 && !selectedUseCase) {
      setSelectedUseCase(useCases[0]);
    }
  }, [models, useCases, selectedModel, selectedUseCase]);

  return {
    models,
    useCases,
    selectedModel,
    selectedUseCase,
    setSelectedModel,
    setSelectedUseCase,
  };
};
