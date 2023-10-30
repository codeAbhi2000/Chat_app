// ThemeContext.js
import React, {   useState } from 'react';
import ThemeContext from './ThemeContext';


const ThemeSupplier = ({ children }) => {
  const [paletteMode, setPaletteMode] = useState('light'); // Initial mode

  const togglePaletteMode = () => {
    setPaletteMode((mode) => mode=== 'light'? 'dark' : 'light' );
  };

  return (
    <ThemeContext.Provider value={{ paletteMode, togglePaletteMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeSupplier