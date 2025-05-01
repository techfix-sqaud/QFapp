import { StyleSheet, Text, View } from "react-native";
import Providers from "../../Components/ProviderManagement/Providers";
export default function ProvidersManagment() {
  return (
    <View style={styles.container}>
      <Providers />
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
