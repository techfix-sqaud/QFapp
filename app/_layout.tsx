import React, { useContext, useReducer } from "react";
import { Platform, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import WebNavigation from "../Components/Navigation/WebNavigation";
import MobileNav from "../Components/Navigation/MobileNav";
import Login from "../screens/Auth/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../contexts/AuthContext";
import { Slot, Stack } from "expo-router";
import { authReducer, initialState } from "../contexts/AuthProvider";
import { ThemeProvider } from "../Helpers/theme/ThemeProvider";

export default function HomeLayout() {
  //const { isAuthenticated } = useContext(AuthContext);
  const [UserState, dispatch] = useReducer(authReducer, initialState);
  console.log("userSate", UserState);

  const renderContent = () => {
    if (UserState.isAuthenticated) {
      return Platform.OS !== "web" ? (
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#081c4b" }}>
            <Slot />
            <MobileNav />
          </SafeAreaView>
        </ThemeProvider>
      ) : (
        <>
          <WebNavigation />
          <Stack />
        </>
      );
    } else {
      // Render the login page when not authenticated
      return <Login />;
    }
  };
  return (
    <AuthContext.Provider value={{ UserState, dispatch }}>
      {renderContent()}
    </AuthContext.Provider>
  );
}
