import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";

// Definir el tipo de valor inicial del contexto
const defaultContextValue = {
  theme: DARK_THEME, // Puedes definir aquí el valor inicial de `theme`
  toggleTheme: () => {}, // Función vacía para evitar errores en el tipo
};

export const ThemeContext = createContext(defaultContextValue);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("themeMode") || DARK_THEME); 
  window.localStorage.setItem("themeMode", theme); // almacenar en el local storage

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
    window.localStorage.setItem("themeMode", theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
