import axios from 'axios';
import { HuggingFaceRequest, HuggingFaceResponse, ApiResponse } from '../types/api';

const API_URL = import.meta.env.VITE_HUGGINGFACE_API_URL;
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export const generateWithHuggingFace = async (
  model: string,
  messages: { role: string; content: string }[],
  maxTokens: number = 1024,
  temperature: number = 0.7,
  provider: string = 'novita'
): Promise<ApiResponse> => {
  try {
    if (!API_KEY) {
      throw new Error('Hugging Face API key is not set');
    }

    const request: HuggingFaceRequest = {
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      provider,
    };

    const response = await axios.post<HuggingFaceResponse>(
      `${API_URL}/${provider}/v3/openai/chat/completions`,
      request,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      content: response.data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error generating with Hugging Face:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
