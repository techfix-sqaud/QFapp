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
const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);
  const { colors, dark } = useTheme();

  const handleResetPassowrd = async (e: any) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage(["Please fill in all required fields."]);
      return;
    }
  };

  return (
    // <SafeAreaView
    //   style={[
    //     //styles.area,
    //     {
    //       backgroundColor: "red", //colors.background,
    //     },
    //   ]}
    // >
    //   {/* <View
    //     style={[
    //       styles.container,
    //       {
    //         backgroundColor: "red", //colors.background,
    //       },
    //     ]}
    //   > */}
    //   {/* <ScrollView showsVerticalScrollIndicator={false}> */}
    //   <View style={styles.logoContainer}>
    //     <Image source={images.logo} resizeMode="contain" style={styles.logo} />
    //   </View>
    //   <Text
    //     style={[
    //       styles.title,
    //       {
    //         color: dark ? COLORS.white : COLORS.black,
    //       },
    //     ]}
    //   >
    //     Reset your password
    //   </Text>
    //   <Input
    //     id="email"
    //     onInputChanged={(id, value) => {
    //       setEmail(value);
    //     }}
    //     placeholder="Email"
    //     placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
    //     icon={icons.email}
    //     errorText={errorMessage.length > 0 ? errorMessage : []}
    //     keyboardType="email-address"
    //   />

    //   <Button
    //     filled={true}
    //     title="Submit"
    //     onPress={(e: any) => handleResetPassowrd(e)}
    //     style={styles.button}
    //   >
    //     Submit
    //   </Button>
    //   {/* </ScrollView> */}
    //   {/* </View> */}
    // </SafeAreaView>

    <View style={[styles.container]}>
      {/* <Header title="Change Password" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          {/* <Image
              source={
                dark
                  ? illustrations.passwordSuccessDark
                  : illustrations.newPassword
              }
              resizeMode="contain"
              style={styles.success}
            /> */}
        </View>
        <Text
          style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}
        >
          Reset Password
        </Text>
        <Input
          id="email"
          onInputChanged={(id, value) => {
            setEmail(value);
          }}
          placeholder="Email"
          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
          icon={icons.email}
          errorText={errorMessage.length > 0 ? errorMessage : []}
          keyboardType="email-address"
        />

        <View style={styles.checkBoxContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.privacy,
                  {
                    color: dark ? COLORS.white : COLORS.black,
                  },
                ]}
              >
                Remember me
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </ScrollView>
      <Button
        title="Continue"
        filled
        onPress={(): void => console.log(true)}
        style={styles.button}
      />
      {/* {renderModal()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    // flex: 1,
    // padding: 16,
    height: "100%",
    backgroundColor: "red", //COLORS.white,
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

export default ForgotPasswordForm;
