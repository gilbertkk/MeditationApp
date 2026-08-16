import { Text, Switch, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../../constants";
import { useTheme } from "../../providers/ThemeProvider";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeChange = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const saveSettings = async () => {
    try {
      let updatedUserSettings = {};
      const userSettings = await AsyncStorage.getItem("userSettings");
      if (userSettings) {
        const parsedUserSettings = JSON.parse(userSettings);
        updatedUserSettings = { ...parsedUserSettings, theme: theme };
      } else {
        updatedUserSettings = { theme: theme };
      }
      console.log("SaveSettings theme: ", updatedUserSettings);
      await AsyncStorage.setItem(
        "userSettings",
        JSON.stringify(updatedUserSettings),
      );
    } catch (error) {
      console.error("Failed to save user settings", error);
    }
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  useEffect(() => {
    saveSettings();
  }, [theme]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite,
      }}
    >
      <ScreenHeaderBtn />
      <View
        style={{
          justifyContent: "space-between",
          padding: SIZES.medium,
          borderRadius: SIZES.small,
          backgroundColor: isDarkMode
            ? COLORS.lightWhite
            : COLORS.darkBackground,
          ...SHADOWS.medium,
          shadowColor: COLORS.white,
          marginVertical: SIZES.medium,
          marginHorizontal: SIZES.medium,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: isDarkMode ? COLORS.darkText : COLORS.lightText,
              fontSize: SIZES.medium,
              fontFamily: "DMBold",
              marginHorizontal: SIZES.medium,
              marginVertical: SIZES.small,
            }}
          >
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            trackColor={{ false: COLORS.lightText, true: COLORS.darkText }}
            value={isDarkMode}
            onValueChange={handleThemeChange}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ThemeChange;
