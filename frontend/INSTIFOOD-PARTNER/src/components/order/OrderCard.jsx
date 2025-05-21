import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-gray-50 rounded-xl">
      <div className="space-y-2 mb-4 lg:mb-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Order #{order.id}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            New Order
          </span>
        </div>
        <p className="text-gray-800 font-medium">{order.customer}</p>
        <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
        <p className="text-sm text-gray-500">{order.time}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-lg font-bold text-gray-800">${order.total}</span>
        <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
          Accept
        </button>
        <button className="px-4 py-2 bg-white text-red-600 font-medium rounded-lg border border-red-600 hover:bg-red-50 transition-colors">
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderCard;