import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, icons } from "../../constants";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { router } from "expo-router";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { dark, colors } = useTheme();
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

const styles = StyleSheet.create({
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
});

export default SearchBar;
