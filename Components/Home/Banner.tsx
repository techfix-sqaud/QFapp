import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { banners } from "../../Helpers/data";

interface BannerItem {
  id: string | number;
  discount: string;
  discountName: string;
  bottomTitle: string;
  bottomSubtitle: string;
}

interface RenderBannerItemProps {
  item: BannerItem;
}

const renderBannerItem = ({ item }: RenderBannerItemProps) => (
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

const keyExtractor = (item: BannerItem) => item.id.toString();

const renderDot = (index: number, currentIndex: number) => (
  <View
    style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
    key={index}
  />
);

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / SIZES.width
    );
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.bannerItemContainer}>
      <FlatList
        data={banners}
        renderItem={renderBannerItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <View style={styles.dotContainer}>
        {banners.map((_, index) => renderDot(index, currentIndex))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Banner;
