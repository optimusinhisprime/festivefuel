import React, { useContext, useReducer, useState } from 'react';
import { AppContextActions } from '../constants/actions';

import reducer from '../reducer/appReducer';

const initialState = {};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const testFunction = () => {
    dispatch({ type: AppContextActions.TEST_ACTION });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        testFunction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
