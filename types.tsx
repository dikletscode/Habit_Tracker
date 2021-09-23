/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Activity } from "./services/activity";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  AddActivity: undefined;
  Login: undefined;
  Register: undefined;
  Loading: undefined;
  PastActivity: undefined;
  DetailActivity: { activity: Activity[] };
  ModalWarning: { activity: Activity };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Activity: undefined;
  TabTwo: undefined;
  CalendarScreen: undefined;
  Calendar: undefined;
  PastActivity: undefined;
  Calculator: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export enum Picker {
  "Hobby" = "paint-brush",
  "Traveling" = "plane",
  "Exercising" = "soccer-ball-o",
  "Study" = "book",
  "Health" = "medkit",
  "Task" = "pencil",
}
export enum ColorPicker {
  "Hobby" = "#e71d36",
  "Traveling" = "#ff9f1c",
  "Exercising" = "#2ec4b6",
  "Study" = "#d55d92",
  "Health" = "#ea698b",
  "Task" = "#9a031e",
}
export type PickerT = keyof typeof Picker;
export type PickerC = keyof typeof ColorPicker;
