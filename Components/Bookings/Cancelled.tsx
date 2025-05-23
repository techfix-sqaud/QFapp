// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useTheme } from "../../Helpers/theme/ThemeProvider";
// import { COLORS, SIZES } from "../../constants";
// import { cancelledBookings } from "../../Helpers/data";
// import Button from "../custom/Button";

// interface BookingItem {
//   id: string;
//   serviceType: string;
//   status: string;
//   image: any; // Replace `any` with the appropriate type for your image source
//   provider: string;
//   price: number;
//   date: string;
//   address: string;
//   receipt: string;
// }

// const MyBookingsCancelled: React.FC = () => {
//   const router = useRouter();
//   const { dark, colors } = useTheme();
//   const [cancelledBooking, setCancelledBooking] =
//     React.useState<any[]>(cancelledBookings);

//   const renderItem = ({ item }: { item: BookingItem }) => (
//     <View style={styles.itemContainer}>
//       <View style={styles.statusContainer}>
//         <Text
//           style={[
//             styles.typeText,
//             {
//               color: dark ? COLORS.white : COLORS.greyscale900,
//             },
//           ]}
//         >
//           {item.serviceType}
//         </Text>
//         <Text
//           style={[
//             styles.statusText,
//             {
//               color: item.status === "Paid" ? COLORS.green : COLORS.red,
//               marginLeft: 12,
//             },
//           ]}
//         >
//           {item.status}
//         </Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <View style={styles.infoLeft}>
//           <Image source={item.image} style={styles.itemImage} />
//           <View style={styles.itemDetails}>
//             <Text
//               style={[
//                 styles.itemName,
//                 {
//                   color: dark ? COLORS.white : COLORS.greyscale900,
//                 },
//               ]}
//             >
//               {item.provider}
//             </Text>
//             <View style={styles.itemSubDetails}>
//               <Text
//                 style={[
//                   styles.itemPrice,
//                   {
//                     color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
//                   },
//                 ]}
//               >
//                 ${item.price}
//               </Text>
//               <Text
//                 style={[
//                   styles.itemDate,
//                   {
//                     color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
//                   },
//                 ]}
//               >
//                 {" "}
//                 | {item.date}
//               </Text>
//               <Text
//                 style={[
//                   styles.itemItems,
//                   {
//                     color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
//                   },
//                 ]}
//               >
//                 {" "}
//                 | {item.address}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <Text style={styles.receiptText}>{item.receipt}</Text>
//       </View>
//       <View style={styles.actionsContainer}>
//         {/* <Button
//           onPress={() => console.log("Performing action...")}
//           // style={styles.rateButton}
//           title="Confirm"
//         /> */}
//         {/* <Text style={styles.rateButtonText}>Confirm</Text>
//         </Button> */}

//         <Button
//           filled={true}
//           title="Login"
//           // onPress={(e: any) => handleLogin(e)}
//           style={styles.rateButton}
//         >
//           Login
//         </Button>
//         {/* <TouchableOpacity
//           onPress={() => router.push("/Finance/Receipts")}
//           style={styles.reorderButton}
//         >
//           <Text style={styles.reorderButtonText}>View</Text>
//         </TouchableOpacity> */}
//         <Button
//           filled={true}
//           title="Cancel"
//           // onPress={(e: any) => handleLogin(e)}
//           style={styles.rateButton}
//         >
//           Cancel
//         </Button>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cancelledBooking}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemContainer: {
//     flexDirection: "column",
//   },
//   statusContainer: {
//     borderBottomColor: COLORS.grayscale400,
//     borderBottomWidth: 0.3,
//     marginVertical: 12,
//     flexDirection: "row",
//     paddingBottom: 4,
//   },
//   typeText: {
//     fontSize: 14,
//     fontFamily: "bold",
//   },
//   statusText: {
//     fontSize: 14,
//     fontFamily: "bold",
//   },
//   infoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   itemImage: {
//     height: 60,
//     width: 60,
//     borderRadius: 8,
//   },
//   itemDetails: {
//     marginLeft: 12,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   itemSubDetails: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 4,
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontFamily: "bold",
//   },
//   itemDate: {
//     fontSize: 12,
//     fontFamily: "regular",
//     marginHorizontal: 2,
//   },
//   itemItems: {
//     fontSize: 12,
//     fontFamily: "regular",
//   },
//   receiptText: {
//     fontSize: 14,
//     textDecorationLine: "underline",
//     textDecorationColor: COLORS.gray3,
//     fontFamily: "regular",
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 18,
//   },
//   rateButton: {
//     marginVertical: 6,
//     width: SIZES.width - 32,
//     borderRadius: 30,
//   },
//   button: {
//     marginVertical: 6,
//     width: SIZES.width - 32,
//     borderRadius: 30,
//   },
//   rateButtonText: {
//     color: COLORS.primary,
//     fontSize: 14,
//     fontFamily: "regular",
//   },
//   reorderButton: {
//     height: 38,
//     width: 140,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//   },
//   reorderButtonText: {
//     color: COLORS.white,
//     fontSize: 14,
//     fontFamily: "regular",
//   },
// });

// export default MyBookingsCancelled;

// import { View, Text, StyleSheet, TextInput } from "react-native";
// import React, { useState } from "react";
// import { ScrollView } from "react-native-virtualized-view";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { useTheme } from "../../Helpers/theme/ThemeProvider";
// import { COLORS, SIZES } from "../../constants";
// import Button from "../custom/Button";
// import Header from "../custom/Head";

// const CancelBooking: React.FC = () => {
//   const { colors, dark } = useTheme();
//   const router = useRouter();

//   const renderContent = () => {
//     const [comment, setComment] = useState<string>("");
//     const [selectedItem, setSelectedItem] = useState<string | null>(null);

//     const handleCheckboxPress = (itemTitle: string): void => {
//       if (selectedItem === itemTitle) {
//         setSelectedItem(null);
//       } else {
//         setSelectedItem(itemTitle);
//       }
//     };

//     const handleCommentChange = (text: string): void => {
//       setComment(text);
//     };

//     return (
//       <View style={{ marginVertical: 12 }}>
//         <Text
//           style={[
//             styles.inputLabel,
//             {
//               color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
//             },
//           ]}
//         >
//           Please select the reason for the cancellations
//         </Text>
//         <View style={{ marginVertical: 16 }}>
//           {/* <ReasonItem
//             checked={selectedItem === 'Schedule change'}
//             onPress={() => handleCheckboxPress('Schedule change')}
//             title="Schedule change"
//           />
//           <ReasonItem
//             checked={selectedItem === 'Weather conditions'}
//             onPress={() => handleCheckboxPress('Weather conditions')}
//             title="Weather conditions"
//           />
//           <ReasonItem
//             checked={selectedItem === 'Unexpected Work'}
//             onPress={() => handleCheckboxPress('Unexpected Work')}
//             title="Unexpected Work"
//           />
//           <ReasonItem
//             checked={selectedItem === 'Childcare Issue'}
//             onPress={() => handleCheckboxPress('Childcare Issue')}
//             title="Childcare Issue"
//           />
//           <ReasonItem
//             checked={selectedItem === 'Travel Delays'}
//             onPress={() => handleCheckboxPress('Travel Delays')}
//             title="Travel Delays"
//           />
//           <ReasonItem
//             checked={selectedItem === 'Others'}
//             onPress={() => handleCheckboxPress('Others')}
//             title="Others"
//           /> */}
//         </View>
//         <Text
//           style={[
//             styles.inputLabel,
//             {
//               color: dark ? COLORS.grayscale100 : COLORS.greyscale900,
//             },
//           ]}
//         >
//           Add detailed reason
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             {
//               color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
//               borderColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
//             },
//           ]}
//           placeholder="Write your reason here..."
//           placeholderTextColor={
//             dark ? String(COLORS.secondaryWhite) : String(COLORS.greyscale900)
//           }
//           multiline={true}
//           numberOfLines={4}
//           onChangeText={handleCommentChange}
//           value={comment}
//         />
//       </View>
//     );
//   };

//   const renderSubmitButton = () => {
//     return (
//       <View
//         style={[
//           styles.btnContainer,
//           {
//             backgroundColor: colors.background,
//           },
//         ]}
//       >
//         <Button
//           title="Submit"
//           filled
//           style={styles.submitBtn}
//           onPress={() => router.push("/CancelBookingPaymentMethods")}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         <Header title="Cancel Booking" />
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {renderContent()}
//         </ScrollView>
//       </View>
//       {renderSubmitButton()}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   area: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 12,
//   },
//   input: {
//     borderColor: "gray",
//     borderWidth: 0.3,
//     borderRadius: 5,
//     width: "100%",
//     padding: 10,
//     paddingBottom: 10,
//     fontSize: 12,
//     height: 150,
//     textAlignVertical: "top",
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontFamily: "medium",
//     color: COLORS.black,
//     marginBottom: 6,
//     marginTop: 16,
//   },
//   btnContainer: {
//     position: "absolute",
//     bottom: 22,
//     height: 72,
//     width: "100%",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: COLORS.white,
//     alignItems: "center",
//   },
//   submitBtn: {
//     width: SIZES.width - 32,
//   },
// });

// export default CancelBooking;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, SIZES } from "../../constants";
import { cancelledBookings } from "../../Helpers/data";
import { FontAwesome } from "@expo/vector-icons";
import { IBookings } from "../../interfaces/bookings";

const CancelledBooking: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>(cancelledBookings);
  const { dark } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
        },
      ]}
    >
      <FlatList
        data={bookings}
        keyExtractor={(item: IBookings) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cardContainer,
              {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              },
            ]}
          >
            {/* Booking Top Section */}
            <View style={styles.detailsContainer}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.serviceImage}
              />
              <View style={styles.reviewContainer}>
                <FontAwesome name="star" size={12} color="orange" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>

              <View style={styles.detailsRightContainer}>
                <Text
                  style={[
                    styles.name,
                    {
                      color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                    },
                  ]}
                >
                  {item.provider}
                </Text>
                <Text
                  style={[
                    styles.address,
                    {
                      color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                    },
                  ]}
                >
                  {item.address}
                </Text>

                {/* Price and Status */}
                <View style={styles.priceContainer}>
                  <View style={styles.priceItemContainer}>
                    <Text style={styles.totalPrice}>${item.price}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{item.PaymentStatus}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Divider Line */}
            <View
              style={[
                styles.separateLine,
                {
                  backgroundColor: dark
                    ? COLORS.greyScale800
                    : COLORS.grayscale200,
                },
              ]}
            />

            {/* View Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => router.push("/ReviewSummary")}
                style={styles.receiptBtn}
              >
                <Text style={styles.receiptBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite,
    marginVertical: 22,
  },
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  statusContainer: {
    width: 54,
    height: 24,
    borderRadius: 6,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: "medium",
  },
  separateLine: {
    width: "100%",
    height: 0.7,
    backgroundColor: COLORS.greyScale800,
    marginVertical: 12,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceImage: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginHorizontal: 12,
  },
  detailsRightContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontFamily: "bold",
    color: COLORS.greyscale900,
  },
  address: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
  },
  priceItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  reviewContainer: {
    position: "absolute",
    top: 6,
    right: 16,
    width: 46,
    height: 20,
    borderRadius: 16,
    backgroundColor: COLORS.transparentWhite2,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    fontSize: 12,
    fontFamily: "semiBold",
    color: COLORS.primary,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  receiptBtn: {
    width: SIZES.width - 32 - 12,
    height: 36,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
  },
});

export default CancelledBooking;
