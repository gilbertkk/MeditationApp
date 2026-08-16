import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userDetails) => {
    setUser(userDetails);
  };

  const logout = () => {
    setUser(null);
  };

  const checkLogin = async () => {
    try {
      setIsLoading(true);
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (userDetails) {
        setUser(JSON.parse(userDetails));
      }
    } catch (error) {
      console.log(
        "AuthProvider: Failed to get user details from local storage",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
