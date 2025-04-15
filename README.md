# WhatsAppifiyer for Business

A modern web application for creating perfect WhatsApp Business messages using AI. WhatsAppifiyer helps businesses craft the ideal messages for customer communication by leveraging powerful language models, following WhatsApp Business Platform guidelines and best practices.

## Features

- Input content in any format (notes, bullet points, ideas, etc.)
- Select from WhatsApp Business message categories (Service, Utility, Authentication, Marketing)
- Choose from different AI models including free options
- Generate perfectly formatted WhatsApp Business messages with placeholders
- Customize messages with WhatsApp formatting (bold, italic, etc.)
- Save and manage your message history
- User accounts to sync your messages across devices
- Dark mode support for comfortable use at any time
- Business-specific message templates for common scenarios
- Real-time WhatsApp Business preview with proper message formatting
- Character counter to ensure messages meet WhatsApp Business limits

## Technology Stack

- React with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for responsive, modern UI
- Google Gemini API for AI text generation
- Hugging Face API for free AI models
- OpenRouter API for additional model options
- Local Storage for message history
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   VITE_HUGGINGFACE_API_URL=https://router.huggingface.co
   VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Enter your content in the text area or select from business message templates
2. Select a WhatsApp Business message category (Service, Utility, Authentication, Marketing)
3. Choose an AI model based on your needs
4. Click "Generate Perfect WhatsApp Message"
5. Customize the generated message with formatting options if needed
6. Preview how the message will appear in WhatsApp Business
7. Copy the generated message to your clipboard
8. Use in your WhatsApp Business Platform implementation

## WhatsApp Business Message Categories

### Service Messages
Responses to customer inquiries within the 24-hour service window. These are free-form messages that don't require pre-approval and can be sent after a customer initiates contact.

### Utility Templates
Transaction-related messages like order confirmations, shipping updates, appointment reminders, and payment receipts. These templates require WhatsApp approval before use.

### Authentication Templates
One-time passcodes and verification messages for account security. These templates are short, focused, and require WhatsApp approval.

### Marketing Templates
Promotional messages for product launches, special offers, event invitations, and other marketing communications. These require explicit user opt-in and WhatsApp approval.

## License

This project is licensed under the MIT License.
