import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Button from "../../Components/custom/Button";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { icons, images } from "../../constants";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import Input from "../../Components/custom/Input";
import OrSeparator from "../../Components/custom/OrSeparator";
import SocialButton from "../../Components/custom/SocialButton";
import ProgressBar from "../../Components/custom/PrograssBar";
import LoadingOverlay from "../../Components/custom/loadingOverlay";
import Header from "../../Components/custom/Head";
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<
    "client" | "business" | "provider" | null
  >(null);
  const [Id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);
  const { colors, dark } = useTheme();
  const [isHandyman, setIsHandyman] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpAsProvider, setSignUpAsProvider] = useState<boolean>(false);
  const HandleSignUp = (e: any) => {
    // Add your sign-up logic here
    console.log("Sign up button pressed");
  };

  const handleNext = () => {
    if (currentStep < (isHandyman ? 3 : 2)) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isLoading && (
          <LoadingOverlay
            visible={isLoading}
            message="Please wait while we sign you up"
          />
        )}
        <Header title="Sign up" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={isHandyman ? 3 : 2}
          />
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {!userType ? (
            <View>
              <OrSeparator text="Sign up as?" />
              <Button
                filled={dark ? true : false}
                title="Regular Client"
                onPress={() => setUserType("client")}
                style={styles.button}
              />
              <Button
                filled={dark ? true : false}
                title="Business Profile"
                onPress={() => setUserType("business")}
                style={styles.button}
              />
              <Button
                filled={dark ? true : false}
                title="Services Provider"
                onPress={() => setUserType("provider")}
                style={styles.button}
              />
            </View>
          ) : (
            <View>
              <Text
                style={[
                  styles.title,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}
              >
                Create Your Account
              </Text>
              <Input
                id="firstName"
                onInputChanged={(id, value) => {
                  setEmail(value);
                }}
                placeholder="First name *"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                icon={icons.user}
                keyboardType="default"
              />
              <Input
                id="lastName"
                onInputChanged={(id, value) => {
                  setEmail(value);
                }}
                placeholder="Last name *"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                icon={icons.user}
                keyboardType="default"
              />
              <Input
                id="userName"
                onInputChanged={(id, value) => {
                  setEmail(value);
                }}
                placeholder="User name"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                icon={icons.userDefault}
                keyboardType="default"
              />
              <Input
                id="email"
                onInputChanged={(id, value) => {
                  setEmail(value);
                }}
                placeholder="Email *"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                icon={icons.email}
                keyboardType="email-address"
              />

              <Input
                required={true}
                onInputChanged={(id, value) => setPassword(value)}
                errorText={errorMessage.length > 0 ? errorMessage : []}
                autoCapitalize="none"
                id="password"
                placeholder="Password"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                icon={icons.padlock}
                secureTextEntry={true}
              />
              {/* <Button
                filled={true}
                title="Sign up"
                onPress={(e: any) => HandleSignUp(e)}
                style={styles.button}
              /> */}
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {currentStep > 1 && (
                  <Button
                    filled={dark ? true : false}
                    title="Previous"
                    onPress={handlePrevious}
                  />
                )}
                {currentStep < (isHandyman ? 3 : 2) ? (
                  <Button title="Next" onPress={handleNext} />
                ) : (
                  <Button title="SignUp" onPress={HandleSignUp} />
                )}
              </View>
            </View>
          )}
          {!userType && (
            <View>
              <OrSeparator text="Start with" />

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
          )}
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
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => router.push("/Account/Login")}>
            <Text style={styles.bottomRight}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* )} */}
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
    // position: "absolute",
    //bottom: 12,
    marginBottom: 20,
    // right: 0,
    // left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black",
    //marginTop: 12,
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
});

export default SignUp;
