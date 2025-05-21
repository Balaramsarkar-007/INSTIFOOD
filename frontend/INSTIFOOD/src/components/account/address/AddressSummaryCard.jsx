import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Summary Card Component
const AddressSummaryCard = ({ isSelected,  userAddress, onClick }) => {
  return (
    <div 
      className={`cursor-pointer max-w-md p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border ${isSelected ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`} 
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <MapPinIcon className="w-8 h-8 text-blue-500 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{userAddress.name}</h3>
          <p className="text-gray-600">{userAddress.address}</p>
          <div className="mt-2 flex items-center space-x-3 text-sm text-gray-500">
            <span>{userAddress.city}</span>
            <span>•</span>
            <span>{userAddress.state}</span>
            <span>•</span>
            <span>{userAddress.pin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSummaryCard
