import axios from 'axios';
import { OpenRouterRequest, OpenRouterResponse, ApiResponse } from '../types/api';
import { createRetryableApi } from '../utils/apiRetry';
import { logApiError, ErrorSeverity } from '../utils/logging';

const API_URL = import.meta.env.VITE_OPENROUTER_API_URL;
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Base function without retry logic
const generateWithOpenRouterBase = async (
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

    // Log the API request (without sensitive data)
    console.log(`Sending request to OpenRouter API: ${model}`);

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
        timeout: 30000, // 30 second timeout
      }
    );

    // Validate response
    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('Invalid response from OpenRouter API: No choices returned');
    }

    return {
      content: response.data.choices[0].message.content,
    };
  } catch (error) {
    // Log detailed error information
    logApiError(
      error instanceof Error ? error : new Error('Unknown error with OpenRouter API'),
      ErrorSeverity.MEDIUM,
      'OpenRouterAPI',
      {
        model,
        statusCode: (error as any)?.response?.status,
        statusText: (error as any)?.response?.statusText,
      }
    );

    console.error('Error generating with OpenRouter:', error);

    // Return a user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const userFriendlyError = errorMessage.includes('timeout')
      ? 'The request to the AI service timed out. Please try again.'
      : `Error connecting to OpenRouter API: ${errorMessage}`;

    return {
      content: '',
      error: userFriendlyError,
    };
  }
};

// Create a retryable version of the API function
export const generateWithOpenRouter = createRetryableApi(generateWithOpenRouterBase, {
  maxRetries: 2,
  initialDelay: 1000,
  onRetry: (error, retryCount) => {
    console.log(`Retrying OpenRouter API call (${retryCount}/2): ${error.message}`);
  }
});
