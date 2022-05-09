import React, { useContext, useReducer, useState, useEffect } from 'react';

import cartReducer from '../reducer/CartReducer';
import serverApi from '../utils/serverApi';

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (stallRequest) => {
    dispatch({ type: 'ADD_TO_CART', payload: stallRequest });
  };

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
