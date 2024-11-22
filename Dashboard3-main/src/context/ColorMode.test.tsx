// ColorModeContext.test.js
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, ThemeContext } from "./ThemeContext"; // Importa el ThemeProvider y ThemeContext
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";
import React from "react";

describe("ColorModeContext", () => {
  it("debe alternar entre el modo claro y oscuro", () => {
    const { result } = renderHook(() => React.useContext(ThemeContext), {
      wrapper: ThemeProvider, // Envuelve el hook con ThemeProvider
    });

    // Obtén el valor inicial del tema
    const { theme, toggleTheme } = result.current;
    expect(theme).toBe(DARK_THEME); // Verifica el tema inicial

    // Cambia al modo claro
    act(() => {
      toggleTheme();
    });

    // Verifica que el tema cambió a "light"
    expect(result.current.theme).toBe(LIGHT_THEME);

    // Cambia de nuevo al modo oscuro
    act(() => {
      toggleTheme();
    });

    // Verifica que el tema volvió a "dark"
    expect(result.current.theme).toBe(DARK_THEME);
  });
});
