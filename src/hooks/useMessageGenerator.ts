import { useState } from 'react';
import { generateMessage } from '../api';
import { Model, UseCase } from '../types/models';

interface UseMessageGeneratorResult {
  generateWhatsAppMessage: (content: string, useCase: UseCase, model: Model) => Promise<void>;
  generatedMessage: string;
  isGenerating: boolean;
  error: string | null;
}

export const useMessageGenerator = (): UseMessageGeneratorResult => {
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateWhatsAppMessage = async (content: string, useCase: UseCase, model: Model) => {
    try {
      setIsGenerating(true);
      setError(null);

      const result = await generateMessage({
        content,
        useCase,
        model,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      setGeneratedMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateWhatsAppMessage,
    generatedMessage,
    isGenerating,
    error,
  };
};
