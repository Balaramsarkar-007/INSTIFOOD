import React from 'react';
import { useCart } from '../../context/CartContext';
import {toast} from 'react-toastify';

function CartItem() {
    const { cart, addToCart, removeFromCart} = useCart();

    function handelRemoveAddToCart(item) {
        if(item.quantity != 1) {
            addToCart({...item, quantity : item.quantity -1});
        } else {
            removeFromCart(item._id);
            toast.success("Item Removed from Cart");
        }
    }


  return (
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-lg">₹{item.price}</p>
            </div>
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => handelRemoveAddToCart(item)}
                className="px-3 py-1 text-red-500 text-xl cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-1">{item.quantity}</span>
              <button 
                onClick={() => addToCart({...item, quantity: item.quantity + 1})}
                className="px-3 py-1 text-red-500 text-xl cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    
  )
}

export default CartItem
