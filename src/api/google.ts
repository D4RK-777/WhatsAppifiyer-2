import axios from 'axios';
import { ApiResponse } from '../types/api';
import { createRetryableApi } from '../utils/apiRetry';
import { logApiError, ErrorSeverity } from '../utils/logging';

const API_KEY = 'AIzaSyCrWMG31q7NZ7dYdImb2zZP0hGTSnCKjrg'; // Google API key

// Base function without retry logic
const generateWithGoogleBase = async (
  messages: { role: string; content: string }[],
  maxTokens: number = 1024,
  temperature: number = 0.7
): Promise<ApiResponse> => {
  try {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const request = {
      contents: formattedMessages,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: temperature
      }
    };

    // Log the API request (without sensitive data)
    console.log(`Sending request to Google Gemini API`);

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    // Validate response
    if (!response.data.candidates || response.data.candidates.length === 0) {
      throw new Error('Invalid response from Google API: No candidates returned');
    }

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;

    return {
      content: generatedText,
    };
  } catch (error) {
    // Log detailed error information
    logApiError(
      error instanceof Error ? error : new Error('Unknown error with Google API'),
      ErrorSeverity.MEDIUM,
      'GoogleAPI',
      {
        statusCode: (error as any)?.response?.status,
        statusText: (error as any)?.response?.statusText,
      }
    );

    console.error('Error generating with Google API:', error);

    // Return a user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const userFriendlyError = errorMessage.includes('timeout')
      ? 'The request to the Google AI service timed out. Please try again.'
      : `Error connecting to Google API: ${errorMessage}`;

    return {
      content: '',
      error: userFriendlyError,
    };
  }
};

// Create a retryable version of the API function
export const generateWithGoogle = createRetryableApi(generateWithGoogleBase, {
  maxRetries: 2,
  initialDelay: 1000,
  onRetry: (error, retryCount) => {
    console.log(`Retrying Google API call (${retryCount}/2): ${error.message}`);
  }
});
