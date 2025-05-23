import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ImageSourcePropType,
  Platform,
} from "react-native";
import React, {
  useState,
  useRef,
  FC,
  ReactElement,
  RefObject,
  useContext,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import images from "../../constants/images";
import { COLORS, icons, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import SettingsItem from "../../Components/custom/SettingsItem";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { useRouter } from "expo-router";
import Button from "../../Components/custom/Button";
import AuthContext from "../../contexts/AuthContext";
import Header from "../../Components/custom/Head";

interface RBSheetRef {
  open: () => void;
  close: () => void;
}

const Settings = () => {
  const refRBSheet = useRef<RBSheetRef>(null);
  const { dark, colors, setScheme } = useTheme();
  const { UserState } = useContext(AuthContext)!;

  const router = useRouter();

  const [image, setImage] = useState<ImageSourcePropType>(images.user1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const pickImage = async (): Promise<void> => {
    // try {
    //   const tempUri: string | undefined = await launchImagePicker();
    //   if (!tempUri) {
    //     console.log("No image selected");
    //     return;
    //   }
    //   setImage({ uri: tempUri });
    // } catch (error) {
    //   console.error("Error picking image: ", error);
    // }
  };

  const toggleDarkMode = async (): Promise<void> => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      dark ? setScheme("light") : setScheme("dark");

      if (Platform.OS === "web") {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      } else {
        await AsyncStorage.setItem("theme", newMode ? "dark" : "light");
      }
    } catch (error) {
      console.error("Error saving theme preference: ", error);
    }
  };

  const renderSettings = (): ReactElement => (
    <View style={styles.settingsContainer}>
      <SettingsItem
        icon={icons.bell2}
        name="Notification"
        onPress={() => router.push("/Settings/Notifications")}
      />
      <SettingsItem
        icon={icons.shieldOutline}
        name="Security"
        onPress={() => router.push("/Settings/Security")}
      />
      <TouchableOpacity
        onPress={() => router.push("/Settings")}
        style={styles.settingsItemContainer}
      >
        <View style={styles.leftContainer}>
          <Image
            source={icons.more}
            resizeMode="contain"
            style={[
              styles.settingsIcon,
              { tintColor: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          />
          <Text
            style={[
              styles.settingsName,
              { color: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          >
            Language & Region
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.rightLanguage,
              { color: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          >
            English (US)
          </Text>
          <Image
            source={icons.arrowRight}
            resizeMode="contain"
            style={[
              styles.settingsArrowRight,
              { tintColor: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItemContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={icons.show}
            resizeMode="contain"
            style={[
              styles.settingsIcon,
              { tintColor: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          />
          <Text
            style={[
              styles.settingsName,
              { color: dark ? COLORS.white : COLORS.greyscale900 },
            ]}
          >
            Dark Mode
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Switch
            value={dark}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? "#fff" : COLORS.white}
            trackColor={{ false: "#EEEEEE", true: COLORS.primary }}
            ios_backgroundColor={COLORS.white}
            style={styles.switch}
          />
        </View>
      </TouchableOpacity>
      <SettingsItem
        icon={icons.lockedComputerOutline}
        name="Privacy Policy"
        onPress={() => router.push("/Settings/Privacy")}
      />
      <SettingsItem
        icon={icons.infoCircle}
        name="Help Center"
        onPress={() => router.push("/Settings/HelpCenter")}
      />
      <SettingsItem
        icon={icons.people4}
        name="Invite Friends"
        onPress={() => router.push("/InviteFriends")}
      />
    </View>
  );

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Settings" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSettings()}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 32,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  profileContainer: {
    alignItems: "center",
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
  },
  picContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    right: 0,
    bottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: "medium",
    marginTop: 4,
  },
  settingsContainer: {
    marginVertical: 12,
  },
  settingsItemContainer: {
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
  settingsIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  settingsName: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  settingsArrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightLanguage: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginRight: 8,
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  logoutContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  logoutLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logoutName: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 12,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: "red",
    textAlign: "center",
    marginTop: 12,
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 28,
  },
  headTitle: {
    fontSize: 20,
    fontFamily: "bold",
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12,
  },
});

export default Settings;
