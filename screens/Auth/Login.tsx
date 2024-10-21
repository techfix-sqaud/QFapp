import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router, useRouter } from "expo-router";
import quickFixAPI from "../../Helpers/Axios";
import AuthContext from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../../constants/theme";
import Input from "../../Components/custom/Input";
import OrSeparator from "../../Components/custom/OrSeparator";
import SocialButton from "../../Components/custom/SocialButton";
import { images, icons } from "../../constants";
import { initialState } from "../../contexts/AuthProvider";
import Button from "../../Components/custom/Button";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);
  const [checked, setChecked] = useState<boolean>(false);
  const { dispatch } = useContext(AuthContext)!;
  const { colors, dark } = useTheme();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage(["Please fill in all required fields."]);
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
      setErrorMessage([
        "Invalid credentials. Please check your username and password and try again.",
      ]);
    }
  };

  // implementing apple authentication
  const appleAuthHandler = () => {
    console.log("Apple Authentication");
  };

  // implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log("Facebook Authentication");
  };

  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log("Google Authentication");
  };

  return (
    <SafeAreaView
      style={[
        styles.area,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {/* <Card style={styles.card}> */}

        {/* <Header /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {/* {errorMessage && <Text>{errorMessage}</Text>} */}
          <Input
            id="email"
            onInputChanged={(id, value) => {
              setEmail(value);
            }}
            placeholder="Email"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
          />

          <Input
            onInputChanged={(id, value) => setPassword(value)}
            errorText={errorMessage.length > 0 ? errorMessage : []}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.padlock}
            secureTextEntry={true}
          />
          <Button
            filled={true}
            title="Login"
            onPress={(e: any) => handleLogin(e)}
            style={styles.button}
          >
            Login
          </Button>

          <View>
            <View>
              <TouchableOpacity
                onPress={() => router.push("Account/ForgotPassword")}
              >
                <Text style={styles.forgotPasswordBtnText}>
                  Forgot the password?
                </Text>
              </TouchableOpacity>
            </View>
            <OrSeparator text="or continue with" />

            <View style={styles.socialBtnContainer}>
              <SocialButton
                icon={icons.appleLogo}
                onPress={appleAuthHandler}
                tintColor={dark ? COLORS.white : COLORS.black}
              />
              <SocialButton
                icon={icons.facebook}
                onPress={facebookAuthHandler}
              />
              <SocialButton icon={icons.google} onPress={googleAuthHandler} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.bottomLeft,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}
          >
            Don't have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/Account/signup");
            }}
          >
            <Text style={styles.bottomRight}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 26,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 22,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
  },
  socialTitle: {
    fontSize: 19.25,
    fontFamily: "medium",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 26,
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
    position: "absolute",
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black",
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12,
  },
});

export default Login;
