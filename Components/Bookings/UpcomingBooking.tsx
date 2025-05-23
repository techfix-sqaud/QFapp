import React, { ReactElement, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, SIZES } from "../../constants";
import { upcomingBookings } from "../../Helpers/data";
import Button from "../custom/Button";
import { IBookings } from "../../interfaces/bookings";
interface RBSheetRef {
  open: () => void;
  close: () => void;
}

const UpcomingBooking: React.FC = (): ReactElement => {
  const [bookings, setBookings] = useState<any[]>(upcomingBookings);
  const refRBSheet = useRef<RBSheetRef>(null);
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
        keyExtractor={(item: IBookings): string => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }): ReactElement => (
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
                <View style={styles.reviewContainer}>
                  <FontAwesome name="star" size={12} color="orange" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
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
                    <Text style={styles.statusText}>{item.PaymentStatus}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.separateLine,
                {
                  marginVertical: 10,
                  backgroundColor: dark
                    ? COLORS.greyScale800
                    : COLORS.grayscale200,
                },
              ]}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => refRBSheet?.current?.open()}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Cancel Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/EReceipt")}
                style={styles.receiptBtn}
              >
                <Text style={styles.receiptBtnText}>View E-Receipt</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={false}
        height={332}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 332,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: "center",
            width: "100%",
          },
        }}
      >
        <Text
          style={[
            styles.bottomSubtitle,
            {
              color: dark ? COLORS.red : COLORS.red,
            },
          ]}
        >
          Cancel Booking
        </Text>
        <View
          style={[
            styles.separateLine,
            {
              backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
            },
          ]}
        />
        <View style={styles.selectedCancelContainer}>
          <Text
            style={[
              styles.cancelTitle,
              {
                color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
              },
            ]}
          >
            Are you sure you want to cancel your apartment booking?
          </Text>
          <Text
            style={[
              styles.cancelSubtitle,
              {
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
              },
            ]}
          >
            Only 80% of the money you can refund from your payment according to
            our policy.
          </Text>
        </View>
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
            title="Yes, Cancel"
            filled
            style={styles.removeButton}
            onPress={() => {
              refRBSheet?.current?.close();
              router.push("/Bookings/CancelBooking");
            }}
          />
        </View>
      </RBSheet>
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
  priceItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
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
  cancelBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12,
  },
  cancelBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  receiptBtn: {
    width: (SIZES.width - 32) / 2 - 16,
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
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  bottomSubtitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12,
  },
  selectedCancelContainer: {
    marginVertical: 24,
    paddingHorizontal: 36,
    width: "100%",
  },
  cancelTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
  },
  cancelSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
    marginVertical: 8,
    marginTop: 16,
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

export default UpcomingBooking;
