export interface Model {
  id: string;
  name: string;
  provider: 'huggingface' | 'openrouter' | 'google';
  description?: string;
  maxTokens?: number;
  isFree?: boolean;
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export const MODELS: Model[] = [
  // Google Models (Free with API key)
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    description: 'Google\'s fast and efficient model',
    maxTokens: 2048,
    isFree: true,
  },

  // Hugging Face Free Models
  {
    id: 'google/gemma-2-2b-it',
    name: 'Gemma 2 (2B)',
    provider: 'huggingface',
    description: 'A lightweight model good for basic text generation',
    maxTokens: 1024,
    isFree: true,
  },
  {
    id: 'microsoft/phi-3-mini-4k-instruct',
    name: 'Phi-3 Mini',
    provider: 'huggingface',
    description: 'Microsoft\'s compact but capable model',
    maxTokens: 1024,
    isFree: true,
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    name: 'DeepSeek R1 Distill (1.5B)',
    provider: 'huggingface',
    description: 'Smaller variant of one of the most powerful models',
    maxTokens: 2048,
    isFree: true,
  },

  // OpenRouter Free Models
  {
    id: 'rwkv/rwkv-5-world-3b:free',
    name: 'RWKV-5 World (3B)',
    provider: 'openrouter',
    description: 'Free model with good performance for basic tasks',
    maxTokens: 4096,
    isFree: true,
  },
  {
    id: 'nousresearch/nous-capybara-7b:free',
    name: 'Nous Capybara (7B)',
    provider: 'openrouter',
    description: 'Free model with good performance for creative tasks',
    maxTokens: 4096,
    isFree: true,
  },

  // Premium Models (for reference)
  {
    id: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    name: 'Llama 3.1 (8B)',
    provider: 'huggingface',
    description: 'A powerful model for high-quality text generation',
    maxTokens: 2048,
    isFree: false,
  },
  {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openrouter',
    description: 'OpenAI\'s efficient model for most tasks',
    maxTokens: 4096,
    isFree: false,
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'openrouter',
    description: 'Anthropic\'s fast and efficient model',
    maxTokens: 4096,
    isFree: false,
  },
];

export interface UseCase {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  category: 'utility' | 'authentication' | 'marketing' | 'service';
  maxLength?: number;
}

export interface ToneOfVoice {
  id: string;
  name: string;
  description: string;
}

export const USE_CASES: UseCase[] = [
  // Service Messages (Customer Service)
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Respond to customer inquiries within the 24-hour service window',
    category: 'service',
    systemPrompt: 'Create a professional WhatsApp Business message responding to a customer inquiry. The message should be helpful, concise, and solution-oriented. Use a friendly but professional tone, minimal emojis, and clear formatting. Remember this is for a business responding to a customer within the 24-hour service window.',
    maxLength: 1024,
  },
  {
    id: 'issue-resolution',
    name: 'Issue Resolution',
    description: 'Address and resolve customer problems or complaints',
    category: 'service',
    systemPrompt: 'Create a WhatsApp Business message that addresses a customer complaint or issue. Show empathy, take responsibility if appropriate, and offer a clear solution or next steps. Keep the tone professional yet warm, and ensure the message is concise but thorough in addressing the concern.',
    maxLength: 1024,
  },

  // Utility Templates
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    description: 'Confirm order details and provide next steps',
    category: 'utility',
    systemPrompt: 'Create a WhatsApp Business utility template message confirming an order. Include placeholders for order number, items ordered, total amount, estimated delivery date, and a thank you note. The message should be clear, concise, and professional with minimal formatting. Remember this is a transactional message that would be sent as a template.',
    maxLength: 1024,
  },
  {
    id: 'shipping-update',
    name: 'Shipping Update',
    description: 'Notify customers about order shipment status',
    category: 'utility',
    systemPrompt: 'Create a WhatsApp Business utility template message providing a shipping update. Include placeholders for order number, shipping status, tracking number/link, estimated delivery date, and contact information for questions. Keep it concise and informative with a professional tone.',
    maxLength: 1024,
  },
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Remind customers of upcoming appointments',
    category: 'utility',
    systemPrompt: 'Create a WhatsApp Business utility template message reminding a customer of an upcoming appointment. Include placeholders for appointment type, date, time, location, and any preparation instructions. The message should be clear, helpful, and include an option to reschedule if needed.',
    maxLength: 1024,
  },

  // Authentication Templates
  {
    id: 'verification-code',
    name: 'Verification Code',
    description: 'Send one-time passcodes for account verification',
    category: 'authentication',
    systemPrompt: 'Create a WhatsApp Business authentication template message containing a verification code. Include a placeholder for the code, clear instructions on where to enter it, mention of expiration time, and security advice (not to share the code). Keep it extremely concise and straightforward.',
    maxLength: 512,
  },

  // Marketing Templates
  {
    id: 'product-announcement',
    name: 'Product Announcement',
    description: 'Announce new products or services to customers',
    category: 'marketing',
    systemPrompt: 'Create a WhatsApp Business marketing template message announcing a new product or service. Make it engaging and concise with placeholders for product name, key features/benefits, pricing, and a call-to-action. Use a conversational but professional tone that creates excitement without being overly promotional.',
    maxLength: 1024,
  },
  {
    id: 'special-offer',
    name: 'Special Offer',
    description: 'Promote special deals, discounts or limited-time offers',
    category: 'marketing',
    systemPrompt: 'Create a WhatsApp Business marketing template message for a special offer or promotion. Include placeholders for offer details, discount amount/code, validity period, and a clear call-to-action. Make it compelling but not pushy, with a sense of urgency that encourages action.',
    maxLength: 1024,
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    description: 'Invite customers to business events, webinars or workshops',
    category: 'marketing',
    systemPrompt: 'Create a WhatsApp Business marketing template message inviting customers to an event. Include placeholders for event name, date, time, location/platform, brief description of benefits, and RSVP instructions. Make it professional yet enticing, highlighting the value of attending.',
    maxLength: 1024,
  },
];
