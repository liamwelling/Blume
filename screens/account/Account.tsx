import { Pressable, StyleSheet, Text, View, Linking, Alert } from "react-native";
import React from "react";
import useUserStore from "../../stateManagement/UserContext";
import { useFonts } from "expo-font";
import axios from "axios";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage'

const Account = () => {
  const userStore = useUserStore();
  const [deletionConfirmed, setDeletionConfirmed] = React.useState(false);
  const signOut = async () => {
    try {
      await AsyncStorage.setItem('@user_id', '0')
      userStore.setUserID(0)
    } catch (e) {
    }
  }
  const deleteUser = () => {
    axios.post(EXPO_PUBLIC_SERVER_URL + "/deleteuser", {
      userID: userStore.userID,
    })
    .then(response => {
        console.log('User deleted successfully:', response.data);  // Log response data for debugging
        // Here, you can set values or perform other operations upon successful completion of the API call
        // For example, set a state to confirm user deletion
        signOut();
        setDeletionConfirmed(true);   // Assume you have a state setter method named setDeletionConfirmed
    })
    .catch(error => {
        console.log('Error occurred while deleting user:', error);
        Alert.alert(
          "Error",
          "An error occurred while deleting your account. Please try again later.",
          [
              {
                  text: "OK",
                  style: "cancel"
              }
          ]
      );
      });
  }
  const onDeleteAccountPress = () => {
    Alert.alert(
        "Delete Account",
        "To delete your account, you must cancel your App Store subscription. Do you want to proceed?",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Proceed",
                onPress: () => {
                    // Replace the URL with the actual URL that leads to the user's subscription management page
                    const url = 'https://apps.apple.com/account/subscriptions';
                    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
                    deleteUser();
                   
                }
            }
        ]
    );
};
  const [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
    Semibold: require("../../assets/fonts/Graphik-Semibold-Web.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 100, fontSize: 26, fontFamily: 'Medium'}}>Account</Text>
      <View style={[styles.row, { marginTop: 100 }]}>
        <Text style={styles.text}>Email: </Text>
        <Text style={styles.text}>{userStore.Email}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,  }}>
        <View style={{flex: 1, height: .75, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
      </View>
      <View style={[styles.row, { marginTop: 40 }]}>
        <Text style={[styles.text, ]}>Username: </Text>
        <Text style={styles.text}>{userStore.Username}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,  }}>
        <View style={{flex: 1, height: .75, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
      </View>
    
     <View style={{ marginTop: 'auto', marginBottom: 150}}>
     <Text style={{color: 'red',marginLeft: 'auto', marginRight: 'auto', marginBottom: 20}}>Delete Account</Text>
      <Pressable
      onPress={( ) => onDeleteAccountPress() }
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#1D2CB5" : "#2436E7" },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </Pressable>
     </View>

    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",

    // justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#2436E7",
    width: 325,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "Medium",
  },
});
