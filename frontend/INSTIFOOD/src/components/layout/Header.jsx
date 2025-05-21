import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/authContext';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

function Header() {
  const { cart } = useCart();
  const { isLogin, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-[5rem]">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text hover:scale-105 transition-transform">
              INSTIFOOD
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for food or restaurants..."
                className="w-full px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300 group-hover:bg-gray-100"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-4 top-3.5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50">
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 mr-1" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold animate-bounce">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            <Link to={user ? "/account" : "/signin"}>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-orange-500 font-medium transition-colors px-4 py-2 rounded-full hover:bg-orange-50">
                  <UserIcon className="h-6 w-6 mr-2" />
                  Account
                </button>
              </div>
            </Link>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16 mb-3"> 

            {/* Centered Logo */}
            <Link to="/" className="absolute left-1/4 transform -translate-x-1/2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                INSTIFOOD
              </span>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative ml-[65%] text-gray-700 transfrom">
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold animate-bounce">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to={user ? "/account" : "/signin"} className="block  rounded-full p-1 py-2 text-gray-700 hover:bg-orange-50">
                  <div className="flex items-center">
                    <UserIcon className="h-6 w-6 " />
                    <span className='text-4'>Account</span>
                  </div>
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for food or restaurants..."
                className="w-full px-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-300"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-4 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;