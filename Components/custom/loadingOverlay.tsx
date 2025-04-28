import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS } from "../../constants";

const { width, height } = Dimensions.get("window");

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
}) => {
  if (!visible) return null;

  console.log("LoadingOverlay rendered", visible);
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // For Android shadow effect
  },
  message: {
    marginTop: 10,
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default LoadingOverlay;
