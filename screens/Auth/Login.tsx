import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";
import Input from "../../Components/custom/Input";
import OrSeparator from "../../Components/custom/OrSeparator";
import SocialButton from "../../Components/custom/SocialButton";
import { images, icons } from "../../constants";
import Button from "../../Components/custom/Button";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import Header from "../../Components/custom/Head";
import ValidationContext from "../../contexts/ValidationContext";
import useLogin from "../../hooks/useLogin";
import LoadingOverlay from "../../Components/custom/loadingOverlay";
const Login = () => {
  const router = useRouter();
  const { setUserId } = useContext(ValidationContext)!;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorRequiredFields, setErrorRequiredFields] = useState<string[]>([
    "",
  ]);
  const [checked, setChecked] = useState<boolean>(false);
  const { colors, dark, setScheme } = useTheme();
  const { loading, requestLogin } = useLogin();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorRequiredFields(["Please fill in all required fields."]);
      return;
    }
    requestLogin(email, password, setErrorMessage);
  };

  const appleAuthHandler = () => {
    console.log("Apple Authentication");
  };

  const facebookAuthHandler = () => {
    console.log("Facebook Authentication");
  };

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
        {loading && (
          <LoadingOverlay
            visible={loading}
            message="Please wait while we log you in ..."
          />
        )}
        <Header title="Login" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {errorMessage && (
            <Text style={{ color: COLORS.error }}>{errorMessage}</Text>
          )}
          <Input
            id="email"
            onInputChanged={(id, value) => {
              setEmail(value);
            }}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.email}
            keyboardType={"default"}
            textContentType="emailAddress"
          />
          <Input
            onInputChanged={(id, value) => setPassword(value)}
            errorText={
              errorRequiredFields.length > 0 ? errorRequiredFields : []
            }
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.padlock}
            secureTextEntry={!showPassword}
            textContentType="password"
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
            {/* <OrSeparator text="or continue with" />

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
            </View> */}
            <OrSeparator text="" />
            <View style={styles.CountineAsGuest}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/Account/GuestLogin");
                }}
              >
                <Text style={styles.bottomRight}>Continue as Guest</Text>
              </TouchableOpacity>
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
  CountineAsGuest: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
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
