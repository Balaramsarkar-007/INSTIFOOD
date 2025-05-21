import React, { useState } from "react";
import { 
  Bars3Icon, 
  MapPinIcon, 
  ArrowRightOnRectangleIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { toast } from 'react-toastify';

const MENU_ITEMS = [
  {
    id: 'orders',
    path: '/account/orders',
    label: 'My orders',
    icon: Bars3Icon
  },
  {
    id: 'addresses',
    path: '/account/address',
    label: 'My addresses',
    icon: MapPinIcon
  },
  {
    id: 'signout',
    path: '#',
    label: 'Sign out',
    icon: ArrowRightOnRectangleIcon
  }
];

// Desktop MenuItem Component
const DesktopMenuItem = React.memo(({ path, label, icon: Icon, isActive, onClick }) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`
        flex items-center space-x-3 p-2 rounded-md transition-colors duration-200
        ${isActive ? 'text-red-600' : 'text-gray-600'}
        ${path === '#' ? 'hover:bg-gray-50' : 'hover:bg-red-50'}
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xl font-medium">{label}</span>
    </Link>
  );
});

// Mobile MenuItem Component
const MobileMenuItem = React.memo(({ path, label, icon: Icon, isActive, onClick }) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center space-y-1
        ${isActive ? 'text-red-600' : 'text-gray-600'}
      `}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
});

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, loading, setLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/auth/user/sing-out");
      console.log(response.data);
      setUser(null);
      navigate("/");
      toast.success('Sign out successful');
    } catch (error) {
      console.error('Sign out failed:', error);
      setUser(null);
      navigate("/");
      toast.success('Sign out successful');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block h-screen mr-6 mt-8 bg-gray-100 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <nav className="space-y-6 p-4">
          {MENU_ITEMS.map(({ id, path, label, icon }) => (
            <DesktopMenuItem
              key={id}
              path={path}
              label={label}
              icon={icon}
              isActive={location.pathname === path}
              onClick={id === 'signout' ? handleSignOut : undefined}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <nav className="flex justify-around items-center h-16 px-4">
          {MENU_ITEMS.map(({ id, path, label, icon }) => (
            <MobileMenuItem
              key={id}
              path={path}
              label={label}
              icon={icon}
              isActive={location.pathname === path}
              onClick={id === 'signout' ? handleSignOut : undefined}
            />
          ))}
        </nav>
      </div>

      {/* Add bottom padding to main content area on mobile to account for fixed navigation */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default React.memo(Sidebar);