import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants";
import Button from "../../custom/Button";
import { useTheme } from "../../../Helpers/theme/ThemeProvider";

const BookingStatus: React.FC = () => {
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(0);
  const slideUpAnim = useRef(new Animated.Value(0)).current;

  const history = [
    { time: "10:00 AM", description: "Booking confirmed", status: "completed" },
    { time: "12:30 PM", description: "Handyman assigned", status: "completed" },
    {
      time: "1:45 PM",
      description: "Handyman is on the way",
      status: "pending",
    },
  ];

  const handleSheetLayout = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    if (sheetHeight === 0) {
      setSheetHeight(height);
      slideUpAnim.setValue(height);
    }
  };

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideUpAnim, {
      toValue: sheetHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const themeStyles = {
    containerBg: dark ? COLORS.gray2 : COLORS.white,
    sheetBg: dark ? COLORS.dark3 : COLORS.white,
    textPrimary: dark ? COLORS.white : COLORS.black,
    textSecondary: dark ? COLORS.gray3 : COLORS.gray3,
    dragHandle: dark ? COLORS.gray3 : COLORS.gray3,
    shadow: dark
      ? {}
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyles.containerBg }]}
    >
      <TouchableOpacity style={styles.openButton} onPress={openModal}>
        <Text style={styles.openButtonText}>Show Booking Status</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={closeModal} />

        <Animated.View
          style={[
            styles.bottomSheet,
            {
              backgroundColor: themeStyles.sheetBg,
              transform: [{ translateY: slideUpAnim }],
              ...themeStyles.shadow,
            },
          ]}
          onLayout={handleSheetLayout}
        >
          <SafeAreaView edges={["bottom"]}>
            <View
              style={[
                styles.dragHandle,
                { backgroundColor: themeStyles.dragHandle },
              ]}
            />

            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: themeStyles.textPrimary }]}>
                Booking Status
              </Text>
              <Text style={[styles.bookingId, { color: COLORS.primary }]}>
                #NO123456
              </Text>
            </View>

            {/* Timeline */}
            <View style={styles.historyContainer}>
              {history.map((event, index) => (
                <View key={index} style={styles.historyItem}>
                  <View
                    style={[
                      styles.dot,
                      event.status === "completed"
                        ? styles.greenDot
                        : styles.redDot,
                    ]}
                  />
                  {index !== history.length - 1 && (
                    <View style={styles.lineContainer}>
                      <View
                        style={[
                          styles.line,
                          { backgroundColor: themeStyles.dragHandle },
                        ]}
                      />
                      <View
                        style={[
                          styles.smallDot,
                          { backgroundColor: themeStyles.dragHandle },
                        ]}
                      />
                      <View
                        style={[
                          styles.smallDot,
                          { backgroundColor: themeStyles.dragHandle },
                        ]}
                      />
                      <View
                        style={[
                          styles.smallDot,
                          { backgroundColor: themeStyles.dragHandle },
                        ]}
                      />
                    </View>
                  )}
                  <View style={styles.historyTextContainer}>
                    <Text
                      style={[
                        styles.historyTime,
                        { color: themeStyles.textPrimary },
                      ]}
                    >
                      {event.time}
                    </Text>
                    <Text
                      style={[
                        styles.historyDescription,
                        { color: themeStyles.textSecondary },
                      ]}
                    >
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Button title="Cancel Booking" filled onPress={closeModal} />
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  openButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
  openButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  dragHandle: {
    width: 50,
    height: 5,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  bookingId: { fontSize: 16, fontWeight: "bold" },

  historyContainer: {
    padding: 20,
    borderRadius: 10,
  },
  historyItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  greenDot: { backgroundColor: "green" },
  redDot: { backgroundColor: "red" },

  lineContainer: { alignItems: "center", justifyContent: "center" },
  line: { width: 2, height: 20 },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginVertical: 2,
  },

  historyTextContainer: { flex: 1 },
  historyTime: { fontSize: 16, fontWeight: "bold" },
  historyDescription: { fontSize: 14 },
});

export default BookingStatus;
