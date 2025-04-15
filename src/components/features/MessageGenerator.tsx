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
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // If a specific category is selected, find a use case from that category
    if (category !== 'all') {
      const useCaseFromCategory = useCases.find(uc => uc.category === category);
      if (useCaseFromCategory) {
        setSelectedUseCase(useCaseFromCategory);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
<div className="text-center mb-8">
  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
    Input your content in any format, select your use case, and let our AI generate the perfect WhatsApp message for you.
  </p>
</div>

      {/* Message Type filter at the top */}
<div className="mb-8 flex flex-wrap gap-4 justify-center">
  {['all', 'service', 'utility', 'authentication', 'marketing'].map(category => (
    <button
      key={category}
      onClick={() => handleCategoryChange(category)}
      className={`px-6 py-3 text-base rounded-full transition-colors shadow-md ${category === selectedCategory ? 'bg-whatsapp text-white font-semibold' :
        category === 'service' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
        category === 'utility' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
        category === 'authentication' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
        'bg-green-100 text-green-800 hover:bg-green-200'}`}
    >
      {category === 'all' ? 'All Types' : category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  ))}
</div>

      {/* Main 2-column layout: Input on left, Output on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Input */}
        <div className="w-full">

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Your Content</h3>
          </div>

          <ContentInput content={content} setContent={setContent} />

          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mt-4 mb-6">
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

        {/* Right column - Output */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium">Generated Message</h3>
            <div className="relative">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm"
                onClick={() => document.getElementById('modelSelector')?.classList.toggle('hidden')}
              >
                <span>AI Model</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="modelSelector" className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 z-20 hidden border border-gray-100 dark:border-gray-700">
                <ModelSelector
                  models={models}
                  selectedModel={selectedModel}
                  onSelectModel={setSelectedModel}
                />
              </div>
            </div>
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

      {/* Message Type selector outside of column layout */}
      <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full">
        <UseCaseSelector
          useCases={useCases}
          selectedUseCase={selectedUseCase}
          onSelectUseCase={setSelectedUseCase}
          initialCategory={selectedCategory !== 'all' ? selectedCategory : undefined}
        />
      </div>

      {/* Templates outside of column layout */}
      <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full">
        <TemplateSelector
          selectedUseCase={selectedUseCase}
          onSelectTemplate={setContent}
        />
      </div>

      {/* Message History below */}
      <div className="mt-8">
        <MessageHistory
          messages={savedMessages}
          onSelectMessage={handleSelectSavedMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    </div>
  );
};

export default MessageGenerator;
