import { useRouter, usePathname } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import { tabs } from "../../Helpers/menusTabsMobile";
import SideNav from "./MobileNav";
import { useTheme } from "../../Helpers/theme/ThemeProvider";

const BottomNav = () => {
  const [isNavOpen, setNavOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const { colors, dark } = useTheme();

  const isActive = (path: string) =>
    pathname === path || (path === "/Dashboard" && pathname === "/");
  return (
    <>
      {isNavOpen && (
        <SideNav isOpen={isNavOpen} onClose={() => setNavOpen(false)} />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.path}
              style={styles.tabItem}
              onPress={() => {
                if (tab.label === "Menu") {
                  setNavOpen(true);
                } else {
                  router.push(tab.path);
                  setNavOpen(false);
                }
              }}
            >
              <Image
                source={isActive(tab.path) ? tab.icon : tab.notFocused}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isActive(tab.path) ? COLORS.primary : COLORS.gray,
                }}
              />
              <Text
                style={{
                  color: isActive(tab.path) ? COLORS.primary : COLORS.gray,
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

export default BottomNav;
