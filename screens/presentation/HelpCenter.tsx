import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import FAQ from "../../Components/custom/FAQ";
import Header from "../../Components/custom/Head";
import { COLORS } from "../../constants";
import ContactUs from "../../Components/custom/ContactUs";
const HelpCenter = () => {
  const { dark, colors, setScheme } = useTheme();
  const [activeTab, setActiveTab] = useState("faqs");

  const renderContent = () => {
    switch (activeTab) {
      case "faqs":
        return <FAQ />;
      case "contactUs":
        return <ContactUs />;
      default:
        return null;
    }
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Settings" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "faqs" && styles.activeTabItem,
              ]}
              onPress={() => setActiveTab("faqs")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "faqs" && styles.activeTabText,
                ]}
              >
                FAQ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "contactUs" && styles.activeTabItem,
              ]}
              onPress={() => setActiveTab("contactUs")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "contactUs" && styles.activeTabText,
                ]}
              >
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 32,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    // borderRadius: 4,
    // borderWidth: 1,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray2,
  },
  activeTabText: {
    color: COLORS.primary,
  },
});

export default HelpCenter;
