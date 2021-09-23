import * as React from "react";
import { Pressable, RefreshControl, StyleSheet } from "react-native";

import { Text, View } from "react-native";
import {
  Activity,
  Category,
  getActivity,
  getCategory,
} from "../services/activity";
import { FlatList, Switch } from "react-native-gesture-handler";
import { schedulePushNotification } from "../components/Notification";
import { FetchContext, NotifhContext } from "../context/Provider";
import RenderFlatList from "../components/RenderFlatList";
import Loading from "./Loading";
import { FontAwesome } from "@expo/vector-icons";
import StatusActivity from "../components/StatusActivity";
import ModalWarning from "../components/modal";
import { RootStackScreenProps } from "../types";

export default function PastActivityScreen({
  navigation,
}: RootStackScreenProps<"PastActivity">) {
  const [activity, setActivity] = React.useState<Activity[]>([]);
  const { data, setData } = React.useContext(FetchContext);
  const readActivity = async () => {
    try {
      let data = await getActivity();
      console.log(data);
      setActivity(data);
    } catch (error) {
      console.log(error, "ssa");
    }
  };
  React.useEffect(() => {
    readActivity();
    if (data.isFetch) {
      readActivity();
      setData({ type: "FETCH_FAILED" });
    }
  }, [data.isFetch]);
  const interval = (date: Date | string, dateEnd: Date | string) => {
    var date1 = new Date(date);
    let date2 = new Date();
    let result = (date1.getTime() - date2.getTime()) / (1000 * 3600);
    if (result < 0) {
      let results = (date2.getTime() - date1.getTime()) / (1000 * 3600);
      let result3 =
        (new Date(dateEnd).getTime() - date2.getTime()) / (1000 * 3600);

      let percent = 100 - parseInt(((result3 / results) * 100).toFixed());
      return percent;
    } else {
      return result;
    }
  };
  return (
    <>
      <View
        style={{ height: "100%", paddingTop: 50, backgroundColor: "#f9e8e5" }}
      >
        <View style={style.container}>
          {activity.length ? (
            <View
              style={{
                width: "90%",
                height: "90%",
              }}
            >
              <View
                style={{ borderBottomWidth: 2, borderColor: "red", width: 125 }}
              >
                <Text>activity has been completed</Text>
              </View>

              <FlatList
                data={activity}
                ListEmptyComponent={Loading}
                refreshControl={
                  <RefreshControl
                    refreshing={data.isFetch}
                    tintColor="#F8852D"
                  />
                }
                renderItem={({ item }: { item: Activity }) =>
                  interval(item.starts, item.ends) < 0 ||
                  interval(item.starts, item.ends) >= 100 ? (
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <View style={style.row}>
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            marginLeft: 10,
                            width: "50%",
                          }}
                        >
                          <FontAwesome
                            name={item.isConfirm ? "check-circle-o" : "history"}
                            size={32}
                            color={item.isConfirm ? "green" : "#e14457"}
                          />
                          <View>
                            <Text style={{ fontSize: 16, paddingLeft: 15 }}>
                              {item.title}
                            </Text>
                            <Text style={{ fontSize: 13, paddingLeft: 15 }}>
                              {item.detail}
                            </Text>
                            <StatusActivity
                              date={item.starts}
                              dateEnd={item.ends}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 10,
                          }}
                        >
                          <Pressable
                            onPress={() =>
                              navigation.navigate("ModalWarning", {
                                activity: item,
                              })
                            }
                          >
                            <FontAwesome
                              name="reorder"
                              color={"#09cedb"}
                              size={35}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <>{console.log(interval(item.starts, item.ends))}</>
                  )
                }
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => (item.id ? item.id.toString() : "1")}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 0,
    alignItems: "center",
    marginVertical: 10,
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
  row: {
    backgroundColor: "rgba(252,249,249,0.93)",
    marginVertical: 10,
    display: "flex",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
  },
});
