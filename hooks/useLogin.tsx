import { useState } from "react";
import { Alert } from "react-native";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual login logic, e.g., API call
      const response = await fakeApiLogin(username, password);
      if (response.success) {
        // Handle successful login
        Alert.alert("Login Successful", "Welcome back!");
      } else {
        // Handle login failure
        setError(response.message);
        Alert.alert("Login Failed", response.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      Alert.alert("Login Failed", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

// Fake API login function for demonstration purposes
const fakeApiLogin = async (username: string, password: string) => {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      if (username === "user" && password === "pass") {
        resolve({ success: true, message: "Login successful" });
      } else {
        resolve({ success: false, message: "Invalid credentials" });
      }
    }, 1000);
  });
};

export default useLogin;
