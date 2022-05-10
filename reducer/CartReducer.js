const reducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    const itemExists = state.cart.find((item) => item.id === action.payload.id);

    if (itemExists) {
    } else {
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total_items: state.total_items + 1,
      };
    }
  }

  if (action.type === 'REMOVE_CART_ITEM') {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  return state;
};

export default reducer;
