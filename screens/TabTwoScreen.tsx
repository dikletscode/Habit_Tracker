import { scheduleNotificationAsync } from "expo-notifications";
import { deleteItemAsync } from "expo-secure-store";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { schedulePushNotification } from "../components/Notification";
import { Text } from "../components/Themed";
import { AuthContext } from "../context/Provider";

export default function TabTwoScreen() {
  const { dispatch } = React.useContext(AuthContext);
  const logout = async () => {
    await deleteItemAsync("data");
    dispatch({ type: "LOGIN_FAILED" });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>

      <Pressable onPress={logout}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
