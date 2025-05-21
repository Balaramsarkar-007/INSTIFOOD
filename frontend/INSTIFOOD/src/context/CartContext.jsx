import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(item => item._id === action.payload._id);
      
      if (existingItemIndex > -1) {
        return state.map(item => 
          item._id === action.payload._id 
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);

    case 'CLEAR_CART':
      return [];  

    case 'INITIALIZE_CART':
      return action.payload;

    default:
      return state;
  }
};

// Function to get initial cart state from localStorage
const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, getInitialCart);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}