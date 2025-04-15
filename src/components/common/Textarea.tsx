import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  className = '',
  rows = 4,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent ${className}`}
        value={value}
        onChange={handleChange}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default Textarea;
