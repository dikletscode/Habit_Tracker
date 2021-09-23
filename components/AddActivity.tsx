import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  Button,
  InteractionManager,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import { Category, createActivity, getCategory } from "../services/activity";
import { RootTabScreenProps } from "../types";
import { Picker } from "@react-native-picker/picker";
import CategoryPicker from "./ItemPicker";
import { FetchContext } from "../context/Provider";
import Loading from "../screens/Loading";
import { schedulePushNotification } from "./Notification";
export default function AddActivity({
  navigation,
}: RootTabScreenProps<"Activity">) {
  const { data, setData } = React.useContext(FetchContext);
  const [state, setState] = React.useState({
    activity: "",
    detail: "",
  });
  const [date, setDate] = React.useState({
    starts: new Date(1598051730000),
    ends: new Date(1598051730000),
  });
  const [selectedCategory, setSelectedCategory] = React.useState();

  var today = new Date();
  const [show, setShow] = React.useState({
    starts: false,
    ends: false,
  });

  React.useEffect(() => {
    setDate({
      starts: today,
      ends: today,
    });
  }, []);

  const textOnChange = (field: string, params: string) => {
    setState((prev) => ({ ...prev, [field]: params }));
  };
  const submit = () => {
    AddActivity();
  };
  const handleConfirm = (date: any, field: string) => {
    setShow((prev) => ({ ...prev, [field]: false }));
    setDate((prev) => ({ ...prev, [field]: date }));
  };
  const actionModal = (field: string, bool: boolean) => {
    setShow((prev) => ({ ...prev, [field]: bool }));
  };
  const AddActivity = async () => {
    try {
      setData({ type: "LOADING" });
      let message = await createActivity({
        title: state.activity,
        detail: state.detail,
        starts: date.starts.toJSON().slice(0, 19).replace("T", " "),
        ends: date.ends.toJSON().slice(0, 19).replace("T", " "),
        category: selectedCategory,
      });

      await schedulePushNotification(
        date.starts,
        `let's start your activity:${state.activity} `
      );
      setData({ type: "FETCH_SUCCESS", payload: date.starts });

      navigation.goBack();
      console.log(message);
    } catch (error) {
      setData({ type: "FETCH_FAILED" });
      console.log(error, "ee");
    }
  };
  console.log(data, "ss");
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          {data.isLoading ? (
            <Loading />
          ) : (
            <>
              <Text>Add Activity</Text>
              <TextInput
                multiline={true}
                autoFocus
                onChangeText={(activity) => textOnChange("activity", activity)}
                value={state.activity}
                placeholder="New Activity"
                style={styles.addAct}
              />

              <TextInput
                multiline={true}
                onChangeText={(detail) => textOnChange("detail", detail)}
                value={state.detail}
                placeholder="Detail"
                style={styles.addAct}
              />

              <>
                <DateTimePicker
                  isVisible={show.starts}
                  mode="datetime"
                  date={date.starts}
                  onConfirm={(dates) => handleConfirm(dates, "starts")}
                  onCancel={() => actionModal("starts", false)}
                />
                <DateTimePicker
                  isVisible={show.ends}
                  mode="datetime"
                  date={date.ends}
                  onConfirm={(d) => handleConfirm(d, "ends")}
                  onCancel={() => actionModal("ends", false)}
                />
              </>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
                style={{ paddingVertical: 20 }}
              >
                <Picker.Item
                  label="activity category"
                  value="js"
                  enabled={false}
                />
                <Picker.Item label="Hobby" value="1" />
                <Picker.Item label="Traveling" value="2" />
                <Picker.Item label="Exercising" value="3" />
                <Picker.Item label="Health" value="4" />
                <Picker.Item label="Task" value="5" />
                <Picker.Item label="Daily" value="6" />
              </Picker>

              <View style={styles.date}>
                <Pressable onPress={() => actionModal("starts", true)}>
                  <FontAwesome name="calendar-check-o" size={30} />
                </Pressable>
                <View style={{ marginLeft: 20 }}>
                  <Text>starts: {date.starts.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.date}>
                <Pressable onPress={() => actionModal("ends", true)}>
                  <FontAwesome name="calendar-check-o" size={30} />
                </Pressable>
                <View style={{ marginLeft: 20 }}>
                  <Text>{date.ends.toLocaleString()}</Text>
                </View>
              </View>
              <View
                style={{
                  bottom: 0,
                  position: "absolute",
                  right: 0,
                  padding: 12,
                }}
              >
                <Pressable onPress={submit}>
                  <Text>Save</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",

    justifyContent: "center",
    display: "flex",
    alignContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: "#fff",
    height: "75%",
    position: "absolute",
    bottom: 0,
    borderTopStartRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
    padding: 20,
  },
  addAct: {
    borderWidth: 2,
    borderColor: "#ddd",
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  date: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    paddingTop: 8,
    alignItems: "center",
  },
});
