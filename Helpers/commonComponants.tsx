import { ReactElement, useState } from "react";
import {
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Image,
  Text,
} from "react-native";
import { SIZES, COLORS } from "../constants";

//  render countries codes modal
export function RenderAreasCodesModal() {
  const [areas, setAreas] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const renderItem = ({ item }: any): ReactElement => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: "row",
        }}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Image
          source={{ uri: item.flag }}
          style={{
            height: 30,
            width: 30,
            marginRight: 10,
            resizeMode: "contain",
          }}
        />
        <Text style={{ fontSize: 16, color: "#fff" }}>{item.item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={(): void => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 400,
              width: SIZES.width * 0.8,
              backgroundColor: COLORS.primary,
              borderRadius: 12,
            }}
          >
            <FlatList
              data={areas}
              renderItem={renderItem}
              horizontal={false}
              keyExtractor={(item: { code: string }) => item.code}
              style={{
                padding: 20,
                marginBottom: 20,
              }}
            />
            <Text>Edit profile</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
