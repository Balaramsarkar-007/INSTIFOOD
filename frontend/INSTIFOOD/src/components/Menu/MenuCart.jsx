import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

function MenuCart({item}) {
  return (
    <div>
      <div className="flex items-center flex-1">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
          {item.image_url ? (
            <img 
              src={item.image_url} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600">₹{item.price}</p>
          {item.description && (
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuCart
