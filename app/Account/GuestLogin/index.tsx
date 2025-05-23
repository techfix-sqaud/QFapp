import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import Header from "../../../Components/custom/Head";
import { useTheme } from "../../../Helpers/theme/ThemeProvider";
import images from "../../../constants/images";
import { useRouter } from "expo-router";
import useLogin from "../../../hooks/useLogin";
import Input from "../../../Components/custom/Input";
import icons from "../../../constants/icons";
import Button from "../../../Components/custom/Button";
import OrSeparator from "../../../Components/custom/OrSeparator";
import LoadingOverlay from "../../../Components/custom/loadingOverlay";

const index = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [errorRequiredFields, setErrorRequiredFields] = useState<string[]>([
    "",
  ]);
  const { colors, dark, setScheme } = useTheme();
  const { requestLoginAsGuest, loading } = useLogin();

  const handleContinueAsGuest = async (e: any) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      setErrorRequiredFields(["Please fill in all required fields."]);
      return;
    }
    requestLoginAsGuest(firstName, lastName, email);
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
        <Header title="Guest Login" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          {errorRequiredFields && (
            <Text style={{ color: COLORS.error }}>{errorRequiredFields}</Text>
          )}
          <Input
            id="firstName"
            onInputChanged={(id, value) => {
              setFirstName(value);
            }}
            autoCapitalize="none"
            placeholder="First Name"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.user}
            keyboardType={"default"}
            textContentType="firstName"
          />
          <Input
            id="lastName"
            onInputChanged={(id, value) => {
              setLastName(value);
            }}
            autoCapitalize="none"
            placeholder="Last Name"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={icons.user}
            keyboardType={"default"}
            textContentType="lastName"
          />

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
          <Button
            filled={true}
            title="Continue as Guest"
            onPress={(e: any) => handleContinueAsGuest(e)}
            style={styles.button}
          />
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
            have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/Account/Login");
            }}
          >
            <Text style={styles.bottomRight}>Login</Text>
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
export default index;
