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

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { dark, colors } = useTheme();
  const { UserState } = useContext(AuthContext)!;
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
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

    greet();
  }, []);
  const renderBannerItem = ({
    item,
  }: {
    item: {
      discount: string;
      discountName: string;
      bottomTitle: string;
      bottomSubtitle: string;
    };
  }) => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTopContainer}>
        <View>
          <Text style={styles.bannerDicount}>{item.discount} OFF</Text>
          <Text style={styles.bannerDiscountName}>{item.discountName}</Text>
        </View>
        <Text style={styles.bannerDiscountNum}>{item.discount}</Text>
      </View>
      <View style={styles.bannerBottomContainer}>
        <Text style={styles.bannerBottomTitle}>{item.bottomTitle}</Text>
        <Text style={styles.bannerBottomSubtitle}>{item.bottomSubtitle}</Text>
      </View>
    </View>
  );

  const keyExtractor = (item: { id: { toString: () => any } }) =>
    item.id.toString();

  const handleEndReached = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const renderDot = (index: React.Key | null | undefined) => {
    return (
      <View
        style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        key={index}
      />
    );
  };
  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push("Users/Profile")}>
            {UserState.profile !== " " ? (
              <Image
                source={{ uri: UserState.profile }}
                resizeMode="cover"
                style={styles.avatar}
              />
            ) : (
              <FontAwesome name="user-circle" size={40} color="#aaa" />
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

  /**
   * render search bar
   */
  const renderSearchBar = () => {
    const [search, setSearch] = useState("");
    const handleInputFocus = () => {
      // Redirect to another screen
      router.push("Search");
    };

    return (
      <View
        style={[
          styles.searchContainer,
          {
            borderColor: dark ? COLORS.grayscale700 : "#E5E7EB",
          },
        ]}
      >
        <TouchableOpacity>
          <Image
            source={icons.search2}
            resizeMode="contain"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholder="Search services..."
          placeholderTextColor="#BABABA"
          onFocus={handleInputFocus}
        />
        <TouchableOpacity>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={[
              styles.filterIcon,
              {
                tintColor: dark ? COLORS.white : COLORS.greyscale900,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render banner
   */
  const renderBanner = () => {
    return (
      <View style={styles.bannerItemContainer}>
        <FlatList
          data={banners}
          renderItem={renderBannerItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / SIZES.width
            );
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.dotContainer}>
          {banners.map((_, index) => renderDot(index))}
        </View>
      </View>
    );
  };

  /**
   * Render categories
   */
  const renderCategories = () => {
    return (
      <View>
        <SubHeaderItem
          title="Categories"
          navTitle="See all"
          onPress={() => console.log("See all services")}
        />
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
          renderItem={({ item, index }) => (
            <Category
              name={item.name}
              icon={item.icon}
              iconColor={item.iconColor}
              backgroundColor={item.backgroundColor}
            />
          )}
        />
      </View>
    );
  };

  /**
   * Render Top Services
   */

  const renderTopServices = () => {
    const [selectedCategories, setSelectedCategories] = useState(["1"]);

    const filteredServices = mostPopularServices.filter(
      (service: { categoryId: string }) =>
        selectedCategories.includes("1") ||
        selectedCategories.includes(service.categoryId)
    );

    // Category item
    const renderCategoryItem = ({
      item,
    }: {
      item: { id: string; name: string };
    }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id)
            ? COLORS.primary
            : "transparent",
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}
      >
        <Text
          style={{
            color: selectedCategories.includes(item.id)
              ? COLORS.white
              : COLORS.primary,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    // Toggle category selection
    const toggleCategory = (categoryId: string) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    return (
      <View>
        <SubHeaderItem
          title="Popular Services"
          navTitle="See all"
          onPress={() => router.push("PopularServices")}
        />
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ServiceCard
                name={item.name}
                image={item.image}
                providerName={item.providerName}
                price={item.price}
                isOnDiscount={item.isOnDiscount}
                oldPrice={item.oldPrice}
                rating={item.rating}
                numReviews={item.numReviews}
                onPress={() => router.push("ServiceDetails")}
                catogeryId={item.categoryId}
              />
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSearchBar()}
          {renderBanner()}
          {renderCategories()}
          {renderTopServices()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  searchContainer: {
    height: 50,
    width: SIZES.width - 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: "#BABABA",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 8,
    borderRightColor: "#BABABA",
    borderRightWidth: 0.4,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
  },
  bannerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.white,
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "bold",
    color: COLORS.white,
  },
  bannerBottomContainer: {
    marginTop: 8,
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
    marginTop: 4,
  },
  bannerItemContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Home;
