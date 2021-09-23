import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { FetchContext } from "../context/Provider";
import { Activity, removeActivity, updateActivity } from "../services/activity";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { Text } from "./Themed";

const ModalWarning = ({
  navigation,
  route,
}: RootTabScreenProps<"PastActivity">) => {
  const { data, setData } = useContext(FetchContext);
  const [activity, setActivity] = useState<Activity>();
  const updateData = async () => {
    if (route.params) {
      const activity: Activity = route.params["activity"];
      setActivity(activity);
      try {
        activity["isConfirm"] = true;
        setData({ type: "LOADING" });
        await updateActivity(activity, activity.id ? activity.id : 0);
        setData({ type: "FETCH_SUCCESS" });
        navigation.goBack();
      } catch (error) {
        setData({ type: "FETCH_FAILED" });
        console.log(error, "ss");
      }
    }
  };
  useEffect(() => {
    if (route.params) {
      const activity: Activity = route.params["activity"];
      setActivity(activity);
    }
  }, [route.params]);

  const removeActivities = async (id: number) => {
    try {
      setData({ type: "LOADING" });
      await removeActivity(id);
      setData({ type: "FETCH_SUCCESS" });
      navigation.goBack();
    } catch (error) {
      setData({ type: "FETCH_FAILED" });
      console.log(error, "ss");
    }
  };

  return (
    <>
      {activity != undefined ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: "30%",
              width: "80%",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                width: "80%",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              {activity.isConfirm ? (
                <>
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Remove your activity?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "50%",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Pressable
                      style={{ alignItems: "center" }}
                      onPress={async () =>
                        await removeActivities(activity.id || 0)
                      }
                    >
                      <FontAwesome name="trash" size={35} color="red" />
                    </Pressable>
                    <Pressable
                      style={{ alignItems: "center" }}
                      onPress={() => navigation.goBack()}
                    >
                      <FontAwesome name="times-circle" size={35} color="red" />
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Have you finished your activity?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Pressable
                      style={{ alignItems: "center" }}
                      onPress={updateData}
                    >
                      <FontAwesome name="smile-o" size={35} color="#09cedb" />
                      <Text>yes it's done</Text>
                    </Pressable>
                    <Pressable
                      style={{ alignItems: "center" }}
                      onPress={() => navigation.goBack()}
                    >
                      <FontAwesome name="frown-o" size={35} color="red" />
                      <Text>I Forgot</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalWarning;
