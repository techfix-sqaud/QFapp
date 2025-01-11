import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  ImageSourcePropType,
  SafeAreaView,
} from "react-native";
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import Input from "../../Components/custom/Input";
import { SIZES, COLORS, images, FONTS, icons } from "../../constants";
import { useRouter } from "expo-router";
import Button from "../../Components/custom/Button";
import Header from "../../Components/custom/Head";
const isTestMode = true;

const EditProfile = () => {
  const [image, setImage] = useState<ImageSourcePropType | null>(null);
  const [error, setError] = useState<any>(null);
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const { colors, dark } = useTheme();
  const router = useRouter();
  const genderOptions: { label: string; value: string }[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
  };

  const today = new Date();
  const startDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
  //   const startDate: string = getFormatedDate(
  //     new Date(today.setDate(today.getDate() + 1)),
  //     "YYYY/MM/DD"
  //   );

  const [startedDate, setStartedDate] = useState<string>("12/12/2023");
  const handleOnPressStartDate = (): void => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  //   const inputChangedHandler = useCallback(
  //     (inputId: string, inputValue: string): void => {
  //       const result: boolean = validateInput(inputId, inputValue);
  //       dispatchFormState({ inputId, validationResult: result, inputValue });
  //     },
  //     [dispatchFormState]
  //   );

  useEffect((): void => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);

  const pickImage = async (): Promise<void> => {
    // try {
    //   const tempUri: string | undefined = await launchImagePicker();
    //   if (!tempUri) return;
    //   // set the image
    //   setImage({ uri: tempUri });
    // } catch (error) {}
  };

  // fectch codes from rescountries api
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response: Response) => response.json())
      .then((data) => {
        let areaData = data.map((item: any) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a: any) => a.code == "US");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  // render countries codes modal
  function RenderAreasCodesModal() {
    const renderItem = ({ item }: any): ReactElement => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: 16, color: "#fff" }}>{item.item}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={(): void => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item: { code: string }) => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View style={[{ backgroundColor: "red" }]}>
      <View
        style={[
          styles.container,
          { backgroundColor: dark ? COLORS.black : COLORS.white },
        ]}
      >
        <Header title="Edit Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? images.user1 : image}
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
              id="email"
              onInputChanged={(id, value) => {
                setFirstName(value);
              }}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.email}
              keyboardType={"default"}
              textContentType="emailAddress"
            />

            <Input
              id="email"
              onInputChanged={(id, value) => {
                setEmail(value);
              }}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.email}
              keyboardType={"default"}
              textContentType="emailAddress"
            />

            <View
              style={{
                width: SIZES.width - 32,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.inputBtn,
                  {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  },
                ]}
                onPress={handleOnPressStartDate}
              >
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.grayscale400,
                  }}
                >
                  {startedDate}
                </Text>
                <Feather
                  name="calendar"
                  size={24}
                  color={COLORS.grayscale400}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                  borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.selectFlagContainer}
                onPress={(): void => setModalVisible(true)}
              >
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={icons.arrowDown}
                    resizeMode="contain"
                    style={styles.downIcon}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 5,
                  }}
                >
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    style={[styles.flagIcon, { resizeMode: "contain" }]}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      color: dark ? COLORS.white : "#111",
                      fontSize: 12,
                    }}
                  >
                    {selectedArea?.callingCode}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Phone Number Text Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                selectionColor="#111"
                keyboardType="numeric"
              />
            </View>
            <View>
              {/* <RNPickerSelect
                placeholder={{ label: "Select", value: "" }}
                items={genderOptions}
                onValueChange={(value) => handleGenderChange(value)}
                value={selectedGender}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    // borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: "center",
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    // borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: "center",
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16,
                  },
                }}
              /> */}
            </View>
            {/* <Input
              id="occupation"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities["occupation"]}
              placeholder="Occupation"
              placeholderTextColor={
                dark ? String(COLORS.grayTie) : String(COLORS.black)
              }
            /> */}
          </View>
        </ScrollView>
      </View>
      {/* <DatePickerModal
      open={openStartDatePicker}
      startDate={startDate}
      selectedDate={startedDate}
      onClose={(): void => setOpenStartDatePicker(false)}
      onChangeStartDate={(date: string) => setStartedDate(date)}
    /> */}
      {RenderAreasCodesModal()}
      <View style={styles.bottomContainer}>
        <Button
          title="Update"
          filled
          style={styles.continueButton}
          onPress={(): void => {
            router.push("/Dashboard");
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
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 6,
    height: 52,
    width: SIZES.width - 32,
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
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
    color: "#111",
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
