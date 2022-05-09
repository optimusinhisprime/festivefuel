const reducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    const itemExists = state.cart.find((item) => item.id === action.payload.id);

    if (itemExists) {
    } else {
      return { ...state, cart: [...state.cart, action.payload] };
    }
  }

  return state;
};

export default reducer;
