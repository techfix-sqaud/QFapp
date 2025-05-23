import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, SIZES } from "../../constants";
import Button from "../custom/Button";
import Header from "../custom/Head";

const CancelBooking: React.FC = () => {
  const { colors, dark } = useTheme();
  const router = useRouter();

  const renderContent = () => {
    const [comment, setComment] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const commentRef = useRef<string>("");
    const handleCheckboxPress = (itemTitle: string): void => {
      if (selectedItem === itemTitle) {
        setSelectedItem(null);
      } else {
        setSelectedItem(itemTitle);
      }
    };

    //   const handleCommentChange = (text: string): void => {
    //     setComment(text);
    //     console.log(text);
    //   };

    //   return (
    //     <View style={{ marginVertical: 12 }}>
    //       <Text
    //         style={[
    //           styles.inputLabel,
    //           {
    //             color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
    //           },
    //         ]}
    //       >
    //         Please select the reason for the cancellations
    //       </Text>
    //       <View style={{ marginVertical: 16 }}>
    //         {/* <ReasonItem
    //       checked={selectedItem === 'Schedule change'}
    //       onPress={() => handleCheckboxPress('Schedule change')}
    //       title="Schedule change"
    //         />
    //         <ReasonItem
    //       checked={selectedItem === 'Weather conditions'}
    //       onPress={() => handleCheckboxPress('Weather conditions')}
    //       title="Weather conditions"
    //         />
    //         <ReasonItem
    //       checked={selectedItem === 'Unexpected Work'}
    //       onPress={() => handleCheckboxPress('Unexpected Work')}
    //       title="Unexpected Work"
    //         />
    //         <ReasonItem
    //       checked={selectedItem === 'Childcare Issue'}
    //       onPress={() => handleCheckboxPress('Childcare Issue')}
    //       title="Childcare Issue"
    //         />
    //         <ReasonItem
    //       checked={selectedItem === 'Travel Delays'}
    //       onPress={() => handleCheckboxPress('Travel Delays')}
    //       title="Travel Delays"
    //         />
    //         <ReasonItem
    //       checked={selectedItem === 'Others'}
    //       onPress={() => handleCheckboxPress('Others')}
    //       title="Others"
    //         /> */}
    //       </View>
    //       <Text
    //         style={[
    //           styles.inputLabel,
    //           {
    //             color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
    //           },
    //         ]}
    //       >
    //         Add detailed reason
    //       </Text>
    //       {/* <TextInput
    //       style={[
    //         styles.input,
    //         {
    //           color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
    //           borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
    //         },
    //       ]}
    //       placeholder="Write your reason here..."
    //       placeholderTextColor={
    //         dark ? String(COLORS.secondaryWhite) : String(COLORS.greyscale900)
    //       }
    //       multiline={true}
    //       numberOfLines={4}
    //       onChangeText={(text) => {
    //         setComment(text); // Fix: Update the state with the input value
    //       }}
    //       value={comment}
    //       /> */}
    //       <TextInput
    //         style={[
    //           styles.input,
    //           {
    //             color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
    //             borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
    //           },
    //         ]}
    //         placeholder="Write your reason here..."
    //         placeholderTextColor={
    //           dark ? String(COLORS.secondaryWhite) : String(COLORS.greyscale900)
    //         }
    //         multiline={true}
    //         numberOfLines={4}
    //         onChangeText={(text) => setComment(text)}
    //         value={comment}
    //       />
    //     </View>
    //   );
    // };

    const handleCommentChange = (text: string): void => {
      commentRef.current = text;
      console.log("Current comment:", commentRef.current);
    };
    return (
      <View style={{ marginVertical: 12 }}>
        <Text
          style={[
            styles.inputLabel,
            { color: dark ? COLORS.grayscale100 : COLORS.greyscale900 },
          ]}
        >
          Add detailed reason
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
              borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
            },
          ]}
          placeholder="Write your reason here..."
          placeholderTextColor={
            dark ? String(COLORS.secondaryWhite) : String(COLORS.greyscale900)
          }
          multiline={true}
          numberOfLines={4}
          onChangeText={handleCommentChange}
        />
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Button
          title="Submit"
          filled
          style={styles.submitBtn}
          onPress={() => router.push("/CancelBookingPaymentMethods")}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Cancel Booking" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </View>
      {renderSubmitButton()}
    </SafeAreaView>
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
    padding: 12,
  },
  input: {
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    width: "100%",
    padding: 10,
    paddingBottom: 10,
    fontSize: 12,
    height: 150,
    textAlignVertical: "top",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
    marginBottom: 6,
    marginTop: 16,
  },
  btnContainer: {
    position: "absolute",
    bottom: 22,
    height: 72,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  submitBtn: {
    width: SIZES.width - 32,
  },
});

export default CancelBooking;
