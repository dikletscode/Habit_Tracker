/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AddActivity from "../components/AddActivity";
import Activity from "../screens/Activity";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { AuthContext } from "../context/Provider";
import { setAuthToken } from "../config/axios";
import { getValue } from "../config/secureStore";
import Loading from "../screens/Loading";
import { deleteItemAsync } from "expo-secure-store";
import CalendarScreen from "../screens/CalendarSecreen";
import DetailActivity from "../screens/ListActivity";
import ActivitySecreen from "../screens/Activity";
import PastActivityScreen from "../screens/PastActivityScreen";
import ModalWarning from "../components/modal";
import Calculator from "../screens/Calculator";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { state, dispatch } = React.useContext(AuthContext);

  const getData = async () => {
    dispatch({ type: "LOADING" });
    try {
      let data = await getValue("data");
      if (data) {
        setAuthToken(JSON.parse(data).token);
        dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(data) });
      } else {
        dispatch({ type: "LOGIN_FAILED" });
      }
    } catch (error) {
      await deleteItemAsync("data");
      dispatch({ type: "LOGIN_FAILED" });
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  console.log(state);
  return (
    <Stack.Navigator>
      {state.isLoading || state.isLogin == null ? (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
      ) : state.isLogin ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
          <Stack.Group
            screenOptions={{
              presentation: "containedTransparentModal",
              headerShown: false,
            }}
          >
            <Stack.Screen name="AddActivity" component={AddActivity} />
          </Stack.Group>
          <Stack.Screen
            name="ModalWarning"
            component={ModalWarning}
            options={{
              presentation: "containedTransparentModal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="DetailActivity" component={DetailActivity} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const openModal = (navigation: RootTabScreenProps<"Activity">) => {
    navigation.navigation.navigate("Activity");
    navigation.navigation.navigate("AddActivity");
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveBackgroundColor: "#f2e0dd",
        tabBarActiveBackgroundColor: "#f2e0dd",
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Activity"
        component={ActivitySecreen}
        options={(navigation: RootTabScreenProps<"Activity">) => ({
          title: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <Pressable onPress={() => openModal(navigation)}>
              <TabBarIcon name="plus-circle" color="#09cedb" size={55} />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="PastActivity"
        component={PastActivityScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="check-circle" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sort-numeric-asc" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size || 30}
      style={{ marginBottom: 5 }}
      {...props}
    />
  );
}
