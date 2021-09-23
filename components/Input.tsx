import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  secure?: boolean;
  onChange: (text: string) => void;
}

const FormInput = (props: Props) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        placeholderTextColor="black"
        placeholder={props.placeholder}
        secureTextEntry={props.secure}
        style={styles.input}
        value={props.value}
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
  },
  inputView: {
    paddingBottom: 30,
  },
  input: {
    color: "black",
    backgroundColor: "rgba(255,255,255, 0.6)",
    height: 50,
    minWidth: 300,
    borderRadius: 50,
    paddingLeft: 30,
    padding: 14,
  },
});
export default FormInput;
