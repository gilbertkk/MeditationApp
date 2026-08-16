import { View, Text } from "react-native";

import styles from "./About.style";
import { COLORS } from "../../constants";

const About = ({ info, title, isDarkMode }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightWhite,
        },
      ]}
    >
      <Text
        style={[
          styles.headText,
          { color: isDarkMode ? COLORS.lightText : COLORS.darkText },
        ]}
      >
        About {title}:
      </Text>

      <View
        style={[
          styles.contentBox,
          {
            backgroundColor: isDarkMode
              ? COLORS.darkBackground
              : COLORS.lightWhite,
          },
        ]}
      >
        <Text
          style={[
            styles.contextText,
            { color: isDarkMode ? COLORS.lightWhite : COLORS.darkText },
          ]}
        >
          {info}
        </Text>
      </View>
    </View>
  );
};

export default About;
