import React from "react";
import { View } from "react-native";
import { Text } from "./Themed";

const StatusActivity: React.FC<{
  date: Date | string;
  dateEnd: Date | string;
}> = ({ date, dateEnd }) => {
  var date1 = new Date(date);
  let date2 = new Date();
  let result = (date1.getTime() - date2.getTime()) / (1000 * 3600);

  if (result <= 24 && result >= 0) {
    return (
      <Text style={{ fontSize: 15, paddingLeft: 15 }}>
        {`${result.toFixed()} hours to go`}
      </Text>
    );
  } else if (result < 0) {
    let results = (date2.getTime() - date1.getTime()) / (1000 * 3600);
    let result =
      (new Date(dateEnd).getTime() - date2.getTime()) / (1000 * 3600);

    let percent = 100 - parseInt(((result / results) * 100).toFixed());

    return (
      <>
        {percent < 100 ? (
          <>
            <Text> activity progress {percent}%</Text>
            <View
              style={{
                height: 20,
                width: "90%",
                marginTop: 60,
              }}
            >
              <View
                style={{
                  height: 20,
                  width: `${percent}%`,
                  position: "absolute",
                  backgroundColor: "#e14457",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 12,
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  {percent}%
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={{ fontSize: 13, paddingLeft: 15 }}>
            {(result * -1).toFixed(1)} hours ago
          </Text>
        )}
      </>
    );
  } else {
    return (
      <Text style={{ fontSize: 15, paddingLeft: 15 }}>
        {` ${(parseInt(result.toFixed()) / 24).toFixed()} day`}
      </Text>
    );
  }
};
export default StatusActivity;
