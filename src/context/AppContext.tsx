import { createContext, useContext, useState, ReactNode } from 'react';

// Define types
type ModelProvider = 'huggingface' | 'openrouter';

interface Model {
  id: string;
  name: string;
  provider: ModelProvider;
}

interface UseCase {
  id: string;
  name: string;
  description: string;
}

interface AppContextType {
  content: string;
  setContent: (content: string) => void;
  selectedUseCase: UseCase | null;
  setSelectedUseCase: (useCase: UseCase | null) => void;
  selectedModel: Model | null;
  setSelectedModel: (model: Model | null) => void;
  generatedMessage: string;
  setGeneratedMessage: (message: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<string>('');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const value = {
    content,
    setContent,
    selectedUseCase,
    setSelectedUseCase,
    selectedModel,
    setSelectedModel,
    generatedMessage,
    setGeneratedMessage,
    isGenerating,
    setIsGenerating,
    error,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
