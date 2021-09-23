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

const Target: React.FC<{ activity: Activity[] }> = ({ activity }) => {
  const { data, setData } = React.useContext(FetchContext);

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
      return 120;
    }
  };

  console.log(data);

  return (
    <View>
      {activity.length ? (
        <FlatList
          horizontal
          data={activity}
          ListEmptyComponent={Loading}
          refreshControl={
            <RefreshControl refreshing={data.isFetch} tintColor="#F8852D" />
          }
          renderItem={({ item }) =>
            interval(item.starts, item.ends) <= 100 ? (
              <View style={style.box}>
                <>
                  {console.log(
                    new Date(item.starts).toLocaleDateString(),
                    new Date(item.ends).toLocaleDateString(),
                    item.title
                  )}
                </>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 2,
                  }}
                >
                  <FontAwesome name="circle" size={30} color="#e14457" />
                  <Text style={{ fontSize: 24, paddingLeft: 5 }}>
                    {item.title}
                  </Text>
                </View>
                <View style={{ padding: 15 }}>
                  <StatusActivity date={item.starts} dateEnd={item.ends} />
                </View>
              </View>
            ) : (
              <>{console.log(interval(item.starts, item.ends), item.title)}</>
            )
          }
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => (item.id ? item.id.toString() : "1")}
        />
      ) : (
        <View style={{ display: "flex", alignItems: "center", marginTop: 200 }}>
          <FontAwesome name="pencil" color="#e14457" size={90} />
          <Text style={{ marginTop: 20 }}>no activity created</Text>
        </View>
      )}
    </View>
  );
};

export default Target;

const style = StyleSheet.create({
  Target: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "95%",
    backgroundColor: "transparent",
  },
  desc: {
    backgroundColor: "transparent",
    color: "#fff",
  },
  box: {
    backgroundColor: "rgba(252,249,249,0.93)",
    color: "#fff",
    height: 200,
    width: 270,
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
});
