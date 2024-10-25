// import React, { useContext, useReducer } from "react";
// import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
// import { PaperProvider } from "react-native-paper";
// import WebNavigation from "../Components/Navigation/WebNavigation";
// import MobileNav from "../Components/Navigation/MobileNav";
// import Login from "../screens/Auth/Login";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AuthContext from "../contexts/AuthContext";
// import { Slot, Stack, usePathname } from "expo-router";
// import { authReducer, initialState } from "../contexts/AuthProvider";
// import { ThemeProvider } from "../Helpers/theme/ThemeProvider";
// import Head from "expo-head";
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";

// // const publicRoutes = ["/", "/Account/Login", "/Account/Signup"];
// // const Layout = () => {
// //   const path = usePathname();
// //   const isAnonymouse =
// //     path === "/" ||
// //     publicRoutes.includes(path.split("/")[1].toLocaleLowerCase());

// //   const renderContent = () => {
// //     console.log("path", path);
// //     if (Platform.OS !== "web") {
// //       <GestureHandlerRootView style={{ flex: 1 }}>
// //         <SafeAreaView style={{ flex: 1, backgroundColor: "#081c4b" }}>
// //           <KeyboardAvoidingView
// //             style={{ flex: 1 }}
// //             behavior={Platform.OS === "ios" ? "padding" : "height"}
// //           >
// //             <ScrollView>
// //               <Slot />
// //             </ScrollView>
// //           </KeyboardAvoidingView>
// //         </SafeAreaView>
// //       </GestureHandlerRootView>;
// //     } else if (isAnonymouse) {
// //       return <Slot screenOptions={{ title: "quickFix" }} />;
// //     } else {
// //       return <WebNavigation />;
// //     }
// //   };
// //   return (
// //     <>
// //       <Head>
// //         <style>
// //           {`
// //           body {
// //             background-color: #081c4b;
// //           }
// //         `}
// //         </style>
// //       </Head>
// //       <ThemeProvider>
// //         {renderContent()}
// //         <StatusBar style="auto" />
// //       </ThemeProvider>
// //     </>
// //   );
// // };

// // export default Layout;

// const Layout = () => {
//   const path = usePathname();
//   const publicRoutes = ["/", "/Account/Login", "/Account/Signup"];

//   const isAnonymous =
//     path === "/" || publicRoutes.includes(path.split("/")[1]?.toLowerCase());

//   const renderContent = () => {
//     console.log("path", path);
//     if (Platform.OS !== "web") {
//       return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//           <SafeAreaView style={{ flex: 1, backgroundColor: "#081c4b" }}>
//             <KeyboardAvoidingView
//               style={{ flex: 1 }}
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//             >
//               <ScrollView>
//                 <Slot />
//               </ScrollView>
//             </KeyboardAvoidingView>
//           </SafeAreaView>
//         </GestureHandlerRootView>
//       );
//     } else if (isAnonymous) {
//       return <Slot screenOptions={{ title: "quickFix" }} />;
//     } else {
//       return <WebNavigation />;
//     }
//   };

//   return (
//     <>
//       <Head>
//         <style>
//           {`
//           body {
//             background-color: #081c4b;
//           }
//         `}
//         </style>
//       </Head>
//       <ThemeProvider>
//         {renderContent()}
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </>
//   );
// };

// export default Layout;

import React, { useReducer } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Head } from "expo-head";
import { StatusBar } from "expo-status-bar";
import { Slot, usePathname } from "expo-router";
import { ThemeProvider } from "../Helpers/theme/ThemeProvider";
import WebNavigation from "../Components/Navigation/WebNavigation";
import AuthContext from "../contexts/AuthContext";
import { authReducer, initialState } from "../contexts/AuthProvider";
//import MobileNav from "../Components/Navigation/MobileNav";
import BottomNav from "../Components/Navigation/BottomNav";

import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
const Layout = () => {
  const [UserState, dispatch] = useReducer(authReducer, initialState);
  const publicRoutes = ["/", "/Account/Login", "/Account/Signup"];
  const path = usePathname();
  const isAnonymous =
    path === "/" || publicRoutes.includes(path.split("/")[1]?.toLowerCase());
  const renderContent = () => {
    if (Platform.OS !== "web") {
      console.log("path", path);
      return (
        <GestureHandlerRootView>
          <SafeAreaView>
            <KeyboardAvoidingView>
              <ScrollView>
                <Slot />
              </ScrollView>
              {!isAnonymous && UserState.isAuthenticated && <BottomNav />}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </GestureHandlerRootView>
      );
    } else if (isAnonymous) {
      return <Slot screenOptions={{ title: "quickFix" }} />;
    } else {
      return <WebNavigation />;
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
        <AuthContext.Provider value={{ UserState, dispatch }}>
          {renderContent()}
          <StatusBar style="auto" />
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
