import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";

import FormInput from "../components/Input";
import { RegisInput, register } from "../services/users";

interface Input {
  username: string;
  email: string;
  password: string;
}

const Register = ({ navigation }: any) => {
  const [input, setInput] = useState<RegisInput>({
    fullname: "",
    email: "",
    password: "",
  });

  const [clearInput, setClear] = useState<boolean>(false);
  const [messages, setMessage] = useState<string>();
  const value = (field: string): string => {
    if (clearInput) {
      return "";
    } else {
      return field;
    }
  };
  const changes = (state: string) => {
    return (newText: string) => {
      setInput({ ...input, [state]: newText });
    };
  };

  const toLogin = () => {
    navigation.navigate("Login");
  };
  const submit = () => {
    const mockFetch = async () => {
      try {
        const data = await register(input);
        navigation.navigate("Login");
      } catch (error) {
        setMessage(error as string);
        console.log(error as string);
      }
    };
    mockFetch();
  };

  return (
    <ImageBackground
      source={require("../assets/images/wall.gif")}
      style={{
        flex: 1,
        width: undefined,
        height: undefined,
      }}
    >
      <View style={styles.fullpage}>
        <View style={styles.section}>
          <Text style={styles.desc}>write your day for a better life</Text>
          <ScrollView>
            <View style={styles.container}>
              <FormInput
                value={value(input.fullname)}
                onChange={changes("fullname")}
                placeholder="fullname"
              />
              <FormInput
                value={value(input.email)}
                onChange={changes("email")}
                placeholder="email"
              />
              <FormInput
                value={value(input.password)}
                onChange={changes("password")}
                secure={true}
                placeholder="password"
              />
              <View style={styles.inputView}>
                <Text>{messages}</Text>
              </View>
              <View style={styles.inputView}>
                <TouchableOpacity style={styles.button} onPress={submit}>
                  <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.inputView}
                onPress={() => toLogin()}
              >
                <Text style={{ fontSize: 17 }}>already have an account?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Register;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "space-between",
  },
  fullpage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  desc: { color: "black", fontSize: 30, padding: 34 },
  inputView: {
    paddingBottom: 30,
  },
  banner: {
    padding: 50,
  },
  button: {
    height: 40,
    backgroundColor: "rgba(123, 44, 191, 0.4)",
    borderRadius: 50,
    width: 100,
  },
  textButton: {
    textAlign: "center",
    padding: 12,
    color: "white",
  },

  container: {
    alignItems: "center",
    paddingTop: 40,
  },
});
