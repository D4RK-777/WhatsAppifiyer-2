import React, { useState, useEffect } from 'react';
import ContentInput from './ContentInput';
import UseCaseSelector from './UseCaseSelector';
import ModelSelector from './ModelSelector';
import GeneratedMessage from './GeneratedMessage';
import MessageHistory from './MessageHistory';
import TemplateSelector from './TemplateSelector';
import Button from '../common/Button';
import { useModels } from '../../hooks/useModels';
import { useMessageGenerator } from '../../hooks/useMessageGenerator';
import { useAuth } from '../../context/AuthContext';
import { SavedMessage } from '../../types/app';
import {
  logUserAction,
  logGeneration,
  logApiError,
  logCreate,
  logDelete,
  ErrorSeverity,
} from '../../utils/logging';

const STORAGE_KEY = 'whatsappifiyer_saved_messages';

const MessageGenerator: React.FC = () => {
  const [content, setContent] = useState('');
  const { models, useCases, selectedModel, selectedUseCase, setSelectedModel, setSelectedUseCase } = useModels();
  const { generateWhatsAppMessage, generatedMessage: originalGeneratedMessage, isGenerating, error } = useMessageGenerator();
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);
  const { isAuthenticated, user } = useAuth();

  // Create a user-specific storage key if authenticated
  const userStorageKey = isAuthenticated && user ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;

  // Update generatedMessage when originalGeneratedMessage changes
  useEffect(() => {
    if (originalGeneratedMessage) {
      setGeneratedMessage(originalGeneratedMessage);
    }
  }, [originalGeneratedMessage]);

  // Load saved messages from localStorage on component mount or when user changes
  useEffect(() => {
    const storedMessages = localStorage.getItem(userStorageKey);
    if (storedMessages) {
      try {
        setSavedMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    } else {
      // Clear messages if no stored messages for this user
      setSavedMessages([]);
    }
  }, [userStorageKey]);

  const handleGenerate = async () => {
    if (!content || !selectedUseCase || !selectedModel) {
      alert('Please fill in all fields');
      return;
    }

    // Log the generation attempt
    logUserAction('generate_message', {
      useCase: selectedUseCase.id,
      modelId: selectedModel.id,
      contentLength: content.length,
    }, user?.id);

    try {
      await generateWhatsAppMessage(content, selectedUseCase, selectedModel);

      // Log successful generation
      logGeneration('message_generated', {
        useCase: selectedUseCase.id,
        modelId: selectedModel.id,
        success: true,
      }, user?.id);
    } catch (error) {
      // Log generation error
      logApiError(
        error instanceof Error ? error : new Error('Failed to generate message'),
        ErrorSeverity.MEDIUM,
        'MessageGenerator',
        {
          useCase: selectedUseCase.id,
          modelId: selectedModel.id,
          contentLength: content.length,
        },
        user?.id
      );
    }
  };

  const handleUpdateMessage = (updatedMessage: string) => {
    setGeneratedMessage(updatedMessage);
  };

  const handleSaveMessage = () => {
    if (!generatedMessage || !selectedUseCase) return;

    const messageId = Date.now().toString();
    const newMessage: SavedMessage = {
      id: messageId,
      message: generatedMessage,
      useCase: selectedUseCase.name,
      timestamp: Date.now(),
    };

    const updatedMessages = [newMessage, ...savedMessages];
    setSavedMessages(updatedMessages);
    localStorage.setItem(userStorageKey, JSON.stringify(updatedMessages));

    // Log message save action
    logUserAction('save_message', {
      messageId,
      useCase: selectedUseCase.id,
    }, user?.id);

    // Log message creation in change log
    logCreate('saved_message', messageId, {
      useCase: selectedUseCase.id,
      length: generatedMessage.length,
    }, user?.id);
  };

  const handleSelectSavedMessage = (message: SavedMessage) => {
    // Find the use case by name
    const useCase = useCases.find(uc => uc.name === message.useCase) || useCases[0];
    setSelectedUseCase(useCase);

    // Set the message content to the saved message content
    setContent(message.message);

    // Log the selection of a saved message
    logUserAction('select_saved_message', {
      messageId: message.id,
      useCase: useCase.id,
    }, user?.id);

    // Generate a new message with the saved content
    if (selectedModel) {
      generateWhatsAppMessage(message.message, useCase, selectedModel);
    }
  };

  const handleDeleteMessage = (id: string) => {
    const messageToDelete = savedMessages.find(msg => msg.id === id);
    const updatedMessages = savedMessages.filter(msg => msg.id !== id);
    setSavedMessages(updatedMessages);
    localStorage.setItem(userStorageKey, JSON.stringify(updatedMessages));

    // Log message deletion
    if (messageToDelete) {
      logUserAction('delete_message', {
        messageId: id,
        useCase: useCases.find(uc => uc.name === messageToDelete.useCase)?.id,
      }, user?.id);

      // Log in change log
      logDelete('saved_message', id, user?.id);
    }
  };

  return (
    <div className="relative">
      {/* Left column - Input and controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <div className="mb-6">
            <ContentInput content={content} setContent={setContent} />

            {error && (
              <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-3 pb-2 z-10 mt-4">
              <Button
                onClick={handleGenerate}
                isLoading={isGenerating}
                disabled={!content || !selectedUseCase || !selectedModel}
                className="w-full py-3 text-lg"
              >
                Generate Perfect WhatsApp Message
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[400px] pr-2 space-y-4">
            <TemplateSelector
              selectedUseCase={selectedUseCase}
              onSelectTemplate={setContent}
            />

            <MessageHistory
              messages={savedMessages}
              onSelectMessage={handleSelectSavedMessage}
              onDeleteMessage={handleDeleteMessage}
            />
          </div>
        </div>

        {/* Right column - Settings and output */}
        <div>
          <div className="mb-6 space-y-6">
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
          </div>

          <GeneratedMessage
            message={generatedMessage}
            isLoading={isGenerating}
            onSaveMessage={handleSaveMessage}
            onUpdateMessage={handleUpdateMessage}
            maxLength={selectedUseCase?.maxLength}
            messageCategory={selectedUseCase?.category}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;
