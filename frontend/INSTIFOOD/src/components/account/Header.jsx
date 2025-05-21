import React from 'react';
import { useAuth } from '../../context/authContext';

function Header() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center  p-4 border-b">
      <h1 className="text-xl font-medium">Orders</h1>
      <h2 className="text-black-600 hover:text-black-900">
        +{user?.ph}
      </h2>
    </div>
  )
}

export default Header
