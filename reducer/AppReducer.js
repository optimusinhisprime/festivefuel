const reducer = (state, action) => {
  if (action.type === 'FETCH_EVENTS') {
    return { ...state, events: action.payload };
  }

  return state;
};

export default reducer;
