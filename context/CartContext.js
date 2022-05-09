import React, { useContext, useReducer, useState, useEffect } from 'react';

import reducer from '../reducer/CartReducer';
import serverApi from '../utils/serverApi';

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
