import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

function AddToCart({ item }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const [isAdd, setIsAdd] = useState(false);

  // Find the item in cart to get its current quantity
  const cartItem = cart.find(cartItem => cartItem._id === item._id);
  const currentQuantity = cartItem ? cartItem.quantity : 1;

  useEffect(() => {
    // Check if this item exists in cart
    const itemInCart = cart.some(cartItem => cartItem._id === item._id);
    setIsAdd(itemInCart);
  }, [cart, item._id]);

  function handleAddToCart() {
    const newQuantity = currentQuantity + 1;
    addToCart({ ...item, quantity: newQuantity });
  }

  function handleRemoveFromCart() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      addToCart({ ...item, quantity: newQuantity });
    } else {
      removeFromCart(item._id);
      setIsAdd(false);
      toast.success('Item removed from cart');
    }
  }

  function handleInitialAdd() {
    addToCart({ ...item, quantity: 1 });
    setIsAdd(true);
    toast.success('Item added to cart');
  }

  return (
    <div className="ml-4">
      {isAdd ? (
        <div className="flex items-center space-x-2 border rounded-lg">
          <button
            onClick={handleRemoveFromCart}
            className="p-2 text-red-500 hover:bg-red-50 rounded-l-lg cursor-pointer"
          >
            <MinusIcon className="h-5 w-5" />
          </button>
          <span className="w-8 text-center">{currentQuantity}</span>
          <button
            onClick={handleAddToCart}
            className="p-2 text-orange-500 hover:bg-orange-50 rounded-r-lg cursor-pointer"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleInitialAdd}
          className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
        >
          ADD
        </button>
      )}
    </div>
  );
}

export default AddToCart;