import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FontAwesomeIconName } from "../../Helpers/menusTabsMobile";
import { COLORS } from "../../constants";
import { useTheme } from "../../Helpers/theme/ThemeProvider";

export interface Tab {
  name: string;
  label: string;
  icon: FontAwesomeIconName;
  path: string;
}

export const tabs: Tab[] = [
  { name: "home", label: "Home", icon: "home", path: "/Dashboard" },
  { name: "profile", label: "Profile", icon: "user", path: "/Profile" },
  { name: "settings", label: "Settings", icon: "cog", path: "/Settings" },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const dark = useTheme();

  const backGroundStyle = dark ? COLORS.black : COLORS.primary;

  if (!isOpen) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backGroundStyle,
          },
        ]}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.navItem]}
            onPress={() => {
              router.push(tab.path);
              onClose();
            }}
          >
            <FontAwesome
              name={tab.icon as keyof typeof FontAwesome.glyphMap}
              size={24}
              color={dark ? COLORS.primary : COLORS.black}
            />
            <Text
              style={[
                styles.navText,
                { color: dark ? COLORS.primary : COLORS.black },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text
            style={[
              styles.closeButtonText,
              { color: dark ? COLORS.primary : COLORS.black },
            ]}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  navText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SideNav;
