import React from 'react';
import CartBox from '../components/cart/CartBox';
import CartBoxCart from '../components/cart/CartBoxCart';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

function CartPage() {
  const {cart} = useCart();
  const location = useLocation();
  const isAddressPage = location.pathname.includes('/cart/address');

  return (
    <div>
    {cart.length > 0 ? (
      <div className='grid md:grid-cols-2 gap-8 my-4'>
          <div className='w-full md:ml-8 sm:ml-0'> 
              {isAddressPage ? <Outlet /> : <CartBox />}
          </div>
          <div className='md:w-full'>
            <CartBoxCart/>
          </div>
        </div>
    ) : (
      <div className='flex align-center justify-center'>
        <div className="text-center">
          <img src="https://pictographic.azureedge.net/thumbnails/lined/DOzGQMdgCs77vYoYb5aA.png" alt="Empty Cart Icon" className="mx-auto mb-4" />
          <h2 className="text-lg font-semibold">Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet. Start shopping now!</p>
          <Link to={'/'}>
            <button 
              className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600 transition-colors cursor-pointer">
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    )}
        
    </div>
  )
}

export default CartPage;
