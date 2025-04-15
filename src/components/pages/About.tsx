import React from 'react';
import Card from '../common/Card';

const About: React.FC = () => {
  return (
<div className="max-w-4xl mx-auto">
  <h1 className="text-4xl font-extrabold mb-8 text-whatsapp dark:text-whatsapp-light">About WhatsAppifiyer</h1>
      
<div className="card mb-10">
  <h2 className="text-2xl font-semibold mb-6">What is WhatsAppifiyer?</h2>
  <p className="mb-6 text-lg leading-relaxed">
    WhatsAppifiyer is a tool designed to help you create the perfect WhatsApp messages for any situation. Whether you're sending a casual message to a friend, a professional communication to a colleague, or an important announcement to a group, our AI-powered tool can help you craft the ideal message.
  </p>
  <p className="text-lg leading-relaxed">
    Simply input your content in any format, select the type of message you want to create, and our AI will generate a perfectly formatted WhatsApp message that's ready to send.
  </p>
</div>
      
<div className="card mb-10">
  <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
  <ol className="list-decimal pl-6 space-y-4 text-lg leading-relaxed">
    <li>
      <strong>Input your content:</strong> Enter your information in any format - bullet points, notes, or just ideas.
    </li>
    <li>
      <strong>Select your message type:</strong> Choose from various message types like casual conversation, professional communication, announcements, and more.
    </li>
    <li>
      <strong>Choose an AI model:</strong> Select from our range of AI models to generate your message.
    </li>
    <li>
      <strong>Generate your message:</strong> Our AI will create the perfect WhatsApp message based on your inputs.
    </li>
    <li>
      <strong>Copy and send:</strong> Copy the generated message and paste it into WhatsApp to send.
    </li>
  </ol>
</div>
      
<div className="card">
  <h2 className="text-2xl font-semibold mb-6">Our Technology</h2>
  <p className="mb-6 text-lg leading-relaxed">
    WhatsAppifiyer uses state-of-the-art language models from providers like Hugging Face and OpenRouter to generate high-quality, contextually appropriate messages. Our application is built with modern web technologies including React, TypeScript, and Tailwind CSS.
  </p>
  <p className="text-lg leading-relaxed">
    All message generation happens securely on our servers, and we don't store your content or generated messages.
  </p>
</div>
    </div>
  );
};

export default About;
