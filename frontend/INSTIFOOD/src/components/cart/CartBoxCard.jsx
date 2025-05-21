import React from 'react';
import { useCart } from '../../context/CartContext';
import {toast} from 'react-toastify';

function CartBoxCard() {
    const { cart, addToCart, removeFromCart} = useCart();
    
    function handelRemoveAddToCart(item) {
        if(item.quantity != 1) {
            addToCart({...item, quantity : item.quantity -1});
        } else {
            removeFromCart(item._id);
            toast.success("Item Removed from Cart");
        }
    }

    const handelRemoveFromCart = (id) => {
        removeFromCart(id);
        toast.success("Item Removed from Cart");
    }

  return (
    <div className="space-y-4 w-full max-w-[50rem] mx-auto px-4">
      {cart.map((item) => (
        <div 
          key={item._id} 
          className="border rounded-lg p-4 sm:p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50"
        >
          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="flex gap-4">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded-lg shadow-lg flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-gray-800">{item.name}</p>
                <p className="text-base mt-1 font-semibold text-gray-900">₹{item.price}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center border border-gray-200 rounded-md shadow-md">
                <button 
                  onClick={() => handelRemoveAddToCart(item)}
                  className="px-3 py-2 text-red-500 text-xl cursor-pointer hover:bg-red-50 active:bg-red-100 transition-colors duration-200"
                >
                  -
                </button>
                <span className="px-3 py-2 font-medium">{item.quantity}</span>
                <button 
                  onClick={() => addToCart({...item, quantity: item.quantity + 1})}
                  className="px-3 py-2 text-red-500 text-xl cursor-pointer hover:bg-red-50 active:bg-red-100 transition-colors duration-200"
                >
                  +
                </button>
              </div>
              
              <button 
                className="px-3 py-2 text-sm text-gray-500 hover:text-red-600 active:text-red-700 cursor-pointer transition-colors duration-200 font-medium"
                onClick={() => handelRemoveFromCart(item._id)}
              >
                REMOVE
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex justify-between items-center">
            <div className="flex items-center gap-6">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg shadow-lg"
              />
              <div>
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <p className="text-lg mt-1 font-semibold text-gray-900">₹{item.price}</p>
                <div className="flex items-center border border-gray-200 my-2 w-[6rem] rounded-md shadow-md">
                  <button 
                    onClick={() => handelRemoveAddToCart(item)}
                    className="px-2 py-1 text-red-500 text-xl cursor-pointer hover:bg-red-50 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart({...item, quantity: item.quantity + 1})}
                    className="px-3 py-1 text-red-500 text-xl cursor-pointer hover:bg-red-50 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button 
              className="px-4 py-2 text-gray-500 hover:text-red-600 cursor-pointer transition-colors duration-200 font-medium"
              onClick={() => handelRemoveFromCart(item._id)}
            >
              REMOVE
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartBoxCard;
