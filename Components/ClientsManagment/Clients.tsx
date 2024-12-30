import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
const Clients = () => {
  const { dark, colors } = useTheme();
  console.log("rec", colors);
  return (
    <View>
      <Text style={{ backgroundColor: colors.background }}>
        Welcome to the client service
      </Text>
    </View>
  );
};

export default Clients;
