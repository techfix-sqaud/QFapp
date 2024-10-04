import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const MobileNav = () => {
  //   const screenHeight = Dimensions.get("window").height;
  //   const menuHeight = screenHeight * 0.3;
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <View style={[styles.container, { height: menuHeight }]}> */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.menuItem}>About</Text>
        <Text style={styles.menuItem}>Services</Text>
        <Text style={styles.menuItem}>Contact</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#081c4b",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    marginBottom: 3,
    width: "100%",
  },
  menuItem: {
    color: "#fff", // Text color
    fontSize: 16, // Text font size
  },
});

export default MobileNav;
