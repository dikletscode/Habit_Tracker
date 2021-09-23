import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { FlatList } from "react-native";
import { AuthContext } from "../context/Provider";
import Loading from "../screens/Loading";
import {
  Activity,
  Category,
  getActivity,
  getCategory,
} from "../services/activity";
import { Text } from "./Themed";

const CategoryPicker = ({ category }: { category: Category[] }) => {
  return (
    <FlatList
      data={category}
      ListEmptyComponent={Loading}
      renderItem={({ item }) => (
        <Picker.Item label={item.title} value={item.title} enabled={false} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CategoryPicker;
