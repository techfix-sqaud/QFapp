import { View, StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import GlobalSettingsItem from "../../Components/custom/CustomSettingsItems";
import Header from "../../Components/custom/Head";
import { COLORS } from "../../constants";
const SettingsNotifications = () => {
  const [isGeneralNotificationsEnabled, setIsGeneralNotificationsEnabled] =
    useState<boolean>(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState<boolean>(false);
  const [specialOffersEnabled, setSpecialOffersEnabled] =
    useState<boolean>(false);
  const [promoDiscountEnabled, setPromoDiscountEnabled] =
    useState<boolean>(true);
  const [isPaymentEnabled, setIsPaymentEnabled] = useState<boolean>(true);
  const [isCashbackEnabled, setIsCashbackEnabled] = useState<boolean>(false);
  const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = useState<boolean>(true);
  const [newServiceAvailable, setNewServiceAvailable] =
    useState<boolean>(false);
  const [newTipsAvailable, setNewTipsAvailable] = useState<boolean>(true);
  const { colors } = useTheme();

  const toggleGeneralNotifications = (): void => {
    setIsGeneralNotificationsEnabled(!isGeneralNotificationsEnabled);
  };

  const toggleSound = (): void => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const toggleVibrate = (): void => {
    setIsVibrateEnabled(!isVibrateEnabled);
  };

  const toggleSpecialOffers = (): void => {
    setSpecialOffersEnabled(!specialOffersEnabled);
  };

  const toggleDiscountEnabled = (): void => {
    setPromoDiscountEnabled(!promoDiscountEnabled);
  };

  const togglePayments = (): void => {
    setIsPaymentEnabled(!isPaymentEnabled);
  };

  const toggleCashback = (): void => {
    setIsCashbackEnabled(!isCashbackEnabled);
  };

  const toggleAppUpdates = (): void => {
    setIsAppUpdatesEnabled(!isAppUpdatesEnabled);
  };

  const toggleNewServiceAvailable = (): void => {
    setNewServiceAvailable(!newServiceAvailable);
  };

  const toggleNewTipsAvailable = (): void => {
    setNewTipsAvailable(!newTipsAvailable);
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar hidden />
        <Header title="Notifications" />
        <ScrollView
          style={styles.settingsContainer}
          showsVerticalScrollIndicator={false}
        >
          <GlobalSettingsItem
            title="General Notifications"
            isNotificationEnabled={isGeneralNotificationsEnabled}
            toggleNotificationEnabled={toggleGeneralNotifications}
          />
          <GlobalSettingsItem
            title="Sound"
            isNotificationEnabled={isSoundEnabled}
            toggleNotificationEnabled={toggleSound}
          />
          <GlobalSettingsItem
            title="Vibrate"
            isNotificationEnabled={isVibrateEnabled}
            toggleNotificationEnabled={toggleVibrate}
          />
          <GlobalSettingsItem
            title="Special Offers"
            isNotificationEnabled={specialOffersEnabled}
            toggleNotificationEnabled={toggleSpecialOffers}
          />
          <GlobalSettingsItem
            title="Promo & Discount"
            isNotificationEnabled={promoDiscountEnabled}
            toggleNotificationEnabled={toggleDiscountEnabled}
          />
          <GlobalSettingsItem
            title="Payments"
            isNotificationEnabled={isPaymentEnabled}
            toggleNotificationEnabled={togglePayments}
          />
          <GlobalSettingsItem
            title="Cashback"
            isNotificationEnabled={isCashbackEnabled}
            toggleNotificationEnabled={toggleCashback}
          />
          <GlobalSettingsItem
            title="App Updates"
            isNotificationEnabled={isAppUpdatesEnabled}
            toggleNotificationEnabled={toggleAppUpdates}
          />
          <GlobalSettingsItem
            title="New Service Available"
            isNotificationEnabled={newServiceAvailable}
            toggleNotificationEnabled={toggleNewServiceAvailable}
          />
          <GlobalSettingsItem
            title="New Tips Available"
            isNotificationEnabled={newTipsAvailable}
            toggleNotificationEnabled={toggleNewTipsAvailable}
          />
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
  settingsContainer: {
    marginVertical: 16,
  },
});
export default SettingsNotifications;
