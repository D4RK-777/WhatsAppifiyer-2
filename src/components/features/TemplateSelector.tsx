import React, { useState, useEffect } from 'react';
import { MESSAGE_TEMPLATES, getTemplatesByCategory, getTemplateCategories, MessageTemplate } from '../../data/templates';
import { UseCase } from '../../types/models';
import Card from '../common/Card';

interface TemplateSelectorProps {
  selectedUseCase: UseCase | null;
  onSelectTemplate: (content: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedUseCase,
  onSelectTemplate,
}) => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const categories = getTemplateCategories();

  // Update templates when use case or category changes
  useEffect(() => {
    if (selectedUseCase) {
      // If a use case is selected, try to find templates for that category
      const useCaseCategory = selectedUseCase.id;
      if (categories.includes(useCaseCategory)) {
        setSelectedCategory(useCaseCategory);
        setTemplates(getTemplatesByCategory(useCaseCategory));
      } else {
        // If no templates for this use case, show all templates
        setSelectedCategory('');
        setTemplates(MESSAGE_TEMPLATES);
      }
    } else {
      // If no use case is selected, show all templates
      setSelectedCategory('');
      setTemplates(MESSAGE_TEMPLATES);
    }
  }, [selectedUseCase]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === '') {
      setTemplates(MESSAGE_TEMPLATES);
    } else {
      setTemplates(getTemplatesByCategory(category));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Templates</h3>
        <select
          className="px-2 py-1 border border-gray-300 rounded-md text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {templates.map((template) => (
          <div
            key={template.id}
            className="cursor-pointer transition-all duration-200"
            onClick={() => onSelectTemplate(template.content)}
          >
            <Card className="h-full p-2">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-xs">{template.name}</h4>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${template.category === 'utility' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                                                 template.category === 'authentication' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                                                                 template.category === 'marketing' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                                                 template.category === 'service' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' :
                                                                 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}`}>
                  {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                </span>
              </div>
              {template.description && (
                <p className="text-gray-600 dark:text-gray-300 text-[10px] mb-1 line-clamp-1">{template.description}</p>
              )}
              <p className="text-gray-600 dark:text-gray-300 text-[10px] line-clamp-1 italic">{template.content}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
