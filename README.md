# WhatsAppifiyer

A modern web application for creating perfect WhatsApp messages using AI.

## Features

- Input content in any format
- Select from various message types (casual, professional, announcements, etc.)
- Choose from different AI models
- Generate perfectly formatted WhatsApp messages
- Copy messages to clipboard with one click

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Hugging Face API
- OpenRouter API

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

1. Enter your content in the text area
2. Select a message type
3. Choose an AI model
4. Click "Generate Perfect WhatsApp Message"
5. Copy the generated message to your clipboard
6. Paste into WhatsApp and send

## License

This project is licensed under the MIT License.
