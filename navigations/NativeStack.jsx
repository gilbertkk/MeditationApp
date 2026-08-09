import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import MeditationDetails from "../Meditation-details/[id]";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const NativeStack = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="MeditationDetails"
            component={MeditationDetails}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NativeStack;
