import { StyleSheet, Text, View } from "react-native";
import Login from "../Components/Auth/Login";
import { Stack } from "expo-router";
import Layout from "./_layout";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      <View style={styles.main}>
        <Login />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
