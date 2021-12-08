import React, { useContext, createContext } from 'react';

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = (props) => {
  return (
    <GlobalContext.Provider value={{ currentPage: 'Home' }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
