import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center">
      <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;