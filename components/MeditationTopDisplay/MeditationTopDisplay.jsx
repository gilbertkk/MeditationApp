import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./MeditationTopDisplay.style";
import { COLORS } from "../../constants";

const getThemeStyles = (isDark) => ({
  darkText: {
    color: isDark ? COLORS.lightText : COLORS.darkText,
  },
});

const MeditationTopDisplay = ({
  meditationImage,
  meditationTitle,
  duration,
  target,
  isDarkMode,
}) => {
  const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: meditationImage,
          }}
          resizeMode="cover"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.meditationTitleBox}>
        <Text style={[styles.meditationTitle, themeStyles.darkText]}>
          {meditationTitle}
        </Text>
      </View>
      <View style={styles.meditationInfoBox}>
        <Text style={[styles.meditationName, themeStyles.darkText]}>
          {target} /{" "}
        </Text>
        <View style={styles.durationBox}>
          <Image
            source={"https://cdn-icons-png.flaticon.com/512/109/109613.png"}
            resizeMode="cover"
            style={styles.durationImage}
          />
          <Text style={[styles.durationName, themeStyles.darkText]}>
            {duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MeditationTopDisplay;
