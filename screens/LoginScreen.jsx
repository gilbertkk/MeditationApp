import React, { useContext, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, icons, SHADOWS, SIZES } from "../constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../providers/AuthProvider";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Image source={icons.menu} style={styles.image} />
        </View>
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const userDetails = {
            email: values.email,
            password: values.password,
            token: "sample-token",
          };
          try {
            const detailsDatafromSignup =
              await AsyncStorage.getItem("userDetails");
            if (detailsDatafromSignup) {
              const parsedDetails = JSON.parse(detailsDatafromSignup);
              if (
                userDetails.email === parsedDetails.email &&
                userDetails.password === parsedDetails.password
              ) {
                login(userDetails);
                navigation.navigate("Home");
              } else {
                Alert.alert("Login", "Incorrect email or password.");
              }
            } else {
              Alert.alert("Error", "No user details found in AsyncStorage.");
            }
          } catch (error) {
            console.error("Error accessing AsyncStorage", error);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          /* Form Section */
          <View style={styles.formSection}>
            {/* Email field */}
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            {/* Password field */}
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Password"
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            {/* Login Button */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={handleSubmit}
              testID="handleRegister"
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>

            {/* SignUp link line */}
            <View style={styles.signupLinkWrapper}>
              <Text style={styles.linkLine}>Don't have an account?</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.link}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  logoSection: {
    justifyContent: "center",
    width: "100%",
    height: "20%",
    //backgroundColor: "yellow",
  },
  logoContainer: {
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    height: 90,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    //backgroundColor: "green",
  },
  image: {
    width: 50,
    height: 50,
  },
  formSection: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    paddingHorizontal: 10,
    //backgroundColor: "gray"
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: SIZES.small,
  },
  signupLinkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkLine: {
    fontSize: SIZES.small,
  },
  link: {
    color: "#0000ff",
    fontSize: SIZES.small,
    marginLeft: 5,
  },
});

export default LoginScreen;
