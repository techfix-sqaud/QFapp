// import React from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// const MobileNav = () => {
//   //   const screenHeight = Dimensions.get("window").height;
//   //   const menuHeight = screenHeight * 0.3;
//   const router = useRouter();
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         {/* <View style={[styles.container, { height: menuHeight }]}> */}
//         <TouchableOpacity onPress={() => router.push("/")}>
//           <Text style={styles.menuItem}>Home</Text>
//         </TouchableOpacity>
//         <Text style={styles.menuItem}>About</Text>
//         <Text style={styles.menuItem}>Services</Text>
//         <Text style={styles.menuItem}>Contact</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#081c4b",
//     paddingVertical: 10,
//     position: "absolute",
//     bottom: 0,
//     marginBottom: 3,
//     width: "100%",
//   },
//   menuItem: {
//     color: "#fff", // Text color
//     fontSize: 16, // Text font size
//   },
// });

// export default MobileNav;

import { View, Platform, Image, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONTS, icons } from "../../constants";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import ProvidersManagment from "../../screens/Providers";
const Tab = createBottomTabNavigator();

const MobileNav = () => {
  const { dark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          justifyContent: "center",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor: dark ? COLORS.dark1 : COLORS.white,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Clients"
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={focused ? icons.home : icons.home2Outline}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Providers"
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={focused ? icons.document2 : icons.document2Outline}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                >
                  Bookings
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Providers"
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={focused ? icons.heart2 : icons.heart2Outline}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                >
                  Favourite
                </Text>
              </View>
            );
          },
        }}
      /> */}
      {/* <Tab.Screen
        name="Providers"
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={
                    focused ? icons.chatBubble2 : icons.chatBubble2Outline
                  }
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                >
                  Inbox
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Providers"
        component={ProvidersManagment}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={focused ? icons.user : icons.userOutline}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: focused
                      ? COLORS.primary
                      : dark
                      ? COLORS.gray3
                      : COLORS.gray3,
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MobileNav;
