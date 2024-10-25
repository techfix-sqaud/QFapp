import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Image, Text } from "react-native";
import { COLORS, FONTS, icons } from "../../constants";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import CustomBottomNav from "./CustomBottomNav";

const BottomNav = () => {
  const { dark } = useTheme();

  return <CustomBottomNav />;
};

export default BottomNav;
