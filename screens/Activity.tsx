import * as React from "react";
import { Image, Pressable, StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { ColorPicker, PickerT, RootTabScreenProps } from "../types";

import { FontAwesome } from "@expo/vector-icons";
import { Activity, Category, getCategory } from "../services/activity";
import { FlatList } from "react-native-gesture-handler";
import { Picker } from "../types";
import { AuthContext, FetchContext } from "../context/Provider";
import { deleteItemAsync } from "expo-secure-store";

interface ItemRes {
  title: PickerT;
  activity: Activity[];
}

export default function ActivitySecreen({
  navigation,
}: RootTabScreenProps<"Activity">) {
  const [category, setCategory] = React.useState<Category[]>([]);
  const { state, dispatch } = React.useContext(AuthContext);
  const { data } = React.useContext(FetchContext);
  const getCategories = async () => {
    try {
      let data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getCategories();
    if (data.isFetch) {
      getCategories();
    }
  }, [data.isFetch]);

  const logout = async () => {
    await deleteItemAsync("data");
    dispatch({ type: "LOGIN_FAILED" });
  };

  return (
    <View style={style.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-start",
          marginLeft: 25,
        }}
      >
        <FontAwesome name="list" color="red" size={25} />
        <Text style={{ marginLeft: 20 }}>Activity By Categories</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          width: "90%",
          height: 150,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FlatList
          data={category}
          horizontal
          ListEmptyComponent={() => <></>}
          renderItem={({ item }: { item: ItemRes }) => (
            <Icon
              name={Picker[item.title]}
              color={ColorPicker[item.title]}
              onpress={() =>
                navigation.navigate("DetailActivity", {
                  activity: item.activity,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <Pressable onPress={logout}>
          <FontAwesome name="sign-out" size={40} />
        </Pressable>
      </View>
    </View>
  );
}

const Icon = ({
  name,
  color,
  onpress,
}: {
  color?: string;
  name: React.ComponentProps<typeof FontAwesome>["name"];
  onpress?: () => void;
}) => {
  return (
    <Pressable onPress={onpress}>
      <View style={{ ...style.Icon, borderColor: color }}>
        <FontAwesome name={name} size={30} color={color} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e8e5",
    paddingTop: 100,
    alignItems: "center",
  },
  Icon: {
    backgroundColor: "#fff",
    borderTopWidth: 8,
    borderBottomWidth: 3,
    padding: 10,
    display: "flex",
    alignItems: "center",
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    width: "80%",
    backgroundColor: "transparent",
  },
  desc: {
    backgroundColor: "transparent",
    color: "#fff",
  },
});
