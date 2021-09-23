import { getItemAsync } from "expo-secure-store";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/Provider";

const Profile = () => {
  const [profile, setProfile] = React.useState("");
  const { state } = React.useContext(AuthContext);
  const getValue = async () => {
    try {
      let data = await getItemAsync("data");
      if (data) {
        console.log(JSON.parse(data).user.profile.fullname);
        setProfile(JSON.parse(data).user.profile.fullname);
      } else {
        setProfile(state.user.profile.fullname || "Asep");
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getValue();
  }, [state]);

  return (
    <View style={style.profile}>
      <View style={style.desc}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          Hi {profile}!
        </Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
          You Have 5 target
        </Text>
      </View>

      <Image
        source={{
          uri: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ronaldo-kaus-mu.jpg",
        }}
        style={{ height: 70, width: 70, borderRadius: 50 }}
      />
    </View>
  );
};
export default Profile;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    width: "80%",
    backgroundColor: "transparent",
  },
  desc: {
    backgroundColor: "transparent",
    color: "#fff",
  },
});
