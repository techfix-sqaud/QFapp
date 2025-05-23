import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Button from "../../custom/Button";
import { COLORS, images } from "../../../constants";
import { mostPopularServices } from "../../../Helpers/data";
import LoadingOverlay from "../../custom/loadingOverlay";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../../Helpers/theme/ThemeProvider";

interface ServiceDetailsProps {
  serviceId: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ serviceId }) => {
  const [service, setService] = useState<any>(null);
  const { colors, dark } = useTheme();

  useEffect(() => {
    if (serviceId) {
      const found = mostPopularServices.find((s) => s.id === String(serviceId));
      if (found) setService(found);
    }
  }, [serviceId]);

  if (!service) {
    return (
      <LoadingOverlay visible={true} message="Loading service details..." />
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Service Image */}
      <View style={styles.imageContainer}>
        <Image source={service.image || images.service1} style={styles.image} />
      </View>

      {/* Service Info Card */}
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? COLORS.gray2 : COLORS.white },
        ]}
      >
        <Text
          style={[
            styles.category,
            { color: dark ? COLORS.white : COLORS.gray3 },
          ]}
        >
          Electronics {">"} Installation
        </Text>

        <Text
          style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}
        >
          {service.name}
        </Text>

        {/* Rating & Duration */}
        <View style={styles.row}>
          <FontAwesome name="star" size={16} color={COLORS.primary} />
          <Text style={[styles.rating]}>
            {service.rating} ({service.numReviews} reviews)
          </Text>
          <Text
            style={[
              styles.duration,
              { color: dark ? COLORS.white : COLORS.gray3 },
            ]}
          >
            • {service.duration} Hour
          </Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {service.isOnDiscount && (
            <Text
              style={[
                styles.oldPrice,
                { color: dark ? COLORS.white : COLORS.gray3 },
              ]}
            >
              ${service.oldPrice}
            </Text>
          )}
          <Text style={[styles.price]}>${service.price}</Text>
        </View>
        <Button
          title="Continue"
          filled
          onPress={() => console.log("Continuing...")}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={[styles.title, { color: dark ? COLORS.white : COLORS.gray3 }]}
        >
          Description
        </Text>
        <Text
          style={[
            styles.description,
            { color: dark ? COLORS.white : COLORS.gray3 },
          ]}
        >
          {service.description}
        </Text>
      </View>
      <View
        style={[
          styles.userCard,
          { backgroundColor: dark ? COLORS.gray2 : COLORS.white },
        ]}
      >
        <Image source={images.user1} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text
            style={[
              styles.userName,
              { color: dark ? COLORS.white : COLORS.black },
            ]}
          >
            Leslie Alexander
          </Text>
          <Text
            style={[
              styles.userText,
              { color: dark ? COLORS.white : COLORS.gray3 },
            ]}
          >
            example@gmail.com
          </Text>
          <Text
            style={[
              styles.userText,
              { color: dark ? COLORS.white : COLORS.gray3 },
            ]}
          >
            1901 Thornridge Cir. Shiloh, Hawaii
          </Text>
          <Text
            style={[
              styles.userText,
              { color: dark ? COLORS.white : COLORS.gray3 },
            ]}
          >
            (704) 555-0127
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 250 },
  card: {
    marginHorizontal: 20,
    marginTop: -50,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,

    // iOS Shadow
    shadowColor: COLORS.gray2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    zIndex: 10,

    // Android Shadow
    elevation: 5,
  },
  category: {
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rating: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 5,
  },
  duration: {
    fontSize: 16,
    marginLeft: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userText: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default ServiceDetails;
