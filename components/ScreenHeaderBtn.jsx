import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

const ScreenHeaderBtn = ({ detailPage, handleShare }) => {
  const navaigation = useNavigation();
  console.log(detailPage);
  return (
    <>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={icons.menu} style={styles.image} />
        </TouchableOpacity>
        {detailPage ? (
          <>
            <TouchableOpacity style={styles.btnContainer} onPress={handleShare}>
              <Image source={icons.share} style={styles.image} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => navigation.navigate("Settings")}
            >
              <Image source={icons.settings} style={styles.image} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100vw",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default ScreenHeaderBtn;
