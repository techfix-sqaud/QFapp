import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Checkbox } from "react-native-paper";
import { useRouter } from "expo-router";
import quickFixAPI from "../../Helpers/Axios";
import AuthContext from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState<boolean>(false);
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    try {
      const response = await quickFixAPI.post("Users/login", {
        EmailOrUserName: email,
        Password: password,
      });
      const data = response.data;
      const role = data.role;
      const token = data.token;
      console.log("data", data);
      // localStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("user", JSON.stringify(data));

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 8);

      expirationDate.setDate(expirationDate.getDate() + 1);
      // localStorage.setItem("token", token);
      // localStorage.setItem("expires", expirationDate.toISOString());
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expires", expirationDate.toISOString());

      // if (rememberMe) {
      //   localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
      //   localStorage.setItem("email", JSON.stringify(email));
      // }
      // if (!rememberMe) {
      //   localStorage.removeItem("email");
      //   localStorage.removeItem("rememberMe");
      // }
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthnticated: true,
          role,
          profile: data.profile,
          firstName: data.firstName,
          lastName: data.last_name,
          token: token,
          //expires: expirationDate,
        },
      });
      router.push("/Providers");
      const rememberMeStored = await AsyncStorage.getItem("rememberMe");
      const storedEmail = AsyncStorage.getItem("email");
      // localStorage.setItem("token", token);
      // localStorage.setItem("expires", expirationDate.toISOString());
    } catch (error) {
      setErrorMessage(
        "Invalid credentials. Please check your username and password and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
          />
        </View>
        {errorMessage && <Text>{errorMessage}</Text>}
        <TextInput
          label="Email or user name"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={(password) => setPassword(password)}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />
        <Button
          icon="login"
          mode="contained"
          onPress={(e) => handleLogin(e)}
          style={styles.button}
        >
          Login
        </Button>
        <View>
          <View>
            <TouchableOpacity onPress={() => router.push("/Forgot-password")}>
              <Text style={{ color: "#081c4b" }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push("/Account")}>
              <Text style={{ color: "#081c4b" }}>Create account</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push("/Providers")}>
              <Text style={{ color: "#081c4b" }}>Providers</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Checkbox.Android
              //label="Remember Me"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Remember me</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    fontColor: "#081c4b",
  },
  card: {
    width: 350,
    padding: 16,
    alignItems: "center",
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 110,
    height: 110,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 300,
    marginBottom: 16,
  },
  button: {
    width: 300,
    backgroundColor: "#081c4b",
  },
});

export default Login;
