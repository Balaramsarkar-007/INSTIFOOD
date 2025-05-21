import React from 'react';
import CartBoxCard from './CartBoxCard';
import { useCart } from '../../context/CartContext';


function CartBox() {
    const { cart} = useCart();
    
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  return (
    <div className="max-w-3xl mx-auto p-4">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">
        Shopping cart ({cart.reduce((total, item) => total + item.quantity, 0)} Items)
      </h2>
      <div className="text-2xl font-semibold">
        Total ₹{totalAmount}
      </div>
    </div>

    {/* Cart Items */}
    <CartBoxCard/>
  </div>
  )
}

export default CartBox
