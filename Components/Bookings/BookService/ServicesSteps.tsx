import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../../custom/Button";
import { COLORS, FONTS, SIZES, images } from "../../../constants";

const BookService = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleBook = () => {
    // Booking logic here
  };

  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.innerContainer}
      > */}
      <Text style={styles.header}>Book Service</Text>
      <Text style={styles.step}>Step {step}</Text>

      {step === 1 ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Detail Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Date And Time"
            placeholderTextColor={COLORS.gray3}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Address"
            placeholderTextColor={COLORS.gray3}
          />

          <TouchableOpacity>
            <Text style={styles.useLocation}>Use Current Location</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <Button title="Next" filled onPress={handleNext} />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceTitle}>Apartment Cleaning</Text>
            <Image source={images.service1} style={styles.serviceImage} />
            <Text style={styles.serviceUnits}>2 Units</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Price Details</Text>
            <Text style={styles.priceText}>Price: $120</Text>
            <Text style={styles.priceText}>Sub Total: $240</Text>
            <Text style={styles.priceText}>Discount (5%): -$15.12</Text>
            <Text style={styles.priceText}>Tax: $15.12</Text>
            <Text style={styles.totalAmount}>Total: $255.12</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePrevious} />
            <Button title="Book" filled onPress={handleBook} />
          </View>
        </>
      )}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, padding: 20 },
  header: {
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 10,
  },
  step: {
    ...FONTS.body3,
    textAlign: "center",
    marginVertical: 10,
    color: COLORS.gray3,
  },
  formContainer: { marginTop: 30 },
  label: {
    ...FONTS.body3,
    color: COLORS.gray3,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  useLocation: {
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  serviceContainer: { alignItems: "center", marginVertical: 20 },
  serviceTitle: { fontSize: 20, fontWeight: "bold" },
  serviceImage: { width: 100, height: 100, marginVertical: 10 },
  serviceUnits: { fontSize: 16 },
  priceContainer: {
    padding: 20,
    backgroundColor: COLORS.grayscale700,
    borderRadius: 10,
  },
  priceTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  priceText: { fontSize: 16, marginBottom: 5 },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default BookService;
