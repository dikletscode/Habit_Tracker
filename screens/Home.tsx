import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import Profile from "../components/Profile";
import Target from "../components/Target";
import { Activity, getActivity } from "../services/activity";
import { AuthContext, FetchContext } from "../context/Provider";
import RenderFlatList from "../components/RenderFlatList";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);
  const [activity, setActivity] = React.useState<Activity[]>([]);

  const { state, dispatch } = React.useContext(AuthContext);
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
    dispatch({ type: "LOGIN_SUCCESS" });
  }, [data.isFetch]);

  return (
    <>
      <View style={{ height: "100%", backgroundColor: "#f9e8e5" }}>
        <LinearGradient
          colors={["#e14457", "#f9e8e5"]}
          locations={[0.65, 0.3]}
          style={style.container}
        >
          <Profile />
          <Text
            style={{
              paddingTop: 25,
              alignSelf: "flex-start",
              color: "#fff",
              marginLeft: 35,
              fontSize: 18,
            }}
          >
            Activities currently ongoing
          </Text>
          <Target activity={activity} />
        </LinearGradient>
        <View style={{ height: "40%", marginBottom: 0 }}>
          <RenderFlatList activity={activity} isFuture={"future"} bool={true} />
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "50%",
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
