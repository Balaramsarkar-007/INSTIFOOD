import React from 'react';
import { Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const MenuItem = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <img 
          src={item.image || "/api/placeholder/80/80"} 
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          <p className="text-sm font-medium text-gray-900 mt-1">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onToggleAvailability(item)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
            item.available 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {item.available ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {item.available ? 'Available' : 'Unavailable'}
        </button>
        
        <button 
          onClick={() => onEdit(item)}
          className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => onDelete(item)}
          className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;