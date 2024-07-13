import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const WindowWidthContext = createContext();

// Create the Provider Component
export const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Ensure this code runs only on the client side
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set initial window width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if the device is smaller (example breakpoint: 768px)
  const isSmallerDevice = windowWidth !== null ? windowWidth < 768 : false;

  return (
    <WindowWidthContext.Provider value={{ windowWidth, isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

// Custom Hook to use the context
export const useWindowWidth = () => {
  const context = useContext(WindowWidthContext);
  if (!context) {
    throw new Error('useWindowWidth must be used within a WindowWidthProvider');
  }
  return context;
};
