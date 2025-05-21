import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import AddToCart from '../buttons/addToCart';
import MenuCart from './MenuCart';


function MenuItem({ item }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <MenuCart item = {item}/>
      <AddToCart item={item}/>
    </div>

  );
}

export default MenuItem;