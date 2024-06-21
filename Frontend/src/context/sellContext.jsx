import React, { createContext, useContext, useState } from 'react';

const SellContext = createContext();

export const useSellContext = () => useContext(SellContext);

export const SellProvider = ({ children }) => {
  const [watchForm, setWatchForm] = useState(null);
  const [sellForm, setSellForm] = useState(null);

  const updateWatchForm = (data) => {
    setWatchForm(data);
  };

  const updateSellForm = (data) => {
    setSellForm(data);
  };

  return (
    <SellContext.Provider value={{ watchForm, sellForm, updateWatchForm, updateSellForm }}>
      {children}
    </SellContext.Provider>
  );
};
