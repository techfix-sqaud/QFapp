import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import Header from "../../Components/custom/Head";
import { COLORS } from "../../constants";
import MyBookingCompleted from "../../Components/Bookings/Completed";
import MyBookingsCancelled from "../../Components/Bookings/Cancelled";
import UpcomingBooking from "../../Components/Bookings/UpcomingBooking";
// import {
//   MyBookingsUpcoming,
//   MyBookingCompleted,
//   MyBookingsCancelled,
// } from '../tabs';

type TabKey = "Upcoming" | "Completed" | "Cancelled";

const TABS: TabKey[] = ["Upcoming", "Completed", "Cancelled"];

const MyBooking: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>("Upcoming");
  const layout = useWindowDimensions();

  const renderTabContent = () => {
    switch (activeTab) {
      case "Upcoming":
        return <UpcomingBooking />;
      case "Completed":
        return <MyBookingCompleted />;
      case "Cancelled":
        return <MyBookingsCancelled />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="My Bookings" />
      <View style={styles.tabBarContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && {
                borderBottomColor: COLORS.primary,
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? COLORS.primary : "gray",
                  fontFamily: activeTab === tab ? "semiBold" : "regular",
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
  },
});

export default MyBooking;
