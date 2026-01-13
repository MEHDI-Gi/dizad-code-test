import React, { createContext , useRef , useState , useEffect } from 'react';


const ThemeContext = createContext();

  export const ThemeProvider = ({children}) => {

    const themes = {
      light: {
        background: "white"
      },
      dark: {
        background: "black"
      }
    }

    return (
      <ThemeContext.Provider value={{
        
         }}>
        { children }
      </ThemeContext.Provider>
    );
};
export const useTheme = () => useContext(ThemeContext);