import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { AuthContext, FetchContext } from "../context/Provider";
import Loading from "../screens/Loading";
import { Activity, getActivity } from "../services/activity";
import { Text } from "../components/Themed";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";

const CalendarScreen = () => {
  const [activity, setActivity] = React.useState<Activity[]>([]);

  const readActivity = async () => {
    try {
      let data = await getActivity();
      setActivity(data);
    } catch (error) {
      console.log(error, "ssa");
    }
  };

  React.useEffect(() => {
    readActivity();
  }, []);

  interface objType {
    [key: string]: any[];
  }
  const itemGenerate = () => {
    let arr: any[] = [];
    let obj: objType = {};

    activity.map((item, index) => {
      const temp = {
        name: item.title,
        height: 80,
        key: new Date(item.starts).toISOString().split("T")[0],
      };
      arr.push(temp);
    });
    let result = arr.reduce((acc, d) => {
      if (Object.keys(acc).includes(d.key)) return acc;

      acc[d.key] = arr.filter((g) => g.key === d.key);
      return acc;
    }, {});

    return result;
  };
  const today = new Date();

  return (
    <View style={{ height: 600, marginTop: 100 }}>
      <Agenda
        items={itemGenerate()}
        selected={"2021-09-21"}
        minDate="2021-01-01"
        maxDate="2021-12-12"
        loadItemsForMonth={(day) => {}}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              style={[style.item, { height: item.height }]}
              onPress={() => alert(item.name)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        renderEmptyDate={() => {
          return (
            <View style={style.emptyDate}>
              <Text>This is empty date!</Text>
            </View>
          );
        }}
        rowHasChanged={(r1: any, r2: any) => {
          return r1.name !== r2.name;
        }}
        pastScrollRange={3}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={2}
        showClosingKnob={true}
        renderEmptyData={() => (
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Text>no activities on that day</Text>
          </View>
        )}
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue",
        }}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    </View>
  );
};

export default CalendarScreen;

const style = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  CalendarScreen: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "95%",
    backgroundColor: "transparent",
  },
  desc: {
    backgroundColor: "transparent",
    color: "#fff",
  },
  box: {
    backgroundColor: "rgba(252,249,249,0.93)",
    color: "#fff",
    height: 20,
    width: 250,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    marginTop: 60,
  },
});
