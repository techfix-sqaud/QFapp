import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { tabs } from "../../Helpers/menusTabsMobile";
import SideNav from "./MobileNav";
import { useTheme } from "../../Helpers/theme/ThemeProvider";

interface NavItem {
  label: string;
  icon: string; // Use the string type for FontAwesome icons
  path: string;
}

const CustomBottomNav = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track active tab index
  const [isNavOpen, setNavOpen] = useState<boolean>(false); // SideNav visibility state
  const router = useRouter();
  const dark = useTheme();

  return (
    <>
      {isNavOpen && (
        <SideNav isOpen={isNavOpen} onClose={() => setNavOpen(false)} />
      )}
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.path}
              style={styles.tabItem}
              onPress={() => {
                if (tab.label === "Menu") {
                  setNavOpen(true);
                } else {
                  setActiveIndex(index); // Set the active index
                  router.push(tab.path); // Navigate to the tab's path
                }
              }}
            >
              <FontAwesome
                name={tab.icon as keyof typeof FontAwesome.glyphMap}
                size={24}
                color={
                  activeIndex === index
                    ? COLORS.primary // Active tab color
                    : COLORS.white // Inactive tab color
                }
              />
              <Text
                style={{
                  color:
                    activeIndex === index
                      ? COLORS.primary // Active tab color
                      : COLORS.gray3, // Inactive tab color
                  fontSize: 12,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
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
