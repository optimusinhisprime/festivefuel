import React, { useContext, useReducer, useState, useEffect } from 'react';

import reducer from '../reducer/AppReducer';
import serverApi from '../utils/serverApi';

const initialState = {
  events: [],
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEvents = async () => {
    const {
      data: { events },
    } = await serverApi.get('/events');
    dispatch({ type: 'FETCH_EVENTS', payload: events });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
