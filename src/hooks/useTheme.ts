// useTheme.ts
import { useContext } from "react";
import { DataContext } from "../context/contextData";
import { colorsList } from "./useColors";

export const useTheme = () => {
    const context = useContext(DataContext);

    const currentTheme = context?.currentTheme || 'dark';

    const setThemeSafe = (newTheme: 'dark' | 'light') => {
        if (newTheme === 'dark' || newTheme === 'light') {
            context?.setCurrentTheme(newTheme);
        }
    };

    const colors = currentTheme === 'dark'
        ? colorsList.darkColors
        : colorsList.lightColors;

    return {
        currentTheme,
        setCurrentTheme: setThemeSafe, // Use the guarded version
        colors,
        THEME_DARK: 'dark',
        THEME_LIGHT: 'light'
    };
};