import React, { useRef } from 'react';
import Textarea from '../common/Textarea';
import EmojiPicker from './EmojiPicker';
import CharacterCounter from './CharacterCounter';

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + emoji + content.substring(end);
      setContent(newContent);

      // Set cursor position after the inserted emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + emoji.length;
          textareaRef.current.selectionEnd = start + emoji.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">Your Content</label>
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste or type your content here. It can be in any format - notes, bullet points, ideas, etc."
        rows={6}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent"
      />

      <CharacterCounter text={content} maxLength={1024} />

      <p className="mt-2 text-sm text-gray-500">
        Enter any content you want to transform into a WhatsApp message. Our AI will understand and format it appropriately.
      </p>
    </div>
  );
};

export default ContentInput;
