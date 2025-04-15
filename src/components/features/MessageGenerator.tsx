import React, { useState } from 'react';
import ContentInput from './ContentInput';
import UseCaseSelector from './UseCaseSelector';
import ModelSelector from './ModelSelector';
import GeneratedMessage from './GeneratedMessage';
import Button from '../common/Button';
import { useModels } from '../../hooks/useModels';
import { useMessageGenerator } from '../../hooks/useMessageGenerator';

const MessageGenerator: React.FC = () => {
  const [content, setContent] = useState('');
  const { models, useCases, selectedModel, selectedUseCase, setSelectedModel, setSelectedUseCase } = useModels();
  const { generateWhatsAppMessage, generatedMessage, isGenerating, error } = useMessageGenerator();

  const handleGenerate = async () => {
    if (!content || !selectedUseCase || !selectedModel) {
      alert('Please fill in all fields');
      return;
    }

    await generateWhatsAppMessage(content, selectedUseCase, selectedModel);
  };

  return (
    <div>
      <ContentInput content={content} setContent={setContent} />
      
      <UseCaseSelector
        useCases={useCases}
        selectedUseCase={selectedUseCase}
        onSelectUseCase={setSelectedUseCase}
      />
      
      <ModelSelector
        models={models}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-center mt-6 mb-8">
        <Button
          onClick={handleGenerate}
          isLoading={isGenerating}
          disabled={!content || !selectedUseCase || !selectedModel}
          className="px-8 py-3 text-lg"
        >
          Generate Perfect WhatsApp Message
        </Button>
      </div>
      
      <GeneratedMessage message={generatedMessage} isLoading={isGenerating} />
    </div>
  );
};

export default MessageGenerator;
