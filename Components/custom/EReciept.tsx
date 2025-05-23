// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   TouchableWithoutFeedback,
//   FlatList,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native-virtualized-view";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useTheme } from "../../Helpers/theme/ThemeProvider";
// import { COLORS, icons } from "../../constants";
// import { useRouter } from "expo-router";

// const receiptData = [
//   { label: "Services", value: "House Cleaning" },
//   { label: "Category", value: "Cleaning" },
//   { label: "Workers", value: "Jenny Wilson" },
//   { label: "Date & Time", value: "Dec 23, 2024 | 10:00 AM" },
//   { label: "Working Hours", value: "2 hours" },
//   { label: "Price", value: "$40" },
//   { label: "Payment Methods", value: "Credit Card" },
//   { label: "Transaction ID", value: "SKD354822747" },
// ];

// const dropdownItems = [
//   { label: "Share E-Receipt", value: "share", icon: icons.shareOutline },
//   {
//     label: "Download E-Receipt",
//     value: "downloadEReceipt",
//     icon: icons.download2,
//   },
//   { label: "Print", value: "print", icon: icons.documentOutline },
// ];

// const EReceipt = () => {
//   const router = useRouter();
//   const [modalVisible, setModalVisible] = useState(false);
//   const { colors, dark } = useTheme();

//   return (
//     <SafeAreaView
//       style={[styles.safeArea, { backgroundColor: colors.background }]}
//     >
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Image
//               source={icons.arrowBack}
//               style={[styles.icon, { tintColor: colors.text }]}
//             />
//           </TouchableOpacity>
//           <Text style={[styles.title, { color: colors.text }]}>E-Receipt</Text>
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <Image
//               source={icons.moreCircle}
//               style={[styles.icon, { tintColor: colors.text }]}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Receipt Content */}
//         <ScrollView
//           style={{ backgroundColor: colors.background }}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={{ marginVertical: 22 }}>
//             {receiptData.map((item, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.summaryContainer,
//                   {
//                     backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//                   },
//                 ]}
//               >
//                 <View style={styles.summaryRow}>
//                   <Text style={[styles.viewLeft, { color: colors.text }]}>
//                     {item.label}
//                   </Text>
//                   <Text style={[styles.viewRight, { color: colors.text }]}>
//                     {item.value}
//                   </Text>
//                   {item.label === "Transaction ID" && (
//                     <TouchableOpacity>
//                       <MaterialCommunityIcons
//                         name="content-copy"
//                         size={24}
//                         color={COLORS.primary}
//                       />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </ScrollView>

//         {/* Dropdown Modal */}
//         <Modal animationType="slide" transparent visible={modalVisible}>
//           <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//             <View style={styles.modalOverlay}>
//               <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//                 <View
//                   style={[
//                     styles.modalContent,
//                     { backgroundColor: colors.background },
//                   ]}
//                 >
//                   <FlatList
//                     data={dropdownItems}
//                     keyExtractor={(item) => item.value}
//                     renderItem={({ item }) => (
//                       <TouchableOpacity
//                         style={styles.modalItem}
//                         onPress={() => setModalVisible(false)}
//                       >
//                         <Image
//                           source={item.icon}
//                           style={[styles.icon, { tintColor: colors.text }]}
//                         />
//                         <Text
//                           style={[styles.modalText, { color: colors.text }]}
//                         >
//                           {item.label}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   />
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1 },
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: { fontSize: 24, fontFamily: "bold" },
//   icon: { width: 24, height: 24 },
//   summaryContainer: { padding: 16, marginVertical: 8, borderRadius: 8 },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   viewLeft: { fontSize: 12 },
//   viewRight: { fontSize: 14 },
//   modalOverlay: { position: "absolute", top: 112, right: 12 },
//   modalContent: { width: 202, padding: 16, borderRadius: 8 },
//   modalItem: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
//   modalText: { fontSize: 14, fontFamily: "semiBold" },
// });

// export default EReceipt;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { COLORS, icons } from "../../constants";
import { useRouter } from "expo-router";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { Share } from "react-native";

const receiptData = [
  { label: "Services", value: "House Cleaning" },
  { label: "Category", value: "Cleaning" },
  { label: "Workers", value: "Jenny Wilson" },
  { label: "Date & Time", value: "Dec 23, 2024 | 10:00 AM" },
  { label: "Working Hours", value: "2 hours" },
  { label: "Price", value: "$40" },
  { label: "Payment Methods", value: "Credit Card" },
  { label: "Transaction ID", value: "SKD354822747" },
  { label: "Status", value: "Paid/ not paid" },
];

const dropdownItems = [
  { label: "Share E-Receipt", value: "share", icon: icons.shareOutline },
  {
    label: "Download E-Receipt",
    value: "downloadEReceipt",
    icon: icons.download2,
  },
  { label: "Print", value: "print", icon: icons.documentOutline },
];

const EReceipt = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, dark } = useTheme();

  const handlePrint = async () => {
    try {
      await Print.printAsync({
        html: "<h1>E-Receipt</h1><p>Transaction details go here.</p>",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to print receipt.");
    }
  };

  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "receipt.pdf";
      const { uri } = await Print.printToFileAsync({
        html: "<h1>E-Receipt</h1>",
      });

      await FileSystem.moveAsync({ from: uri, to: fileUri });

      Alert.alert("Success", "E-Receipt downloaded successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to download receipt.");
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Here is your E-Receipt!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share receipt.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.arrowBack}
              style={[styles.icon, { tintColor: colors.text }]}
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>E-Receipt</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={icons.moreCircle}
              style={[styles.icon, { tintColor: colors.text }]}
            />
          </TouchableOpacity>
        </View>

        {/* Receipt Content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginVertical: 22 }}>
            {receiptData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.summaryContainer,
                  { backgroundColor: dark ? COLORS.dark2 : COLORS.white },
                ]}
              >
                <View style={styles.summaryRow}>
                  <Text style={[styles.viewLeft, { color: colors.text }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.viewRight, { color: colors.text }]}>
                    {item.value}
                  </Text>
                  {item.label === "Transaction ID" && (
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="content-copy"
                        size={24}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Dropdown Modal */}
        <Modal animationType="slide" transparent visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View
                  style={[
                    styles.modalContent,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <FlatList
                    data={dropdownItems}
                    keyExtractor={(item) => item.value}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setModalVisible(false);
                          if (item.value === "print") handlePrint();
                          if (item.value === "downloadEReceipt")
                            handleDownload();
                          if (item.value === "share") handleShare();
                        }}
                      >
                        <Image
                          source={item.icon}
                          style={[styles.icon, { tintColor: colors.text }]}
                        />
                        <Text
                          style={[styles.modalText, { color: colors.text }]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontFamily: "bold" },
  icon: { width: 24, height: 24 },
  summaryContainer: { padding: 16, marginVertical: 8, borderRadius: 8 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewLeft: { fontSize: 12 },
  viewRight: { fontSize: 14 },
  modalOverlay: { position: "absolute", top: 112, right: 12 },
  modalContent: { width: 202, padding: 16, borderRadius: 8 },
  modalItem: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  modalText: { fontSize: 14, fontFamily: "semiBold" },
});

export default EReceipt;
