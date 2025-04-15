import React, { useState, useMemo } from 'react';
import { UseCase } from '../../types/models';
import Card from '../common/Card';

interface UseCaseSelectorProps {
  useCases: UseCase[];
  selectedUseCase: UseCase | null;
  onSelectUseCase: (useCase: UseCase) => void;
  initialCategory?: string;
}

const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({
  useCases,
  selectedUseCase,
  onSelectUseCase,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');

  // Update selected category when initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Group use cases by category
  const groupedUseCases = useMemo(() => {
    const grouped: Record<string, UseCase[]> = {
      all: useCases,
    };

    // Create groups for each category
    useCases.forEach(useCase => {
      if (!grouped[useCase.category]) {
        grouped[useCase.category] = [];
      }
      grouped[useCase.category].push(useCase);
    });

    return grouped;
  }, [useCases]);

  // Get the list of categories
  const categories = useMemo(() => {
    return ['all', ...Object.keys(groupedUseCases).filter(cat => cat !== 'all')];
  }, [groupedUseCases]);

  // Get the current use cases to display based on selected category
  const filteredUseCases = groupedUseCases[selectedCategory] || useCases;
  // Get category display name
  const getCategoryDisplayName = (category: string): string => {
    if (category === 'all') return 'All Types';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get category badge color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'utility':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'authentication':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'marketing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'service':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Message Type</h3>
        <div className="flex flex-wrap gap-1 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${selectedCategory === category
                ? 'bg-whatsapp text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pr-1">
        {filteredUseCases.map((useCase) => (
          <div
            key={useCase.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedUseCase?.id === useCase.id
                ? 'ring-2 ring-whatsapp'
                : ''
            }`}
            onClick={() => onSelectUseCase(useCase)}
          >
            <Card className="h-full p-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{useCase.name}</h4>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getCategoryColor(useCase.category)}`}>
                  {getCategoryDisplayName(useCase.category)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs">{useCase.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCaseSelector;
