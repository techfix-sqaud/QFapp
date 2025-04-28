import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import Input from "../../Components/custom/Input";
import { SIZES, COLORS, images, icons } from "../../constants";
import { useRouter } from "expo-router";
import Button from "../../Components/custom/Button";
import Header from "../../Components/custom/Head";
import { getUserData } from "../../Helpers/API/usersAPIs";
import AuthContext from "../../contexts/AuthContext";
import { UserProfile } from "../../interfaces/users";
import { UserRole } from "../../Helpers/Enums";
import helperMethods from "../../Helpers/helperMethods";
import LoadingOverlay from "../../Components/custom/loadingOverlay";
const isTestMode = true;

const EditProfile = () => {
  const { UserState } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<ImageSourcePropType | null>(null);
  const [error, setError] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const { colors, dark } = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    ssn: "",
    profile: "",
  });

  useEffect((): void => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect((): void => {
    getUserData()
      .then((response: any) => {
        if (!response) {
          console.warn("No user data returned");
          return;
        }
        setUserProfile(response);
      })
      .catch((error: any) => {
        console.log("Error fetching user data", error);
      });
  }, [UserState]);

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const pickImage = async (): Promise<void> => {
    // try {
    //   const tempUri: string | undefined = await launchImagePicker();
    //   if (!tempUri) return;
    //   // set the image
    //   setImage({ uri: tempUri });
    // } catch (error) {}
  };
  const updateUser = async () => {
    try {
      setIsLoading(true);

      // Temporary timer to test the loading overlay
      setTimeout(() => {
        Alert.alert("Success", "Profile updated successfully!");
        setIsLoading(false);
      }, 2000); // Simulate a 2-second delay
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
      console.error("Update error", error);
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isLoading && <LoadingOverlay visible={isLoading} message="Updating" />}
        <Header title="Edit Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  userProfile?.profile === null
                    ? images.user1
                    : { uri: userProfile?.profile }
                }
                resizeMode="cover"
                style={styles.avatar}
              />
              <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="firstName"
              onInputChanged={(id, value) =>
                handleInputChange("firstName", value)
              }
              editable={false}
              label="First Name"
              autoCapitalize="none"
              placeholder="First Name"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.user}
              keyboardType={"default"}
              textContentType="firstName"
              value={formData?.firstName}
            />
            <Input
              id="lastName"
              onInputChanged={(id, value) =>
                handleInputChange("lastName", value)
              }
              label="Last Name"
              editable={false}
              autoCapitalize="none"
              placeholder="Last Name"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.user}
              keyboardType={"default"}
              textContentType="lastName"
              value={formData?.lastName}
            />
            <Input
              id="UserName"
              onInputChanged={(id, value) =>
                handleInputChange("userName", value)
              }
              label="UserName"
              autoCapitalize="none"
              placeholder="UserName"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.userDefault}
              keyboardType={"default"}
              textContentType="userName"
              value={formData?.userName}
            />
            <Input
              id="email"
              onInputChanged={(id, value) => handleInputChange("email", value)}
              autoCapitalize="none"
              label="Email"
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.email}
              keyboardType={"default"}
              value={formData?.email}
              textContentType="emailAddress"
            />
            <Input
              id="phoneNumber"
              onInputChanged={(id, value) =>
                handleInputChange("phoneNumber", value)
              }
              label="Phone Number"
              style={{ color: dark ? COLORS.white : COLORS.greyscale500 }}
              placeholder="Enter your phone number"
              placeholderTextColor={dark ? COLORS.white : COLORS.greyscale500}
              selectionColor={dark ? COLORS.white : COLORS.greyscale500}
              keyboardType="numeric"
              value={formData?.phoneNumber}
            />
            {UserState.role == UserRole.Freelancer && (
              <Input
                id="SSN"
                onInputChanged={(id, value) => {
                  console.log(`Input changed: ${id} = ${value}`);
                }}
                label="SSN"
                style={{ color: dark ? COLORS.white : COLORS.greyscale500 }}
                placeholder="last 4 digits of your SSN"
                placeholderTextColor={dark ? COLORS.white : COLORS.greyscale500}
                selectionColor={dark ? COLORS.white : COLORS.greyscale500}
                keyboardType="numeric"
                value={
                  formData?.ssn ? helperMethods.maskSSN(formData?.ssn) : ""
                }
              />
            )}
            <Text
              style={{
                color: dark ? COLORS.white : COLORS.primary,
                fontSize: 16,
              }}
            >
              Last Login:{" "}
              {userProfile?.last_login
                ? new Date(userProfile.last_login).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </ScrollView>
      </View>
      {/* {RenderAreasCodesModal()} */}
      <View style={styles.bottomContainer}>
        <Button
          title="Update"
          filled
          style={styles.continueButton}
          onPress={(): void => {
            updateUser();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: SIZES.padding,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    position: "relative",
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#111",
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: "center",
  },
  continueButton: {
    width: SIZES.width - 32,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 6,
    height: 58,
    width: SIZES.width - 32,
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    // borderRadius: 4,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: "center",
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    // borderRadius: 8,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: "center",
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16,
  },
});

export default EditProfile;
