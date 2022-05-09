const reducer = (state, action) => {
  if (action.type === 'FETCH_EVENTS') {
    return { ...state };
  }

  return state;
};

export default reducer;
