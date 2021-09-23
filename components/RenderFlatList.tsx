import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { AuthContext, FetchContext, NotifhContext } from "../context/Provider";
import Loading from "../screens/Loading";
import { Activity, getActivity } from "../services/activity";

import StatusActivity from "./StatusActivity";
import { Text } from "./Themed";

const RenderFlatList: React.FC<{
  activity: Activity[];
  isFuture: string;
  bool: boolean;
}> = ({ activity, isFuture, bool }) => {
  const { data } = React.useContext(FetchContext);

  const interval = (date: Date | string, dateEnd: Date | string) => {
    var date1 = new Date(date);
    let date2 = new Date();
    let result = (date1.getTime() - date2.getTime()) / (1000 * 3600);
    return result;
  };
  enum compare {
    "past" = 0,
  }

  return (
    <>
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
              <Text>Upcoming Activity</Text>
            </View>

            <FlatList
              data={activity}
              ListEmptyComponent={Loading}
              refreshControl={
                <RefreshControl refreshing={data.isFetch} tintColor="#F8852D" />
              }
              renderItem={({ item }) =>
                interval(item.starts, item.ends) > 0 ? (
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
                        <FontAwesome name="history" size={32} color="#e14457" />
                        <View>
                          <Text style={{ fontSize: 16, paddingLeft: 15 }}>
                            {item.title}
                          </Text>
                          <Text style={{ fontSize: 13, paddingLeft: 15 }}>
                            {item.detail}
                          </Text>
                        </View>
                      </View>
                      <StatusActivity date={item.starts} dateEnd={item.ends} />
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
    </>
  );
};

export default RenderFlatList;

const style = StyleSheet.create({
  container: {
    paddingTop: 0,
    alignItems: "center",
    backgroundColor: "#f9e8e5",
  },
  desc: {
    backgroundColor: "transparent",
    color: "#fff",
  },
  box: {
    backgroundColor: "rgba(252,249,249,0.93)",
    color: "#fff",
    height: 200,
    width: 250,
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  row: {
    backgroundColor: "rgba(252,249,249,0.93)",
    marginVertical: 10,
    display: "flex",
    height: 53,
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
