import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NativeStack from "./navigations/NativeStack";
import AuthProvider from "./providers/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NativeStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
