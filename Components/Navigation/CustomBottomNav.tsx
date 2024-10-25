import { router } from "expo-router";
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

interface NavItem {
  label: string;
  icon: any; // You can replace 'any' with the specific type for your icons
  activeColor: string;
  inactiveColor: string;
  path: string; // Add the path property
}

interface CustomBottomNavProps {
  items?: NavItem[];
  onItemPress?: (index: number) => void;
  activeIndex?: number;
}

const CustomBottomNav: React.FC<CustomBottomNavProps> = ({
  items,
  onItemPress,
  activeIndex,
}) => {
  return (
    // <View style={styles.container}>
    //   {items?.map((item, index) => (
    //     <TouchableOpacity
    //       key={item.label}
    //       style={styles.tab}
    //       onPress={() => router.push(item.path)} // Use router.push with the path
    //     >
    //       <Image
    //         source={item.icon}
    //         style={[
    //           styles.icon,
    //           {
    //             tintColor:
    //               activeIndex === index ? item.activeColor : item.inactiveColor,
    //           },
    //         ]}
    //       />
    //       <Text
    //         style={[
    //           styles.label,
    //           {
    //             color:
    //               activeIndex === index ? item.activeColor : item.inactiveColor,
    //           },
    //         ]}
    //       >
    //         {item.label}
    //       </Text>
    //     </TouchableOpacity>
    //   ))}
    // </View>
    <View style={styles.container}>
      {/* <View style={[styles.container, { height: menuHeight }]}> */}
      {/* <TouchableOpacity onPress={() => router.push("/Clients")}>
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity> */}
      <Text style={styles.label}>About</Text>
      <Text style={styles.label}>Services</Text>
      <Text style={styles.label}>Contact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flexDirection: "row",
  //     position: "absolute",
  //     justifyContent: "space-around",
  //     alignItems: "center",
  //     height: Platform.OS === "ios" ? 90 : 60, // Adjust height for iOS and Android
  //     backgroundColor: "#290ca8", // Background color of the nav
  //     borderTopWidth: 1,
  //     borderTopColor: "#ccc", // Optional border color
  //     elevation: 5, // Shadow for Android
  //     shadowColor: "#000", // Shadow for iOS
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.3,
  //     shadowRadius: 4,
  //   },
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
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  label: {
    color: "#fff",
    fontSize: 12,
  },
});

export default CustomBottomNav;
