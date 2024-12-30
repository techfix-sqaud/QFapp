import React, { useContext, useReducer } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
  StyleSheet,
  StatusBar as MobileStatusBar,
  Button,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Head } from "expo-head";
import { StatusBar } from "expo-status-bar";
import { Slot, usePathname } from "expo-router";
import {
  //ThemeContext,
  ThemeProvider,
  useTheme,
} from "../Helpers/theme/ThemeProvider";
import WebNavigation from "../Components/Navigation/WebNavigation";
import AuthContext from "../contexts/AuthContext";
import { authReducer, initialState } from "../contexts/AuthProvider";
import BottomNav from "../Components/Navigation/BottomNav";
import ValidationContext from "../contexts/ValidationContext";
import {
  initialValidationState,
  validationReducer,
} from "../contexts/ValidationProvider";

const Layout = () => {
  const [UserState, dispatch] = useReducer(authReducer, initialState);
  const [userId, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );
  //const { colors, dark } = useTheme();
  const { colors, dark, setScheme } = useTheme();
  //const context = useContext(ThemeContext);
  //console.log("dark,", context);
  const layoutBackground = colors.background;
  console.log("colors layout", colors);
  const publicRoutes = ["/", "/Account/Login", "/Account/Signup"];
  const path = usePathname();
  const isAnonymous =
    path === "/" || publicRoutes.includes(path.split("/")[1]?.toLowerCase());
  const renderContent = () => {
    if (Platform.OS !== "web") {
      console.log("path", path);
      return (
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView
              style={[
                styles.mobileSafeArea,
                { backgroundColor: layoutBackground },
              ]}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <ScrollView>
                  <Slot />
                </ScrollView>
                {!isAnonymous && UserState.isAuthenticated && <BottomNav />}
              </KeyboardAvoidingView>
            </SafeAreaView>
          </GestureHandlerRootView>
        </ThemeProvider>
      );
    } else if (isAnonymous) {
      return <Slot screenOptions={{ title: "quickFix" }} />;
    } else {
      return <Slot screenOptions={{ title: "quickFix" }} />; //<WebNavigation />;
    }
  };

  return (
    <>
      {Platform.OS === "web" && (
        <Head>
          <style>
            {/* {`
              body {
                background-color: #081c4b;
              }
            `} */}
          </style>
        </Head>
      )}
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ValidationContext.Provider value={{ userId, validationDispatch }}>
            <AuthContext.Provider value={{ UserState, dispatch }}>
              {renderContent()}
              <StatusBar style="auto" />
            </AuthContext.Provider>
          </ValidationContext.Provider>
        </SafeAreaView>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  mobileSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? MobileStatusBar.currentHeight : 0,
  },
});
export default Layout;
