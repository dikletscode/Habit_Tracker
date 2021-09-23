import { StyleSheet } from "react-native";

import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import FormInput from "../components/Input";
import { RootTabScreenProps } from "../types";
import * as SecureStore from "expo-secure-store";
import { login } from "../services/users";
import { save } from "../config/secureStore";
import { AuthContext } from "../context/Provider";
import { setAuthToken } from "../config/axios";
interface Input {
  email: string;
  password: string;
}

const Login = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>();
  const { state, dispatch } = useContext(AuthContext);
  const changes = (state: string) => {
    return (newText: string) => {
      setInput({ ...input, [state]: newText });
    };
  };
  const submit = () => {
    const mockFetch = async () => {
      try {
        const data = await login(input);
        save("data", JSON.stringify(data));
        setAuthToken(data.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigation.navigate("Root");
      } catch (error) {
        dispatch({ type: "LOGIN_FAILED" });
        setMessage(error as string);
        console.log(error as string);
      }
    };
    mockFetch();
  };

  const toSignup = () => {
    navigation.navigate("Register");
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
          <View style={styles.container}>
            <FormInput
              value={input.email}
              onChange={changes("email")}
              placeholder="email"
            />
            <FormInput
              value={input.password}
              onChange={changes("password")}
              secure={true}
              placeholder="password"
            />
            <View style={styles.inputView}>
              <Text>{message}</Text>
            </View>
            <View style={styles.inputView}>
              <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.textButton}>LOGIN</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.inputView}
              onPress={() => toSignup()}
            >
              <Text style={{ fontSize: 17 }}>dont't have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Login;

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
  section: {
    flex: 1,
    justifyContent: "space-between",
  },
  fullpage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  desc: { color: "black", fontSize: 30, padding: 34, marginTop: 30 },

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
    paddingBottom: 100,
    alignItems: "center",
  },
});
