// src/contexts/CheckinContext.js
import React, { createContext, useState, useContext } from 'react';

const CheckinContext = createContext();

export const CheckinProvider = ({ children }) => {
  const [checkins, setCheckins] = useState({});

  return (
    <CheckinContext.Provider value={{ checkins, setCheckins }}>
      {children}
    </CheckinContext.Provider>
  );
};

export const useCheckin = () => useContext(CheckinContext);
