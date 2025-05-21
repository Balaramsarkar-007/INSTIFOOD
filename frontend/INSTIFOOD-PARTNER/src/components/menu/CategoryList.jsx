import React from 'react';

const CategoryList = ({ categories, activeCategory, onSelectCategory, onAddCategory }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Categories</h3>
       
      </div>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeCategory?.id === category.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;