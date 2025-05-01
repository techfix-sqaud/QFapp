import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, SIZES } from "../../constants";
import helperMethods from "../../Helpers/helperMethods";

interface NotificationCardProps {
  icon: ImageSourcePropType;
  title: string;
  description: string;
  date: Date;
  onPress?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  title,
  description,
  date,
  onPress,
}) => {
  const { dark } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={icon} resizeMode="cover" style={styles.icon} />
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          >
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Text style={styles.date}>{helperMethods.getTimeAgo(date)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: SIZES.width - 32,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    height: 44,
    width: 44,
    backgroundColor: COLORS.black2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    marginRight: 12,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
  },
  title: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: "regular",
    color: "gray",
  },
  date: {
    fontSize: 12,
    fontFamily: "regular",
    color: "gray",
  },
});

export default NotificationCard;
