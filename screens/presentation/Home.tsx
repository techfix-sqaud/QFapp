import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { images, COLORS, SIZES, icons } from "../../constants";
import { banners, categories, mostPopularServices } from "../../Helpers/data";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { router } from "expo-router";
import SubHeaderItem from "../../Components/custom/SubHeaderItem";
import Category from "../../Components/custom/Category";
import ServiceCard from "../../Components/custom/ServiceCard";
import AuthContext from "../../contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { getCategories } from "../../Helpers/API/GeneralAPIs";
import Services from "../../Components/Home/Services";
import SearchBar from "../../Components/custom/SearchBar";
import Banner from "../../Components/Home/Banner";

const Home = () => {
  const { dark, colors } = useTheme();
  const { UserState } = useContext(AuthContext)!;
  const [greeting, setGreeting] = useState<string>("");

  function greet() {
    const currentHour = new Date().getHours();

    switch (true) {
      case currentHour >= 5 && currentHour < 12:
        setGreeting("Good morning!");
        break;
      case currentHour >= 12 && currentHour < 17:
        setGreeting("Hello!");
        break;
      case currentHour >= 17 && currentHour < 20:
        setGreeting("Good afternoon!");
        break;
      default:
        setGreeting("Good evening!");
    }
  }

  useEffect(() => {
    greet();
  }, []);

  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push("Users/Profile")}>
            {UserState.profile ? (
              <Image
                source={{ uri: UserState.profile }}
                resizeMode="cover"
                style={styles.avatar}
              />
            ) : (
              <FontAwesome
                name="user-circle"
                size={40}
                color={dark ? COLORS.primary : COLORS.primary}
              />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.username,
              {
                color: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          >
            {greeting} {UserState.firstName}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("Notifications")}>
          <Image
            source={icons.bell}
            resizeMode="contain"
            style={[
              styles.bellIcon,
              {
                tintColor: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          />
          <View style={styles.noti} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <Banner />
        <Services />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 32,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 999,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.black,
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  noti: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    position: "absolute",
    top: 0,
    right: 3,
    zIndex: 99999,
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Home;
