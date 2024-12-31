import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { tabs } from "../../Helpers/menusTabsMobile";

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
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => router.push(tab.path)}
          >
            <FontAwesome
              name={tab.icon as keyof typeof FontAwesome.glyphMap} // This now matches the allowed type
              size={24}
              color={tab.path ? "#fff" : "#aaa"}
            />
            <Text style={{ color: tab.path ? "#fff" : "#aaa" }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "#fff",
    fontSize: 20,
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#333",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomBottomNav;
