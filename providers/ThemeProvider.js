import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const saveUserSettings = async () => {
    try {
      let userSettings = {};
      userSettings = await AsyncStorage.getItem("userSettings");
      if (userSettings) {
        userSettings = JSON.parse(userSettings);
      } else {
        userSettings = {};
      }
      userSettings = { ...userSettings, theme: theme };
      await AsyncStorage.setItem("userSettings", JSON.stringify(userSettings));
    } catch (error) {
      console.error("Failed to save the user settings to the local storage");
    }
  };

  const loadTheme = async () => {
    try {
      const userSettings = await AsyncStorage.getItem("userSettings");
      if (userSettings) {
        const parsedUserSettings = JSON.parse(userSettings);
        setTheme(parsedUserSettings.theme);
      }
    } catch (error) {
      console.error("Faild to load Theme");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
