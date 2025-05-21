import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="h-16 lg:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 my-6">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            RS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;