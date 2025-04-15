import React from 'react';
import Textarea from '../common/Textarea';

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent }) => {
  return (
    <div className="mb-6">
      <Textarea
        label="Your Content"
        value={content}
        onChange={setContent}
        placeholder="Paste or type your content here. It can be in any format - notes, bullet points, ideas, etc."
        rows={6}
      />
      <p className="mt-2 text-sm text-gray-500">
        Enter any content you want to transform into a WhatsApp message. Our AI will understand and format it appropriately.
      </p>
    </div>
  );
};

export default ContentInput;
