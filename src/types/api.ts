// Hugging Face API types
export interface HuggingFaceMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface HuggingFaceRequest {
  model: string;
  messages: HuggingFaceMessage[];
  max_tokens?: number;
  temperature?: number;
  provider: string;
}

export interface HuggingFaceResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

// OpenRouter API types
export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  max_tokens?: number;
  temperature?: number;
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

// Generic API types
export interface ApiRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
  provider?: string;
}

export interface ApiResponse {
  content: string;
  error?: string;
}
