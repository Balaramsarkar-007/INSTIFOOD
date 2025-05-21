import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

function Cart() {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handelClearCart = () => {
    clearCart()
    toast.success('Cart Cleared 😊')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">
          Cart <span className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm">{cart.length}</span>
        </h3>
        <button 
          onClick={() => handelClearCart()}
          className="text-gray-600 underline hover:text-gray-800 cursor-pointer"
        >
          Clear cart
        </button>
      </div>

     {cart.length > 0 ?(

      <CartItem/>
      ) : (
        <div className="text-center">
        <img src="https://pictographic.azureedge.net/thumbnails/notion/yq11u3MYX6Fj3TmOYyWW.png" alt="Empty Cart Icon" className="mx-auto mb-4" />
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet. Start shopping now!</p>
      </div>
      )
     }

      {/* Subtotal */}
      {cart.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <h4 className="text-md">Sub total</h4>
            <p className="text-md">₹{subtotal}</p>
          </div>

          <Link to={'/cart'}>
            <button 
              className="w-full bg-red-500 text-white py-3 rounded-lg mt-4 hover:bg-red-600 transition-colors cursor-pointer">
              Go to cart
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;