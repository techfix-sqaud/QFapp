import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Clients from "../../Components/ClientsManagment/Clients";
export default function ClientsManagment() {
  return (
    <View style={styles.container}>
      <Clients />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
