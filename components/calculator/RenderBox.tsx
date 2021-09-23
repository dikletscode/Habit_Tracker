import React, { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import style from "./style/numbet";

interface Props {
  action: (item: string | number) => void;
}

const RenderBox: FC<Props> = ({ action }) => {
  const special: (string | number)[] = ["C", "^", ".", "del"];
  const arr = [1, 2, "-", "+", 3, 4, "/", "*"];
  const arr2 = [5, 6, "%", "=", 7, 8, 9, 0];
  const arrConcat = special.concat(arr).concat(arr2);

  return (
    <View style={style.containerBox}>
      {arrConcat.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => action(item)}>
            <View style={typeof item == "number" ? style.box : style.boxRed}>
              <Text style={{ fontSize: 30, color: "white" }}>{item}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default RenderBox;
