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
// import { COLORS } from "../../constants";
// import { completedBookings } from "../../Helpers/data";

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

// const MyBookingCompleted: React.FC = () => {
//   const navigation = useRouter();
//   const { dark, colors } = useTheme();
//   const [completedBooking, setCompletedBookings] =
//     React.useState<any[]>(completedBookings);

//   const renderItem = ({ item }: { item: BookingItem }) => (
//     <View style={styles.itemContainer}>
//       <View style={styles.statusContainer}>
//         <Text
//           style={[
//             styles.typeText,
//             { color: dark ? COLORS.white : COLORS.greyscale900 },
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
//                 { color: dark ? COLORS.white : COLORS.greyscale900 },
//               ]}
//             >
//               {item.provider}
//             </Text>
//             <View style={styles.itemSubDetails}>
//               <Text
//                 style={[
//                   styles.itemPrice,
//                   { color: dark ? COLORS.grayscale200 : COLORS.grayscale700 },
//                 ]}
//               >
//                 ${item.price}
//               </Text>
//               <Text
//                 style={[
//                   styles.itemDate,
//                   { color: dark ? COLORS.grayscale200 : COLORS.grayscale700 },
//                 ]}
//               >
//                 {" "}
//                 | {item.date}
//               </Text>
//               <Text
//                 style={[
//                   styles.itemItems,
//                   { color: dark ? COLORS.grayscale200 : COLORS.grayscale700 },
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
//         <TouchableOpacity
//           onPress={() => console.log("Performing action...")}
//           style={styles.rateButton}
//         >
//           <Text style={styles.rateButtonText}>Archive</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.push("EReceipt")}
//           style={styles.reorderButton}
//         >
//           <Text style={styles.reorderButtonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={completedBooking}
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
//     textDecorationColor: COLORS.grayscale400,
//     fontFamily: "regular",
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 18,
//   },
//   rateButton: {
//     height: 38,
//     width: 140,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: COLORS.primary,
//     borderWidth: 1,
//     borderRadius: 8,
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

// export default MyBookingCompleted;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItemInfo,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { useRouter } from "expo-router";
import { completedBookings } from "../../Helpers/data";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, SIZES } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
interface ICompletedBookings {
  id: string;
  serviceType: string;
  status: string;
  image: any; // Replace `any` with the appropriate type for your image source
  provider: string;
  price: number;
  date: string;
  address: string;
  receipt: string;
  rating: number;
}

const CompletedBooking: React.FC = (): ReactElement => {
  const [bookings, setBookings] = useState<any[]>(completedBookings);
  const { dark } = useTheme();
  const router = useRouter();

  const renderItem = ({
    item,
  }: ListRenderItemInfo<ICompletedBookings>): ReactElement => (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          backgroundColor: dark ? COLORS.dark2 : COLORS.white,
        },
      ]}
    >
      <View style={styles.detailsContainer}>
        <View>
          <Image
            source={item.image}
            resizeMode="cover"
            style={styles.serviceImage}
          />
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

          <View style={styles.priceContainer}>
            <View style={styles.priceItemContainer}>
              <Text style={styles.totalPrice}>${item.price}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <FontAwesome name="star" size={12} color="orange" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.separateLine,
          {
            marginVertical: 10,
            backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
          },
        ]}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("EReceipt")}
          style={styles.receiptBtn}
        >
          <Text style={styles.receiptBtnText}>View E-Receipt</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
        keyExtractor={(item: ICompletedBookings): string => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
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
  statusContainer: {
    width: 60,
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
});

export default CompletedBooking;
