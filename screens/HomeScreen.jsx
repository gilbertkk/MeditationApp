import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";

const HomeScreen = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        setUserDetails(parsedDetails);
      } else {
        console.log("There is no user details to load");
      }
    } catch (e) {
      console.log("Error: Getting user details from AsyncStorage failed", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
          testID="screensDisplay"
        >
          <Welcome userDetails={userDetails} />
          <PopularMeditation />
          <DailyMeditation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
