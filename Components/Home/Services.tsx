import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { COLORS } from "../../constants";
import { mostPopularServices } from "../../Helpers/data";
import { router } from "expo-router";
import SubHeaderItem from "../../Components/custom/SubHeaderItem";
import ServiceCard from "../../Components/custom/ServiceCard";
import { getCategories } from "../../Helpers/API/GeneralAPIs";
const Services = () => {
  const [selectedCategories, setSelectedCategories] = useState(["1"]);
  const [categories, setCategories] = useState<any[]>([]);

  const filteredServices = mostPopularServices.filter(
    (service: { categoryId: string }) =>
      selectedCategories.includes("1") ||
      selectedCategories.includes(service.categoryId)
  );

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
    setSelectedCategories([categoryId]);
  };

  return (
    <View>
      <SubHeaderItem
        title="Services"
        navTitle="See all"
        onPress={() => setSelectedCategories(["1"])}
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
              onPress={() => router.push(`/services/servicedetails/${item.id}`)}
              // onPress={() => console.log("Service pressed", item.id)}
              catogeryId={item.categoryId}
            />
          );
        }}
      />
    </View>
  );
};

export default Services;
