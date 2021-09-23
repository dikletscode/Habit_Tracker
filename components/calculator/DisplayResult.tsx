import React, { FC } from "react";
import { Text, View } from "react-native";
import style from "./style/numbet";

const DisplayResult: FC<{ calculate: string | number; result: string }> = ({
  calculate,
  result,
}) => {
  return (
    <View>
      <Text style={{ color: "white", paddingVertical: 20 }}>Display</Text>
      <View style={style.input}>
        <Text style={{ fontSize: 30 }}> {calculate}</Text>
        <Text style={{ fontSize: 20, alignSelf: "flex-end", marginRight: 10 }}>
          {result}
        </Text>
      </View>
    </View>
  );
};
export default DisplayResult;
