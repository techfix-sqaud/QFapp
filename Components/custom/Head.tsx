import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, icons, SIZES } from "../../constants";
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const { colors, dark } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? COLORS.dark1 : COLORS.white,
        },
      ]}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={[
            styles.backIcon,
            {
              tintColor: colors.text,
            },
          ]}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
  },
});

export default Header;
