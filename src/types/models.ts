export interface Model {
  id: string;
  name: string;
  provider: 'huggingface' | 'openrouter';
  description?: string;
  maxTokens?: number;
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export const MODELS: Model[] = [
  {
    id: 'google/gemma-2-2b-it',
    name: 'Gemma 2 (2B)',
    provider: 'huggingface',
    description: 'A lightweight model good for basic text generation',
    maxTokens: 1024,
  },
  {
    id: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    name: 'Llama 3.1 (8B)',
    provider: 'huggingface',
    description: 'A powerful model for high-quality text generation',
    maxTokens: 2048,
  },
  {
    id: 'microsoft/phi-3-mini-4k-instruct',
    name: 'Phi-3 Mini',
    provider: 'huggingface',
    description: 'Microsoft\'s compact but capable model',
    maxTokens: 1024,
  },
  {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openrouter',
    description: 'OpenAI\'s efficient model for most tasks',
    maxTokens: 4096,
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'openrouter',
    description: 'Anthropic\'s fast and efficient model',
    maxTokens: 4096,
  },
];

export const USE_CASES: UseCase[] = [
  {
    id: 'casual',
    name: 'Casual Conversation',
    description: 'Friendly, informal messages for everyday conversations',
    systemPrompt: 'Create a casual, friendly WhatsApp message that sounds natural and conversational. Use appropriate emojis, keep it brief, and make it sound like a real person talking to a friend.',
  },
  {
    id: 'professional',
    name: 'Professional Communication',
    description: 'Formal messages for work or business contexts',
    systemPrompt: 'Create a professional WhatsApp message that is clear, concise, and appropriate for a business context. Maintain a respectful tone, avoid unnecessary emojis, and ensure the message is well-structured.',
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Messages to share news or updates with a group',
    systemPrompt: 'Create a WhatsApp announcement that effectively communicates important information to a group. Make it attention-grabbing, clear, and include all necessary details. Use formatting like bullet points if appropriate.',
  },
  {
    id: 'invitation',
    name: 'Invitation',
    description: 'Messages to invite people to events or gatherings',
    systemPrompt: 'Create a WhatsApp invitation that is engaging and provides all necessary event details. Include the what, when, where, and any other important information. Make it exciting and encourage a response.',
  },
  {
    id: 'apology',
    name: 'Apology',
    description: 'Messages to say sorry or make amends',
    systemPrompt: 'Create a sincere WhatsApp apology message that acknowledges the mistake, expresses genuine remorse, and offers to make amends. Keep it authentic and avoid making excuses.',
  },
  {
    id: 'congratulations',
    name: 'Congratulations',
    description: 'Messages to celebrate achievements or special occasions',
    systemPrompt: 'Create an enthusiastic WhatsApp congratulatory message that expresses genuine happiness for the recipient\'s achievement or special occasion. Use appropriate celebratory emojis and warm language.',
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    description: 'Messages to express gratitude',
    systemPrompt: 'Create a heartfelt WhatsApp thank you message that specifically mentions what you\'re thankful for and expresses genuine appreciation. Keep it warm and personal.',
  },
];
