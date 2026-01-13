// src/hooks/useTheme.js
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const colorsList = {
  darkColors: {
    primary: "#1e1f22",
    secondary: "#2A2C30",
    buttons: "#2e436e",
    priText: 'white',
    secText: 'lightgray',
    quizExitIcon: 'lightgray',
  },
  lightColors: {
    primary: "lightgray",
    secondary: "white",
    buttons: "#2e436e",
    priText: 'black',
    secText: 'gray',
    quizExitIcon: 'black',
  }
};

const THEME_KEY = 'appTheme';

export default function useTheme() {
  const systemScheme = useColorScheme(); // 'dark' or 'light'
  const [colors, setColors] = useState(
    systemScheme === 'dark' ? colorsList.darkColors : colorsList.lightColors
  );
  const [currentTheme, setCurrentTheme] = useState(systemScheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        if (colorsList[`${theme}Colors`]) {
          setColors(colorsList[`${theme}Colors`]);
          setCurrentTheme(theme);
        }
      } else {
        setColors(colorsList[`${systemScheme}Colors`]);
        setCurrentTheme(systemScheme);
      }
    };
    loadTheme();
  }, [systemScheme]);

  const toggleColors = async (theme) => {
    if (colorsList[`${theme}Colors`]) {
      setColors(colorsList[`${theme}Colors`]);
      setCurrentTheme(theme);
      await AsyncStorage.setItem(THEME_KEY, JSON.stringify(theme));
    }
  };

  return { colors, currentTheme, toggleColors };
}
