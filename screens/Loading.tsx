import React from "react";
import { Image, View } from "react-native";

const Loading = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={require("../assets/images/Loader.gif")} />
    </View>
  );
};
export default Loading;
