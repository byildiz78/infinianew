import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="p-4 flex-1 overflow-y-auto">
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category)}
            className={`
              relative group h-24 rounded-xl transition-all duration-300 border-2
              ${selectedCategory.id === category.id
                ? 'bg-gradient-to-br from-blue-600/90 to-blue-700/90 border-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-gradient-to-br from-gray-800/80 to-gray-700/80 border-gray-600/30 hover:border-gray-500/50'}
            `}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_50%)]"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center">
              <category.icon 
                size={32} 
                className={`mb-2 transition-all duration-300 ${
                  selectedCategory.id === category.id 
                    ? 'text-blue-200' 
                    : 'text-gray-400 group-hover:text-gray-300'
                }`}
              />
              <span className={`text-sm font-medium transition-all duration-300 ${
                selectedCategory.id === category.id
                  ? 'text-white'
                  : 'text-gray-300 group-hover:text-white'
              }`}>
                {category.name}
              </span>

              {/* Active Indicator */}
              {selectedCategory.id === category.id && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;