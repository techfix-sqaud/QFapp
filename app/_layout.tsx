import React, { useReducer } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar as MobileStatusBar,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Head } from "expo-head";
import { Slot, usePathname } from "expo-router";
import { ThemeProvider, useTheme } from "../Helpers/theme/ThemeProvider";
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
  const { colors, dark } = useTheme();
  const [userId, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );

  return (
    <ThemeProvider>
      <ValidationContext.Provider value={{ userId, validationDispatch }}>
        <AuthContext.Provider value={{ UserState, dispatch }}>
          <InnerLayout />
        </AuthContext.Provider>
      </ValidationContext.Provider>
    </ThemeProvider>
  );
};

const InnerLayout = () => {
  const { colors, dark } = useTheme();
  const path = usePathname();
  const { UserState } = React.useContext(AuthContext);
  const publicRoutes = ["/", "/Account/Login", "/Account/Signup"];
  const isAnonymous =
    path === "/" || publicRoutes.includes(path.split("/")[1]?.toLowerCase());

  const renderContent = () => {
    if (Platform.OS !== "web") {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView
            style={[
              styles.mobileSafeArea,
              { backgroundColor: colors.background },
            ]}
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Slot />
              {!isAnonymous && UserState?.isAuthenticated && <BottomNav />}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </GestureHandlerRootView>
      );
    } else {
      return <Slot screenOptions={{ title: "quickFix" }} />;
    }
  };

  return (
    <>
      {Platform.OS === "web" && (
        <Head>
          <style>{/* Add any head styles if needed */}</style>
        </Head>
      )}
      <ExpoStatusBar style={dark ? "light" : "dark"} translucent={true} />

      {renderContent()}
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
