import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = currentStep / totalSteps;

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barForeground, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  barBackground: {
    width: "90%",
    height: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    overflow: "hidden",
  },
  barForeground: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default ProgressBar;
