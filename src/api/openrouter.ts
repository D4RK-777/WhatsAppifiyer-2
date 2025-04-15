import axios from 'axios';
import { OpenRouterRequest, OpenRouterResponse, ApiResponse } from '../types/api';

const API_URL = import.meta.env.VITE_OPENROUTER_API_URL;
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateWithOpenRouter = async (
  model: string,
  messages: { role: string; content: string }[],
  maxTokens: number = 1024,
  temperature: number = 0.7
): Promise<ApiResponse> => {
  try {
    if (!API_KEY) {
      throw new Error('OpenRouter API key is not set');
    }

    const request: OpenRouterRequest = {
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    };

    const response = await axios.post<OpenRouterResponse>(
      `${API_URL}/chat/completions`,
      request,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'WhatsAppifiyer',
        },
      }
    );

    return {
      content: response.data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error generating with OpenRouter:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
