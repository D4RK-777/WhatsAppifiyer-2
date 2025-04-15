import axios from 'axios';
import { ApiResponse } from '../types/api';

const API_KEY = 'AIzaSyCrWMG31q7NZ7dYdImb2zZP0hGTSnCKjrg'; // Google API key

export const generateWithGoogle = async (
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

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;

    return {
      content: generatedText,
    };
  } catch (error) {
    console.error('Error generating with Google API:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred with Google API',
    };
  }
};
