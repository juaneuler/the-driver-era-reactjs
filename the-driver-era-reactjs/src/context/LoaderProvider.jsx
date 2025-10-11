import React, { createContext, useContext, useRef, useState } from 'react';
import Loader from '../components/Loader';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  const showLoader = (duracion = 1500) => {
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (duracion) {
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        timerRef.current = null;
      }, duracion);
    }
  };

  const hideLoader = () => {
    setIsVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isVisible }}>
      <Loader isVisible={isVisible} />
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);