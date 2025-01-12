import { useRouter } from "expo-router";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { View, StyleSheet } from "react-native";
import HelpCenterItem from "./HelpCenter";
import { COLORS, icons } from "../../constants";

const ContactUs = () => {
  const router = useRouter();
  const { dark } = useTheme();

  return (
    <View
      style={[
        styles.routeContainer,
        { backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite },
      ]}
    >
      <HelpCenterItem
        icon={icons.headset}
        title="Customer Service"
        onPress={() => router.push("/customer-service")}
      />
      <HelpCenterItem
        icon={icons.whatsapp}
        title="Whatsapp"
        onPress={() => console.log("Whatsapp")}
      />
      <HelpCenterItem
        icon={icons.world}
        title="Website"
        onPress={() => console.log("Website")}
      />
      <HelpCenterItem
        icon={icons.facebook2}
        title="Facebook"
        onPress={() => console.log("Facebook")}
      />
      <HelpCenterItem
        icon={icons.twitter}
        title="Twitter"
        onPress={() => console.log("Twitter")}
      />
      <HelpCenterItem
        icon={icons.instagram}
        title="Instagram"
        onPress={() => console.log("Instagram")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  routeContainer: { flex: 1, paddingVertical: 22 },
});
export default ContactUs;
