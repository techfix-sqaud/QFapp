import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React, { FC, ReactElement } from "react";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, icons, SIZES } from "../../constants";

interface ISettingsItemProps {
  icon: ImageSourcePropType;
  name: string;
  onPress: () => void;
  hasArrowRight?: boolean;
}

const SettingsItem: FC<ISettingsItemProps> = ({
  icon,
  name,
  onPress,
  hasArrowRight = true,
}): ReactElement => {
  const { dark } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            styles.icon,
            {
              tintColor: dark ? COLORS.white : COLORS.greyscale900,
            },
          ]}
        />
        <Text
          style={[
            styles.name,
            {
              color: dark ? COLORS.white : COLORS.greyscale900,
            },
          ]}
        >
          {name}
        </Text>
      </View>
      {hasArrowRight && (
        <Image
          source={icons.arrowRight}
          resizeMode="contain"
          style={[
            styles.arrowRight,
            {
              tintColor: dark ? COLORS.white : COLORS.greyscale900,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  name: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  arrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900,
  },
});

export default SettingsItem;
