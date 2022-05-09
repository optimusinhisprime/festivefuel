import React, { useContext, useReducer, useState, useEffect } from 'react';

import cartReducer from '../reducer/CartReducer';
import serverApi from '../utils/serverApi';

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(localStorage.getItem('cart'));
    } else {
      return [];
    }
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (stallRequest) => {
    dispatch({ type: 'ADD_TO_CART', payload: stallRequest });
  };

  const clearCart = () => {};

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
