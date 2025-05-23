import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import Button from "../custom/Button";
import DotsView from "../custom/DotsView";

const customerScreens = [
  {
    id: 1,
    title: "Welcome to Instant Handyman App",
    description:
      "We're here to make your life easier by connecting you with top-notch service providers for all your home needs.",
    image: images.GS4,
  },
  {
    id: 2,
    title: "Find Trusted Professionals",
    description:
      "Get access to verified service providers for all your home needs, from cleaning to repairs.",
    image: images.GS3,
  },
  {
    id: 3,
    title: "Book Services Easily",
    description:
      "Schedule appointments with just a few taps and enjoy hassle-free service at your convenience.",
    image: images.GS5,
  },
];

const providerScreens = [
  {
    id: 1,
    title: "Join Instant Handyman",
    description:
      "Grow your business by connecting with customers who need your services.",
    image: images.GS2,
  },
  {
    id: 2,
    title: "Get Verified & Trusted",
    description:
      "We ensure that only top-quality professionals are listed, helping you build trust with customers.",
    image: images.GS3,
  },
  {
    id: 3,
    title: "Receive & Manage Bookings",
    description:
      "Easily accept service requests, manage appointments, and grow your business.",
    image: images.GS1,
  },
];

const GetStarted: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isProvider, setIsProvider] = useState(false); // Toggle between customer & provider
  const { colors } = useTheme();
  const router = useRouter();

  const screens = isProvider ? providerScreens : customerScreens;

  const handleNext = () => {
    if (currentPage < screens.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push("/Account/Login"); // Navigate to login after last page
    }
  };

  const handleSkip = () => {
    router.push("/Account/Login"); // Skip onboarding
  };

  const handleToggle = (isProviderSelected: boolean) => {
    setIsProvider(isProviderSelected);
    setCurrentPage(0); // ✅ Reset to first page when switching roles
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => handleToggle(false)}>
          <Text style={[styles.toggleText, !isProvider && styles.activeToggle]}>
            Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToggle(true)}>
          <Text style={[styles.toggleText, isProvider && styles.activeToggle]}>
            Provider
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={screens[currentPage].image}
          style={styles.illustration}
        />
        <View
          style={[styles.textContainer, { backgroundColor: colors.background }]}
        >
          <Text style={styles.title}>{screens[currentPage].title}</Text>
          <Text style={styles.description}>
            {screens[currentPage].description}
          </Text>
        </View>
        <DotsView progress={currentPage} numDots={screens.length} />
        <View style={styles.buttonContainer}>
          <Button title="Next" filled onPress={handleNext} />
          <Button
            title="Skip"
            onPress={handleSkip}
            textColor={colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  toggleText: {
    fontSize: 16,
    color: COLORS.gray3,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  activeToggle: {
    fontWeight: "bold",
    color: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  illustration: {
    width: "90%",
    height: SIZES.height * 0.4,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    ...FONTS.body3,
    color: COLORS.gray3,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default GetStarted;
