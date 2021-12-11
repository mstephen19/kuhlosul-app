import React, { useContext, createContext, useReducer } from 'react';
import { reducer } from './reducers';

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { currentPage: 'Home' });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
