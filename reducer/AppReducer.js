import { AppContextActions } from '../constants/actions';

const reducer = (state, action) => {
  if (action.type === AppContextActions.TEST_ACTION) {
    return { ...state };
  }

  return state;
};

export default reducer;
