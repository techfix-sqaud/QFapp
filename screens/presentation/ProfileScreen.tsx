import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ImageSourcePropType,
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
//import { launchImagePicker } from "../../Helpers/ImagePickerHelper";
import RBSheet from "react-native-raw-bottom-sheet";
import SettingsItem from "../../Components/custom/SettingsItem";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { useRouter } from "expo-router";
import Button from "../../Components/custom/Button";
import AuthContext from "../../contexts/AuthContext";
import Header from "../../Components/custom/Head";
import useLogin from "../../hooks/useLogin";
import { UserRole, UserRoleIds } from "../../Helpers/Enums";

interface RBSheetRef {
  open: () => void;
  close: () => void;
}

const ProfileScreen = () => {
  const refRBSheet = useRef<RBSheetRef>(null);
  const { dark, colors, setScheme } = useTheme();
  const { UserState } = useContext(AuthContext)!;
  const { handleLogout } = useLogin();
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
  const renderHeader = (): ReactElement => {
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <View style={styles.headerLeft}>
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
              styles.headTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Profile
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/Settings")}>
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={[
              styles.headerIcon,
              { tintColor: dark ? COLORS.white : COLORS.primary },
            ]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const renderProfile = (): ReactElement => (
    <View style={styles.profileContainer}>
      <View>
        {UserState.profile !== "" ? (
          <Image
            source={{ uri: UserState.profile }}
            resizeMode="cover"
            style={styles.avatar}
          />
        ) : (
          <FontAwesome name="user-circle" size={80} color="#4034ef" />
        )}
        {UserState.role !== UserRole.Guest && (
          <TouchableOpacity onPress={pickImage} style={styles.picContainer}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[
          styles.title,
          { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
        ]}
      >
        {UserState.firstName} {UserState.lastName}
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
        ]}
      >
        {UserState.email}
      </Text>
    </View>
  );

  const renderSettings = (): ReactElement => (
    <View style={styles.settingsContainer}>
      <SettingsItem
        icon={icons.calendar}
        name="My Booking"
        onPress={() => router.push("/MyBookings")}
      />
      {UserState.role !== UserRole.Guest ? (
        <SettingsItem
          icon={icons.userOutline}
          name="Edit Profile"
          onPress={() => router.push("/Users/EditProfile")}
        />
      ) : (
        <SettingsItem
          icon={icons.userOutline}
          name="Sign up"
          onPress={() => router.push("/Account/signup")}
        />
      )}

      <SettingsItem
        icon={icons.wallet2Outline}
        name="Payment"
        onPress={() => router.push("/SettingsPayment")}
      />

      <TouchableOpacity
        onPress={() => refRBSheet?.current?.open()}
        style={styles.logoutContainer}
      >
        <View style={styles.logoutLeftContainer}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            style={[styles.logoutIcon, { tintColor: "red" }]}
          />
          <Text style={[styles.logoutName, { color: "red" }]}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderSettings()}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={false}
        height={SIZES.height * 0.8}
        customStyles={{
          wrapper: { backgroundColor: "rgba(0,0,0,0.5)" },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          },
        }}
      >
        <Text style={styles.bottomTitle}>Logout</Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />
        <Text
          style={[
            styles.bottomSubtitle,
            { color: dark ? COLORS.white : COLORS.black },
          ]}
        >
          Are you sure you want to log out?
        </Text>
        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            }}
            textColor={dark ? String(COLORS.white) : String(COLORS.primary)}
            onPress={() => refRBSheet?.current?.close()}
          />
          <Button
            title="Yes, Logout"
            filled
            style={styles.logoutButton}
            onPress={() => {
              refRBSheet?.current?.close();
              handleLogout();
            }}
          />
        </View>
      </RBSheet>
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

export default ProfileScreen;
