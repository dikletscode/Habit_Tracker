import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { Activity, Category, getCategory } from "../services/activity";
import { FlatList, Switch } from "react-native-gesture-handler";
import { schedulePushNotification } from "../components/Notification";
import { NotifhContext } from "../context/Provider";

export default function DetailActivity({
  route,
}: {
  route: { params: { activity: Activity[] } };
}) {
  const [activity, setActivity] = React.useState<Activity[]>([]);
  const [isOn, setOn] = React.useState<boolean[]>([]);
  const { isEnable, setEnable } = React.useContext(NotifhContext);
  React.useEffect(() => {
    setActivity(route.params["activity"]);
    setOn([...new Array(route.params.activity.length).fill(true)]);
  }, [route.params.activity]);

  const toogle = (index: number) => {
    const copy = [...isOn];
    if (copy[index] == false) {
      copy[index] = true;
    } else {
      copy[index] = false;
    }
    setOn(copy);
  };

  console.log(isOn, activity);
  return (
    <View style={style.container}>
      <View
        style={{
          width: "90%",
          height: "90%",
        }}
      >
        <FlatList
          data={activity}
          ListEmptyComponent={() => <></>}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(252,249,249,0.93)",
                    marginVertical: 10,
                    display: "flex",
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ paddingLeft: 20 }}>{item.title}</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isOn[index] ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toogle(index)}
                    value={isOn[index]}
                    onActivated={async () =>
                      await schedulePushNotification(
                        item.starts,
                        `let's start your activity:${item.title} `
                      )
                    }
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          extraData={route.params}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e8e5",
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
});
