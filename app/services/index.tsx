import React from "react";
import { StyleSheet, View } from "react-native";
//import SignUp from "../../screens/Auth/SignUp";

const Service = () => {
  return <View style={styles.main}>{/* <SignUp /> */}</View>;
};
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
export default Service;
