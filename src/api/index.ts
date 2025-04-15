import { generateWithHuggingFace } from './huggingface';
import { generateWithOpenRouter } from './openrouter';
import { generateWithGoogle } from './google';
import { ApiResponse } from '../types/api';
import { GenerateMessageParams, GenerateMessageResult } from '../types/app';

export const generateMessage = async ({
  content,
  useCase,
  model,
}: GenerateMessageParams): Promise<GenerateMessageResult> => {
  try {
    const messages = [
      { role: 'system', content: useCase.systemPrompt },
      { role: 'user', content: `Content to transform into a WhatsApp message: ${content}` },
    ];

    let response: ApiResponse;

    if (model.provider === 'huggingface') {
      response = await generateWithHuggingFace(
        model.id,
        messages,
        model.maxTokens,
        0.7,
        'novita' // Default provider for Hugging Face
      );
    } else if (model.provider === 'openrouter') {
      response = await generateWithOpenRouter(
        model.id,
        messages,
        model.maxTokens,
        0.7
      );
    } else if (model.provider === 'google') {
      response = await generateWithGoogle(
        messages,
        model.maxTokens,
        0.7
      );
    } else {
      throw new Error(`Unsupported model provider: ${model.provider}`);
    }

    if (response.error) {
      throw new Error(response.error);
    }

    return {
      message: response.content,
    };
  } catch (error) {
    console.error('Error generating message:', error);
    return {
      message: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
